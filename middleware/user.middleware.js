const createError = require('http-errors');

module.exports.isMe = (param = 'id') => {
  return (req, res, next) => {
    const user_id = req.params[param];
    if (!req.isAuthenticated()) {
      throw createError(403);
    } else if (user_id !== req.user.id) {
      throw createError(401);
    } else {
      next();
    }
  }
}

module.exports.isTutor = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.tutor) {
    next();
  } else {
    throw createError(401, 'You are kid and needs be tutor');
  }
}

module.exports.isKid = (req, res, next) => {
  if (req.isAuthenticated() && req.user.tutor) {
    next();
  } else {
    throw createError(401, 'You are tutor and needs be kid');
  }
}