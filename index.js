const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");
const dotenv= require('dotenv')

const Port = 3000;



const HotelsDataAddToDB = require("./routers/importData.router");
const HotelCategoryInDB = require("./routers/importCategory.router");
const Userauth = require("./routers/auth.router");
const whislist = require("./routers/wishlist.router")

const categoriesRouter = require("./routers/category.router");
const HotelRouter = require("./routers/hotel.router");
const SingleHotelRouter = require("./routers/singleHotel.router");

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()

connectDB();

app.get("/", (req, res) => {
  res.send("Bloodline....");
});

app.use("/api/hoteldata", HotelsDataAddToDB);
app.use("/api/hotelcategory", HotelCategoryInDB);
app.use("/api/auth", Userauth);
app.use("/api/hotel", HotelRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/hotel", SingleHotelRouter);
app.use('/api/wishlist',whislist)

mongoose.connection.once("open", () => {
  console.log("DB connected successfully....");

  app.listen(process.env.PORT || Port, () => {
    console.log("Hurray, server is up and running");
  });
});
