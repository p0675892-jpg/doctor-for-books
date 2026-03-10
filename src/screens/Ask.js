import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";

export default function Ask({ user }) {
  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");
  const [streak, setStreak] = useState(0);
  const [saved, setSaved] = useState(false);
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [snapFile, setSnapFile] = useState(null);
  const [snapResult, setSnapResult] = useState("");

  // Load streak
  useEffect(() => {
    const s = parseInt(localStorage.getItem("dfb_reflect_streak")) || 0;
    setStreak(s);
  }, []);

  // Generate treatment based on notes
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

  // Save reflection
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

  // Explain My Topic (non-AI, simple logic)
  const explainTopic = () => {
    if (!topic.trim()) return;

    const t = topic.toLowerCase();
    let explanationText = "";

    if (t.includes("newton")) {
      explanationText = `📘 Simple Explanation:
Newton's Laws explain how objects move.

✅ Key Points:
1. First Law: Inertia
2. Second Law: F=ma
3. Third Law: Action-Reaction

💡 Example:
Push a ball: it moves, stop pushing: it stops.

❓ Possible Questions:
Define inertia
Explain F=ma with example
`;

    } else if (t.includes("photosynthesis")) {
      explanationText = `📘 Simple Explanation:
Plants make food using sunlight, CO2, water.

✅ Key Points:
- Chlorophyll captures light
- Glucose is produced
- Oxygen is released

💡 Example:
Sunlight + water + CO2 → Sugar + O2

❓ Possible Questions:
Write equation of photosynthesis
Explain role of sunlight
`;
    } else {
      explanationText = `📘 Simple Explanation:
This topic is under review. Try breaking it into keywords.`;
    }

    setExplanation(explanationText);
    setTopic(""); // clear input for UX
  };

  // Snap & Explain
  const handleSnapUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSnapFile(file);
    setSnapResult("Processing image...");
    Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        const cleaned = text.replace(/\s+/g, " ").trim();
        let result = `📸 Snap & Explain Result:\n\nExtracted Text:\n${cleaned}\n\n✅ Quick Summary:\n- Identify key points from above text\n- Check examples\n- Make mini quiz\n`;
        setSnapResult(result);
      })
      .catch(() => setSnapResult("Failed to process image."));
  };

  // Quick relief tools
  const tools = [
    { title: "🧠 Calm My Mind", text: "Close your eyes. Inhale for 4s… exhale slowly." },
    { title: "⚡ Quick Motivation", text: "Future you is begging you not to quit today 💛" },
    { title: "📚 Study Tip", text: "Active recall beats rereading every time." },
  ];

  const [toolMsg, setToolMsg] = useState("");

  return (
    <div style={styles.container}>
      <h1>Ask Dr. E 🩺</h1>
      <p style={{ opacity: 0.7 }}>Real doctors listen first.</p>

      {/* ⭐ Reflection Streak */}
      <div style={styles.streakBox}>
        🔥 Reflection Streak: {streak} day{streak !== 1 && "s"}
      </div>

      {/* 📝 Patient Notes */}
      <div style={styles.card}>
        <h3>📝 Patient Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell Dr. E about your day in school..."
          style={styles.textarea}
        />
        <button style={styles.mainBtn} onClick={saveNotes}>
          Generate Today’s Treatment
        </button>
        {saved && <p style={{ marginTop: 8, opacity: 0.8 }}>Notes saved 💛</p>}
      </div>

      {/* 🎯 Treatment */}
      {treatment && (
        <div style={styles.card}>
          <h3>🩺 Today’s Treatment</h3>
          <pre style={styles.treatment}>{treatment}</pre>
        </div>
      )}

      {/* 💡 Explain My Topic */}
      <div style={styles.card}>
        <h3>📖 Explain My Topic</h3>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Type a topic, e.g., Newton's Laws"
          style={styles.textInput}
        />
        <button style={styles.mainBtn} onClick={explainTopic}>
          Explain Topic
        </button>
        {explanation && <pre style={styles.treatment}>{explanation}</pre>}
      </div>

      {/* 📸 Snap & Explain */}
      <div style={styles.card}>
        <h3>📸 Snap & Explain</h3>
        <input type="file" accept="image/*" onChange={handleSnapUpload} />
        {snapResult && <pre style={styles.treatment}>{snapResult}</pre>}
      </div>

      {/* ⚡ Quick Relief */}
      <div style={styles.card}>
        <h3>⚡ Quick Relief</h3>
        {tools.map((t, i) => (
          <button key={i} style={styles.toolBtn} onClick={() => setToolMsg(t.text)}>
            {t.title}
          </button>
        ))}
        {toolMsg && <p style={styles.toolMsg}>{toolMsg}</p>}
      </div>

      {/* 🔒 Premium Preview */}
      <div style={styles.card}>
        <h3>🧠 Dr. E Advanced Diagnosis</h3>
        <p style={{ opacity: 0.7 }}>
          Deep analysis of your weak areas, study style, and personalised roadmap.
        </p>
        <button style={styles.lockBtn}>🔒 Coming Soon</button>
      </div>

      <p style={styles.footer}>“Confusion means growth is happening.” 💛</p>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  container: { padding: 20, paddingBottom: 100 },
  card: { background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 14 },
  textarea: { width: "100%", padding: 12, borderRadius: 10, marginTop: 10, marginBottom: 10, minHeight: 80 },
  textInput: { width: "100%", padding: 12, borderRadius: 10, marginTop: 10, marginBottom: 10 },
  mainBtn: { width: "100%", padding: 12, background: "#FFD700", borderRadius: 12, fontWeight: "bold" },
  treatment: { whiteSpace: "pre-wrap", lineHeight: 1.6 },
  toolBtn: { width: "100%", padding: 10, marginTop: 8 },
  toolMsg: { marginTop: 12, opacity: 0.9 },
  lockBtn: { width: "100%", padding: 12, background: "#333", marginTop: 10 },
  streakBox: { background: "#FFD700", color: "#000", padding: 10, borderRadius: 12, marginBottom: 14, fontWeight: "bold", textAlign: "center" },
  footer: { textAlign: "center", marginTop: 20, opacity: 0.7 },
};
