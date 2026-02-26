import { useState, useEffect } from "react";

export default function Sign() {
  const [mode, setMode] = useState("menu");
  const [lesson, setLesson] = useState(null);
  const [message, setMessage] = useState("");
  const [xp, setXp] = useState(0);
  const [answered, setAnswered] = useState(false);

  // ⭐ LOAD XP
  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem("dfb_xp")) || 0;
    setXp(savedXP);
  }, []);

  const addXP = () => {
    const newXP = xp + 15; // HARDER XP
    setXp(newXP);
    localStorage.setItem("dfb_xp", newXP);
  };

  const level = Math.floor(xp / 100) + 1;

  // 🤟 SIGN LESSONS
  const signLessons = [
    {
      title: "👋 Greetings",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/ASL_Alphabet.jpg/800px-ASL_Alphabet.jpg",
      content:
        "Sign language is a full visual language. Your hands, face, and body communicate meaning.",
      question: "Which sign means THANK YOU?",
      options: ["👋", "🙏", "👍"],
      correct: "🙏",
    },
  ];

  // ❤️ EMOTIONAL STORIES
  const stories = [
    "A deaf child once said: 'When someone learns my language, I stop feeling invisible.'",
    "Communication is not sound — it is connection.",
    "Every sign you learn is a bridge to another human.",
  ];

  const startLesson = (l) => {
    setLesson(l);
    setMode("class");
    setMessage("");
    setAnswered(false);
  };

  const checkAnswer = (choice) => {
    if (answered) return;

    setAnswered(true);

    if (choice === lesson.correct) {
      addXP();

      const praises = [
        "Impressive… not many get that right 😏 +15 XP",
        "Sharp mind detected 🧠 +15 XP",
        "Dr. E approves. That wasn't guesswork. +15 XP",
        "You're dangerous… in a good way 🔥 +15 XP",
      ];

      setMessage(praises[Math.floor(Math.random() * praises.length)]);
    } else {
      const fails = [
        "Hmm… are you really smart or just guessing? 😌",
        "Confidence ≠ correctness. Try learning first.",
        "Your brain hesitated there. Train it.",
        "Wrong — but failure builds intelligence.",
      ];

      setMessage(fails[Math.floor(Math.random() * fails.length)]);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Communication Academy 🌍</h1>

      <div style={styles.xpBox}>
        ⭐ Level {level} — {xp} XP
      </div>

      {/* MAIN MENU */}
      {mode === "menu" && (
        <>
          <p>Dr. E: Communication is a superpower ✨</p>

          <div style={styles.card} onClick={() => setMode("sign")}>
            🤟 Sign Language Training
          </div>

          <div style={styles.card} onClick={() => setMode("stories")}>
            ❤️ Emotional Stories
          </div>

          <div style={styles.card} onClick={() => setMode("insight")}>
            🧠 Communication Insights
          </div>
        </>
      )}

      {/* SIGN LIST */}
      {mode === "sign" && (
        <>
          <h2>Sign Training</h2>

          {signLessons.map((l, i) => (
            <div key={i} style={styles.card} onClick={() => startLesson(l)}>
              {l.title}
            </div>
          ))}

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}

      {/* CLASS VIEW */}
      {mode === "class" && lesson && (
        <div style={styles.lessonCard}>
          <h2>{lesson.title}</h2>

          {/* BIG IMAGE */}
          <img src={lesson.image} style={styles.image} alt="Sign lesson" />

          <p style={{ marginTop: 10 }}>{lesson.content}</p>

          <h3>{lesson.question}</h3>

          {lesson.options.map((o, i) => (
            <button
              key={i}
              style={styles.option}
              onClick={() => checkAnswer(o)}
              disabled={answered}
            >
              {o}
            </button>
          ))}

          {message && <p style={styles.message}>{message}</p>}

          <button style={{ marginTop: 12 }} onClick={() => setMode("menu")}>
            ⬅️ Back to Menu
          </button>
        </div>
      )}

      {/* STORIES */}
      {mode === "stories" && (
        <>
          <div style={styles.lessonCard}>
            <h2>❤️ Human Stories</h2>
            <p>{stories[Math.floor(Math.random() * stories.length)]}</p>
          </div>

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}

      {/* INSIGHTS */}
      {mode === "insight" && (
        <>
          <div style={styles.lessonCard}>
            <p>
              People who communicate clearly are perceived as smarter, more
              confident, and more trustworthy.
            </p>
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
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    background: "#1a1a1a",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    cursor: "pointer",
    fontSize: 18,
    textAlign: "center",
  },

  lessonCard: {
    background: "#1a1a1a",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },

  image: {
    width: "100%",
    borderRadius: 12,
    marginTop: 10,
  },

  option: {
    display: "block",
    marginTop: 10,
    padding: 14,
    width: "100%",
    fontSize: 16,
  },

  message: {
    marginTop: 12,
    fontWeight: "bold",
  },
};
