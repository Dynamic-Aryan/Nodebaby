const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello babloo");
});

//Import the router files
const personRoutes = require("./routes/personRoutes.js");
const menuItemRoutes = require("./routes/menuItemRoutes.js");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(3000, () => {
  console.log("listing on port 3000");
});
