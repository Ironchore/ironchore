const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `needs a User`]
  }

});

const chores = mongoose.model('Kid', KidSchema);
module.exports = kid;