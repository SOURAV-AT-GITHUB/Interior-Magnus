const express = require("express");
const authRouter = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const { database, databaseBasePath } = require("../config/firebase.config");

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return req.statusCode(400).json({ message: "Inalid request." });
  } else {
    try {
        const snapshot = await database
          .ref(`${databaseBasePath}/admins`)
          .orderByChild("email")
          .equalTo(email)
          .once("value");
        const adminData =snapshot.val()
        if (!adminData) {
          return res.status(404).json({ message: "Invalid email address" })
        } else {
            const admin = Object.values(adminData)[0]
          const match = await  bcrypt.compare(password,admin.password)
          if(!match) {
            return res.status(401).json({message:"Incorrect password"})
          }else{
            const token = jwt.sign(admin,JWT_SECRET,{expiresIn:"1d"})
           return res.json({message:"Login Success!",token})
          }
        }
        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
  }
});



module.exports = authRouter;
