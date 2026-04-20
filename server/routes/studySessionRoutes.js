import express from "express";
import {
  getAllStudySessions,
  createStudySession,
} from "../controllers/studySessionController.js";

const router = express.Router();

router.get("/", getAllStudySessions);
router.post("/", createStudySession);

export default router;