import { useState, useEffect } from "react";

// Example SL phrases database
const SL_DB = [
  {
    id: 1,
    level: "JSS",
    sections: [
      "📌 Hook: Learn to greet your friend in sign language!",
      "🤟 Lesson: Sign 'Hello' by raising your hand with palm facing out and wave.",
      "💡 Tip: Smile while signing, it makes your greeting friendlier!",
      "❓ Practice: Try signing 'Hello' to a family member now."
    ]
  },
  {
    id: 2,
    level: "JSS",
    sections: [
      "📌 Hook: Express 'Thank you' in sign language",
      "🤟 Lesson: Place your fingers on your chin and move them forward.",
      "💡 Tip: Repeat daily for muscle memory.",
      "❓ Practice: Thank someone today using this sign!"
    ]
  },
  {
    id: 3,
    level: "Uni",
    sections: [
      "📌 Hook: Complex phrase: 'I am studying for exams!'",
      "🤟 Lesson: Combine 'I', 'Study', 'Exam' signs sequentially.",
      "💡 Tip: Break it into small gestures first, then combine.",
      "❓ Practice: Record yourself signing the phrase."
    ]
  },
  {
    id: 4,
    level: "Uni",
    sections: [
      "📌 Hook: Express emotion: 'I feel happy today!'",
      "🤟 Lesson: Sign 'I', 'Feel', 'Happy' with proper facial expression.",
      "💡 Tip: Facial expression is key in sign language.",
      "❓ Practice: Sign to a friend and ask them if they understand."
    ]
  }
];

export default function SL({ userLevel = "JSS" }) {
  const [phrase, setPhrase] = useState(null);
  const [seenPhrases, setSeenPhrases] = useState([]);
  const [motivation, setMotivation] = useState("");

  // Load seen phrases from localStorage
  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem("dfb_seen_sl")) || [];
    setSeenPhrases(seen);
  }, []);

  // Pick a new phrase
  const pickPhrase = () => {
    const available = SL_DB.filter(
      (s) => s.level === userLevel && !seenPhrases.includes(s.id)
    );

    const finalList = available.length > 0 ? available : SL_DB.filter(s => s.level === userLevel);

    const chosen = finalList[Math.floor(Math.random() * finalList.length)];
    setPhrase(chosen);

    // Save as seen
    const newSeen = [...seenPhrases, chosen.id];
    localStorage.setItem("dfb_seen_sl", JSON.stringify(newSeen));
    setSeenPhrases(newSeen);

    // Motivational Dr. E message
    const messages = [
      "💛 Keep practicing! Small steps lead to mastery.",
      "🔥 Great job! Every gesture counts.",
      "💡 Consistency makes you a pro in sign language!"
    ];
    setMotivation(messages[Math.floor(Math.random() * messages.length)]);
  };

  // On first load, pick a phrase
  useEffect(() => {
    pickPhrase();
  }, []);

  if (!phrase) return <p>Loading signs…</p>;

  return (
    <div style={styles.container}>
      <h1>SL – Sign Language 🤟</h1>

      {phrase.sections.map((sec, i) => (
        <div key={i} style={styles.card}>
          <p>{sec}</p>
        </div>
      ))}

      {motivation && (
        <p style={styles.motivation}>{motivation}</p>
      )}

      <button style={styles.nextBtn} onClick={pickPhrase}>
        🔄 Next Sign / Phrase
      </button>

      <p style={styles.footer}>
        Daily practice helps you become fluent! 💪
      </p>
    </div>
  );
}

// ---------- STYLES ----------
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
  nextBtn: {
    width: "100%",
    padding: 12,
    background: "#FFD700",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
  motivation: {
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic",
    color: "#FFD700",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.8,
  },
};
