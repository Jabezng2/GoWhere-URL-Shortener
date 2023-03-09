const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: false,
  },
  origUrl: {
    type: String,
    required: false,
  },
  shortUrl: {
    type: String,
    required: false,
  },
  clicks: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", UrlSchema);