import Feedback from "../models/feedbackModel.js";
import PerformanceReview from "../models/perfomanceReview.js";

// Get all feedback for a performance review
const getFeedbackForReview = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      review: req.params.reviewId,
    }).populate("reviewer");
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit feedback for a review
const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    const totalFeedbacks = await Feedback.countDocuments({
      review: req.body.review,
    });
    const review = await PerformanceReview.findById(req.body.review);

    if (review && totalFeedbacks >= review.assignedReviewers.length) {
      review.status = "completed";
      await review.save();
    }

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getFeedbackForReview, submitFeedback };
