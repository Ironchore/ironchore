const Prize = require('../models/prize.model');
const createError = require('http-errors');
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
  Prize.find({ kid: req.user.id })
    .then(prize => res.json(prize))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Prize.findOne({ kid: req.user.id, _id: req.params.id })
    .populate('award')
    .populate('kid')
    .then(prize => {
      if (!prize) {
        throw createError(404, 'Prize not found');
      } else {
        res.json(prize);
      }
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const prize = new Prize({
    award: req.params.awardId,
    kid: req.user.id
  });

  prize.save()
    .then(prize => res.status(201).json(prize))
    .catch(error => next(error));
}


module.exports.update = (req, res, next) => {
  Prize.findById(req.params.id)
    .populate('kid')
    .then(prize => {
      console.log(prize);
      if (!prize) {
        throw createError(404, 'Prize not found');
      } else if (prize.kid.tutor == req.user.id) {
        prize.state = req.body.state || 'Award won';
        return prize.save();
      } else {
        throw createError(401, 'Not yours');
      }
    })
    .then(prize => res.json(prize))
    .catch(error => next(error));
}
