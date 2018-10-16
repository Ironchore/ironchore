const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  const criterial = {}
  if (!req.user.tutor) {
    criterial.tutor = req.user.id;
  } else {
    criterial.tutor = req.user.tutor;
  }
  User.find(criterial)
    .then(users => res.json(users))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .populate('tutor')
    .then(user => res.json(user))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      throw createError(409, `User wtih email ${req.body.email} already exists`);
    } else {
      user = new User(req.body);
      console.log(req.isAuthenticated());
      if (req.isAuthenticated()) {
        if (!req.user.tutor) {
          user.tutor = req.user.id;
        } else {
          throw createError(400, `Kinds can't creare more kids :D, be father my friend`);
        }
      } 
      user.save()
        .then(user => res.status(201).json(user))
        .catch(error => {
          next(error)
        });
    }
  })
  .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Promise.all([
    User.findByIdAndDelete(req.params.id),
    Chores.deleteMany({ user: mongoose.Types.ObjectId(req.params.id)}),
    Awards.deleteMany({ user: mongoose.Types.ObjectId(req.params.id)})])
    .then(([user]) => {
      if (!user) {
        throw createError(404, 'User not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));

  }