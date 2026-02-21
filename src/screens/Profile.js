import { useState, useEffect } from "react";

export default function Profile({ setTab }) {
  const [name, setName] = useState(
    localStorage.getItem("dfb_name") || "Student"
  );
  const [edit, setEdit] = useState(false);

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const storedXP =
      parseInt(localStorage.getItem("dfb_xp")) || 0;
    setXp(storedXP);

    const storedStreak =
      parseInt(localStorage.getItem("dfb_streak")) || 1;
    setStreak(storedStreak);
  }, []);

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  const saveName = () => {
    localStorage.setItem("dfb_name", name);
    setEdit(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile 👤</h1>

      {/* NAME */}
      {edit ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={saveName}>Save</button>
        </>
      ) : (
        <>
          <h2>{name}</h2>
          <button onClick={() => setEdit(true)}>
            ✏️ Edit Name
          </button>
        </>
      )}

      {/* LEVEL */}
      <div style={styles.card}>
        ⭐ Level {level}
      </div>

      {/* XP BAR */}
      <div style={styles.card}>
        <p>{xp} XP</p>

        <div style={styles.bar}>
          <div
            style={{
              ...styles.fill,
              width: progress + "%"
            }}
          />
        </div>

        <small>
          {progress}% to next level
        </small>
      </div>

      {/* STREAK */}
      <div style={styles.card}>
        🔥 {streak} day streak
      </div>

      {/* SETTINGS */}
      <button onClick={() => setTab("settings")}>
        ⚙️ Settings
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#1a1a1a",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },

  bar: {
    background: "#333",
    height: 12,
    borderRadius: 10,
    overflow: "hidden"
  },

  fill: {
    background: "#FFD700",
    height: "100%"
  }
};