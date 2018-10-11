const Chore = require('../models/chore.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  const chore = new Chore(req.body);
  chore.user = req.user.id;

  chore.save()
    .then(chore => res.status(201).json(chore))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Comment.findOneAndDelete({ user: req.user.id, _id: req.params.id })
    .then(chore => {
      if (!chore) {
        throw createError(404, 'Chore not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}