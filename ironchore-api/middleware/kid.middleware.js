const createError = require('http-errors');

module.exports.isMe = (param = 'id') => {
  return (req, res, next) => {
    const kid_id = req.params[param];
    if (!req.isAuthenticated()) {
      throw createError(403);
    } else if (kid_id !== req.kid.id) {
      throw createError(401);
    } else {
      next();
    }
  }
}