import express from "express";
import {
  getAllStudySessions,
  createStudySession,
  getTotalStudyMinutesByCourse,
  deleteStudySession,
  updateStudySession,
} from "../controllers/studySessionController.js";

const router = express.Router();

router.get("/", getAllStudySessions);
router.post("/", createStudySession);
router.get("/stats/total-by-course", getTotalStudyMinutesByCourse);
router.put("/:id", updateStudySession);
router.delete("/:id", deleteStudySession);

export default router;