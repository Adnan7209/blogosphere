const express = require("express");
const upload = require("../utils/coverImageUpload");
const Blog = require("../models/blog");

const router = express.Router();

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    });
});

router.post('/',upload.single("coverImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const {title,body} = req.body;
    Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`,
    });
    return res.redirect(`/`);
})

router.get("/:id",async(req,res)=> {
    const blog = await Blog.findById(req.params.id);
    return res.render('blog',{
        user:req.user,
        blog,
    });    
});

module.exports = router;