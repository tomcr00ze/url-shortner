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
app.use(express.URLencoded({ extended: true }));

// This line helps us server static files in the public folder.
// Here we'll write our CSS and browser javascript code
app.use(express.static(__dirname + "/public"));

app.listen(8000, () => {
  console.log("App listening on port 8000");
});