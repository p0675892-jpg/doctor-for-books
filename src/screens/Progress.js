import React from "react";

export default function Progress({ doneCards, totalCards }) {
  const progressPercent = Math.min((doneCards / totalCards) * 100, 100);

  const styles = {
    container: { width: "80%", margin: "10px auto", background: "#333", borderRadius: 10, height: 12 },
    bar: { height: "100%", borderRadius: 10, background: "#FFD700", transition: "width 0.5s" },
    text: { textAlign: "center", marginTop: 5, color: "#fff" },
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={{ ...styles.bar, width: `${progressPercent}%` }} />
      </div>
      <p style={styles.text}>
        Progress: {doneCards}/{totalCards} cards
      </p>
    </div>
  );
}
