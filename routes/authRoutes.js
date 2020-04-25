const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtKey} = require('../key')
const router = express.Router();
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
        res.send({token})
    }catch(err) {
        //catch will send with status 422 as response
        res.status(422).send(err.message);
    }
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error:"must privide data"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error:"must privide data"})
    }
    try {
        await user.comparePassword(password)
        const token = jwt.sign({userId:user._id}, jwtKey)
        res.send({token}) 
    }catch(err) {
        console.log()
        res.status(422).send({error:"must privide data"});
    }
})


module.exports = router