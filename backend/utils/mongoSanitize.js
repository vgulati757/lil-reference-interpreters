
// mongoSanitize.js
export default function sanitizeMongo(req, res, next) {
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
      // Remove keys starting with $ or containing .
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next(); // MUST call next() to proceed
}
