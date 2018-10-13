
const Award = require('../models/award.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  const criterial = {}
  if (!req.user.tutor) {
    criterial.tutor = req.user.id;
  } else {
    criterial.tutor = req.user.tutor;
  }

  Award.find(criterial)
    .populate({ path: 'awards', populate: { path: 'user' } })
    .then(awards => res.json(awards))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const award = new Award(req.body);
  award.tutor = req.user.id;

  award.save()
    .then(award => res.status(201).json(award))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Chore.findOneAndDelete({ tutor: req.user.id, _id: req.params.id })
    .then(award => {
      if (!award) {
        throw createError(404, 'Awards not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}
