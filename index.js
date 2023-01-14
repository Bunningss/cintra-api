const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Route Imports
const authRoute = require("./Routes/auth");
const productRoute = require("./Routes/products");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Route Declarations
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);

const PORT = process.env.PORT || 8000;

// Connect DB
mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("Database Connection Established");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
