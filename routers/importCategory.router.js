const express = require("express");
const router = express.Router();

const Category = require("../model/category.model");
const categories = require("../Data/category");

router.route("/").post(async (req, res) => {
  try {
    await Category.deleteMany({});

    const categoryDataInDB = await Category.insertMany(categories.data);
    res.json(categoryDataInDB);
  } catch (err) {
    console.log(err);
    res.json({message:"can not connect catagory to DB"})
  }
});

module.exports = router;
