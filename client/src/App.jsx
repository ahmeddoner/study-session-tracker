import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const API = "http://localhost:5000/api";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("");

  const [session, setSession] = useState({
    userId: "",
    course: "",
    date: "",
    durationMinutes: "",
    topic: "",
    focusLevel: "",
  });

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get(`${API}/courses`);
    setCourses(res.data);
  };

  const fetchSessions = async () => {
    const res = await axios.get(`${API}/study-sessions`);
    setSessions(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchSessions();
  }, []);

  const addUser = async () => {
    try {
      const res = await axios.post(`${API}/users`, { name, email });
      alert(`User created: ${res.data.name}`);
      setName("");
      setEmail("");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Error creating user");
    }
  };

  const addCourse = async () => {
    try {
      const res = await axios.post(`${API}/courses`, {
        courseName,
        difficulty: 3,
        hasExam: true,
        hasSeminar: false,
      });

      alert(`Course created: ${res.data.courseName}`);
      setCourseName("");
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.error || "Error creating course");
    }
  };

  const addSession = async () => {
    try {
      const res = await axios.post(`${API}/study-sessions`, {
        userId: session.userId,
        course: session.course,
        date: session.date,
        durationMinutes: Number(session.durationMinutes),
        topic: session.topic,
        focusLevel: Number(session.focusLevel),
      });

      alert(`Session added: ${res.data.topic}`);

      setSession({
        userId: "",
        course: "",
        date: "",
        durationMinutes: "",
        topic: "",
        focusLevel: "",
      });

      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.error || "Error creating session");
    }
  };

  const totalTime = sessions.reduce(
    (acc, s) => acc + (Number(s.durationMinutes) || 0),
    0
  );

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Study Session Tracker</h1>

      <h2>Add User</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={addUser}>Add User</button>

      <h3>Users</h3>
      {users.map((u) => (
        <div key={u._id}>{u.name} - {u.email}</div>
      ))}

      <h2>Add Course</h2>
      <input placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
      <button onClick={addCourse}>Add Course</button>

      <h3>Courses</h3>
      {courses.map((c) => (
        <div key={c._id}>{c.courseName} | Difficulty: {c.difficulty}</div>
      ))}

      <h2>Add Study Session</h2>

      <select
        value={session.userId}
        onChange={(e) => setSession({ ...session, userId: e.target.value })}
      >
        <option value="">Select user</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>

      <select
        value={session.course}
        onChange={(e) => setSession({ ...session, course: e.target.value })}
      >
        <option value="">Select course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>{c.courseName}</option>
        ))}
      </select>

      <input
        type="date"
        value={session.date}
        onChange={(e) => setSession({ ...session, date: e.target.value })}
      />

      <input
        placeholder="Topic"
        value={session.topic}
        onChange={(e) => setSession({ ...session, topic: e.target.value })}
      />

      <input
        type="number"
        placeholder="Duration minutes"
        value={session.durationMinutes}
        onChange={(e) => setSession({ ...session, durationMinutes: e.target.value })}
      />

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Focus level 1-5"
        value={session.focusLevel}
        onChange={(e) => setSession({ ...session, focusLevel: e.target.value })}
      />

      <button onClick={addSession}>Add Session</button>

      <h3>Sessions</h3>
      {sessions.map((s) => (
        <div key={s._id}>
          {s.topic || "No topic"} | {s.durationMinutes || 0} min | Focus: {s.focusLevel}
        </div>
      ))}

      <h2>Total Study Time: {totalTime} minutes</h2>
    </div>
  );
}