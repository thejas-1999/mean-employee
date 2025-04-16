import mongoose from "mongoose";

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
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const PerformanceReview = mongoose.model(
  "PerformanceReview",
  performanceReviewSchema
);
export default PerformanceReview;
