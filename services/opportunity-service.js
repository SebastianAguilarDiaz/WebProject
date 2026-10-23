import { Opportunity } from "../models/Opportunity.js";
import { User } from "../models/User.js";

// Creates a new opportunity and returns it. On a database error it logs the
// message and returns undefined.
export const createOpportunity = async (data) => {
  // The author comes from the session and the status is always pending.
  const opportunity = await Opportunity.create({
    ...data,
    status: 'Pending'
  }).catch((dbError) => {
    console.error(dbError.message);
  });

  if (!opportunity) return undefined;

  // Keep the denormalized list on the user in sync with the new opportunity.
  if (opportunity.createdBy) {
    await User.updateOne(
      { _id: opportunity.createdBy },
      { $addToSet: { createdOpportunities: opportunity._id } }
    ).catch((dbError) => console.error(dbError.message));
  }

  return opportunity;
};

// Finds one opportunity by its Mongo id.
export const findOpportunity = async (id) => {
  const opportunityFound = await Opportunity.findById(id)
    .catch((dbError) => console.error(dbError.message));
  return opportunityFound;
};

// Returns every opportunity that matches the filter, sorted by deadline.
export const findOpportunities = async (filter = {}) => {
  return await Opportunity.find(filter)
    .sort({ deadline: 1 })
    .catch((dbError) => console.error(dbError.message));
};

// Returns the 3 verified opportunities with the most total votes.
// The pipeline keeps verified opportunities, calculates totalVotes as
// validVotes + invalidVotes, sorts by that value and limits the result to 3.
export const findFeaturedOpportunities = async () => {
  return await Opportunity.aggregate([
    { $match: { status: 'Verified' } },
    {
      $addFields: {
        totalVotes: {
          $add: [{ $ifNull: ['$validVotes', 0] }, { $ifNull: ['$invalidVotes', 0] }]
        }
      }
    },
    { $sort: { totalVotes: -1, trustScore: -1 } },
    { $limit: 3 }
  ]).catch((dbError) => console.error(dbError.message));
};

// Builds the Mongo filter used by Explore from the normalized query filters.
export const buildOpportunityFilter = (filters) => {
  const filter = {};
  // Explore only shows verified opportunities.
  filter.status = 'Verified';

  // Each selected checkbox matches any of its values.
  if (filters.area.length) filter.area = { $in: filters.area };
  if (filters.level.length) filter.gradeLevels = { $in: filters.level };
  if (filters.type.length) filter.type = { $in: filters.type };

  // Text search in title or description.
  if (filters.q) {
    // Escape regex characters so a search like "C++" does not break.
    const safe = filters.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safe, "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }

  return filter;
};
