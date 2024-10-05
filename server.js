const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport=require('./auth.js');


const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//MIddleware functions
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to: ${req.originalUrl}`
  );
  next(); //move on to the next phase
};
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session: false})
app.get("/",function (req, res) {
  res.send("Hello baby");
});

//Import the router files
const personRoutes = require("./routes/personRoutes.js");
const menuItemRoutes = require("./routes/menuItemRoutes.js");

//Use the routers
app.use("/person", localAuthMiddleware,personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("listing on port 3000");
});
