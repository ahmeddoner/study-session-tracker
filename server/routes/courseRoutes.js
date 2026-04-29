import express from "express";
import {
  getAllCourses,
  createCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.delete("/:id", deleteCourse);
router.get("/", getAllCourses);
router.post("/", createCourse);

export default router;