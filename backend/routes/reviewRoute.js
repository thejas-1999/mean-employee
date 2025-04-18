import express from "express";
import {
  getAllReviews,
  createReview,
  updateReview,
} from "../controllers/perfomanceReviewController.js";

const router = express.Router();

// GET all performance reviews
router.get("/getReviews", getAllReviews);

// POST create a review
router.post("/createReview", createReview);

// PUT update a review
router.put("/updateReview/:id", updateReview);

export default router;
