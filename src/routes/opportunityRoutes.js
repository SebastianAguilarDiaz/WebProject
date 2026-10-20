import express from "express";
import { parseOpportunity } from "../middleware/parseOpportunity.js";
import { createOpportunity, voteOpportunity } from "../../services/opportunity-service.js";

const router = express.Router();

router.post('/contribute', parseOpportunity, async (req, res, next) => {
  try {
    const { title, type, area, gradeLevels, imageUrl, description, deadline, location, url, tags, status } = req.body;
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
      status: status || 'Pending'
    });
    if (!created) return res.status(400).send("Could not create opportunity");
    res.redirect(`/opportunity/${created._id}`);
  } catch (err) {
    next(err);
  }
});

router.post('/opportunity/:id/vote', async (req, res, next) => {
  try {
    const result = await voteOpportunity(req.params.id, req.body.vote);
    if (!result) return res.status(404).render("404");

    // Not deleted: show the detail of the opportunity that was voted.
    if (!result.deleted) {
      return res.redirect(`/opportunity/${req.params.id}`);
    }

    // Deleted: Verified opportunities go back to Explore, Pending to the queue.
    res.redirect(result.status === 'Verified' ? '/explore' : '/verify');
  } catch (err) {
    next(err);
  }
});

export default router;
