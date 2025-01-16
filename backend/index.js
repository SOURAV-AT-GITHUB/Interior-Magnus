const express = require("express");
require("dotenv").config();
const cors = require("cors")

const PORT = process.env.PORT || 3000;

const portfolioRouter = require("./routes/portfolio.router")
const servicesRouter = require("./routes/servces.router")
const authRouter = require("./routes/auth.router")
const app = express();
app.use(express.json())
app.use(cors())

app.use("/portfolio",portfolioRouter)
app.use("/services",servicesRouter)
app.use('/admin',authRouter)
app.get("/", (req, res) => {
  res.json({ message: "Server working fine!!" });
});



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));