const mongoose = require("mongoose");

const noteHistorySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    noteId: {
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NoteHistories", noteHistorySchema);
