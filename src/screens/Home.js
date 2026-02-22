import { useEffect, useState } from "react";

export default function Home({ user, setTab }) {
  const [name, setName] = useState("Student");
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const load = () => {
      setName(localStorage.getItem("dfb_name") || "Student");
      setXp(parseInt(localStorage.getItem("dfb_xp")) || 0);
      setStreak(parseInt(localStorage.getItem("dfb_streak")) || 1);

      const today = new Date().toDateString();
      setChecked(localStorage.getItem("dfb_last_check") === today);
    };

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  // 📅 DAILY CHECK-IN
  const checkIn = () => {
    const today = new Date().toDateString();
    const newXP = xp + 5;
    const newStreak = streak + 1;

    localStorage.setItem("dfb_last_check", today);
    localStorage.setItem("dfb_xp", newXP);
    localStorage.setItem("dfb_streak", newStreak);

    setXp(newXP);
    setStreak(newStreak);
    setChecked(true);
  };

  // 🧑‍⚕️ DR. E VOICE
  const messages = [
    "Your brain is warming up nicely 🧠",
    "Consistency is your superpower 💪",
    "Tiny progress compounds 🌱",
    "Future you is quietly cheering 📣",
    "Motion beats perfection ✨",
  ];

  const insights = [
    "Teaching someone boosts retention 📚",
    "Sleep strengthens memory 😴",
    "Practice beats rereading 💡",
    "Confusion is the start of mastery 🧠",
  ];

  const message = messages[Math.floor(Math.random() * messages.length)];
  const insight = insights[Math.floor(Math.random() * insights.length)];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.avatar}>🧑‍⚕️</div>

        <div>
          <h1>Hello {name} 👋</h1>
          <p style={styles.sub}>Dr. E: {message}</p>
        </div>
      </div>

      {/* DAILY CHECK-IN */}
      <div style={styles.card}>
        <h3>📅 Daily Check-In</h3>

        {checked ? (
          <p>✅ Ritual complete today</p>
        ) : (
          <button style={styles.checkBtn} onClick={checkIn}>
            Begin Today (+5 XP)
          </button>
        )}
      </div>

      {/* PROGRESS */}
      <div style={styles.card}>
        <h3>⭐ Level {level}</h3>

        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: progress + "%" }} />
        </div>

        <small>{progress}% to next level</small>
        <p style={{ marginTop: 6 }}>🔥 {streak} Day Streak</p>
      </div>

      {/* MISSION */}
      <div style={styles.card}>
        <h3>🎯 Today’s Mission</h3>
        <p>Ask one question OR complete one lesson</p>
      </div>

      {/* FOCUS */}
      <div style={styles.card}>
        ⚠️ Focus Area: Algebra
      </div>

      {/* INSIGHT */}
      <div style={styles.card}>
        💡 Daily Insight
        <p style={{ marginTop: 6 }}>{insight}</p>
      </div>

      {/* 🚀 QUICK ACTIONS — NOW FUNCTIONAL */}
      <div style={styles.actions}>
        <div
          style={styles.actionCard}
          onClick={() => setTab("ask")}
        >
          🔍 Ask Dr. E
        </div>

        <div
          style={styles.actionCard}
          onClick={() => setTab("sign")}
        >
          🤟 Continue Lessons
        </div>

        <div
          style={styles.actionCard}
          onClick={() => setTab("stories")}
        >
          📖 Read a Story
        </div>
      </div>

      <p style={styles.footer}>
        “Small effort today = powerful tomorrow 💛”
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
    overflowY: "auto",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },

  avatar: { fontSize: 52 },

  sub: { opacity: 0.7 },

  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },

  checkBtn: {
    marginTop: 8,
    padding: 12,
    background: "#FFD700",
    borderRadius: 12,
    fontWeight: "bold",
  },

  bar: {
    background: "#333",
    height: 12,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },

  fill: {
    background: "#FFD700",
    height: "100%",
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
  },

  actionCard: {
    background: "#FFD700",
    color: "#000",
    padding: 16,
    borderRadius: 16,
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },
};