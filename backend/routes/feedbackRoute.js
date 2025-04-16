import express from "express";
import {
  getFeedbackForReview,
  submitFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

// GET feedback for a specific review
router.get("/:reviewId", getFeedbackForReview);

// POST submit feedback
router.post("/", submitFeedback);

export default router;
