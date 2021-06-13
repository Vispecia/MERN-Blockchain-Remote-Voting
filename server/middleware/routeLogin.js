const {JWT_KEY} = require('../config/keys');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req,res,next)=>{

    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json({error:"You must Logged in"});

    // token inside header will be passed as "Bearer bddbwdxsdckj", we're replacing Bearer_ with empty space which will give us token.
    const token = authorization.replace("Bearer ","");
   
    jwt.verify(token,JWT_KEY,(err,payload)=>{
        if(err) return res.status(401).json({error:"You must Logged in"});

        const {_id} = payload;
        User.findById(_id).then(user=>{
            req.user = user;
            next();
        })
       
    })


}