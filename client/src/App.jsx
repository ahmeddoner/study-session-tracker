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

  const [filterUserId, setFilterUserId] = useState("");

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchSessions();
  }, []);

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

  const addUser = async () => {
    try {
      const res = await axios.post(`${API}/users`, { name, email });
      alert(`User created: ${res.data.name}`);
      setName("");
      setEmail("");
      fetchUsers();
    } catch {
      alert("Error creating user");
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
    } catch {
      alert("Error creating course");
    }
  };

  const addSession = async () => {
    try {
      await axios.post(`${API}/study-sessions`, {
        ...session,
        durationMinutes: Number(session.durationMinutes),
        focusLevel: Number(session.focusLevel),
      });

      alert("Session added");

      setSession({
        userId: "",
        course: "",
        date: "",
        durationMinutes: "",
        topic: "",
        focusLevel: "",
      });

      fetchSessions();
    } catch {
      alert("Error creating session");
    }
  };

  const deleteSession = async (id) => {
    try {
      await axios.delete(`${API}/study-sessions/${id}`);
      fetchSessions();
    } catch {
      alert("Delete failed");
    }
  };

  const getSessionUserId = (s) =>
    typeof s.userId === "object" ? s.userId?._id : s.userId;

  const getSessionCourseName = (s) => {
    if (typeof s.course === "object") return s.course?.courseName;
    const found = courses.find((c) => c._id === s.course);
    return found?.courseName || "Unknown";
  };

  const filteredSessions = filterUserId
    ? sessions.filter((s) => getSessionUserId(s) === filterUserId)
    : sessions;

  const totalTime = filteredSessions.reduce(
    (acc, s) => acc + Number(s.durationMinutes || 0),
    0
  );

  const chartData = courses.map((course) => {
    const minutes = filteredSessions
      .filter((s) =>
        typeof s.course === "object"
          ? s.course?._id === course._id
          : s.course === course._id
      )
      .reduce((acc, s) => acc + Number(s.durationMinutes || 0), 0);

    return { courseName: course.courseName, minutes };
  });

  const maxMinutes = Math.max(...chartData.map((c) => c.minutes), 1);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Study Session Tracker</h1>

        {/* USERS */}
        <Section title="Add User">
          <input style={styles.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button style={styles.button} onClick={addUser}>Add User</button>

          {users.map((u) => (
            <div key={u._id} style={styles.item}>
              {u.name} • {u.email}
            </div>
          ))}
        </Section>

        {/* COURSES */}
        <Section title="Add Course">
          <input style={styles.input} placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          <button style={styles.button} onClick={addCourse}>Add Course</button>

          {courses.map((c) => (
            <div key={c._id} style={styles.item}>
              {c.courseName} • Difficulty: {c.difficulty}
            </div>
          ))}
        </Section>

        {/* SESSION FORM */}
        <Section title="Add Study Session">
          <select style={styles.input} value={session.userId} onChange={(e) => setSession({ ...session, userId: e.target.value })}>
            <option value="">Select user</option>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>

          <select style={styles.input} value={session.course} onChange={(e) => setSession({ ...session, course: e.target.value })}>
            <option value="">Select course</option>
            {courses.map((c) => <option key={c._id} value={c._id}>{c.courseName}</option>)}
          </select>

          <input type="date" style={styles.input} value={session.date} onChange={(e) => setSession({ ...session, date: e.target.value })} />
          <input style={styles.input} placeholder="Topic" value={session.topic} onChange={(e) => setSession({ ...session, topic: e.target.value })} />
          <input type="number" style={styles.input} placeholder="Duration (min)" value={session.durationMinutes} onChange={(e) => setSession({ ...session, durationMinutes: e.target.value })} />
          <input type="number" style={styles.input} placeholder="Focus (1-5)" value={session.focusLevel} onChange={(e) => setSession({ ...session, focusLevel: e.target.value })} />

          <button style={styles.button} onClick={addSession}>Add Session</button>
        </Section>

        {/* FILTER */}
        <Section title="Filter Sessions">
          <select style={styles.input} value={filterUserId} onChange={(e) => setFilterUserId(e.target.value)}>
            <option value="">All users</option>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
        </Section>

        {/* SESSIONS */}
        <Section title="Sessions">
          {filteredSessions.map((s) => (
            <div key={s._id} style={styles.itemRow}>
              <div style={{ flex: 1 }}>
                {s.topic} • {getSessionCourseName(s)} • {s.durationMinutes} min • Focus: {s.focusLevel}
              </div>

              <button style={styles.deleteBtn} onClick={() => deleteSession(s._id)}>
                Delete
              </button>
            </div>
          ))}
        </Section>

        {/* CHART */}
        <Section title="Study Time Chart">
          {chartData
            .filter((c) => c.minutes > 0)
            .map((c) => (
              <div key={c.courseName} style={styles.chartRow}>
                <div>{c.courseName}: {c.minutes} min</div>
                <div style={styles.chartTrack}>
                  <div style={{ ...styles.chartBar, width: `${(c.minutes / maxMinutes) * 100}%` }} />
                </div>
              </div>
            ))}
        </Section>

        <h2 style={styles.total}>Total Study Time: {totalTime} min</h2>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    {children}
  </div>
);

const styles = {
  page: { background: "#0f172a", minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px", color: "white" },
  card: { background: "#1e293b", padding: "30px", borderRadius: "12px", width: "650px" },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "600",
  },

  section: { marginBottom: "28px" },
  sectionTitle: { textAlign: "center", marginBottom: "12px" },

  input: { width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "6px", border: "none", background: "#334155", color: "white" },
  button: { width: "100%", padding: "12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", marginBottom: "10px", cursor: "pointer" },

  item: { background: "#334155", padding: "10px", borderRadius: "6px", marginBottom: "8px", textAlign: "center" },

  itemRow: {
    background: "#334155",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  chartRow: { marginBottom: "12px" },
  chartTrack: { width: "100%", height: "12px", background: "#334155", borderRadius: "999px" },
  chartBar: { height: "100%", background: "#3b82f6", borderRadius: "999px" },

  total: { textAlign: "center", marginTop: "20px", fontSize: "24px" },
};