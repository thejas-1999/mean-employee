import express from "express";
import {
  getAllReviews,
  createReview,
  updateReview,
} from "../controllers/perfomanceReviewController.js";

const router = express.Router();

// Admin: GET all performance reviews
router.get("/get", getAllReviews);

// Admin: POST create a performance review
router.post("/add", createReview);

// Admin: PUT update a performance review
router.put("/update/:id", updateReview);

export default router;
