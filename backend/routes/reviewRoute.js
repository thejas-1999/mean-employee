import express from "express";
import {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  getFeedback,
  addFeedback,
} from "../controllers/perfomanceReviewController.js";

const router = express.Router();

// Admin: GET all performance reviews
router.get("/get", getAllReviews);

// Admin: GET a specific performance review
router.get("/get/:id", getReviewById);

// Admin: POST create a performance review
router.post("/add", createReview);

// Admin: PUT update a performance review
router.put("/update/:id", updateReview);

// GET feedback for a specific review
router.get("/feedbacks/:id", getFeedback);

// POST submit feedback
// reviewRoutes.js
router.post("/feedbacks/:id", addFeedback);

export default router;
