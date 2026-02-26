import { useEffect, useState } from "react";
import { FaUserMd, FaFire, FaStar, FaBullseye, FaBrain } from "react-icons/fa";
import { getWeakArea } from "../utils/weakTracker";

export default function Home({ user, setTab }) {
  const [name, setName] = useState("Student");
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [checked, setChecked] = useState(false);
  const [weakArea, setWeakArea] = useState("General Studies");

  // 🔄 LOAD DATA
  useEffect(() => {
    const load = () => {
      setName(localStorage.getItem("dfb_name") || "Student");
      setXp(parseInt(localStorage.getItem("dfb_xp")) || 0);
      setStreak(parseInt(localStorage.getItem("dfb_streak")) || 1);
      setWeakArea(getWeakArea());

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

    if (checked) return;

    const newXP = xp + 5;
    const newStreak = streak + 1;

    localStorage.setItem("dfb_last_check", today);
    localStorage.setItem("dfb_xp", newXP);
    localStorage.setItem("dfb_streak", newStreak);

    setXp(newXP);
    setStreak(newStreak);
    setChecked(true);
  };

  // 🧑‍⚕️ DR. E PERSONALITY
  const messages = [
    "Your brain is warming up nicely 🧠",
    "Consistency beats talent 💪",
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

  const streakPraise = [
    "WOW — you’re showing serious discipline 🔥",
    "This streak is not luck… it’s commitment 👏",
    "Most people would have quit already 💛",
    "Consistency like this changes lives 🌟",
  ];

  const diagnoses = [
  "Brain overheating detected… prescribing water 💧",
  "Motivation level low — applying confidence patch 💛",
  "Overthinking virus found — treatment ongoing 🧠",
  "Progress detected. Continue immediately 🚀",
  "Minor confusion spotted — this is how learning starts ✨",
];

const diagnosis =
  diagnoses[Math.floor(Math.random() * diagnoses.length)];

  const message = messages[Math.floor(Math.random() * messages.length)];
  const insight = insights[Math.floor(Math.random() * insights.length)];
  const praise =
    streakPraise[Math.floor(Math.random() * streakPraise.length)];

  return (
    <div style={styles.container}>
      {/* 🧑‍⚕️ HEADER */}
      <div style={styles.header}>
        <div style={styles.avatar}>
  <FaUserMd />
</div>
    {/* 🩺 DR. E HUMOUR PANEL */}
<div style={styles.doctorPanel}>
  <FaUserMd style={{ fontSize: 28 }} />

  <div>
    <strong>Dr. E Diagnosis:</strong>
    <p style={{ margin: 0, opacity: 0.8 }}>
{diagnosis}
    </p>
  </div>
</div>

      // 🧠 SMART DIAGNOSIS ENGINE

const hour = new Date().getHours();
const lastCheck = localStorage.getItem("dfb_last_check");
const today = new Date().toDateString();

let diagnosis = "";

// ⏰ TIME OF DAY
if (hour < 12) {
  diagnosis = "Morning brain detected ☀️ Perfect time for focus.";
} else if (hour < 18) {
  diagnosis = "Afternoon dip incoming 😴 Small wins recommended.";
} else {
  diagnosis = "Evening mode 🌙 Gentle review beats heavy study.";
}

// 🔥 STREAK REACTION
if (streak >= 7) {
  diagnosis = `WOW — ${streak} day streak. You're dangerous now 🔥`;
} else if (streak >= 3) {
  diagnosis = `${streak} day streak forming… momentum detected ⚡`;
}

// ⭐ XP LEVEL REACTION
if (xp >= 500) {
  diagnosis = "High knowledge density detected 🧠 Proceed with confidence.";
} else if (xp >= 200) {
  diagnosis = "Solid progress building 💪 Keep stacking wins.";
}

// 💤 INACTIVITY CHECK
if (lastCheck !== today) {
  diagnosis = "No activity today detected 👀 Tiny action will restart growth.";
}

// 🎯 WEAK AREA HOOK (static for V1)
const weakAreas = ["Mathematics", "Physics"];

if (weakAreas.includes("Mathematics")) {
  diagnosis = "Math anxiety spotted 📉 Short practice recommended.";
}

        <div>
          <h1>Hello {name} 👋</h1>
          <p style={styles.sub}>Dr. E says: {message}</p>
        </div>
      </div>

      {/* 📅 DAILY CHECK-IN */}
      <div style={styles.card}>
        <h3><FaBullseye /> Daily Check-In</h3>

        {checked ? (
          <p>✅ Ritual complete today</p>
        ) : (
          <button style={styles.checkBtn} onClick={checkIn}>
            Begin Today (+5 XP)
          </button>
        )}
      </div>

      {/* ⭐ PROGRESS */}
      <div style={styles.card}>
        <h3><FaStar /> Level {level}</h3>

        <div style={styles.bar}>
          <div
            style={{
              ...styles.fill,
              width: progress + "%",
            }}
          />
        </div>

        <small>{progress}% to next level</small>

        <p style={{ marginTop: 6 }}>
  <FaFire /> {streak}-day streak — most people quit before this.
</p>
      </div>

      {/* 🎯 TODAY'S MISSION */}
      <div style={styles.card}>
        <h3><FaBullseye /> Today’s Mission</h3>
        <p>Complete ONE meaningful action:</p>

        <ul style={styles.missionList}>
          <li>Ask Dr. E for help</li>
          <li>Finish one lesson</li>
          <li>Read one story</li>
        </ul>
      </div>

      {/* ⚠️ FOCUS AREA */}
      <div style={styles.card}>
        ⚠️ Focus Area: {weakArea}
      </div>

      {/* 💡 INSIGHT */}
      <div style={styles.card}>
        <FaBrain /> Daily Insight
        <p style={{ marginTop: 6 }}>{insight}</p>
      </div>
<div style={styles.card}>
  🩺 Dr. E Diagnosis
  <p style={{ marginTop: 6 }}>{diagnosis}</p>
</div>

      {/* 🚀 QUICK ACTIONS */}
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

      {/* ❤️ FOOTER */}
      <p style={styles.footer}>
        “Small effort today = powerful tomorrow 💛”
      </p>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: 20,
    paddingBottom: 120,
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
    border: "none",
    cursor: "pointer",
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

  missionList: {
    marginTop: 8,
    paddingLeft: 20,
    opacity: 0.9,
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

  doctorPanel: {
  display: "flex",
  gap: 12,
  alignItems: "center",
  background: "#121212",
  padding: 14,
  borderRadius: 16,
  marginBottom: 14,
  border: "1px solid #222",
},
};


