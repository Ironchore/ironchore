const Chore = require('../models/chore.model');
const Homework = require('../models/homework.model');
const User = require('../models/user.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  const criterial = {}
  if (!req.user.tutor) {
    criterial.tutor = req.user.id;
  } else {
    criterial.tutor = req.user.tutor;
  }

  Chore.find(criterial)
    .populate({ path: 'homeworks', populate: { path: 'kid' } })
    .then(chores => res.json(chores))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const chore = new Chore(req.body);
  chore.tutor = req.user.id;

  chore.save()
    .then(chore => {
      User.find({ tutor: req.user.id }).then((kids) => {
        Homework.create(
          kids.map((kid) => {
            return {
              chore: chore.id,
              kid: kid.id
            }
          })
        ).then(() => {
          res.status(201).json(chore)
        })
      })
    })
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Chore.findOneAndDelete({ tutor: req.user.id, _id: req.params.id })
    .then(chore => {
      if (!chore) {
        throw createError(404, 'Chore not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}