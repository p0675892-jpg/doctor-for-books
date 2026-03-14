import React, { useState } from "react";

// Real SL structure (ready for deployment)
const slModules = [
  {
    id: "asl_001",
    category: "Alphabet",
    front: "A",
    back: "Closed fist with thumb on the side. Used in many words starting with A.",
  },
  {
    id: "asl_002",
    category: "Alphabet",
    front: "B",
    back: "Fingers extended straight, thumb across palm. Example: 'Book'.",
  },
  {
    id: "asl_003",
    category: "Alphabet",
    front: "C",
    back: "Hand forms a 'C' shape. Common in words like 'Cat'.",
  },
  {
    id: "phrases_001",
    category: "Phrases",
    front: "Hello",
    back: "Wave your hand near the side of your head.",
  },
  {
    id: "phrases_002",
    category: "Phrases",
    front: "Thank you",
    back: "Flat hand from chin outward.",
  },
  {
    id: "ethics_001",
    category: "Ethics",
    front: "Getting Attention",
    back: "Always tap lightly or wave before starting a conversation with a Deaf person.",
  },
  {
    id: "culture_001",
    category: "Culture",
    front: "ASL Fun Fact",
    back: "ASL has regional variations, just like spoken languages.",
  },
];

export default function Sl() {
  const [category, setCategory] = useState("Alphabet");
  const [flippedCards, setFlippedCards] = useState([]);

  const filteredModules = slModules.filter((m) => m.category === category);

  const toggleFlip = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((fid) => fid !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  // ---------- STYLES ----------
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "system-ui, sans-serif",
      color: "#fff",
      background: "#111",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
      fontSize: 24,
      fontWeight: "bold",
    },
    tabs: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
      gap: 10,
      flexWrap: "wrap",
    },
    tabBtn: (active) => ({
      padding: "10px 20px",
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      background: active ? "#FFD700" : "#333",
      color: active ? "#000" : "#fff",
      transition: "0.3s",
    }),
    modules: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: 20,
    },
    card: {
      perspective: 1000,
    },
    cardInner: (flipped) => ({
      position: "relative",
      width: "100%",
      paddingTop: "100%", // Square aspect ratio
      transformStyle: "preserve-3d",
      transition: "transform 0.6s",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      cursor: "pointer",
    }),
    cardFace: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backfaceVisibility: "hidden",
      borderRadius: 15,
      padding: 10,
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      textAlign: "center",
      fontSize: 16,
    },
    cardFront: {
      background: "#333",
      color: "#FFD700",
      fontWeight: "bold",
    },
    cardBack: {
      background: "#FFD700",
      color: "#000",
      transform: "rotateY(180deg)",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Language Hub 👐</h2>

      {/* Category Tabs */}
      <div style={styles.tabs}>
        {["Alphabet", "Phrases", "Ethics", "Culture"].map((cat) => (
          <button
            key={cat}
            style={styles.tabBtn(cat === category)}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules */}
      <div style={styles.modules}>
        {filteredModules.map((module) => (
          <div key={module.id} style={styles.card} onClick={() => toggleFlip(module.id)}>
            <div style={styles.cardInner(flippedCards.includes(module.id))}>
              <div style={{ ...styles.cardFace, ...styles.cardFront }}>
                <p>{module.front}</p>
              </div>
              <div style={{ ...styles.cardFace, ...styles.cardBack }}>
                <p>{module.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
