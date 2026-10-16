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


