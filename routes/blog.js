const express = require("express");
const upload = require("../utils/coverImageUpload");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = express.Router();

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, body } = req.body;
  Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  console.log(req.body);
  const comment = Comment.create({
    content: req.body.addComment,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  console.log("comment createad");
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
