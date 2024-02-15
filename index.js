const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { mongoDbConnect } = require("./connect");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT || 8000;

mongoDbConnect("mongodb://127.0.0.1:27017/blogosphere")
  .then(() => console.log("db connection sucsessful"))
  .catch((err) => console.log("error in db conneciton\n\n", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
