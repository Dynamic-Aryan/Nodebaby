const mongoose = require("mongoose");
require('dotenv').config();
//define url
// const mongoURL = "mongodb://localhost:27017/hotels"; //replacing database with the name
const mongoURL = process.env.MONGODB_URL;
// const mongoURL=process.env.MONGODB_URL_LOCAL;


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

