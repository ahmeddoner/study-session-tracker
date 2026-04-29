📚 Study Session Tracker

A full-stack web application for managing users, courses, and study sessions.
Built with React, Node.js, and MongoDB.

🔗 GitHub Repository:
https://github.com/ahmeddoner/study-session-tracker.git

🎯 Purpose

This application allows students to:

Track study sessions
Monitor total study time
Organize courses
Evaluate focus levels
Analyze study patterns per course
🛠️ Tech Stack

Frontend

React (Vite)
Axios
Inline CSS styling

Backend

Node.js
Express

Database

MongoDB Atlas
Mongoose ODM

Tools

Postman (API testing)
Git & GitHub
📦 Features

👤 Users
Create users
Delete users
Stores:
name
username
email
program

📘 Courses
Create courses
Delete courses
Stores:
courseName
difficulty (1–5)
hasExam
hasSeminar

🧠 Study Sessions
Create sessions
Update sessions
Delete sessions
Filter by user
Stores:
userId
course
date
durationMinutes
topic
focusLevel
notes

📊 Analytics
Total study time calculation
Study time per course (chart)
Dynamic filtering by user
🔗 Relationships
Each StudySession references:
a User (userId)
a Course (course)

Mongoose .populate() is used to return readable data instead of raw IDs.

🔌 API Endpoints
Users
GET /api/users
POST /api/users
DELETE /api/users/:id
Courses
GET /api/courses
POST /api/courses
DELETE /api/courses/:id
Study Sessions
GET /api/study-sessions
POST /api/study-sessions
PUT /api/study-sessions/:id
DELETE /api/study-sessions/:id

⭐ Custom Endpoint
GET /api/study-sessions/stats/total-by-course
Uses MongoDB aggregation
Returns total study minutes grouped by course

🧩 Architecture
The frontend is structured using reusable components:

UserSection
CourseSection
SessionSection

This improves:

code organization
maintainability
scalability

🎨 UI Features
Clean dark-themed interface
Responsive layout
Real-time data updates (auto refresh)
Interactive buttons (Edit/Delete)
Study time chart visualization

📌 Current Status

✅ Fully functional full-stack application
✅ CRUD operations for all core entities
✅ Working relationships between collections
✅ Real-time UI updates
✅ Data visualization (chart)
✅ Component-based React structure

🚀 How to Run
Backend
cd server
npm install
npm run dev
Frontend
cd client
npm install
npm run dev

📄 Notes
MongoDB Atlas is used for remote database hosting
Ensure .env contains correct connection string
Backend runs on port 5000
Frontend runs on port 5173

💡 Future Improvements
Authentication (login/register)
User-specific dashboards
Advanced charts (weekly/monthly trends)
Notes editing per session
Mobile UI optimization

👨‍💻 Author
Ahmed Altemimi