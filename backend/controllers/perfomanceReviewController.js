import PerformanceReview from "../models/perfomanceReview.js";

// Get all performance reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await PerformanceReview.find()
      .populate("reviewee")
      .populate("assignedReviewers");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new performance review
const createReview = async (req, res) => {
  try {
    const review = new PerformanceReview(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing performance review
const updateReview = async (req, res) => {
  try {
    const review = await PerformanceReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllReviews, createReview, updateReview };
