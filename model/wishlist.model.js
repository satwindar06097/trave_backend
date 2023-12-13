const mongoose = require('mongoose')
const {Schema} = mongoose;

const wishlistSchema = new Schema({
    hotelId:{type:String,required:true,unique: true}
})

const Wishlist= mongoose.model('Wishlist',wishlistSchema);


module.exports=Wishlist;