import express from "express";
import { findOpportunity, findOpportunities, buildOpportunityFilter } from "../../services/opportunity-service.js";
import { OPPORTUNITY_AREAS, OPPORTUNITY_GRADE_LEVELS, OPPORTUNITY_TYPES } from "../../models/Opportunity.js";
import { parseExploreFilters } from "../middleware/parseExploreFilters.js";


const router = express.Router();

router.get('/',(req,res,next)=>{
  res.render("index");
})

.get('/about',(req,res,next)=>{
  res.render("about");
})

.get('/contribute',(req,res,next)=>{
  res.render("contribute");
})

.get('/explore',parseExploreFilters,async (req,res,next)=>{
  try {
    const filter = buildOpportunityFilter(req.filters);
    const opportunities = await findOpportunities(filter);
    res.render("explore", {
      opportunities,
      OPPORTUNITY_AREAS,
      OPPORTUNITY_GRADE_LEVELS,
      OPPORTUNITY_TYPES,
      selected: req.filters
    });
  } catch (err) {
    next(err);
  }
})

.get('/myProfile',(req,res,next)=>{
  res.render("myProfile");
})

.get('/verify',(req,res,next)=>{
  res.render("verify");
})

.get('/opportunity/:id',async (req,res,next)=>{
  try {
    const opportunity = await findOpportunity(req.params.id);
    if (!opportunity) return res.status(404).render("404");
    res.render("opportunity", {
      id: opportunity._id,
      title: opportunity.title,
      type: opportunity.type,
      area: opportunity.area,
      gradeLevels: opportunity.gradeLevels,
      image: opportunity.imageUrl,
      description: opportunity.description,
      deadline: opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : undefined,
      location: opportunity.location,
      url: opportunity.url,
      tags: opportunity.tags,
      trustScore: opportunity.trustScore
    });
  } catch (err) {
    next(err);
  }
})

export default router;
