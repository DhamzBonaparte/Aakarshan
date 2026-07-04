const express = require("express");
const routes = require("./Routes/route");
const connect = require("./Database/db");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://aakarshann.netlify.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
