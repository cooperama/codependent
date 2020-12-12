require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token from auth.js : ", token);
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user._id;
    console.log("jwt.verify, req.userId in auth.js: ", req.userId);
    next();
  });
};

// const generateAccessToken = (user) => {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
// };

module.exports = { authenticateToken };
// module.exports = { authenticateToken, generateAccessToken };
