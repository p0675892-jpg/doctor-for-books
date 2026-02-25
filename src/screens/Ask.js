import { useState, useEffect } from "react";

export default function Ask({ user }) {
  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");
  const [streak, setStreak] = useState(0);
  const [saved, setSaved] = useState(false);

  // LOAD STREAK
  useEffect(() => {
    const s = parseInt(localStorage.getItem("dfb_reflect_streak")) || 0;
    setStreak(s);
  }, []);

  // GENERATE PERSONAL TREATMENT (NO AI)
  function generateTreatment(text) {
    const t = text.toLowerCase();

    if (t.includes("math") || t.includes("algebra") || t.includes("equation"))
      return `🎯 Focus: Mathematics
✔ Review formulas for 10 minutes
✔ Solve 2 practice questions
✔ Explain concept aloud`;

    if (t.includes("english") || t.includes("essay") || t.includes("grammar"))
      return `🎯 Focus: English
✔ Read one passage
✔ Write 5 sentences
✔ Learn 3 new words`;

    if (t.includes("biology") || t.includes("plant") || t.includes("cell"))
      return `🎯 Focus: Biology
✔ Review diagrams
✔ Summarise key idea
✔ Teach someone`;

    if (t.includes("tired") || t.includes("stress") || t.includes("confused"))
      return `🩹 Recovery Mode
✔ Rest for 20 minutes
✔ Drink water
✔ Do one small task only`;

    return `🎯 General Focus
✔ Review notes for 10 minutes
✔ Identify one weak area
✔ Plan tomorrow`;
  }

  // SAVE REFLECTION
  const saveNotes = () => {
    if (!notes.trim()) return;

    const today = new Date().toDateString();
    const last = localStorage.getItem("dfb_reflect_last");

    let newStreak = streak;

    if (last !== today) newStreak += 1;

    localStorage.setItem("dfb_reflect_last", today);
    localStorage.setItem("dfb_reflect_streak", newStreak);

    setStreak(newStreak);
    setTreatment(generateTreatment(notes));
    setSaved(true);
  };

  // QUICK RELIEF TOOLS
  const tools = [
    {
      title: "🧠 Calm My Mind",
      text: "Close your eyes. Inhale for 4 seconds… exhale slowly. Your brain resets.",
    },
    {
      title: "⚡ Quick Motivation",
      text: "Future you is begging you not to quit today 💛",
    },
    {
      title: "📚 Study Tip",
      text: "Active recall beats rereading every time.",
    },
  ];

  const [toolMsg, setToolMsg] = useState("");

  return (
    <div style={styles.container}>
      <h1>Ask Dr. E 🩺</h1>
      <p style={{ opacity: 0.7 }}>
        Real doctors listen first.
      </p>

      {/* ⭐ STREAK */}
      <div style={styles.streakBox}>
        🔥 Reflection Streak: {streak} day{streak !== 1 && "s"}
      </div>

      {/* 🩺 PATIENT NOTES */}
      <div style={styles.card}>
        <h3>📝 Patient Notes</h3>
        <p style={{ opacity: 0.7 }}>
          What did you learn today?
        </p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell Dr. E about your day in school..."
          style={styles.textarea}
        />

        <button style={styles.mainBtn} onClick={saveNotes}>
          Generate Today’s Treatment
        </button>

        {saved && (
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Notes saved 💛
          </p>
        )}
      </div>

      {/* 🎯 TREATMENT */}
      {treatment && (
        <div style={styles.card}>
          <h3>🩺 Today’s Treatment</h3>
          <pre style={styles.treatment}>{treatment}</pre>
        </div>
      )}

      {/* ⚡ QUICK RELIEF TOOLS */}
      <div style={styles.card}>
        <h3>⚡ Quick Relief</h3>

        {tools.map((t, i) => (
          <button
            key={i}
            style={styles.toolBtn}
            onClick={() => setToolMsg(t.text)}
          >
            {t.title}
          </button>
        ))}

        {toolMsg && (
          <p style={styles.toolMsg}>{toolMsg}</p>
        )}
      </div>

      {/* 🔒 PREMIUM PREVIEW */}
      <div style={styles.card}>
        <h3>🧠 Dr. E Advanced Diagnosis</h3>

        <p style={{ opacity: 0.7 }}>
          Deep analysis of your weak areas, study style,
          and personalised roadmap.
        </p>

        <button style={styles.lockBtn}>
          🔒 Coming Soon
        </button>
      </div>

      <p style={styles.footer}>
        “Confusion means growth is happening.” 💛
      </p>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
  },

  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },

  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    minHeight: 80,
  },

  mainBtn: {
    width: "100%",
    padding: 12,
    background: "#FFD700",
    borderRadius: 12,
    fontWeight: "bold",
  },

  treatment: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.6,
  },

  toolBtn: {
    width: "100%",
    padding: 10,
    marginTop: 8,
  },

  toolMsg: {
    marginTop: 12,
    opacity: 0.9,
  },

  lockBtn: {
    width: "100%",
    padding: 12,
background: "#333",
    marginTop: 10,
  },

  streakBox: {
    background: "#FFD700",
    color: "#000",
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
    fontWeight: "bold",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },
};