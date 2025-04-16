import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 5000;
const mongUri = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

mongoose
  .connect(mongUri)
  .then(console.log(`server is connected in to mongodb`))
  .catch((err) => {
    console.log(`failed to connect ${err}`);
  });
app.listen(port, () => {
  console.log(`server is connected on http://localhost:${port}`);
});
