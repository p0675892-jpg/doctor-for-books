import React, { useState, useEffect } from "react";

// ------------------ DATA ------------------
const slModules = [
  { id: "asl_001", category: "Alphabet", front: "A", back: "Closed fist with thumb on the side. Used in many words starting with A." },
  { id: "asl_002", category: "Alphabet", front: "B", back: "Fingers extended straight, thumb across palm. Example: 'Book'." },
  { id: "asl_003", category: "Alphabet", front: "C", back: "Hand forms a 'C' shape. Common in words like 'Cat'." },
  { id: "asl_004", category: "Alphabet", front: "D", back: "Index finger up, other fingers curled. Example: 'Dog'." },
  { id: "asl_005", category: "Alphabet", front: "E", back: "Fingers curled, thumb across palm. Example: 'Elephant'." },
  { id: "asl_006", category: "Alphabet", front: "F", back: "Thumb + index finger touch, others straight. Example: 'Friend'." },
  { id: "asl_007", category: "Alphabet", front: "G", back: "Thumb and index finger extended, sideways. Example: 'Go'." },
  { id: "asl_008", category: "Alphabet", front: "H", back: "Index and middle fingers extended, sideways. Example: 'Hello'." },
  { id: "asl_009", category: "Alphabet", front: "I", back: "Little finger up, others folded. Example: 'Ice'." },
  { id: "asl_010", category: "Alphabet", front: "J", back: "Little finger draws a 'J'. Example: 'Jump'." },
  // Phrases
  { id: "phrases_001", category: "Phrases", front: "Hello", back: "Wave your hand near the side of your head." },
  { id: "phrases_002", category: "Phrases", front: "Thank you", back: "Flat hand from chin outward." },
  // Ethics
  { id: "ethics_001", category: "Ethics", front: "Getting Attention", back: "Always tap lightly or wave before starting a conversation with a Deaf person." },
  { id: "ethics_002", category: "Ethics", front: "Respect Space", back: "Never touch someone's hearing device or personal space without permission." },
  // Culture
  { id: "culture_001", category: "Culture", front: "ASL Fun Fact", back: "ASL has regional variations, just like spoken languages." },
];

// ------------------ COMPONENT ------------------
export default function Sl() {
  const categories = [...new Set(slModules.map(m => m.category))];
  const CARDS_PER_DAY = 10;

  // --- States ---
  const [category, setCategory] = useState("Alphabet");
  const [flippedCards, setFlippedCards] = useState([]);
  const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem("slProgress")) || {});
  const [flipCounts, setFlipCounts] = useState(() => JSON.parse(localStorage.getItem("slFlipCounts")) || {});

  // --- Save progress & flips to LocalStorage ---
  const updateProgress = (cat, newIndex) => {
    const newProgress = { ...progress, [cat]: newIndex };
    setProgress(newProgress);
    localStorage.setItem("slProgress", JSON.stringify(newProgress));
  };

  const incrementFlipCount = (id) => {
    const newCounts = { ...flipCounts, [id]: (flipCounts[id] || 0) + 1 };
    setFlipCounts(newCounts);
    localStorage.setItem("slFlipCounts", JSON.stringify(newCounts));
  };

  // --- Daily cards ---
  const filteredModules = slModules.filter(m => m.category === category);
  const startIndex = progress[category] || 0;
  const todaysCards = filteredModules.slice(startIndex, startIndex + CARDS_PER_DAY);

  // --- Progress bar ---
  const totalCards = filteredModules.length;
  const doneCards = Math.min(startIndex, totalCards);
  const progressPercent = Math.floor((doneCards / totalCards) * 100);

  // --- Toggle flip ---
  const toggleFlip = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter(fid => fid !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
      incrementFlipCount(id);
    }
  };

  // --- Handle next day automatically ---
  useEffect(() => {
    const lastSeenDate = localStorage.getItem("slLastSeen") || "";
    const today = new Date().toDateString();
    if (lastSeenDate !== today) {
      localStorage.setItem("slLastSeen", today);
      // Move start index to next batch automatically
      updateProgress(category, startIndex + CARDS_PER_DAY);
    }
  }, [category]); // runs when category changes

  // ------------------ STYLES ------------------
  const styles = {
    container: { padding: 20, fontFamily: "system-ui, sans-serif", color: "#fff", background: "#111", minHeight: "100vh" },
    header: { textAlign: "center", marginBottom: 20, fontSize: 24, fontWeight: "bold" },
    tabs: { display: "flex", justifyContent: "center", marginBottom: 20, gap: 10, flexWrap: "wrap" },
    tabBtn: (active) => ({ padding: "10px 20px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: "bold", background: active ? "#FFD700" : "#333", color: active ? "#000" : "#fff", transition: "0.3s" }),
    modules: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 20 },
    card: { perspective: 1000 },
    cardInner: (flipped) => ({ position: "relative", width: "100%", paddingTop: "100%", transformStyle: "preserve-3d", transition: "transform 0.6s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", cursor: "pointer" }),
    cardFace: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backfaceVisibility: "hidden", borderRadius: 15, padding: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.3)", textAlign: "center", fontSize: 16 },
    cardFront: { background: "#333", color: "#FFD700", fontWeight: "bold" },
    cardBack: { background: "#FFD700", color: "#000", transform: "rotateY(180deg)" },
    progressBarContainer: { width: "80%", margin: "10px auto", background: "#333", borderRadius: 10, height: 12 },
    progressBar: { height: "100%", borderRadius: 10, background: "#FFD700", transition: "width 0.5s" },
    flipCount: { fontSize: 12, marginTop: 5, color: "#FFD" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Language Hub 👐</h2>

      {/* Category Tabs */}
      <div style={styles.tabs}>
        {categories.map(cat => (
          <button key={cat} style={styles.tabBtn(cat === category)} onClick={() => setCategory(cat)}>{cat}</button>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progressPercent}%` }} />
      </div>
      <p style={{ textAlign: "center", marginBottom: 20 }}>Progress: {doneCards}/{totalCards} cards</p>

      {/* Modules */}
      <div style={styles.modules}>
        {todaysCards.map(module => (
          <div key={module.id} style={styles.card} onClick={() => toggleFlip(module.id)}>
            <div style={styles.cardInner(flippedCards.includes(module.id))}>
              <div style={{ ...styles.cardFace, ...styles.cardFront }}>
                <p>{module.front}</p>
              </div>
              <div style={{ ...styles.cardFace, ...styles.cardBack }}>
                <p>{module.back}</p>
              </div>
            </div>
            <p style={styles.flipCount}>Flipped: {flipCounts[module.id] || 0} times</p>
          </div>
        ))}
      </div>
    </div>
  );
}
