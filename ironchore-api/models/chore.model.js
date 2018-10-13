const mongoose = require("mongoose");

const choresSchema = new mongoose.Schema(
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

choresSchema.virtual('homeworks', {
  ref: 'Homework',
  localField: '_id',
  foreignField: 'chore',
  options: { sort: { createdAt: -1 } }
});

const Chores = mongoose.model("Chores", choresSchema);
module.exports = Chores;
