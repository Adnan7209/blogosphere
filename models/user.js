const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:'/images/default.png',
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User",
    }
},{timestamps:true});

const User = mongoose.model("user",userSchema);