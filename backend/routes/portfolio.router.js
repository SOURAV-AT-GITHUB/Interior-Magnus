const express = require("express");
const portfolioRouter = express.Router();
const axios = require("axios");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
// const drive = require("../extra_learnings/drive.config");
const cloudinary = require("../config/cloudinary.config");
const checkPortfolioCategory = require("../middlewares/checkPortfolioCategory");
const BASE_URL = process.env.BASE_URL;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { category } = req.params;
    const date = Date.now();
    req.date = date;
    cb(null, `${file.originalname}-${category}-${date}`);
  },
});
const upload = multer({ storage });
portfolioRouter.get("/:category", checkPortfolioCategory, async (req, res) => {
  const { category } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/portfolio/${category}.json`);
    res.json({
      message: "Request resolved",
      data: [
        ...Object.entries(response.data).map(([id, element]) => ({
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
  upload.single("file"),
  async (req, res) => {
    const { category } = req.params;
    if (!req.file) {
      res
        .status(400)
        .json({ message: "Please provide a valid image in request body" });
    } else {
      const filePath = req.file.path;
      await cloudinary.uploader.upload(filePath, async (response) => {
        if (response.error) {
          res
            .status(500)
            .send({ message: "Error uploading file: ", error: response.error });
        } else {
          try {
            const { public_id, url } = response;
            const date = req.date;
            await axios.post(`${BASE_URL}/portfolio/${category}.json`, {
              public_id,
              image: url,
              date,
            });
            res.json({
              message: `Image added to ${category}'s portfolio`,
              data: {
                public_id,
                image: url,
                date,
              },
            });
          } catch (error) {
            res.status(500).json({
              message: `Image uploaded to cloudinary but error while stroing reference in database`,
            });
          } finally {
            fs.unlinkSync(filePath);
          }
        }
      });

      // } catch (error) {
      //   console.error(error);
      //   res.status(500).send("Error uploading file: " + error.message);
      // }
    }
  }
);
portfolioRouter.delete(
  "/:category/:id",
  checkPortfolioCategory,
  async (req, res) => {
    const { category, id } = req.params;
    try {
      const response = await axios.get(
        `${BASE_URL}/portfolio/${category}/${id}.json`
      );
      if (!response.data) {
        res
          .status(404)
          .json({ message: `No data found associated with ${id}` });
      } else {
        const { public_id } = response.data;
        try {
          const cloudinaryResponse = await cloudinary.uploader.destroy(
            public_id
          );
          if (cloudinaryResponse.result === "ok") {
            await axios.delete(`${BASE_URL}/portfolio/${category}/${id}.json`);
            res.json({ message: "Deleted successfully" });
          } else {
            res.status(500).json({ message: "Failed to delete image" });
          }
        } catch (error) {
          res.status(500).json({
            message: "Internal Server error while deleting, please try again.",
          });
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
