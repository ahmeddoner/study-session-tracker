# Study Session Tracker

A full-stack study tracker app for managing users, courses, and study sessions.

## Purpose

The app helps students track study sessions, course difficulty, focus level, and total study time.

## Tech Stack

- React / Vite frontend
- Express backend
- MongoDB Atlas database
- Mongoose ODM
- Postman for API testing

## Collections

### Users
Stores student information:
- name
- username
- email
- program

### Courses
Stores course information:
- courseName
- hasSeminar
- hasExam
- difficulty

### Study Sessions
Stores study session data:
- userId
- course
- date
- durationMinutes
- topic
- focusLevel
- notes

## Relationships

StudySession references:
- User by userId
- Course by course

Mongoose populate is used to return readable user and course data.

## Custom Endpoint

GET /api/study-sessions/stats/total-by-course

This endpoint calculates total study minutes grouped by course using MongoDB aggregation.

## Current Status

Completed:
- Backend setup
- MongoDB Atlas connection on stable network
- User API
- Course API
- Study Session API
- Populate user/course relations
- Custom statistics endpoint