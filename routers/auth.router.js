const express = require('express')
const router= express.Router();
const  CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const User = require('../model/user.model')

router.route("/register").post(async(req,res)=>{
    try {

        const newUser = new User ( {
            username:req.body.username,
            number: req.body.number,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString()
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
         
    } catch (error) {
        res.status(500).json({message :"error in creating user"})
        
    }
})


router.route('/login')
.post(async(req,res) =>{
    try {
        const user = await User.findOne({number:req.body.number})
        !user&& res.status(401).json({message:"Incorrect Mobile Number"})

        const decodedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8)
        decodedPassword !== req.body.password&& res.status(401).json({message:"Incorrect Password"})

        const {password,...rest} = user._doc;
        const token = jwt.sign({ username:user.username },process.env.ACCESS_TOKEN );
        res.json({...rest,token})
        
    } catch (error) {
        console.log(error)
        
    }
})

module.exports = router;
