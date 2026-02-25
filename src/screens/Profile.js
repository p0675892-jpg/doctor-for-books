import { useEffect, useState } from "react";

export default function Profile({ setTab, user }) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [xp, setXp] = useState(0);

  const progress = 65;

  const strongAreas = ["English", "Reading", "Biology"];
  const weakAreas = ["Mathematics", "Physics"];

  // LOAD DATA
  useEffect(() => {
    const savedName = localStorage.getItem("dfb_name");
    const savedXP = parseInt(localStorage.getItem("dfb_xp")) || 0;

    setXp(savedXP);

    if (savedName) setName(savedName);
    else setName(user?.email?.split("@")[0] || "Student");
  }, [user]);

  const saveName = () => {
    localStorage.setItem("dfb_name", name);
    setEditing(false);
  };

  const level = Math.floor(xp / 100) + 1;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Profile 👤</h2>

        {/* ⚙️ SETTINGS */}
        <button
          style={styles.settingsBtn}
          onClick={() => setTab && setTab("settings")}
        >
          ⚙️
        </button>
      </div>

      {/* MASCOT */}
      <div style={styles.mascot}>🩺📚 Dr. E</div>

      {/* GREETING */}
      <p style={styles.greeting}>
        Dr. E: Keep going — progress compounds 💛
      </p>

      {/* NAME */}
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

      {/* LEVEL + XP */}
      <div style={styles.xpBox}>
        ⭐ Level {level} — {xp} XP
      </div>

      {/* PROGRESS */}
      <div style={styles.section}>
        <h3>Overall Progress</h3>

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

      {/* STRONG AREAS */}
      <div style={styles.section}>
        <h3>Strong Areas 💪</h3>
        {strongAreas.map((item) => (
          <div key={item} style={styles.good}>
            ✓ {item}
          </div>
        ))}
      </div>

      {/* WEAK AREAS */}
      <div style={styles.section}>
        <h3>Focus Areas 🎯</h3>
        {weakAreas.map((item) => (
          <div key={item} style={styles.bad}>
            ⚠ {item}
          </div>
        ))}
      </div>

      <div style={{ height: 60 }} />
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
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer"
  },

  mascot: {
    fontSize: 30,
    textAlign: "center",
    margin: "20px 0"
  },

  greeting: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 12
  },

  nameBox: {
    textAlign: "center",
    marginBottom: 20
  },

  editBtn: {
    background: "#f5c542",
    border: "none",
    padding: "8px 14px",
    borderRadius: 10,
    cursor: "pointer"
  },

  saveBtn: {
    background: "#4caf50",
    border: "none",
    padding: "8px 14px",
    borderRadius: 10,
    cursor: "pointer"
  },

  input: {
    padding: 8,
    borderRadius: 8,
    border: "none",
    marginRight: 8
  },

  xpBox: {
    background: "#FFD700",
    color: "#000",
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
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
    padding: 12,
    borderRadius: 10,
    marginBottom: 8
  },

  bad: {
    background: "#3b1616",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8
  }
};