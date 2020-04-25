const mongoose = require('mongoose')
const bcrypt = require('bcrypt') //for decrypt password
//create schema for data will stored in DB and declare type for and requirement for data
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
})
//for decrypt password with hashing we use bcrypt library here  
userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }

    //genSalt will decrypt password and 10 pass will be performed during hash
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err)
            }
            user.password = hash;
            next();
        })
    })
})

//
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise ((resolve,reject)=>{
        bcrypt.compare(candidatePassword, user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })
}

mongoose.model('User', userSchema);