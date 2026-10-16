export const parseOpportunity = (req, res, next) => {
  if (!req.body) req.body = {};

  const raw = req.body.tags;

  if (raw === undefined || raw === null || raw === '') {
    req.body.tags = undefined;
    return next();
  }

  const list = Array.isArray(raw) ? raw : String(raw).split(',');
  const cleaned = [];
  for (const item of list) {
    const tag = String(item).trim().toLowerCase();
    if (tag === '') continue;
    if (!cleaned.includes(tag)) cleaned.push(tag);
  }

  req.body.tags = cleaned.length ? cleaned : undefined;
  next();
};
