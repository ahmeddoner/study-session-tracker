import { useState } from "react";
import axios from "axios";

export default function CourseSection({ API, courses, refresh }) {
  const [courseName, setCourseName] = useState("");
  const [difficulty, setDifficulty] = useState(3);

  const addCourse = async () => {
    try {
      await axios.post(`${API}/courses`, {
        courseName,
        difficulty,
        hasExam: true,
        hasSeminar: false,
      });

      setCourseName("");
      setDifficulty(3);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Error creating course");
    }
  };

  const deleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;

    try {
      await axios.delete(`${API}/courses/${id}`);
      refresh();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Courses</h2>

      <input
        style={styles.input}
        placeholder="Course name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      <input
        type="number"
        min="1"
        max="5"
        style={styles.input}
        placeholder="Difficulty (1-5)"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <button style={styles.button} onClick={addCourse}>
        Add Course
      </button>

      {courses.map((c) => (
        <div key={c._id} style={styles.itemRow}>
          <div style={{ flex: 1 }}>
            {c.courseName} • Difficulty: {c.difficulty}
          </div>

          <button
            style={styles.deleteButton}
            onClick={() => deleteCourse(c._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

const styles = {
  section: {
    marginBottom: "30px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#334155",
    color: "white",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginBottom: "12px",
    cursor: "pointer",
    fontSize: "15px",
  },
  itemRow: {
    background: "#334155",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
  },
};