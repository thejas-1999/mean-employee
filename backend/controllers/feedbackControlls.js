import Feedback from "../models/feedbackModel.js";
import PerformanceReview from "../models/perfomanceReview.js";

const getFeedbackForReview = async () => {
  try {
    const feedback = await Feedback.find({
      review: req.params.reviewId,
    }).populate("reviewer");
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
};

const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    // Optional: mark review as completed if all feedback is received
    const totalFeedbacks = await Feedback.countDocuments({
      review: req.body.review,
    });
    const review = await PerformanceReview.findById(req.body.review);
    if (review && totalFeedbacks >= review.assignedReviewers.length) {
      review.status = "completed";
      await review.save();
    }

    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getFeedbackForReview, submitFeedback };
