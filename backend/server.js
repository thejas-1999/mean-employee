import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT || 5000;
const mongUri = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(mongUri)
  .then(console.log(`server is connected in to mongodb`))
  .catch((err) => {
    console.log(`failed to connect ${err}`);
  });
app.listen(port, () => {
  console.log(`server is connected on http://localhost:${port}`);
});
