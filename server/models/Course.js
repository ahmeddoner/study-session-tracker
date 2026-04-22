import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    hasSeminar: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasExam: {
      type: Boolean,
      required: true,
      default: true,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);