const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: [],
      required: false,
    },
    tag: {
      type: [],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
