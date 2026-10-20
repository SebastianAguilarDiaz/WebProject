import {Opportunity} from "../models/Opportunity.js";

// Creates a new opportunity and returns it. On a database error it logs the
// message and returns undefined.
export const createOpportunity = async (data) => {
  const opportunity = await Opportunity.create(data)
    .catch((dbError) => {
      console.error(dbError.message);
    });
  return opportunity;
};

// Finds one opportunity by its Mongo id.
export const findOpportunity = async (id) => {
  const opportunityFound = await Opportunity.findById(id)
    .catch((dbError) => console.error(dbError.message));
  return opportunityFound;
};

// Adds one valid or invalid vote, recalculates the trust score, and applies
// the 100-vote rule: below 70% is deleted, 70% or more becomes Verified.
// Returns the status before the vote so the route can decide where to redirect.
export const voteOpportunity = async (id, vote) => {
  const opportunity = await Opportunity.findById(id)
    .catch((dbError) => console.error(dbError.message));
  if (!opportunity) return null;

  // Ignore any value that is not a valid or invalid vote.
  if (vote !== 'valid' && vote !== 'invalid') return null;

  // Keep the original status for the redirect decision.
  const statusBefore = opportunity.status;

  // Old documents may not have the counters, so default them to 0.
  opportunity.validVotes = (opportunity.validVotes || 0) + (vote === 'valid' ? 1 : 0);
  opportunity.invalidVotes = (opportunity.invalidVotes || 0) + (vote === 'invalid' ? 1 : 0);

  // Trust score = percentage of all votes that are valid.
  const totalVotes = opportunity.validVotes + opportunity.invalidVotes;
  opportunity.trustScore = Math.round((opportunity.validVotes / totalVotes) * 100);

  // After 100 votes the community has resolved the opportunity.
  if (totalVotes >= 100) {
    if (opportunity.trustScore < 70) {
      await Opportunity.findByIdAndDelete(id);
      return { deleted: true, status: statusBefore };
    }
    opportunity.status = 'Verified';
  }

  await opportunity.save();
  return { deleted: false, status: statusBefore };
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
