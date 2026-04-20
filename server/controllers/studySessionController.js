import StudySession from "../models/StudySession.js";

export const getAllStudySessions = async (req, res) => {
  try {
    const sessions = await StudySession.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch study sessions" });
  }
};

export const createStudySession = async (req, res) => {
  try {
    const newSession = new StudySession(req.body);
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};