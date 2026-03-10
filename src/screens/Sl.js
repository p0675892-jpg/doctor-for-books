import { useState } from "react";

// Example sign lessons
const aslLessons = [
  {
    id: 1,
    hook: "Learn to say Hello",
    lesson: "Raise your hand and wave.",
    tip: "Smile while signing.",
    practice: "Try greeting a friend with Hello.",
    image: "https://i.ibb.co/7Q8F0vZ/hello.png", // replace with your images
  },
  {
    id: 2,
    hook: "Learn Thank You",
    lesson: "Place fingers near lips and move forward.",
    tip: "Say it with gratitude.",
    practice: "Thank someone today.",
    image: "https://i.ibb.co/d7Y2F4V/thankyou.png",
  },
  {
    id: 3,
    hook: "Learn Sorry",
    lesson: "Make a fist and rub on chest.",
    tip: "Show sincerity.",
    practice: "Apologize with this sign when needed.",
    image: "https://i.ibb.co/pdsmJ6m/sorry.png",
  },
  {
    id: 4,
    hook: "Learn I Love You",
    lesson: "Raise hand, extend thumb, index, pinky.",
    tip: "Say it with heart.",
    practice: "Express love to a family member.",
    image: "https://i.ibb.co/Nj2Nz7q/ily.png",
  },
  // add more lessons up to billions in future...
];

export default function SL() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [section, setSection] = useState("ASL"); // "ASL", "Communication", "Morals", "Ethique"

  const lesson = aslLessons[currentLesson];

  const nextLesson = () => {
    setCurrentLesson((prev) => (prev + 1) % aslLessons.length);
  };

  const prevLesson = () => {
    setCurrentLesson((prev) => (prev - 1 + aslLessons.length) % aslLessons.length);
  };

  return (
    <div style={styles.container}>
      <h1>🤟 Sign Language (SL)</h1>
      <p style={{ opacity: 0.7 }}>Dr. E helps you learn, practice, and communicate with confidence.</p>

      {/* Bottom Section Tabs */}
      <div style={styles.tabRow}>
        {["ASL", "Communication", "Morals", "Éthique"].map((sec) => (
          <button
            key={sec}
            onClick={() => setSection(sec)}
            style={{
              ...styles.tabBtn,
              background: section === sec ? "#FFD700" : "#333",
              color: section === sec ? "#000" : "#fff",
            }}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Section Content */}
      {section === "ASL" && (
        <div style={styles.lessonCard}>
          <h3>{lesson.hook}</h3>
          <img src={lesson.image} alt={lesson.hook} style={styles.image} />
          <p><strong>Lesson:</strong> {lesson.lesson}</p>
          <p><strong>Tip:</strong> {lesson.tip}</p>
          <p><strong>Practice:</strong> {lesson.practice}</p>

          <div style={styles.navRow}>
            <button style={styles.navBtn} onClick={prevLesson}>⬅ Previous</button>
            <button style={styles.navBtn} onClick={nextLesson}>Next ➡</button>
          </div>
        </div>
      )}

      {section === "Communication" && (
        <div style={styles.lessonCard}>
          <h3>Communication Tips</h3>
          <p>🗣 Speak slowly and clearly.</p>
          <p>🤝 Use gestures and facial expressions.</p>
          <p>💛 Be patient and encouraging.</p>
          <p>Dr. E reminds you: Every student can communicate, you just need the right tools!</p>
        </div>
      )}

      {section === "Morals" && (
        <div style={styles.lessonCard}>
          <h3>Morals & Ethics</h3>
          <p>🌟 Respect everyone’s learning journey.</p>
          <p>🌟 Help peers when you can.</p>
          <p>🌟 Stay honest in your studies.</p>
          <p>Motivation: “Good character builds unstoppable students.” 💛</p>
        </div>
      )}

      {section === "Éthique" && (
        <div style={styles.lessonCard}>
          <h3>Éthique</h3>
          <p>🌍 Respect cultural differences in communication.</p>
          <p>🤝 Collaborate with integrity.</p>
          <p>💡 Dr. E says: Ethics strengthen your mind and your relationships.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20, paddingBottom: 100 },
  tabRow: { display: "flex", justifyContent: "space-around", marginBottom: 16 },
  tabBtn: { padding: 10, borderRadius: 20, border: "none", cursor: "pointer", minWidth: 80 },
  lessonCard: { background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 14 },
  navRow: { display: "flex", justifyContent: "space-between", marginTop: 16 },
  navBtn: { padding: 10, borderRadius: 12, background: "#FFD700", border: "none", cursor: "pointer", fontWeight: "bold" },
  image: { width: "100%", borderRadius: 12, marginBottom: 10 },
};
