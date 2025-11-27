import xss from 'xss';

/**
 * Recursively sanitize all string values in an object
 * @param {Object} obj
 */
const sanitizeObject = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
};

/**
 * Middleware to sanitize req.body, req.query, and req.params
 */
const sanitizeRequest = (req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  next();
}; 

export default sanitizeRequest;
