import { useState, useEffect } from "react";

export default function Profile({ setTab }) {
  const [name, setName] = useState(
    localStorage.getItem("dfb_name") || "Student"
  );
  const [edit, setEdit] = useState(false);

  const [streak, setStreak] = useState(3);
  const [questions, setQuestions] = useState(12);
  const premium =
    localStorage.getItem("dfb_premium") === "1";

  const saveName = () => {
    localStorage.setItem("dfb_name", name);
    setEdit(false);
  };

  const encouragements = [
    "You’re building real intelligence 🧠",
    "Consistency beats panic studying 💪",
    "Your future self is grateful already ✨",
    "Small progress is still progress 🌱"
  ];

  const message =
    encouragements[
      Math.floor(Math.random() * encouragements.length)
    ];

  const progress = Math.min(
    Math.floor((questions / 50) * 100),
    100
  );

  return (
    <div style={styles.container}>
      <h1>Profile 👤</h1>

      {/* AVATAR */}
      <div style={styles.avatar}>🧑‍⚕️</div>

      {/* NAME */}
      {edit ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <button onClick={saveName}>Save</button>
        </>
      ) : (
        <>
          <h2>{name}</h2>
          <button onClick={() => setEdit(true)}>
            ✏️ Edit Name
          </button>
        </>
      )}

      {/* PLAN */}
      <div style={styles.plan}>
        {premium
          ? "💎 Premium Member"
          : "🟡 Free Plan"}
      </div>

      {/* PROGRESS */}
      <div style={styles.card}>
        <h3>Progress</h3>

        <div style={styles.bar}>
          <div
            style={{
              ...styles.fill,
              width: progress + "%"
            }}
          />
        </div>

        <small>{progress}% engagement</small>
      </div>

      {/* STATS */}
      <div style={styles.card}>
        🔥 Streak: {streak} days
      </div>

      <div style={styles.card}>
        📊 Questions Asked: {questions}
      </div>

      <div style={styles.card}>
        ⚠️ Needs Work: Algebra
      </div>

      {/* ENCOURAGEMENT */}
      <div style={styles.message}>
        {message}
      </div>

      {/* UPGRADE */}
      {!premium && (
        <div
          style={styles.upgrade}
          onClick={() => setTab("settings")}
        >
          💎 Upgrade to Premium
        </div>
      )}

      {/* SETTINGS */}
      <button
        style={styles.settings}
        onClick={() => setTab("settings")}
      >
        ⚙️ Settings
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20
  },

  avatar: {
    fontSize: 70,
    textAlign: "center",
    margin: "20px 0"
  },

  input: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },

  plan: {
    textAlign: "center",
    marginBottom: 20,
    color: "#FFD700"
  },

  card: {
    background: "#1a1a1a",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },

  bar: {
    background: "#333",
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8
  },

  fill: {
    background: "#FFD700",
    height: "100%"
  },

  message: {
    textAlign: "center",
    opacity: 0.8,
    marginTop: 12
  },

  upgrade: {
    background: "#FFD700",
    color: "#000",
    padding: 14,
    borderRadius: 12,
    textAlign: "center",
    marginTop: 16,
    cursor: "pointer",
    fontWeight: "bold"
  },

  settings: {
    marginTop: 12,
    padding: 12,
    width: "100%"
  }
  };
