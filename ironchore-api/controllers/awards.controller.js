const Award = require('../models/award.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  Award.find({ user: mongoose.Types.ObjectId(req.params.userId) })
    .then(awards => res.json(awards))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Award.findById({ user: req.params.userId, _id: req.params.id })
    .populate('user')
    .then(award => {
      if (!award) {
        throw createError(404, 'awar not found');
      } else {
        res.json(award);
      }
    })
    .catch(error => {
      next(error);
    });
}


module.exports.create = (req, res, next) => {
  const award = new Award(req.body);
  award.user = req.user.id;

  if (req.files) {
    award.image = [];
    for (const file of req.files) {
      award.image.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    }
  }


  Awards.save()
    .then(award => res.status(201).json(award))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Award.findOneAndDelete({ user: req.params.userId, _id: req.params.id })
    .then(award => {
      if (!award) {
        throw createError(404, 'Award not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}