const mongoose = require('mongoose');

const choresSchema = new mongoose.Schema({
  Title : {
    type: String,
    required: 'The title is required'
  },
  Avatar : {
    type: String,
    required: 'The avatar is required'
  },

  Description: {
    type: String,
    required:'the description is required'
  },
  Points:{
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


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;