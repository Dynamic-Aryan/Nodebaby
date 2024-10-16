const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //extract jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};


//function to generate jwt token
const generateToken=(userData)=>{
    //generate a new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware,generateToken};
