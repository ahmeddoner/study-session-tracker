import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    program: "",
  });

  const [course, setCourse] = useState({
    courseName: "",
    difficulty: 3,
  });

  const [session, setSession] = useState({
    userId: "",
    course: "",
    date: "",
    durationMinutes: 60,
    topic: "",
    focusLevel: 3,
    notes: "",
  });

  const addUser = () => {
    setUsers([...users, user]);
    setMessage("User added locally");
    setUser({ name: "", username: "", email: "", program: "" });
  };

  const addCourse = () => {
    setCourses([...courses, course]);
    setMessage("Course added locally");
    setCourse({ courseName: "", difficulty: 3 });
  };

  const addSession = () => {
    setSessions([...sessions, session]);
    setMessage("Study session added locally");
    setSession({
      userId: "",
      course: "",
      date: "",
      durationMinutes: 60,
      topic: "",
      focusLevel: 3,
      notes: "",
    });
  };

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "30px" }}>
      <h1>Study Session Tracker</h1>
      <p>Track users, courses, and study sessions.</p>

      {message && <div style={{ background: "#d1fae5", padding: "12px", marginBottom: "20px" }}>{message}</div>}

      <section>
        <h2>Add User</h2>
        <input placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <input placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input placeholder="Program" value={user.program} onChange={(e) => setUser({ ...user, program: e.target.value })} />
        <button onClick={addUser}>Add User</button>

        <h3>Users</h3>
        <ul>
          {users.map((u, i) => (
            <li key={i}>{u.name} - {u.username} - {u.email} - {u.program}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Add Course</h2>
        <input placeholder="Course Name" value={course.courseName} onChange={(e) => setCourse({ ...course, courseName: e.target.value })} />
        <input type="number" min="1" max="5" value={course.difficulty} onChange={(e) => setCourse({ ...course, difficulty: Number(e.target.value) })} />
        <button onClick={addCourse}>Add Course</button>

        <h3>Courses</h3>
        <ul>
          {courses.map((c, i) => (
            <li key={i}>{c.courseName} - difficulty {c.difficulty}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Add Study Session</h2>
        <input placeholder="User ID" value={session.userId} onChange={(e) => setSession({ ...session, userId: e.target.value })} />
        <input placeholder="Course ID" value={session.course} onChange={(e) => setSession({ ...session, course: e.target.value })} />
        <input type="date" value={session.date} onChange={(e) => setSession({ ...session, date: e.target.value })} />
        <input type="number" value={session.durationMinutes} onChange={(e) => setSession({ ...session, durationMinutes: Number(e.target.value) })} />
        <input placeholder="Topic" value={session.topic} onChange={(e) => setSession({ ...session, topic: e.target.value })} />
        <input type="number" min="1" max="5" value={session.focusLevel} onChange={(e) => setSession({ ...session, focusLevel: Number(e.target.value) })} />
        <textarea placeholder="Notes" value={session.notes} onChange={(e) => setSession({ ...session, notes: e.target.value })} />
        <button onClick={addSession}>Add Study Session</button>

        <h3>Study Sessions</h3>
        <ul>
          {sessions.map((s, i) => (
            <li key={i}>
              {s.date} - {s.topic} - {s.durationMinutes} minutes - focus {s.focusLevel}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}