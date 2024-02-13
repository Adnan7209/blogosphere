const express = require("express");
const path = require("path");

const { mongoDbConnect } = require("./connect");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8000;

mongoDbConnect("mongodb://127.0.0.1:27017/blogosphere")
  .then(() => console.log("db connection sucsessful"))
  .catch((err) => console.log("error in db conneciton\n\n", err));

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
