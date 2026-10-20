import express from "express";
import { parseOpportunity } from "../middleware/parseOpportunity.js";
import { createOpportunity } from "../../services/opportunity-service.js";

const router = express.Router();

router.post('/contribute', parseOpportunity, async (req, res, next) => {
  try {
    const { title, type, area, gradeLevels, imageUrl, description, deadline, location, url, tags, status } = req.body;
    const created = await createOpportunity({
      title: title || undefined,
      type: type || undefined,
      area: !area ? undefined : (Array.isArray(area) ? area : [area]),
      gradeLevels: !gradeLevels ? undefined : (Array.isArray(gradeLevels) ? gradeLevels : [gradeLevels]),
      imageUrl: imageUrl || undefined,
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

export default router;
