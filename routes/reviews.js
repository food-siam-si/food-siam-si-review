const Review = require("../models/review");
const express = require("express");
const router = express.Router();

const { producer } = require("../client/kafka");
const { KAFKA_TOPIC } = require("../config/env");

//viewRestaurantReview()
router.get("/:restaurantId", async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurantId: req.params.restaurantId,
    });

    res.json(reviews.map((review) => ({
      id: review["_id"],
      description: review.description,
      rate: review.rate,
      writtenDate: review.writtenDate,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//createRestaurantReview()
router.post("/", async (req, res) => {
  const existedReview = await Review.findOne({ userId: req.body.userId, restaurantId: req.body.restaurantId })

  if (existedReview) {
    res.status(400).json({ message: "Review already exists" });
    return
  }


  const review = new Review({
    userId: req.body.userId,
    restaurantId: req.body.restaurantId,
    description: req.body.description,
    rate: req.body.rate,
  });

  try {
    await producer.connect()

    const newReview = await review.save();

    const [{ averageScore }] = await Review.aggregate([
      { $match: { restaurantId: req.body.restaurantId } },
      { $group: { _id: "$restaurantId", averageScore: { $avg: "$rate" } } },
    ]);

    await producer.send({
      topic: KAFKA_TOPIC,
      messages: [
        {
          value: JSON.stringify({
            restaurantId: req.body.restaurantId,
            averageScore: averageScore,
          }),
        },
      ],
    });

    const response = {
      id: newReview["_id"],
      userId: newReview.userId,
      restaurantId: newReview.restaurantId,
      description: newReview.description,
      rate: newReview.rate,
      writtenDate: newReview.writtenDate,
    }

    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
