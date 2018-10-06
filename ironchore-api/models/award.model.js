const mongoose = require("mongoose");

const awardsSchema = new mongoose.Schema(
  {
    titleAwards: {
      type: String,
      required: [true, "The title is required"]
    },
    awardsPoints: {
      type: Number,
      required: "The Points is required"
    },
    images: {
      type: [String],
      default: []
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, `needs an user`]
    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
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
