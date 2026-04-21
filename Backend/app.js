const express = require("express");
const routes = require("./Routes/route");
const connect = require("./Database/db");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path=require('path')

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

const URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    if (await connect(URL)) {
      console.log("Database Connected");
    }
    app.listen(PORT, () => {
      console.log("Server connected!");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
