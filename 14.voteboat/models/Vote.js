const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },

  options: [
    {
      option: {
        type: String,
        trim: true,
      },
      counts: {
        type: Number,
        default: 0,
      },
    },
  ],

  expired_at: {
    type: Date,
    default: Date.now,
    required: [true, "Expired Date is required"],
  },

  is_progressing: {
    type: Boolean,
    default: true,
    required: [true, "Is progressing?"],
  },

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Vote", VoteSchema);
