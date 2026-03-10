import { useState, useEffect } from "react";

// Example data for JSS and Uni
const TOPICS = {
  JSS: [
    { id: 1, title: "Math: Algebra Basics", summary: "Learn equations, solve simple algebra problems." },
    { id: 2, title: "Biology: Plant Cells", summary: "Understand the structure and function of plant cells." },
    { id: 3, title: "English: Essay Writing", summary: "Focus on grammar and sentence structure." }
  ],
  Uni: [
    { id: 1, title: "Math: Linear Algebra", summary: "Matrix operations, vector spaces, eigenvalues." },
    { id: 2, title: "Biology: Molecular Genetics", summary: "DNA, RNA, protein synthesis and regulation." },
    { id: 3, title: "English: Academic Writing", summary: "Focus on argument development and referencing." }
  ]
};

export default function Home({ user, setTab }) {
  const [level, setLevel] = useState("JSS"); // Default level
  const [continueLearning, setContinueLearning] = useState(null);

  // Load user info (mock) and continue learning
  useEffect(() => {
    // Example: decide level from user data
    if (user?.level) setLevel(user.level);

    const lastTopic = JSON.parse(localStorage.getItem("dfb_continue_learning")) || null;
    setContinueLearning(lastTopic);
  }, [user]);

  // When user clicks a topic to continue
  const startTopic = (topic) => {
    setContinueLearning(topic);
    localStorage.setItem("dfb_continue_learning", JSON.stringify(topic));
    setTab("ask"); // Could navigate to Ask tab or lesson page
  };

  // Motivational/emotional boost
  const motivations = [
    "💛 Every study session counts!",
    "🔥 Small steps every day lead to big results!",
    "💡 Keep going, you’re improving every day!"
  ];
  const motivation = motivations[Math.floor(Math.random() * motivations.length)];

  return (
    <div style={styles.container}>
      {/* Welcome */}
      <h1>Welcome back, {user?.displayName || "Student"}! 👋</h1>
      <p style={{ opacity: 0.7 }}>{motivation}</p>

      {/* Quick Revision Cards */}
      <h2>Quick Revision</h2>
      <div style={styles.cardsContainer}>
        {TOPICS[level].map((topic) => (
          <div key={topic.id} style={styles.card} onClick={() => startTopic(topic)}>
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      {continueLearning && (
        <div style={styles.card}>
          <h3>📌 Continue Learning</h3>
          <p>{continueLearning.title}</p>
          <button style={styles.continueBtn} onClick={() => startTopic(continueLearning)}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
    cursor: "pointer",
  },
  continueBtn: {
    marginTop: 8,
    padding: 10,
    width: "100%",
    borderRadius: 12,
    background: "#FFD700",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
