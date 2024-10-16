// sets up passport with a local authentication strategy,, using a person model for use

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person.js");


passport.use(
    new LocalStrategy(async (username, password, done) => {
      //authentication logic here
      try {
        // console.log("Received Credentials:", USERNAME, password);
        const user = await Person.findOne({ username});
        if (!user) return done(null, false, { message: "Incorrect Username." });
  
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (err) {
        return done(error);
      }
    })
  );

  module.exports=passport;