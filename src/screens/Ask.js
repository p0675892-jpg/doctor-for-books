import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Ask({ user }) {
  if (!user) {
    return <div style={{ padding: 20 }}>Loading Dr. E...</div>;
  }

  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");
  const [saved, setSaved] = useState(false);
  const [topic, setTopic] = useState("");
  const [topicExplanation, setTopicExplanation] = useState(null);
  const [toolMsg, setToolMsg] = useState("");
  const [snapResult, setSnapResult] = useState("");
  const [processingImage, setProcessingImage] = useState(false);
  const [userData, setUserData] = useState(null);

  // ---------------- Load user data ----------------
  useEffect(() => {
    async function fetchUser() {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          await setDoc(docRef, { doctorVisits: 0 });
          setUserData({ doctorVisits: 0 });
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [user]);

  // ---------------- Treatment Generator ----------------
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

  // ---------------- Save Notes ----------------
  const saveNotes = async () => {
    if (!notes.trim()) return;

    const today = new Date().toDateString();
    const last = localStorage.getItem("dfb_reflect_last");

    let visits = userData?.doctorVisits || 0;

    if (last !== today) {
      visits += 1;
      localStorage.setItem("dfb_reflect_last", today);
    }

    setTreatment(generateTreatment(notes));
    setSaved(true);
    setNotes("");

    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { doctorVisits: visits });
      setUserData({ doctorVisits: visits });
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Explain Topic ----------------
  const explainTopic = () => {
    if (!topic.trim()) return;

    const t = topic.toLowerCase();
    let explanation = `📘 Explanation for "${topic}"\n\n`;

    if (t.includes("newton")) {
      explanation += `Newton's Laws explain motion and force.

1️⃣ First Law – Inertia  
Objects stay at rest or motion unless forced.

2️⃣ Second Law – F = ma  
Force equals mass × acceleration.

3️⃣ Third Law – Action & Reaction  
Every action has an equal opposite reaction.

Example: Push a wall, it pushes back.`;
    } else if (t.includes("photosynthesis")) {
      explanation += `Photosynthesis is how plants make food.

Plants use:
- Sunlight
- Water
- Carbon dioxide

Equation:
CO₂ + H₂O → Glucose + O₂

Chlorophyll captures sunlight.`;
    } else {
      explanation += `${topic} is a concept worth studying.

Try this method:
✔ Identify the main definition  
✔ Break it into 3 key ideas  
✔ Find a real-life example`;
    }

    setTopicExplanation(explanation);
    setTopic("");
  };

  // ---------------- Snap & Explain ----------------
  const handleSnap = async (e) => {
    if (!e.target.files[0]) return;

    setProcessingImage(true);
    setSnapResult("");

    const image = e.target.files[0];

    try {
      const { data } = await Tesseract.recognize(image, "eng");
      const text = data.text;

      setSnapResult(`📸 Text Found:\n\n${text}`);
      setTopic(text.substring(0, 80));
    } catch (err) {
      setSnapResult("❌ Could not read the image.");
    }

    setProcessingImage(false);
  };

  // ---------------- Quick Help ----------------
  const tools = [
    { title: "🧠 Calm My Mind", text: "Close your eyes. Breathe slowly. Your brain resets." },
    { title: "⚡ Quick Motivation", text: "Future you will thank you for studying today." },
    { title: "📚 Study Tip", text: "Active recall is better than rereading." },
    { title: "🌟 Scholar Tip", text: "Finish one small task before sleep." }
  ];

  return (
    <div style={styles.container}>
      <h1>Ask Dr. E 🩺</h1>
      <p style={{ opacity: 0.7 }}>Real doctors listen first.</p>

      <div style={styles.streakBox}>
        🏥 Doctor Visits: {userData?.doctorVisits || 0}
      </div>

      {/* Notes */}
      <div style={styles.card}>
        <h3>📝 Patient Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell Dr. E about your study day..."
          style={styles.textarea}
        />
        <button style={styles.mainBtn} onClick={saveNotes}>
          Generate Treatment
        </button>
        {saved && <p>Notes saved 💛</p>}
      </div>

      {/* Treatment */}
      {treatment && (
        <div style={styles.card}>
          <h3>🩺 Today’s Treatment</h3>
          <pre style={styles.treatment}>{treatment}</pre>
        </div>
      )}

      {/* Explain */}
      <div style={styles.card}>
        <h3>🧠 Explain Topic</h3>
        <input
          style={styles.textarea}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Type topic..."
        />
        <button style={styles.mainBtn} onClick={explainTopic}>
          Explain
        </button>

        {topicExplanation && (
          <pre style={styles.treatment}>{topicExplanation}</pre>
        )}
      </div>

      {/* Snap */}
      <div style={styles.card}>
        <h3>📸 Snap & Explain</h3>
        <input type="file" accept="image/*" onChange={handleSnap} />

        {processingImage && <p>Reading image...</p>}
        {snapResult && <pre style={styles.treatment}>{snapResult}</pre>}
      </div>

      {/* Tools */}
      <div style={styles.card}>
        <h3>⚡ Quick Help</h3>
        {tools.map((t, i) => (
          <button
            key={i}
            style={styles.toolBtn}
            onClick={() => setToolMsg(t.text)}
          >
            {t.title}
          </button>
        ))}

        {toolMsg && <p style={{ marginTop: 10 }}>{toolMsg}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, paddingBottom: 100 },
  card: { background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 14 },
  textarea: { width: "100%", padding: 10, borderRadius: 10, marginTop: 10 },
  mainBtn: { width: "100%", padding: 12, background: "#FFD700", borderRadius: 12, marginTop: 10, fontWeight: "bold" },
  toolBtn: { width: "100%", padding: 10, marginTop: 8, background: "#FFD700", borderRadius: 10 },
  treatment: { whiteSpace: "pre-wrap", lineHeight: 1.6 },
  streakBox: { background: "#FFD700", color: "#000", padding: 10, borderRadius: 12, marginBottom: 14, textAlign: "center", fontWeight: "bold" }
};
