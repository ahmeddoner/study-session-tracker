import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import studySessionRoutes from "./routes/studySessionRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/study-sessions", studySessionRoutes);

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;

// CONNECT DB + START SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });