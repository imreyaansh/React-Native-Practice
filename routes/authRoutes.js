const express = require('express')
const mongoose = require('mongoose')

//jsonwebtoken is library to generate JSON-web-token
const jwt = require('jsonwebtoken')
const {jwtKey} = require('../key')

//create router for signup and signin
const router = express.Router();

//fetch all things from User.js
const User= mongoose.model('User');

router.post('/signup',async(req, res)=>{
    //receive data from signup screen in req.body
    console.log(req.body)

    const {name,email,password,gender} = req.body;
    //store data in variable form
    
    try{
        const user = new User({name,email,password,gender});
        //store data in one object
        
        await user.save();
        //store data in mongodb......
        
        const token = jwt.sign({userId:user._id}, jwtKey)
        //fetch _id column and store using json-web-token format in varible
        
        //send token as response
        res.send({token})
    }catch(err) {
    
        //catch will send with status 422 as response
        res.status(422).send(err.message);
    
    }
})

router.post('/signin',async (req,res)=>{
    //receive data from signup screen in req.body

    const {email,password} = req.body
    //store data in variable form

    //check password or user name are blank or not
    if(!email || !password){
        return res.status(422).send({error:"must privide data"})
    }

    //fetch row from database
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error:"must privide data"})
    }
    try {
        
        //call comparePassword in User.js for compare password
        await user.comparePassword(password)

        //fetch _id column and store using json-web-token format in varible
        const token = jwt.sign({userId:user._id}, jwtKey)
        
        //send token as response 
        res.send({token}) 
    }catch(err) {
        res.status(422).send({error:"must privide data"});
    }
})


module.exports = router