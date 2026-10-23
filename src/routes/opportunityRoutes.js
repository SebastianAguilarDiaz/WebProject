import express from "express";
import { parseOpportunity } from "../middleware/parseOpportunity.js";
import { requireLogin } from "../middleware/requireLogin.js";
import { createOpportunity } from "../../services/opportunity-service.js";
import { castVote } from "../../services/vote-service.js";
import { safeRedirect } from "../../services/auth-service.js";

const router = express.Router();

// Creates an opportunity from the Contribute form.
router.post('/contribute', requireLogin, parseOpportunity, async (req, res, next) => {
  try {
    // Whitelist only the fields accepted by the schema.
    const { title, type, area, gradeLevels, imageUrl, description, deadline, location, url, tags } = req.body;

    // If no image is provided, generate one from the program name.
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(title || 'Opportunity')}&background=random&color=fff&size=256`;

    const created = await createOpportunity({
      title: title || undefined,
      type: type || undefined,
      area: !area ? undefined : (Array.isArray(area) ? area : [area]),
      gradeLevels: !gradeLevels ? undefined : (Array.isArray(gradeLevels) ? gradeLevels : [gradeLevels]),
      imageUrl: (imageUrl && imageUrl.trim()) || avatarUrl,
      description: description || undefined,
      deadline: deadline || undefined,
      location: location || undefined,
      url: url || undefined,
      tags,
      createdBy: req.session.userId
    });
    if (!created) return res.status(400).send("Could not create opportunity");
    res.redirect(`/opportunity/${created._id}`);
  } catch (err) {
    next(err);
  }
});

// Receives a valid or invalid vote for an opportunity.
router.post('/opportunity/:id/vote', requireLogin, async (req, res, next) => {
  try {
    const { vote, returnTo } = req.body || {};
    const result = await castVote(req.session.userId, req.params.id, vote);

    if (result.outcome === "not_found") return res.status(404).render("404");
    if (result.outcome === "invalid_value") return res.status(400).send("Invalid vote");

    // Deleted: Verified opportunities go back to Explore, Pending to the queue.
    if (result.outcome === "deleted") {
      return res.redirect(result.statusBefore === 'Verified' ? '/explore' : '/verify');
    }

    // Not deleted: return to the page that sent the form.
    const fallback = `/opportunity/${req.params.id}`;
    res.redirect(safeRedirect(returnTo, fallback));
  } catch (err) {
    next(err);
  }
});

export default router;
