const mongoose = require("mongoose");

const choreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "The title is required"
    },
    description: {
      type: String
    },
    points: {
      type: Number,
      required: "The Points is required"
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;

        if (!ret.homeworks) {
          ret.homeworks = [];
        }

        return ret;
      }
    }
  }
);

choreSchema.virtual('homeworks', {
  ref: 'Homework',
  localField: '_id',
  foreignField: 'chore',
  options: { sort: { createdAt: -1 } }
});

const Chore = mongoose.model("Chore", choreSchema);

module.exports = Chore;