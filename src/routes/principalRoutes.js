import express from "express";
import { findOpportunity, findOpportunities, findFeaturedOpportunities, buildOpportunityFilter } from "../../services/opportunity-service.js";
import { OPPORTUNITY_AREAS, OPPORTUNITY_GRADE_LEVELS, OPPORTUNITY_TYPES } from "../../models/Opportunity.js";
import { parseExploreFilters } from "../middleware/parseExploreFilters.js";
import { requireLogin } from "../middleware/requireLogin.js";
import { getMyVotes, getUserById, getUserStats, getLeaderboard } from "../../services/user-service.js";


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

// JWT test login page (parallel to session auth)
.get('/login-jwt',(req,res,next)=>{
  res.render("login-jwt");
})

// Contribute form: requires an active session.
.get('/contribute',requireLogin,(req,res,next)=>{
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

// User profile: requires an active session and shows the real statistics.
router.get('/myProfile',requireLogin,async (req,res,next)=>{
  try {
    const [user, stats, sharedOpportunities] = await Promise.all([
      getUserById(req.session.userId),
      getUserStats(req.session.userId),
      (await findOpportunities({ createdBy: req.session.userId })) || []
    ]);

    // The session points to a user that no longer exists.
    if (!user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    res.render("myProfile", { user, stats, sharedOpportunities });
  } catch (err) {
    next(err);
  }
})


// Verify: shows the queue of pending contributions.
router.get('/verify',async (req,res,next)=>{
  try {
    const [pendingOpportunities, leaderboard] = await Promise.all([
      (await findOpportunities({ status: 'Pending' })) || [],
      getLeaderboard(5)
    ]);
    const myVotes = await getMyVotes(req.session.userId, pendingOpportunities.map((o) => o._id));
    const stats = req.session.userId ? await getUserStats(req.session.userId) : null;
    res.render("verify", { pendingOpportunities, myVotes, stats, leaderboard });
  } catch (err) {
    next(err);
  }
})


// Opportunity detail: loads one opportunity and passes its fields to the view.
.get('/opportunity/:id',async (req,res,next)=>{
  try {
    const opportunity = await findOpportunity(req.params.id);
    if (!opportunity) return res.status(404).render("404");
    const myVoteMap = await getMyVotes(req.session.userId, [opportunity._id]);
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
      trustScore: opportunity.trustScore,
      myVote: myVoteMap[String(opportunity._id)]
    });
  } catch (err) {
    next(err);
  }
})

export default router;
