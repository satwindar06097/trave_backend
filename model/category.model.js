const mongoose = require("mongoose");
const {Schema}= require('mongoose');

const categorySchema = new Schema({
  category: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
