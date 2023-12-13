const express = require('express')
const router = express.Router();

const Wishlist = require("../model/wishlist.model")
const verifyUser = require("../middleware/verifyuser")

router.route('/')
.post(verifyUser,async(req,res)=>{
    
    const newWishlist = new Wishlist(req.body);
    try {
        const saveWishlist = await newWishlist.save();
        res.status(201).json(saveWishlist)
        
        
    } catch (error) {
        res.status(501).json({message:"failed add to Wishlist"})
        
    }
})

router.route('/:id')
.delete(verifyUser,async(req,res) =>{
   
    try {
        await Wishlist.findByIdAndDelete(req.params.id)
        res.json({message:"Delete from Wishlist Succesfully"})
        
    } catch(err) {
        res.status(500).json({message:"Unable to delete from wishlist"})
        
    }
})

router.route("/")
.get(verifyUser,async(req,res)=>{
    try {
        const wishlist = await Wishlist.find({})
        wishlist? res.json(wishlist) : res.json({message:"No items Found in the wishlist"})
        
    } catch (err) {
        res.status(501).json({message:"Can not get all Data"})
    }
})
module.exports=router;