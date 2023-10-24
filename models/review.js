const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rate: {
    type: Number,
    required: true,
  },
  writtenDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("review", reviewSchema);
