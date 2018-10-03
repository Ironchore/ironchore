const mongoose = require('mongoose');

const choresSchema = new mongoose.Schema({
  title : {
    type: String,
    required: 'The title is required'
  },
  description: {
    type: String,
  },
  points:{
    type: Number,
    required: 'The Points is required'
  },
  kid : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kid',
    required: [true, 'Kid  is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `needs a User`]
  },
  award: {
    type: mongoose.Schema.Types.ObjectId,
    default:[]
  }
});

  //timestamps: true,


const chores = mongoose.model('Chores', choresSchema);
module.exports = Chores;



