import PerformanceReview from "../models/perfomanceReview.js";
import Employee from "../models/employeeModel.js";

const getAllReviews = async (req, res) => {
  try {
    const reviews = await PerformanceReview.find()
      .populate("reviewee")
      .populate("assignedReviewers");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await PerformanceReview.findById(req.params.id)
      .populate("reviewee")
      .populate("assignedReviewers");

    if (!review) {
      return res.status(404).json({ err: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { reviewee, assignedReviewers } = req.body;

    const review = new PerformanceReview(req.body);
    await review.save();

    for (let reviewerId of assignedReviewers) {
      await Employee.findByIdAndUpdate(reviewerId, {
        $push: { assignedReviews: review._id },
      });
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await PerformanceReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(review);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const addFeedback = async (req, res) => {
  const reviewId = req.params.id;
  const { comments, reviewer } = req.body;

  if (!reviewId || !reviewer || !comments) {
    return res
      .status(400)
      .json({ message: "Review ID, reviewer, and comments are required" });
  }

  const review = await PerformanceReview.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Performance review not found" });
  }

  const isAssigned = review.assignedReviewers.includes(reviewer);
  if (!isAssigned) {
    return res
      .status(403)
      .json({ message: "Reviewer not assigned to this review" });
  }

  const alreadySubmitted = review.feedback.some(
    (fb) => fb.reviewer.toString() === reviewer
  );
  if (alreadySubmitted) {
    return res
      .status(400)
      .json({ message: "You have already submitted feedback" });
  }

  // Add new feedback
  review.feedback.push({
    reviewer,
    comments,
    submittedAt: new Date(),
  });

  // Optional: mark as completed if all reviewers submitted
  if (review.feedback.length === review.assignedReviewers.length) {
    review.status = "completed";
  }

  await review.save();

  res.status(200).json({ message: "Feedback added successfully", review });
};

const getFeedback = async (req, res) => {
  try {
    const reviewId = req.params.id; // Just assign it directly

    const review = await PerformanceReview.findById(reviewId).select(
      "feedback"
    );

    if (!review) {
      return res.status(404).json({ message: "Performance review not found" });
    }

    res.status(200).json({ feedback: review.feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  addFeedback,
  getFeedback,
};
