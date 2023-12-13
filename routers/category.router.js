const express= require('express');
const router = express.Router();

const Category = require('../model/category.model')

router.route('/')
.get(async(req,res)=>{

    try {
        const categories = await Category.find({})
        res.json(categories)
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message:"could not get  categorydata"})
        
    }

})

module.exports= router;