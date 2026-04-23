import express from "express";
import {
  getAllStudySessions,
  createStudySession,
  getTotalStudyMinutesByCourse,
} from "../controllers/studySessionController.js";

const router = express.Router();

router.get("/", getAllStudySessions);
router.post("/", createStudySession);
router.get("/stats/total-by-course", getTotalStudyMinutesByCourse);

export default router;