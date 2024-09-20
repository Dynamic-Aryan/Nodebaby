const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello babloo");
});

//Import the router files
const personRoutes = require("./routes/personRoutes.js");
const menuItemRoutes = require("./routes/menuItemRoutes.js");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);


app.listen(PORT, () => {
  console.log("listing on port 3000");
});
