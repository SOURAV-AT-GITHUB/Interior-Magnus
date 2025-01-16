const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (!token) return res.status(401).json({ message: "Please login first." });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Login expired, please login again!" });
    }else{
        next()
    }
  });
};
module.exports = verifyToken;
