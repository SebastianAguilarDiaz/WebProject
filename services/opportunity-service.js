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

export const findOpportunities = async (filter = {}) => {
  return await Opportunity.find(filter)
    .sort({ deadline: 1 })
    .catch((dbError) => console.error(dbError.message));
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


