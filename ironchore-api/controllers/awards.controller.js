
const Awards = require('../models/awards.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  const awards = new Awards(req.body);
  Awards.user = req.user.id;
  Awards.chores = req.params.userId;

  awards.save()
    .then(comment => res.status(201).json(comment))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Awards.findOneAndDelete({ user: req.user.id, _id: req.params.id })
    .then(awards => {
      if (!awards) {
        throw createError(404, 'Comment not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
    Awards.find({ user: mongoose.Types.ObjectId(req.params.userId) })
      .then(awards => res.json(awards))
      .catch(error => next(error));