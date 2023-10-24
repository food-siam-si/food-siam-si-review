const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  restaurantId: {
    type: Number,
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
