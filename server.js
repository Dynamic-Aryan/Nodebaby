const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/person.js");
const MenuItem = require("./models/MenuItem.js");

app.get("/", function (req, res) {
  res.send("Hello babloo");
});

//POST method to add person
app.post("/person", async (req, res) => {
  try {
    const data = req.body; //assumeing resuest body contains data

    // create a new person document using the mongoose model
    const newPerson = new Person(data);

    //as in future what if we get 50 datas,, we can't write them here so we write data in new person document to avoid lengths
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;

    const response = await newPerson.save(); //save the new person to the database
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the person
app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST method to add a Menu Item
app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET method to get the Menu Items
app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("listing on port 3000");
});
