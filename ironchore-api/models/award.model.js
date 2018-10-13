const mongoose = require("mongoose");

const awardsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"]
    },
    goal: {
      type: Number,
      required: "The goal is required"
    },
    images: {
      type: [String],
      defualt: []
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, `needs an tutor`]
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

const Award = mongoose.model("Award", awardsSchema);
module.exports = Award;
