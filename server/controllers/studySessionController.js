import StudySession from "../models/StudySession.js";

export const getAllStudySessions = async (req, res) => {
  try {
    const sessions = await StudySession.find()
      .populate("userId", "name username email")
      .populate("course", "courseName difficulty");

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

export const getTotalStudyMinutesByCourse = async (req, res) => {
  try {
    const stats = await StudySession.aggregate([
      {
        $group: {
          _id: "$course",
          totalMinutes: { $sum: "$durationMinutes" },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $unwind: "$courseInfo",
      },
      {
        $project: {
          _id: 0,
          courseName: "$courseInfo.courseName",
          totalMinutes: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch study statistics" });
  }
};