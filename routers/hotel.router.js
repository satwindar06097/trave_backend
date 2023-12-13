const express = require("express");
const router = express.Router();

const Hotel = require("../model/hotels.model");

router.route("/").get(async (req, res) => {
  const hotelsCategory = req.query.category;
  try {
    let hotels;
    if (hotelsCategory) {
      hotels = await Hotel.find({ category: hotelsCategory });
    } else {
      hotels = await Hotel.find({});
    }

    hotels
      ? res.send(hotels)
      : res.status(404).json({ message: "No Data Find" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
