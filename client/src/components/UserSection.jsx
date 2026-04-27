import { useState } from "react";
import axios from "axios";

export default function UserSection({ API, users, refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");

  const addUser = async () => {
    try {
      await axios.post(`${API}/users`, {
        name,
        email,
        program,
        username: email.split("@")[0],
      });

      setName("");
      setEmail("");
      setProgram("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Error creating user");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API}/users/${id}`);
      refresh();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Users</h2>

      <input
        style={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Program"
        value={program}
        onChange={(e) => setProgram(e.target.value)}
      />

      <button style={styles.button} onClick={addUser}>
        Add User
      </button>

      {users.map((u) => (
        <div key={u._id} style={styles.itemRow}>
          <div style={{ flex: 1 }}>
            {u.name} • {u.email} {u.program ? `• ${u.program}` : ""}
          </div>

          <button style={styles.deleteButton} onClick={() => deleteUser(u._id)}>
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
  },
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
    cursor: "pointer",
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