import { useState, useEffect } from "react";
import { recordWeakArea } from "../utils/weakTracker";

export default function Sign() {
  const [mode, setMode] = useState("menu");
  const [lesson, setLesson] = useState(null);
  const [message, setMessage] = useState("");
  const [xp, setXp] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem("dfb_xp")) || 0;
    setXp(savedXP);
  }, []);

  const addXP = () => {
    const newXP = xp + 8;
    setXp(newXP);
    localStorage.setItem("dfb_xp", newXP);
  };

  const level = Math.floor(xp / 100) + 1;

  // 🤟 SIGN LESSONS WITH REAL DEMONSTRATION IMAGES
  const signLessons = [
    {
      title: "Hello & Thank You",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/5/59/ASL_Hello.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e0/ASL_Thank_You.jpg",
      ],
      content:
        "Sign language relies on clear movement and facial expression. 'Hello' and 'Thank you' are foundational signs used daily.",
      question: "Which sign expresses gratitude?",
      options: ["Hello", "Thank you", "Welcome"],
      correct: "Thank you",
      type: "Sign Language",
    },
  ];

  // 🗣️ LINGUISTICS LESSONS
  const langLessons = [
    {
      title: "Word Power",
      content:
        "Prefixes change meaning dramatically. 'Un-' reverses meaning, 're-' implies repetition, 'pre-' refers to time before.",
      question: "What does 'preview' mean?",
      options: ["View before", "View again", "View wrongly"],
      correct: "View before",
      type: "Linguistics",
    },
  ];

  // 💛 LONG EMOTIONAL STORIES
  const emotionalStories = [
    {
      title: "The Quiet Student",
      text:
        "She rarely spoke in class. Not because she had nothing to say, but because words tangled before leaving her mouth. One day she practiced explaining simple ideas clearly. Weeks later, classmates began asking her for help. Her intelligence didn’t suddenly appear — it finally became visible. Communication didn’t change her mind. It changed how the world saw her.",
    },
    {
      title: "Misunderstood",
      text:
        "Two students had equal knowledge. One spoke confidently, the other hesitated. Teachers believed the confident one was smarter. In reality, clarity often outruns intelligence. Learning to express ideas doesn’t just improve grades — it reshapes opportunities.",
    },
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
      recordWeakArea(lesson.type, -1);

      setMessage("Correct. Skill confirmed 💛 +8 XP");
    } else {
      recordWeakArea(lesson.type, 2);

      setMessage("Hmm… accuracy matters. Try understanding, not guessing.");
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
          <p>Dr. E: Communication shapes how the world treats you ✨</p>

          <div style={styles.card} onClick={() => setMode("sign")}>
            🤟 Sign Language Class
          </div>

          <div style={styles.card} onClick={() => setMode("language")}>
            🗣️ Linguistics Class
          </div>

          <div style={styles.card} onClick={() => setMode("stories")}>
            💛 Emotional Stories
          </div>

          <div style={styles.card} onClick={() => setMode("insight")}>
            🧠 Communication Insights
          </div>
        </>
      )}

      {/* SIGN CLASS LIST */}
      {mode === "sign" && (
        <>
          <h2>Sign Language Class</h2>

          {signLessons.map((l, i) => (
            <div key={i} style={styles.card} onClick={() => startLesson(l)}>
              {l.title}
            </div>
          ))}

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}

      {/* LINGUISTICS CLASS LIST */}
      {mode === "language" && (
        <>
          <h2>Linguistics Class</h2>

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

          {lesson.images &&
            lesson.images.map((img, i) => (
              <img key={i} src={img} alt="" style={styles.image} />
            ))}

          <p>{lesson.content}</p>

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

          {message && <p style={{ marginTop: 12 }}>{message}</p>}

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </div>
      )}

      {/* STORIES */}
      {mode === "stories" && (
        <>
          <h2>Emotional Stories</h2>

          {emotionalStories.map((s, i) => (
            <div key={i} style={styles.card}>
              <h3>{s.title}</h3>
              <p style={{ lineHeight: 1.7 }}>{s.text}</p>
            </div>
          ))}

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}

      {/* INSIGHTS */}
      {mode === "insight" && (
        <>
          <div style={styles.card}>
            <p>Clear communication increases perceived intelligence.</p>
            <p>People trust confident speakers more.</p>
            <p>Understanding language improves thinking itself.</p>
          </div>

          <button onClick={() => setMode("menu")}>⬅️ Back</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20, paddingBottom: 100 },

  xpBox: {
    background: "#FFD700",
    color: "#000",
    padding: 12,
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

  image: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 10,
  },
};
