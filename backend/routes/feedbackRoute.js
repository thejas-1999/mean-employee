import express from "express";
import {
  getFeedbackForReview,
  submitFeedback,
} from "../controllers/feedbackControlls.js";

const router = express.Router();

// GET feedback for a specific review
router.get("/:reviewId/feedback", getFeedbackForReview);

// POST submit feedback
router.post("/add", submitFeedback);

export default router;
