const mongoose = require('mongoose');
const createError = require('http-errors');
const Homework = require('../models/homework.model');
const Chore = require('../models/chore.model');

module.exports.list = (req, res, next) => {
  Homework.find({ kid: req.user.id })
    .then(homework => res.json(homework))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Homework.findOne({ kid: req.user.id, _id: req.params.id })
    .populate('kid')
    .populate('chore')
    .then(homework => {
      if (!homework) {
        throw createError(404, 'Homework not found');
      } else {
        res.json(homework);
      }
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const homework = new Homework({
    chore: req.params.choreId,
    kid: req.user.id
  });

  homework.save()
    .then(homework => res.status(201).json(homework))
    .catch(error => next(error));
}


module.exports.update = (req, res, next) => {
  Homework.findById(req.params.id)
    .populate('kid')
    .then(homework => {
      console.log(homework);
      if (!homework) {
        throw createError(404, 'Homework not found');
      } else if (homework.kid.tutor == req.user.id) {
        homework.state = req.body.state || 'completed';
        return homework.save();
      } else {
        throw createError(401, 'Not yours');
      }
    })
    .then(homework => res.json(homework))
    .catch(error => next(error));
}
