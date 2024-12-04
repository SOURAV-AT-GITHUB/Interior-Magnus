const express = require("express");
require("dotenv").config();
const axios = require("axios");

const BASE_URL = process.env.BASE_URL;
const servicesRouter = express.Router();

servicesRouter.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/services.json`);
    const allColumns = Object.entries(response.data).map(([id,ele])=>({id,...ele}))
      const column1 = allColumns.filter((ele)=>ele.column===1)
      const column2 = allColumns.filter((ele)=>ele.column===2)
      const column3 = allColumns.filter((ele)=>ele.column===3)
      
    res.send({ messsage: "Request resolved",data:[[...column1],[...column2],[...column3]]});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again!!" });
  }
});
servicesRouter.post("/", async (req, res) => {
  const { column } = req.body;
  const { service } = req.body;
  if ((+column !== 1 && +column !== 2 && +column !== 3) || !service) {
    res
      .status(400)
      .json({ message: `Invalid request body, ${(column, service)}` });
  } else {
    try {
      const response = await axios.post(`${BASE_URL}/services.json`, {
        column,
        service,
      });

      res
        .status(201)
        .json({ message: `${service} added to column- ${column}` });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error, please try again." });
    }
  }
});
servicesRouter.delete("/:id",async(req,res)=>{
  const {id} = req.params
  try {
    await axios.delete(`${BASE_URL}/services/${id}.json`)
    res.json({message:"Deleted"})
  } catch (error) {
    res.status(500).json({message:"Failed to delete"})
  }
})
servicesRouter.patch("/:id",async (req,res)=>{
  const {id} = req.params
  const {column , service} = req.body
  if(typeof(column)!=='number' && typeof(service) !== "string"){
    res.status(400).json({message:"Invalid request body"})
  }else{
    let updatedData ={};
    if(column) updatedData.column = column
    if(service) updatedData.service = service
    try {
      await axios.patch(`${BASE_URL}/services/${id}.json`,updatedData)
      res.json({message:"Service updated"})

    } catch (error) {

      
      res.status(500).json({message:"Something went wrong, please try again."})
    }
  }
})
module.exports = servicesRouter;
