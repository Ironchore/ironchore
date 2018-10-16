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
    chore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chore",
    },

    points: {
      type: Number,
      required: "The Points is required"
    },

    state: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    kid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;

        if (!ret.chores) {
          ret.chores = [];
        }


        return ret;
      }
    }
  }
);

awardsSchema.virtual('chores', {
  ref: 'chore',
  localField: '_id',
  foreignField: 'chore',
  options: { sort: { createdAt: -1 } }
});
const Awards = mongoose.model("Awards", awardsSchema);
module.exports = Awards;

