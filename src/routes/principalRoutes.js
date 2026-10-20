import express from "express";
import { findOpportunity, findOpportunities, findFeaturedOpportunities, buildOpportunityFilter } from "../../services/opportunity-service.js";
import { OPPORTUNITY_AREAS, OPPORTUNITY_GRADE_LEVELS, OPPORTUNITY_TYPES } from "../../models/Opportunity.js";
import { parseExploreFilters } from "../middleware/parseExploreFilters.js";


const router = express.Router();

// Home page: shows the 3 verified opportunities with the most votes.
router.get('/',async (req,res,next)=>{
  try {
    const featuredOpportunities = await findFeaturedOpportunities();
    res.render("index", { featuredOpportunities });
  } catch (err) {
    next(err);
  }
})

// Static page with information about the project.
.get('/about',(req,res,next)=>{
  res.render("about");
})

// Static page with the Contribute form.
.get('/contribute',(req,res,next)=>{
  res.render("contribute");
})

// Explore: builds the Mongo filter from the query string and lists the results.
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

// Static user profile page.
.get('/myProfile',(req,res,next)=>{
  res.render("myProfile");
})

// Verify: shows the queue of pending contributions.
.get('/verify',async (req,res,next)=>{
  try {
    const pendingOpportunities = await findOpportunities({ status: 'Pending' });
    res.render("verify", { pendingOpportunities });
  } catch (err) {
    next(err);
  }
})

// Opportunity detail: loads one opportunity and passes its fields to the view.
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
