const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema(
  {
    chore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chore",
      required: [true, `needs a chore`]
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

const Homework = mongoose.model("Homework", homeworkSchema);
module.exports = Homework;
