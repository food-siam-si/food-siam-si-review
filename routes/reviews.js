const Review = require("../models/review");
const express = require("express");
const router = express.Router();

const { producer } = require("../client/kafka");

//viewRestaurantReview()
router.get("/:restaurantId", async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurantId: req.params.restaurantId,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//createRestaurantReview()
router.post("/", async (req, res) => {
  const review = new Review({
    userId: req.body.userId,
    restaurantId: req.body.restaurantId,
    description: req.body.description,
    rate: req.body.rate,
  });

  try {
    await producer.connect()

    const newReview = await review.save();

    const averageScore = await Review.aggregate([
      { $match: { restaurantId: req.body.restaurantId } },
      { $group: { _id: "$restaurantId", averageScore: { $avg: "$rate" } } },
    ]);
    
    await producer.send({
      topic: "review",
      messages: [
        {
          value: JSON.stringify(newReview),
        },
      ],
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
