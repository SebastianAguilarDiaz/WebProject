import {Opportunity} from "../models/Opportunity.js";

export const createOpportunity = async (data) => {
  const opportunity = await Opportunity.create(data)
    .catch((dbError) => {
      console.error(dbError.message);
    });
  return opportunity;
};

export const findOpportunity = async (id) => {
  const opportunityFound = await Opportunity.findById(id)
    .catch((dbError) => console.error(dbError.message));
  return opportunityFound;
};

// Adds a vote and updates the trust score. At 100 votes or more, the
// opportunity is verified when trust is 70% or higher, otherwise deleted.
export const voteOpportunity = async (id, vote) => {
  const opportunity = await Opportunity.findById(id)
    .catch((dbError) => console.error(dbError.message));
  if (!opportunity) return null;

  if (vote !== 'valid' && vote !== 'invalid') return null;

  const statusBefore = opportunity.status;

  opportunity.validVotes = (opportunity.validVotes || 0) + (vote === 'valid' ? 1 : 0);
  opportunity.invalidVotes = (opportunity.invalidVotes || 0) + (vote === 'invalid' ? 1 : 0);

  const totalVotes = opportunity.validVotes + opportunity.invalidVotes;
  opportunity.trustScore = Math.round((opportunity.validVotes / totalVotes) * 100);

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

export const findOpportunities = async (filter = {}) => {
  return await Opportunity.find(filter)
    .sort({ deadline: 1 })
    .catch((dbError) => console.error(dbError.message));
};

// Top verified opportunities by total votes (valid + invalid).
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

// Translates the normalized explore filters into a Mongo filter.
export const buildOpportunityFilter = (filters) => {
  const filter = {};
  filter.status = 'Verified';
  if (filters.area.length) filter.area = { $in: filters.area };
  if (filters.level.length) filter.gradeLevels = { $in: filters.level };
  if (filters.type.length) filter.type = { $in: filters.type };

  if (filters.q) {
    // Escape regex characters so a search like "C++" does not break.
    const safe = filters.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safe, "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }

  return filter;
};


