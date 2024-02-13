const express = require('express');
const User = require("../models/user");

const router = express.Router();

router.get('/signup',(req,res)=>{
    return res.render('signup');

});

router.post('/signup',async (req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('/');
})


router.get('/login',(req,res)=>{
    return res.render('login');

})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user=await User.matchPassword(email,password);
    
    console.log('User',user);
    return res.redirect('/');
})


module.exports = router;