import React from "react";

export default function Card({ module, flipped, onFlip, flipCount }) {
  const styles = {
    card: { perspective: 1000 },
    cardInner: {
      position: "relative",
      width: "100%",
      paddingTop: "100%", // square
      transformStyle: "preserve-3d",
      transition: "transform 0.6s",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      cursor: "pointer",
    },
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
    front: { background: "#333", color: "#FFD700", fontWeight: "bold" },
    back: { background: "#FFD700", color: "#000", transform: "rotateY(180deg)" },
    flipCount: { fontSize: 12, marginTop: 5, color: "#FFD" },
  };

  return (
    <div style={styles.card} onClick={() => onFlip(module.id)}>
      <div style={styles.cardInner}>
        <div style={{ ...styles.cardFace, ...styles.front }}>
          {module.front}
        </div>
        <div style={{ ...styles.cardFace, ...styles.back }}>
          {module.back}
        </div>
      </div>
      <p style={styles.flipCount}>Flipped: {flipCount || 0} times</p>
    </div>
  );
}
