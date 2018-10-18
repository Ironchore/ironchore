const mongoose = require("mongoose");

const prizeSchema = new mongoose.Schema(
  {
    award: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Award",
    },
    state: {
      type: String,
      enum: ['pending', 'Award won'],
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

const Prize = mongoose.model("Prize", prizeSchema);
module.exports = Prize;