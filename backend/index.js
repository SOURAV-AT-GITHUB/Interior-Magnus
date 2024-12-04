const express = require("express");
require("dotenv").config();
const cors = require("cors")
const functions = require('firebase-functions');
const PORT = process.env.PORT || 3000;

const portfolioRouter = require("./routes/portfolio.router")
const servicesRouter = require("./routes/servces.router")
const app = express();
app.use(express.json())
app.use(cors())

app.use("/portfolio",portfolioRouter)
app.use("/services",servicesRouter)
app.get("/", (req, res) => {
  res.json({ message: "Server working fine!!" });
});



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

exports.api = functions.https.onRequest(app)