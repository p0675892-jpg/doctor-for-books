import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Progress from "./Progress";
import slModules from "../data/slModules"; // put your modules data here

export default function Sl() {
  const categories = [...new Set(slModules.map((m) => m.category))];
  const CARDS_PER_DAY = 10;

  const [category, setCategory] = useState("Alphabet");
  const [flippedCards, setFlippedCards] = useState([]);
  const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem("slProgress")) || {});
  const [flipCounts, setFlipCounts] = useState(() => JSON.parse(localStorage.getItem("slFlipCounts")) || {});

  // --- Update progress
  const updateProgress = (cat, newIndex) => {
    const newProgress = { ...progress, [cat]: newIndex };
    setProgress(newProgress);
    localStorage.setItem("slProgress", JSON.stringify(newProgress));
  };

  // --- Increment flip count
  const incrementFlipCount = (id) => {
    const newCounts = { ...flipCounts, [id]: (flipCounts[id] || 0) + 1 };
    setFlipCounts(newCounts);
    localStorage.setItem("slFlipCounts", JSON.stringify(newCounts));
  };

  // --- Filtered & daily cards
  const filteredModules = slModules.filter((m) => m.category === category);
  const startIndex = progress[category] || 0;
  const todaysCards = filteredModules.slice(startIndex, startIndex + CARDS_PER_DAY);

  // --- Toggle flip
  const toggleFlip = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((fid) => fid !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
      incrementFlipCount(id);
    }
  };

  // --- Handle next day automatically
  useEffect(() => {
    const lastSeenDate = localStorage.getItem("slLastSeen") || "";
    const today = new Date().toDateString();
    if (lastSeenDate !== today) {
      localStorage.setItem("slLastSeen", today);
      updateProgress(category, startIndex + CARDS_PER_DAY);
    }
  }, [category]);

  // --- Done cards for progress
  const totalCards = filteredModules.length;
  const doneCards = Math.min(startIndex, totalCards);

  // --- Styles for tabs
  const styles = {
    tabs: { display: "flex", justifyContent: "center", marginBottom: 20, gap: 10, flexWrap: "wrap" },
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
    modules: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 20 },
    header: { textAlign: "center", marginBottom: 20, fontSize: 24, fontWeight: "bold", color: "#fff" },
    container: { padding: 20, fontFamily: "system-ui, sans-serif", color: "#fff", background: "#111", minHeight: "100vh" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Language Hub 👐</h2>

      {/* Category Tabs */}
      <div style={styles.tabs}>
        {categories.map((cat) => (
          <button key={cat} style={styles.tabBtn(cat === category)} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Progress */}
      <Progress doneCards={doneCards} totalCards={totalCards} />

      {/* Cards */}
      <div style={styles.modules}>
        {todaysCards.map((module) => (
          <Card
            key={module.id}
            module={module}
            flipped={flippedCards.includes(module.id)}
            onFlip={toggleFlip}
            flipCount={flipCounts[module.id]}
          />
        ))}
      </div>
    </div>
  );
}
