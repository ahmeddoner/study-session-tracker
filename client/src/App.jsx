import { useEffect, useState } from "react";
import axios from "axios";
import UserSection from "./components/UserSection";
import CourseSection from "./components/CourseSection";
import SessionSection from "./components/SessionSection";

export default function App() {
  const API = "http://localhost:5000/api";

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllData = async () => {
    try {
      setError("");
      const [usersRes, coursesRes, sessionsRes] = await Promise.all([
        axios.get(`${API}/users`),
        axios.get(`${API}/courses`),
        axios.get(`${API}/study-sessions`),
      ]);

      setUsers(usersRes.data);
      setCourses(coursesRes.data);
      setSessions(sessionsRes.data);
    } catch {
      setError("Could not load data. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    const intervalId = setInterval(fetchAllData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        <h1>Loading Study Session Tracker...</h1>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Study Session Tracker</h1>

        {error && <p style={styles.error}>{error}</p>}

        <UserSection API={API} users={users} refresh={fetchAllData} />

        <CourseSection API={API} courses={courses} refresh={fetchAllData} />

        <SessionSection
          API={API}
          users={users}
          courses={courses}
          sessions={sessions}
          refresh={fetchAllData}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "white",
    padding: "40px",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "700px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "600",
  },
  error: {
    background: "#7f1d1d",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
  },
};