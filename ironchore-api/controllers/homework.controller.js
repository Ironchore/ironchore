const Homework = require('../models/homework.model');
const createError = require('http-errors');
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
  Homework.find()
    .then(kid => res.json(kid))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Homework.findById({ kid: req.params.id, _id: req.params.id })
    .populate('kid')
    .then(homework => {
      if (!homework) {
        throw createError(404, 'Homework not found');
      } else {
        res.json(homework);
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports.create = (req, res, next) => {
  const homework = new Homework(req.body);
  homework.kid = req.kid.id;

  homework.save()
    .then(homework => res.status(201).json(homework))
    .catch(error => next(error));
}

