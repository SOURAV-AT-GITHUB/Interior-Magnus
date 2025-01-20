const express = require("express");
const {
    database,
    databaseBasePath,
  } = require("../config/firebase.config");
const verifyToken = require("../middlewares/verifyToken")
const contactusRouter = express.Router();


contactusRouter.get("/:year/:month",verifyToken,async(req,res)=>{
    const {year,month} = req.params
    try {
        const dataRef = database.ref(`${databaseBasePath}/contact_requests/${year}/${month}`)
        const snapshot = await dataRef.once('value')
        if(!snapshot.exists()){
            return res.status(404).json({message:`No requests are there in ${month} ${year}`})
        }else{
            const rawData = snapshot.val()
            const headers = Object.keys(rawData[Object.keys(rawData)[0]])
            const data = [
                headers,
                ...Object.values(rawData).map(requests=>headers.map(header=>requests[header]))
            ]
            res.json({message:"Request resolved",data})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error, please try again!"})
    }
})
module.exports = contactusRouter