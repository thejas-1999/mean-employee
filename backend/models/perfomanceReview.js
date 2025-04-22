import mongoose from "mongoose";
const feedbackSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const performanceReviewSchema = new mongoose.Schema(
  {
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    assignedReviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: Date,
    feedback: [feedbackSchema],
  },
  { timestamps: true }
);

const PerformanceReview = mongoose.model(
  "PerformanceReview",
  performanceReviewSchema
);
export default PerformanceReview;
