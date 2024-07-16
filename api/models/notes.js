const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: {},
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      require: false,
    },
    tag: {
      type: [],
      require: false,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", noteSchema);
