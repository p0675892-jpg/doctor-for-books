import { useEffect, useState } from "react";

export default function Profile({ setTab, user }) {

  // 👤 Editable name (saved locally for V1)
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  // 📊 Demo progress + strengths
  const progress = 65; // change later from real data

  const strongAreas = ["English", "Reading", "Biology"];
  const weakAreas = ["Mathematics", "Physics"];

  // 💾 Load saved name
  useEffect(() => {
    const saved = localStorage.getItem("dfb_name");
    if (saved) setName(saved);
    else setName(user?.email?.split("@")[0] || "Student");
  }, [user]);

  // 💾 Save name
  const saveName = () => {
    localStorage.setItem("dfb_name", name);
    setEditing(false);
  };

  return (
    <div style={styles.page}>

      {/* 🔝 HEADER */}
      <div style={styles.header}>
        <h2>Profile 👤</h2>

        {/* ⚙️ SETTINGS BUTTON */}
        <button
          style={styles.settingsBtn}
          onClick={() => setTab("settings")}
        >
          ⚙️
        </button>
      </div>

      {/* 🩺 DR E MASCOT */}
      <div style={styles.mascot}>
        🩺📚 Dr. E
      </div>

      {/* ✏️ NAME SECTION */}
      <div style={styles.nameBox}>
        {editing ? (
          <>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button style={styles.saveBtn} onClick={saveName}>
              Save
            </button>
          </>
        ) : (
          <>
            <h3>{name}</h3>
            <button
              style={styles.editBtn}
              onClick={() => setEditing(true)}
            >
              Edit Name
            </button>
          </>
        )}
      </div>

      {/* 📊 PROGRESS */}
      <div style={styles.section}>
        <h3>Progress</h3>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: progress + "%"
            }}
          />
        </div>

        <p>{progress}% mastery</p>
      </div>

      {/* 💪 STRONG AREAS */}
      <div style={styles.section}>
        <h3>Strong Areas 💪</h3>
        {strongAreas.map((item) => (
          <div key={item} style={styles.good}>
            {item}
          </div>
        ))}
      </div>

      {/* ⚠️ WEAK AREAS */}
      <div style={styles.section}>
        <h3>Weak Areas ⚠️</h3>
        {weakAreas.map((item) => (
          <div key={item} style={styles.bad}>
            {item}
          </div>
        ))}
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    padding: 20,
    color: "white",
    background: "#0b0b0b",
    minHeight: "100vh",
    overflowY: "auto",
    fontFamily: "system-ui"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  settingsBtn: {
    background: "#222",
    border: "none",
    color: "white",
    fontSize: 18,
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer"
  },

  mascot: {
    fontSize: 28,
    textAlign: "center",
    margin: "20px 0"
  },

  nameBox: {
    textAlign: "center",
    marginBottom: 30
  },

  editBtn: {
    background: "#f5c542",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  saveBtn: {
    background: "#4caf50",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  input: {
    padding: 8,
    borderRadius: 6,
    border: "none",
    marginRight: 8
  },

  section: {
    marginBottom: 25
  },

  progressBar: {
    width: "100%",
    height: 14,
    background: "#222",
    borderRadius: 10,
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background: "#f5c542"
  },

  good: {
    background: "#163b16",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },

  bad: {
    background: "#3b1616",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  }
};