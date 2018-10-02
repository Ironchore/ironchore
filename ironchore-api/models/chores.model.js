const mongoose = require('mongoose');

const choresSchema = new mongoose.Schema({
  title : {
    type: String,
    required: 'The title is required'
  },
  avatar : {
    type: String,
    required: 'The avatar is required'
  },
  description: {
    type: String,
    required:'the description is required'
  },
  points:{
    type: Number,
    required: 'The Points is required'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `needs a User`]
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