const mongoose = require('mongoose');

const awardsSchema = new mongoose.Schema({
  titleAwards: {
    type: String,
    required: [true, 'The title is required']
  },
  awardsPoints:{
    type: Number,
    required: 'The Points is required'
  },
  images: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `needs an user`]
  }
});
  //timestamps: true,
 
  
const awards = mongoose.model('awards', awardsSchema);
module.exports = awards;

