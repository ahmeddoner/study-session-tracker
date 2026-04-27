import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const API = "http://localhost:5000/api";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("");

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  // ADD USER
  const addUser = async () => {
    try {
      const res = await axios.post(`${API}/users`, { name, email });

      alert(`User created: ${res.data.name}`);

      setName("");
      setEmail("");

      fetchUsers();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Error creating user");
    }
  };

  // ADD COURSE ✅ FIXED
  const addCourse = async () => {
    try {
      const res = await axios.post(`${API}/courses`, {
        courseName: courseName,
        difficulty: 3,
        hasExam: true,
        hasSeminar: false,
      });

      alert(`Course created: ${res.data.courseName}`);

      setCourseName("");

      fetchCourses();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Error creating course");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Study Session Tracker</h1>

      {/* ADD USER */}
      <h2>Add User</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      {/* USERS LIST */}
      <h3>Users</h3>
      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.email}
        </div>
      ))}

      {/* ADD COURSE */}
      <h2>Add Course</h2>
      <input
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <button onClick={addCourse}>Add Course</button>

      {/* COURSES LIST ✅ FIXED */}
      <h3>Courses</h3>
      {courses.map((c) => (
        <div key={c._id}>
          {c.courseName} | Difficulty: {c.difficulty}
        </div>
      ))}
    </div>
  );
}