const Award = require('../models/award.model');
const Prize = require('../models/prize.model');
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

  Award.find(criterial)
    .populate({ path: 'awards', populate: { path: 'kid' } })
    .then(awards => res.json(awards))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const award = new Award(req.body);
  award.tutor = req.user.id;

  award.save()
    .then(award => {
      User.find({ tutor: req.user.id }).then((kids) => {
        Prize.create(
          kids.map((kid) => {
            return {
              award: award.id,
              kid: kid.id
            }
          })
        ).then(() => {
          res.status(201).json(award)
        })
      })
    })
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Award.findOneAndDelete({ tutor: req.user.id, _id: req.params.id })
    .then(award => {
      if (!award) {
        throw createError(404, 'Awards not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}
