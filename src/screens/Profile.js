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
        <div>
          <h2 style={styles.title}>Profile</h2>
          <p style={styles.subtitle}>Your learning identity</p>
        </div>

        <button
          style={styles.settingsBtn}
          onClick={() => setTab("settings")}
        >
          ⚙
        </button>
      </div>

      {/* DR. E IDENTITY CARD */}
      <div style={styles.identityCard}>
        <div style={styles.avatar}>DR·E</div>

        <div>
          <div style={styles.identityTitle}>Study Companion</div>
          <div style={styles.identitySub}>
            Calm. Precise. Slightly judging.
          </div>
        </div>
      </div>

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
            <h3 style={styles.name}>{name}</h3>

            <button
              style={styles.editBtn}
              onClick={() => setEditing(true)}
            >
              Edit name
            </button>
          </>
        )}
      </div>

      {/* LEVEL + XP */}
      <div style={styles.levelCard}>
        <div style={styles.levelText}>
          Level {level}
        </div>

        <div style={styles.xpText}>
          {xp} XP accumulated
        </div>
      </div>

      {/* PROGRESS */}
      <div style={styles.section}>
        <h3 className="sectionTitle">Overall Progress</h3>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: progress + "%",
            }}
          />
        </div>

        <p style={styles.progressText}>
          {progress}% mastery
        </p>
      </div>

      {/* STRONG AREAS */}
      <div style={styles.section}>
        <h3>Strong Areas</h3>

        <div style={styles.grid}>
          {strongAreas.map((item) => (
            <div key={item} style={styles.goodCard}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* FOCUS AREAS */}
      <div style={styles.section}>
        <h3>Focus Areas</h3>

        <div style={styles.grid}>
          {weakAreas.map((item) => (
            <div key={item} style={styles.badCard}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    padding: 20,
    background: "#0b0b0f",
    color: "white",
    minHeight: "100vh",
    fontFamily: "system-ui",
    overflowY: "auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
  },

  subtitle: {
    margin: 0,
    opacity: 0.6,
    fontSize: 13,
  },

  settingsBtn: {
    background: "#1a1a1f",
    border: "none",
    color: "white",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },

  identityCard: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    background: "#151518",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },

  avatar: {
    background: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    padding: 12,
    borderRadius: 12,
  },

  identityTitle: {
    fontWeight: "bold",
  },

  identitySub: {
    opacity: 0.6,
    fontSize: 13,
  },

  nameBox: {
    textAlign: "center",
    marginTop: 20,
  },

  name: {
    marginBottom: 6,
  },

  editBtn: {
    background: "#FFD700",
    border: "none",
    padding: "6px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },

  saveBtn: {
    background: "#4caf50",
    border: "none",
    padding: "6px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },

  input: {
    padding: 8,
    borderRadius: 8,
    border: "none",
    marginRight: 8,
  },

  levelCard: {
    background: "#FFD700",
    color: "#000",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
    textAlign: "center",
  },

  levelText: {
    fontWeight: "bold",
    fontSize: 18,
  },

  xpText: {
    fontSize: 13,
  },

  section: {
    marginTop: 28,
  },

  progressBar: {
    width: "100%",
    height: 14,
    background: "#1a1a1f",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },

  progressFill: {
    height: "100%",
    background: "#FFD700",
  },

  progressText: {
    opacity: 0.7,
    marginTop: 6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 10,
  },

  goodCard: {
    background: "#162d16",
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
  },

  badCard: {
    background: "#2d1616",
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
  },
};
