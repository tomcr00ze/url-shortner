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

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
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

// route to post original url(long)
// it will create a shorurl corresponding to the long url given.
app.post("/link", validateURL, (req, res) => {
  
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
});
  const { url } = req.body;

  // Generate a unique id to identify the url in the database
  let id = nanoid(7);

  let newURL = new URL({ url, id });
  try {
    newURL.save();
  } catch (err) {
    res.send("An error was encountered! Please try again.");
  }
  const domain = process.env.PRODUCTION_URL || 'http://localhost:8000/'
  // Send the server address with the unique id
  res.json({ message: `${domain}${newURL.id}`, type: "success" });
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