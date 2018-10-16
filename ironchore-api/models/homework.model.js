const mongoose = require("mongoose");

const homeWorkSchema = new mongoose.Schema(
  {
    chore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chore",
      required: [true, `needs a chore`]
    },

    title: {
      type: String
    },
    
    state: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    kid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const HomeWork = mongoose.model("Homework", homeWorkSchema);
module.exports = HomeWork;
