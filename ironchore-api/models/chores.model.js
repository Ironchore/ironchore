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

  // Recogido de intener pero no tengo muy claro para que sirve 
  //timestamps: true,
  //toJSON: {
    //transform: (doc, ret) => {
      //ret.id = doc._id;
      //delete ret._id;
      //delete ret.__v;      
      //return ret;


const chores = mongoose.model('Comment', commentSchema);
module.exports = chores;