const mongoose = require('mongoose');
const createError = require('http-errors');
const Prize = require('../models/prize.model');
const Award = require('../models/award.model');
const User = require('../models/user.model');


module.exports.list = (req, res, next) => {
  Prize.find({ kid: req.user.id })
  .populate('award')
  .populate('kid')
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
        prize.state = req.body.state || 'won';
        return prize.save();
      } else {
        throw createError(401, 'Not yours');
      }
    })
    .then(prize => res.json(prize))
    .catch(error => next(error));
}

module.exports.complete = (req, res, next) => {
  const prizeId = req.params.id;

  Prize.findByIdAndUpdate({_id: prizeId}, {$set: {'state': 'won'}})
  .then(updatedPrize => {
    Award.findById(updatedPrize.award)
    .then(award => {
      User.findByIdAndUpdate({_id: req.user.id}, {$inc: {'points': -award.goal}})
      .then(() => {
        res.json({"message": "Kid has bought award for " + award.goal});
      })
    })
  })
  .catch(err => next(error));
}