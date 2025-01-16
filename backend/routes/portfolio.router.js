const express = require("express");
const portfolioRouter = express.Router();

require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
const {database,storageBucket,databaseBasePath,storageBasePath} = require('../config/firebase.config')
const checkPortfolioCategory = require("../middlewares/checkPortfolioCategory");
const verifyToken = require('../middlewares/verifyToken')

const upload = multer({ storage: multer.memoryStorage() });
portfolioRouter.get("/:category", checkPortfolioCategory, async (req, res) => {
  const { category } = req.params;
  try {
    const portfolioRef = database.ref(`${databaseBasePath}/portfolio/${category}`)
    const snapshot = await portfolioRef.once('value')
    if(!snapshot.exists()){
      return res.status(404).json({message:`No portfolio present in ${category} category`})
    }
    res.json({
      message: "Request resolved",
      data: [
        ...Object.entries(snapshot.val()).map(([id, element]) => ({
          id,
          ...element,
        })),
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Error in server, please try again" });
  }
});
portfolioRouter.post(
  "/:category",
  checkPortfolioCategory,
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    const date = Date.now()
    const { category } = req.params;
    const file =req.file
    if (!file) {
    return res
        .status(400)
        .json({ message: "Please provide a valid image in request body" });
    } else {
      try { //try-catch for file uploading
        const storagePath = `${storageBasePath}/portfolio/${category}/${file.originalname}-${date}`
        const fileUpload = storageBucket.file(storagePath)
        await fileUpload.save(file.buffer,{
          metadata:{contentType:file.mimetype}
        })
        const url = await fileUpload.getSignedUrl({
          action:'read',
          expires:"03-01-2100",
        })
        try { //trt-catch for image deatils storing
          const imageData = {date,image:url[0],storagePath}
          const imageRef = database.ref(`${storageBasePath}/portfolio/${category}`).push()
          await imageRef.set(imageData)
          res.status(201).json({message:"Image added",data:{id:imageData.key,...imageData}})
        } catch (error) {
          return res.status(500).json({message:"Error while saving image info to databse"})
        }

      } catch (error) {

        return res.status(500).json({message:"Error while uploading image"})
      }
    }
  }
);
portfolioRouter.delete(
  "/:category/:id",
  checkPortfolioCategory,
  verifyToken,
  async (req, res) => {
    const { category, id } = req.params;
    try {
      const imageRef = database.ref(`${databaseBasePath}/portfolio/${category}/${id}`)
      const snapshot = await imageRef.once('value')
      if(!snapshot.exists()){
        return res.status(404).json({message:"Image not found in database"})
      }else{
        try {
          const {storagePath} = snapshot.val()
          const image = storageBucket.file(storagePath)
          await image.delete()
          await imageRef.remove()
          return res.json({message:"Image deleted successfully"})
        } catch (error) {
          return res.status(500).json({message:"Failed to delete image, please try again"})
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server error while finding data, please try again.",
      });
    }
  }
);

module.exports = portfolioRouter;
