import { useState, useEffect } from "react";

// Example badges database (could later be dynamic per user)
const BADGES = [
  { id: 1, title: "First Revision", description: "Completed your first topic", level: "JSS" },
  { id: 2, title: "Weekly Streak", description: "Studied 7 days in a row", level: "JSS" },
  { id: 3, title: "First Quiz", description: "Completed your first quiz", level: "Uni" },
  { id: 4, title: "Consistency Pro", description: "Studied 30 days in a row", level: "Uni" },
];

export default function Profile({ user, setTab }) {
  const [level, setLevel] = useState("JSS");
  const [streak, setStreak] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);

  // Load user info and progress
  useEffect(() => {
    if (user?.level) setLevel(user.level);

    // Load streaks from localStorage (could be per user)
    const s = parseInt(localStorage.getItem(`${user.uid}_streak`)) || 0;
    setStreak(s);

    // Load badges earned
    const badges = JSON.parse(localStorage.getItem(`${user.uid}_badges`)) || [];
    setEarnedBadges(badges);
  }, [user]);

  // Mock function to simulate earning a badge
  const earnBadge = (badge) => {
    if (!earnedBadges.includes(badge.id)) {
      const newBadges = [...earnedBadges, badge.id];
      setEarnedBadges(newBadges);
      localStorage.setItem(`${user.uid}_badges`, JSON.stringify(newBadges));
    }
  };

  return (
    <div style={styles.container}>
      <h1>Profile – {user?.displayName || "Student"}</h1>
      <p style={{ opacity: 0.7 }}>Level: {level}</p>

      {/* Streak */}
      <div style={styles.streakBox}>
        🔥 Current Streak: {streak} day{streak !== 1 && "s"}
      </div>

      {/* Earned Badges */}
      <h2>🏆 Badges Earned</h2>
      {earnedBadges.length === 0 && <p style={{ opacity: 0.7 }}>No badges yet. Keep learning!</p>}
      <div style={styles.badgesContainer}>
        {BADGES.filter(b => b.level === level && earnedBadges.includes(b.id)).map(b => (
          <div key={b.id} style={styles.badgeCard}>
            <h3>{b.title}</h3>
            <p>{b.description}</p>
          </div>
        ))}
      </div>

      {/* Example to earn badge manually (demo/testing) */}
      <div style={{ marginTop: 20 }}>
        <h2>🎯 Try Earning a Badge</h2>
        {BADGES.filter(b => b.level === level).map(b => (
          <button key={b.id} style={styles.earnBtn} onClick={() => earnBadge(b)}>
            Earn "{b.title}"
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  streakBox: {
    background: "#FFD700",
    color: "#000",
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  badgesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  badgeCard: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
  },
  earnBtn: {
    padding: 10,
    marginTop: 8,
    width: "100%",
    background: "#FFD700",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
