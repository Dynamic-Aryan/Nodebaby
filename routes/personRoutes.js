const express = require("express");
const Person = require("../models/person");
const router = express.Router();
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

//POST method to add person
router.post("/signup", async (req, res) => {
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

    const payload={
      id:response.id,
      username: response.username,
    }

    const token= generateToken(response.username);
    console.log('Token is :',token);
    res.status(200).json({response:response,token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login route
router.post('/login',async(req,res)=>{
  try{
    //Extract username and password from request body
    const {username,password} = req.body;
   
    //FInd the user by username
    const user = await Person.findOne({username:username});

    //If user does not exist or password does not match, return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid username or pssword'});
    }

    //generate token
    const payload = {
      id:user.id,
      username: user.username
    }
    const token = generateToken(payload);

    res.json({token});
  } catch(err){
    console.error(err);
    res.status(500).json({error:'Internal Server Error'});
  }
});

//GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//paramaterized api call
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter
    const updatedPersonData = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, //run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/:id",async(req,res)=>{
  try{
    const personId = req.params.id;   //extract the persons id from url parameter

    //assuming to have a person model
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message:'Person deleted successfully'});
  } catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
