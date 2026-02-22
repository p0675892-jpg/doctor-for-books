import { useState, useEffect } from "react";

export default function Sign() {
  const [mode, setMode] = useState("menu");
  const [lesson, setLesson] = useState(null);
  const [message, setMessage] = useState("");
  const [xp, setXp] = useState(0);

  // ⭐ LOAD XP
  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem("dfb_xp")) || 0;
    setXp(savedXP);
  }, []);

  // ⭐ ADD XP
  const addXP = () => {
    const newXP = xp + 10;
    setXp(newXP);
    localStorage.setItem("dfb_xp", newXP);
  };

  const level = Math.floor(xp / 100) + 1;

  // 🤟 SIGN LESSONS
  const signLessons = [
    {
      title: "👋 Greetings",
      content: ["👋 Hello", "🙏 Thank you", "👍 Good", "🤝 Welcome"],
      question: "Which sign means THANK YOU?",
      options: ["👋", "🙏", "👍"],
      correct: "🙏",
    },
  ];

  // 🗣️ LANGUAGE LESSONS
  const langLessons = [
    {
      title: "📚 Word Power",
      content: [
        "Prefix 'un-' means NOT",
        "Prefix 're-' means AGAIN",
        "Prefix 'pre-' means BEFORE",
      ],
      question: "What does 'rewrite' mean?",
      options: ["Write badly", "Write again", "Write quickly"],
      correct: "Write again",
    },
    {
      title: "🧠 Grammar Sense",
      content: ["I am bored = I feel bored", "I am boring = I cause boredom"],
      question: "Which means you feel uninterested?",
      options: ["I am boring", "I am bored", "I am boring myself"],
      correct: "I am bored",
    },
  ];

  const startLesson = (l) => {
    setLesson(l);
    setMode("class");
    setMessage("");
  };

  const checkAnswer = (choice) => {
    if (choice === lesson.correct) {
      addXP();

      const praises = [
        "Excellent! 💛",
        "You’re learning fast 🚀",
        "Dr. E is proud 😎",
        "Communication unlocked ✨",
      ];

      setMessage(
        praises[Math.floor(Math.random() * praises.length)] + " +10 XP"
      );
    } else {
      setMessage("Not quite 😅 Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Communication Academy 🌍</h1>

      {/* XP + LEVEL */}
      <div style={styles.xpBox}>
        ⭐ Level {level} — {xp} XP
      </div>

      {/* MAIN MENU */}
      {mode === "menu" && (
        <>
          <p>Dr. E: Communication is a superpower ✨</p>

          <div style={styles.card} onClick={() => setMode("sign")}>
            🤟 Sign Language Lessons
          </div>

          <div style={styles.card} onClick={() => setMode("language")}>
            🗣️ Language & Linguistics
          </div>

          <div style={styles.card} onClick={() => setMode("insight")}>
            🧠 Communication Insights
          </div>
        </>
      )}

      {/* SIGN LIST */}
      {mode === "sign" && (
        <>
          <h2>Sign Lessons</h2>

          {signLessons.map((l, i) => (
            <div key={i} style={styles.card} onClick={() => startLesson(l)}>
              {l.title}
            </div>
          ))}

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}

      {/* LANGUAGE LIST */}
      {mode === "language" && (
        <>
          <h2>Language Lessons</h2>

          {langLessons.map((l, i) => (
            <div key={i} style={styles.card} onClick={() => startLesson(l)}>
              {l.title}
            </div>
          ))}

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}

      {/* CLASS VIEW */}
      {mode === "class" && lesson && (
        <div style={styles.card}>
          <h2>{lesson.title}</h2>

          {lesson.content.map((c, i) => (
            <p key={i}>{c}</p>
          ))}

          <h3>{lesson.question}</h3>

          {lesson.options.map((o, i) => (
            <button
              key={i}
              style={styles.option}
              onClick={() => checkAnswer(o)}
            >
              {o}
            </button>
          ))}

          {message && <p style={{ marginTop: 10 }}>{message}</p>}

          <button style={{ marginTop: 12 }} onClick={() => setMode("menu")}>
            ⬅️ Back to Menu
          </button>
        </div>
      )}

      {/* INSIGHTS */}
      {mode === "insight" && (
        <>
          <div style={styles.card}>
            <p>
              Clear communication improves grades, confidence, and leadership 🌱
            </p>

            <p>
              People who express ideas clearly are often seen as smarter — even
              when knowledge is equal.
            </p>

            <p>Understanding language improves thinking itself 🧠</p>
          </div>

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
  },

  xpBox: {
    background: "#FFD700",
    color: "#000",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    fontWeight: "bold",
  },
  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    cursor: "pointer",
  },

  option: {
    display: "block",
    marginTop: 8,
    padding: 12,
    width: "100%",
  },
};