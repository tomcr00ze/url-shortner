// In this file we will be defining a URL schema with mongoose
// this object will let us save the URL object to the MongoDB database and perform other queries.
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String,
    },
  id: {
    required: true,
    type: String
    }
});

const URL = mongoose.model("URL", urlSchema);

export default URL;