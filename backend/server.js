require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { logger } = require("./middleware/logger");
const cors = require("cors");
const connectDB = require("./config/connectDB");

const app = express();
const PORT = process.env.PORT;
const ENV = process.env.ENV;

connectDB();

app.use(cors());

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to Digiflake backend.</a>.`);
});

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${ENV} environment`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
