const express = require('express');

const router = express.Router();

const Hotel = require("../model/hotels.model");
const hotels = require("../Data/hotels");

router.route("/").post(async (req, res) => {
  console.log(req.body)
  try {
    await Hotel.deleteMany({});
    const hotelDataInDB = await Hotel.insertMany(hotels.data);
    res.json(hotelDataInDB);
  } catch (error) {
    console.log(error);
    res.json({message :"could not connect to db"})
  }
});

module.exports = router;
 