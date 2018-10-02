const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  User.find()
  .then(users => res.json(users))
  .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      throw createError(409, `User wtih email ${req.bodyemail} already exists`);
    } else {
      user = new User(req.body);
      user.save()
      .then(user => res.status(201).json(user))
      .catch(error => {
        next(error)
      });
    }
  })
  .catch(error => next(error));
}
