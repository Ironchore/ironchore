const Kid = require('../models/kid.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  Kid.find({ user: mongoose.Types.ObjectId(req.params.userId) })
    .then(kids => res.json(kids))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Kid.findById({ user: req.params.userId, _id: req.params.id })
    .populate('user')
    .then(kid => {
      if (!kid) {
        throw createError(404, 'Kid not found');
      } else {
        res.json(kid);
      }
    })
    .catch(error => {
      next(error);
    });
}


module.exports.create = (req, res, next) => {
  const kid = new Kid(req.body);
  kid.user = req.user.id;

  if (req.files) {
    kid.avatar = [];
    for (const file of req.files) {
      kid.avatar.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    }
  }


  kid.save()
    .then(kid => res.status(201).json(kid))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Kid.findOneAndDelete({ user: req.params.userId, _id: req.params.id })
    .then(kid => {
      if (!kid) {
        throw createError(404, 'Kid not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}