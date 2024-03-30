// We imported the libraries we installed earlier and some core modules from Nodejs.
import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import urlExist from "url-exist";
import URL from "./models/urlModel.js";

const __dirname = path.resolve();

dotenv.config();

// Initialized and created a new server with Express.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This line helps us server static files in the public folder.
// Here we'll write our CSS and browser javascript code
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGO_DB_URI, (err) => {
  if (err) {
    throw err;
    console.log(err)
  }
  console.log("Database connected successfully");
});

// Middleware to validate url
const validateURL = async (req, res, next) => {
  const { url } = req.body;
  const isExist = await urlExist(url);
  if (!isExist) {
    return res.json({ message: "Invalid URL", type: "failure" });
  }
  next();
};

// home page route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");

});

// get original link by id (shorten link)
app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const originalLink = await URL.findOne({ id });

  if (!originalLink) {
    return res.sendFile(__dirname + "/public/404.html");
  }
  res.redirect(originalLink.url);
});

app.listen(8000, () => {
  console.log("App listening on port 8000");
});