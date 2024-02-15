const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);

    // console.log('User',user);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("login", { error: "incorrect passowrd" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
