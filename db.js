const mongoose = require("mongoose");

//define url
const mongoURL = "mongodb://localhost:27017/hotels"; //replacing database with the name

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//define event listeners

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongodb server");
});

db.on("error", (err) => {
  console.log(" Mongodb connection error", err);
});

db.on("disconnected", () => {
  console.log("  Mongodb disconnected");
});

//export database connection
module.exports=db;

