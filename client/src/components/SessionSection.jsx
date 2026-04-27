import { useState } from "react";
import axios from "axios";

export default function SessionSection({ API, users, courses, sessions, refresh }) {
  const [filterUserId, setFilterUserId] = useState("");
  const [editingId, setEditingId] = useState("");

  const [session, setSession] = useState({
    userId: "",
    course: "",
    date: "",
    durationMinutes: "",
    topic: "",
    focusLevel: "",
  });

  const getSessionUserId = (s) =>
    typeof s.userId === "object" ? s.userId?._id : s.userId;

  const getSessionCourseName = (s) => {
    if (typeof s.course === "object") return s.course?.courseName || "Unknown";
    return courses.find((c) => c._id === s.course)?.courseName || "Unknown";
  };

  const filteredSessions = filterUserId
    ? sessions.filter((s) => getSessionUserId(s) === filterUserId)
    : sessions;

  const totalTime = filteredSessions.reduce(
    (acc, s) => acc + Number(s.durationMinutes || 0),
    0
  );

  const chartData = courses
    .map((course) => {
      const minutes = filteredSessions
        .filter((s) =>
          typeof s.course === "object"
            ? s.course?._id === course._id
            : s.course === course._id
        )
        .reduce((acc, s) => acc + Number(s.durationMinutes || 0), 0);

      return { courseName: course.courseName, minutes };
    })
    .filter((c) => c.minutes > 0);

  const maxMinutes = Math.max(...chartData.map((c) => c.minutes), 1);

  const saveSession = async () => {
    try {
      const payload = {
        userId: session.userId,
        course: session.course,
        date: session.date,
        durationMinutes: Number(session.durationMinutes),
        topic: session.topic,
        focusLevel: Number(session.focusLevel),
      };

      if (editingId) {
        await axios.put(`${API}/study-sessions/${editingId}`, payload);
      } else {
        await axios.post(`${API}/study-sessions`, payload);
      }

      setSession({
        userId: "",
        course: "",
        date: "",
        durationMinutes: "",
        topic: "",
        focusLevel: "",
      });
      setEditingId("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Error saving session");
    }
  };

  const startEdit = (s) => {
    setEditingId(s._id);
    setSession({
      userId: getSessionUserId(s),
      course: typeof s.course === "object" ? s.course?._id : s.course,
      date: s.date?.slice(0, 10) || "",
      durationMinutes: s.durationMinutes,
      topic: s.topic,
      focusLevel: s.focusLevel,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteSession = async (id) => {
    if (!confirm("Delete this study session?")) return;

    try {
      await axios.delete(`${API}/study-sessions/${id}`);
      refresh();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>{editingId ? "Edit Study Session" : "Add Study Session"}</h2>

      <select style={styles.input} value={session.userId} onChange={(e) => setSession({ ...session, userId: e.target.value })}>
        <option value="">Select user</option>
        {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>

      <select style={styles.input} value={session.course} onChange={(e) => setSession({ ...session, course: e.target.value })}>
        <option value="">Select course</option>
        {courses.map((c) => <option key={c._id} value={c._id}>{c.courseName}</option>)}
      </select>

      <input style={styles.input} type="date" value={session.date} onChange={(e) => setSession({ ...session, date: e.target.value })} />
      <input style={styles.input} placeholder="Topic" value={session.topic} onChange={(e) => setSession({ ...session, topic: e.target.value })} />
      <input style={styles.input} type="number" placeholder="Duration minutes" value={session.durationMinutes} onChange={(e) => setSession({ ...session, durationMinutes: e.target.value })} />
      <input style={styles.input} type="number" min="1" max="5" placeholder="Focus level 1-5" value={session.focusLevel} onChange={(e) => setSession({ ...session, focusLevel: e.target.value })} />

      <button style={styles.button} onClick={saveSession}>
        {editingId ? "Update Session" : "Add Session"}
      </button>

      {editingId && (
        <button style={styles.cancelButton} onClick={() => setEditingId("")}>
          Cancel Edit
        </button>
      )}

      <h2 style={styles.heading}>Filter Sessions</h2>
      <select style={styles.input} value={filterUserId} onChange={(e) => setFilterUserId(e.target.value)}>
        <option value="">All users</option>
        {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>

      <h2 style={styles.heading}>Sessions</h2>
      {filteredSessions.map((s) => (
        <div key={s._id} style={styles.itemRow}>
          <div>
            {s.topic} • {getSessionCourseName(s)} • {s.durationMinutes} min • Focus: {s.focusLevel}
          </div>
          <div>
            <button style={styles.editButton} onClick={() => startEdit(s)}>Edit</button>
            <button style={styles.deleteButton} onClick={() => deleteSession(s._id)}>Delete</button>
          </div>
        </div>
      ))}

      <h2 style={styles.heading}>Study Time Chart</h2>
      {chartData.map((c) => (
        <div key={c.courseName} style={styles.chartRow}>
          <div>{c.courseName}: {c.minutes} min</div>
          <div style={styles.chartTrack}>
            <div style={{ ...styles.chartBar, width: `${(c.minutes / maxMinutes) * 100}%` }} />
          </div>
        </div>
      ))}

      <h2 style={styles.total}>Total Study Time: {totalTime} min</h2>
    </section>
  );
}

const styles = {
  section: { marginBottom: "30px" },
  heading: { textAlign: "center" },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#334155",
    color: "white",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  cancelButton: {
    width: "100%",
    padding: "12px",
    background: "#64748b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  itemRow: {
    background: "#334155",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  editButton: {
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    marginRight: "6px",
  },
  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
  },
  chartRow: { marginBottom: "12px" },
  chartTrack: {
    width: "100%",
    height: "12px",
    background: "#334155",
    borderRadius: "999px",
  },
  chartBar: {
    height: "100%",
    background: "#3b82f6",
    borderRadius: "999px",
  },
  total: {
    textAlign: "center",
    fontSize: "24px",
  },
};