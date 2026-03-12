// screens/SL.js
import React from "react";
import { FaBook, FaHandsHelping, FaUsers, FaChalkboardTeacher, FaKeyboard } from "react-icons/fa";

const sections = [
  {
    title: "ASL Classes",
    description: "Learn American Sign Language with guided lessons and interactive videos.",
    icon: <FaChalkboardTeacher size={24} />,
  },
  {
    title: "Ethics",
    description: "Understand the ethical principles when communicating in sign language.",
    icon: <FaUsers size={24} />,
  },
  {
    title: "Communication Hub",
    description: "Connect with other learners, ask questions, and share experiences.",
    icon: <FaHandsHelping size={24} />,
  },
  {
    title: "Resources",
    description: "Access guides, flashcards, and dictionaries to strengthen your skills.",
    icon: <FaBook size={24} />,
  },
  {
    title: "Practice Exercises",
    description: "Test your knowledge with interactive exercises and quizzes.",
    icon: <FaKeyboard size={24} />,
  },
];

export default function SL() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sign Language Hub 🤟</h1>
      <p style={styles.subheader}>
        Dive into learning, connecting, and practicing sign language in a meaningful way.
      </p>

      <div style={styles.cardsWrapper}>
        {sections.map((s, i) => (
          <Card key={i} title={s.title} description={s.description} icon={s.icon} />
        ))}
      </div>
    </div>
  );
}

// ---------- CARD COMPONENT ----------
function Card({ title, description, icon }) {
  return (
    <div
      style={styles.card}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={styles.iconWrapper}>{icon}</div>
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardDescription}>{description}</div>
    </div>
  );
}

// ---------- INLINE STYLES ----------
const styles = {
  container: {
    padding: 20,
    background: "#0b0b0b",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "system-ui",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#111",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconWrapper: {
    background: "#222",
    borderRadius: "50%",
    padding: 15,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
  },
};
