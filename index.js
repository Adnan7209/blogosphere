const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get('/',(req,res)=> {
    return res.render('home');
})

app.listen(PORT,() => console.log(`server is running on port ${PORT}`));