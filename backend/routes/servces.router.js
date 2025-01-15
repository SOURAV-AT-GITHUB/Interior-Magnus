const express = require("express");
require("dotenv").config();
const {
  database,
  databaseBasePath,
  storageBucket,
  storageBasePath,
} = require("../config/firebase.config");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const servicesRouter = express.Router();

servicesRouter.post("/all-categories", async (req, res) => {
  const { column } = req.body;
  const { service } = req.body;
  if ((+column !== 1 && +column !== 2 && +column !== 3) || !service) {
    res
      .status(400)
      .json({ message: `Invalid request body, ${(column, service)}` });
  } else {
    try {
      const newServiceRef = database
        .ref(`${databaseBasePath}/services/all-categories`)
        .push();
      await newServiceRef.set({ column, service });
      res
        .status(201)
        .json({ message: `${service} added to column- ${column}`,data:{id:newServiceRef.key,column,service} });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error, please try again." });
    }
  }
});
servicesRouter.get("/all-categories", async (req, res) => {
  try {
    const servicesRef = database.ref(
      `${databaseBasePath}/services/all-categories`
    );
    const snapshot = await servicesRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Services are unavailable" });
    } else {
      const allColumns = Object.entries(snapshot.val()).map(([id, ele]) => ({
        id,
        ...ele,
      }));
      const column1 = allColumns.filter((ele) => ele.column === 1);
      const column2 = allColumns.filter((ele) => ele.column === 2);
      // const column3 = allColumns.filter((ele) => ele.column === 3);
      res.send({
        messsage: "Request resolved",
        data: [
          [...column1],
          [...column2],
          // [...column3]
        ],
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again!!" });
  }
});
servicesRouter.patch("/all-categories/:id", async (req, res) => {
  const { id } = req.params;
  const { column, service } = req.body;
  if (typeof column !== "number" && typeof service !== "string") {
    res.status(400).json({ message: "Invalid request body" });
  } else {
    let updatedData = { column, service };
    try {
      await database
        .ref(`${databaseBasePath}/services/all-categories/${id}`)
        .update(updatedData);
      res.json({ message: "Service updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again." });
    }
  }
});
servicesRouter.delete("/all-categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database
      .ref(`${databaseBasePath}/services/all-categories/${id}`)
      .remove();
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

servicesRouter.get("/categories/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const categoryRef = database.ref(
      `${databaseBasePath}/services/${category}`
    );
    const snapshot = await categoryRef.once("value");
    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ message: `${category} is not a valid category` });
    } else {
      const { title, description, images } = snapshot.val();
      const data = { title, description, images };
      if (images) {
        let structuredImages = Object.entries(images).map(([id, rest]) => ({
          id,
          ...rest,
        }));
        data.images = structuredImages;
      } else {
        data.images = [];
      }
      return res.json({ message: "Request resolved", data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
});

servicesRouter.post("/categories/:category",upload.single("file"),
  async (req, res) => {
    const { category } = req.params;
    const file = req.file;

    const { title, size } = req.body;
    const date = Date.now();
    if (!file || !title) {
      return res
        .status(400)
        .json({ message: "Please provide a valid image and title" });
    } else {
      try {
        const storagePath = `${storageBasePath}/services/${category}/${file.originalname}-${date}`;
        const fileUpload = storageBucket.file(storagePath);
        await fileUpload.save(file.buffer, {
          contentType: file.mimetype,
        });
        const url = await fileUpload.getSignedUrl({
          action: "read",
          expires: "03-01-2100",
        });
        try {
          const imageData = { date, storagePath, image: url[0], title };
          if (size) {
            imageData.size = size;
          }
          const imageRef = database
            .ref(`${databaseBasePath}/services/${category}/images`)
            .push();
          await imageRef.set(imageData);
          return res.status(201).json({ message: "Image added" });
        } catch (error) {
          return res.status(500).json({
            message:
              "Internal server error, while adding image ref to database",
          });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal server error, while uploading image" });
      }
    }
  }
);
module.exports = servicesRouter;
