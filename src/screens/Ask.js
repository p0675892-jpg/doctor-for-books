import { useState, useEffect } from "react";
import Tesseract from "tesseract.js"; // Make sure tesseract.js is installed
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Ask({ user }) {
  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");
  const [saved, setSaved] = useState(false);
  const [topic, setTopic] = useState("");
  const [topicExplanation, setTopicExplanation] = useState(null);
  const [toolMsg, setToolMsg] = useState("");
  const [snapResult, setSnapResult] = useState("");
  const [processingImage, setProcessingImage] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load user data from Firebase
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserData(docSnap.data());
    }
    fetchUser();
  }, [user]);

  // ---------- Generate Treatment ----------
  const generateTreatment = (text) => {
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
  };

  const saveNotes = async () => {
    if (!notes.trim()) return;

    const today = new Date().toDateString();
    const last = localStorage.getItem("dfb_reflect_last");

    let newVisits = (userData?.doctorVisits || 0);
    if (last !== today) newVisits += 1;

    localStorage.setItem("dfb_reflect_last", today);
    localStorage.setItem("dfb_reflect_streak", newVisits);

    setTreatment(generateTreatment(notes));
    setSaved(true);

    // Update Firebase doctor visits
    if (userData) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { doctorVisits: newVisits });
      setUserData((prev) => ({ ...prev, doctorVisits: newVisits }));
    }
  };

  // ---------- Explain Topic ----------
  const explainTopic = () => {
    if (!topic.trim()) return;

    const t = topic.toLowerCase();
    // Simple non-AI logic
    let explanation = `📘 Explanation for "${topic}":\n`;

    if (t.includes("newton")) {
      explanation += `
1️⃣ Simple Explanation: Newton's laws describe motion and forces.
2️⃣ Key Points:
- First Law: Inertia
- Second Law: F=ma
- Third Law: Action-Reaction
3️⃣ Example: Push a wall and the wall pushes back.
4️⃣ Mini Quiz:
- Define Newton's First Law
- Give an example of inertia
`;
    } else if (t.includes("photosynthesis")) {
      explanation += `
1️⃣ Simple Explanation: Plants make food using sunlight.
2️⃣ Key Points:
- Chlorophyll captures light
- CO2 + H2O → Glucose + O2
3️⃣ Example: Sunlight turning leaves green
4️⃣ Mini Quiz:
- What is the main pigment in photosynthesis?
- Write the photosynthesis equation
`;
    } else {
      explanation += `
1️⃣ Simple Explanation: ${topic} is a concept you should explore.
2️⃣ Key Points: Identify 3 main points.
3️⃣ Example: Give a real-life example.
4️⃣ Mini Quiz: Write 2 questions based on the topic.
`;
    }

    setTopicExplanation(explanation);
    setTopic(""); // clear input for better UX
  };

  // ---------- Snap & Explain ----------
  const handleSnap = async (e) => {
    if (!e.target.files[0]) return;
    setProcessingImage(true);
    setSnapResult("");

    const image = e.target.files[0];
    try {
      const { data } = await Tesseract.recognize(image, "eng", { logger: m => {} });
      const text = data.text;
      setSnapResult(`📸 OCR Result:\n${text}\n\nTry explaining this in Explain Topic tab!`);
    } catch (err) {
      setSnapResult("❌ Failed to process image.");
    } finally {
      setProcessingImage(false);
    }
  };

  // ---------- Quick Relief Tools ----------
  const tools = [
    { title: "🧠 Calm My Mind", text: "Close your eyes. Inhale for 4s… exhale slowly. Your brain resets." },
    { title: "⚡ Quick Motivation", text: "Future you is begging you not to quit today 💛" },
    { title: "📚 Study Tip", text: "Active recall beats rereading every time." },
    { title: "🌟 Scholar Tip", text: "Finish one small task before bedtime to feel accomplished." },
  ];

  return (
    <div style={styles.container}>
      <h1>Ask Dr. E 🩺</h1>
      <p style={{ opacity: 0.7 }}>Real doctors listen first.</p>

      {/* Doctor Visit Counter */}
      <div style={styles.streakBox}>
        🏥 Educational Doctor Visits: {userData?.doctorVisits || 0}
      </div>

      {/* Patient Notes */}
      <div style={styles.card}>
        <h3>📝 Patient Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell Dr. E about your day..."
          style={styles.textarea}
        />
        <button style={styles.mainBtn} onClick={saveNotes}>Generate Today’s Treatment</button>
        {saved && <p style={{ marginTop: 8, opacity: 0.8 }}>Notes saved 💛</p>}
      </div>

      {/* Treatment */}
      {treatment && (
        <div style={styles.card}>
          <h3>🩺 Today’s Treatment</h3>
          <pre style={styles.treatment}>{treatment}</pre>
        </div>
      )}

      {/* Explain Topic */}
      <div style={styles.card}>
        <h3>🧠 Explain a Topic</h3>
        <input
          style={styles.textarea}
          placeholder="Type topic here..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button style={styles.mainBtn} onClick={explainTopic}>Explain Topic</button>
        {topicExplanation && <pre style={styles.treatment}>{topicExplanation}</pre>}
      </div>

      {/* Snap & Explain */}
      <div style={styles.card}>
        <h3>📸 Snap & Explain</h3>
        <input type="file" accept="image/*" onChange={handleSnap} />
        {processingImage && <p>Processing image...</p>}
        {snapResult && <pre style={styles.treatment}>{snapResult}</pre>}
      </div>

      {/* Quick Relief Tools */}
      <div style={styles.card}>
        <h3>⚡ Quick Help</h3>
        {tools.map((t, i) => (
          <button key={i} style={styles.toolBtn} onClick={() => setToolMsg(t.text)}>
            {t.title}
          </button>
        ))}
        {toolMsg && <p style={styles.toolMsg}>{toolMsg}</p>}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  container: { padding: 20, paddingBottom: 100 },
  card: { background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 14 },
  textarea: { width: "100%", padding: 12, borderRadius: 10, marginTop: 10, marginBottom: 10, minHeight: 40 },
  mainBtn: { width: "100%", padding: 12, background: "#FFD700", borderRadius: 12, fontWeight: "bold", marginTop: 8, cursor: "pointer" },
  treatment: { whiteSpace: "pre-wrap", lineHeight: 1.6 },
  toolBtn: { width: "100%", padding: 10, marginTop: 8, cursor: "pointer" },
  toolMsg: { marginTop: 12, opacity: 0.9 },
  streakBox: { background: "#FFD700", color: "#000", padding: 10, borderRadius: 12, marginBottom: 14, fontWeight: "bold", textAlign: "center" },
};
