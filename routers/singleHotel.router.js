const express = require('express')
const router = express.Router();

const Hotel = require('../model/hotels.model');
const { param } = require('./hotel.router');

router.route('/:id')
.get(async(req,res)=>{
    const {id} = req.params;
    try {
        const hotel = await Hotel.findById(id)
        res.json(hotel)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"could not find Hotel"})
        
    }
})

module.exports = router;