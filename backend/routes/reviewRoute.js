import express from "express";
import {
  getAllReviews,
  createReview,
  updateReview,
} from "../controllers/perfomanceReviewController.js";

const router = express.Router();

// GET all performance reviews
router.get("/", getAllReviews);

// POST create a review
router.post("/", createReview);

// PUT update a review
router.put("/:id", updateReview);

export default router;
