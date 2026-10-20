// Express gives a string when one checkbox is checked and an array when
// several are checked, so this normalizes them to arrays.
const toArray = (value) => (value === undefined ? [] : [].concat(value));

export const parseExploreFilters = (req, res, next) => {
  req.filters = {
    area: toArray(req.query.area),
    level: toArray(req.query.level),
    type: toArray(req.query.type),
    q: (req.query.q || '').trim()
  };

  next();
};
