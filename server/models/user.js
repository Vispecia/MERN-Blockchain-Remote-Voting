const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userType:{
        type:String,
        required:true
    },
    adhaar:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

mongoose.model('User',User);