const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  altDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("images", imageSchema);
