// Normalizes the tags field sent by the Contribute form.
export const parseOpportunity = (req, res, next) => {
  if (!req.body) req.body = {};

  const raw = req.body.tags;

  // No tags: leave the field undefined so the database does not store an empty list.
  if (raw === undefined || raw === null || raw === '') {
    req.body.tags = undefined;
    return next();
  }

  // A single tag arrives as a string; several tags can arrive as an array
  // or as a comma-separated string.
  const list = Array.isArray(raw) ? raw : String(raw).split(',');
  const cleaned = [];
  for (const item of list) {
    // Trim, lowercase and skip empty or duplicated tags.
    const tag = String(item).trim().toLowerCase();
    if (tag === '') continue;
    if (!cleaned.includes(tag)) cleaned.push(tag);
  }

  req.body.tags = cleaned.length ? cleaned : undefined;
  next();
};
