const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');   /// we need to make a secret key as well to generate a token.
const {JWT_KEY} = require('../config/keys');
const routeLogin = require('../middleware/routeLogin');
const User = mongoose.model('User');

router.post('/signup',(req,res)=>{

    const {userType,adhaar,password} = req.body;
    

    if(!adhaar || !password)
    return res.status(422).json({error:"Please provide all the fields"});

    User.findOne({adhaar})
    .then(user=>{
        if(user)
        return res.status(422).json({error:"User already exist with this adhaar"});
        
        bcrypt.hash(password,12)
        .then(hashedPass=>{

                const newUser = new User({
                    adhaar,
                    password:hashedPass,
                    userType
                });

                newUser.save().then(success=>{
                    res.json({message:"user saved"});
                })
                .catch(err=>{
                    console.log(err);
                })
        })
        
    }).catch(err=>{
        console.log(err);
    })
   
});

router.post('/signin',(req,res)=>{
    const {adhaar,password} = req.body;
    if(!adhaar || !password) return res.status(422).json({error:"Please enter both adhaar and password"});

    User.findOne({adhaar})
    .then(user=>{
        if(!user) return res.status(422).json({error:"Please enter valid adhaar and password"});

        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(422).json({error:"Please enter valid adhaar and password"});

            const token = jwt.sign({_id:user._id},JWT_KEY);
            const {_id,adhaar,userType} = user;
           return res.json({token,user:{
                _id,adhaar,userType
            }});
        })
        .catch(err=>{
            console.log(err);
        })

    })
    .catch(err=>{
        console.log(err);
    })


})


module.exports = router;