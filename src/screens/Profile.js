import React, { useState, useEffect } from "react";
import { FaCog, FaEdit, FaBook, FaInfoCircle, FaCoins } from "react-icons/fa";

// Progress ring component for XP
function ProgressRing({ progress }) {
  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#333"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#FFD700"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}

// Main Profile component
export default function Profile({ user, userStats = {}, setUserStats, setTab }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState(0);

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  const xp = userStats?.slPoints || 0;
  const level = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;

  const coins = userStats?.coins || 0;

  // Daily coin reward system
  const claimDailyCoins = () => {
    const today = new Date().toDateString();
    if (userStats?.lastCoinClaim === today) {
      alert("You already claimed today's reward.");
      return;
    }
    const updatedStats = { ...userStats, coins: coins + 10, lastCoinClaim: today };
    setUserStats(updatedStats);
    alert("You received 10 coins!");
  };

  // Calculate reading streak
  useEffect(() => {
    if (!userStats?.lastReadDates || userStats.lastReadDates.length === 0) {
      setStreak(0);
      return;
    }
    const today = new Date();
    let count = 0;
    const dates = [...userStats.lastReadDates].sort(
      (a, b) => new Date(a) - new Date(b)
    );
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = new Date(dates[i]);
      const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      if (diff === count) count++;
      else break;
    }
    setStreak(count);
  }, [userStats?.lastReadDates]);

  const stats = [
    { label: "Stories Read", value: userStats?.storiesRead || 0, info: "Total stories you've read." },
    { label: "Daily Streak", value: streak, info: "Read daily to maintain your streak." },
    { label: "SL Points", value: xp, info: "Earn points by reading stories." },
  ];

  const badges = [
    { id: 1, name: "First Reader", icon: "📖", unlocked: userStats?.storiesRead >= 1 },
    { id: 2, name: "Book Explorer", icon: "📚", unlocked: userStats?.storiesRead >= 10 },
    { id: 3, name: "Streak Master", icon: "🔥", unlocked: streak >= 7 },
    { id: 4, name: "Knowledge Seeker", icon: "🧠", unlocked: xp >= 200 },
  ];

  if (!user) {
    return <div style={{ color: "white", padding: 30 }}>Loading profile...</div>;
  }

  const handleSaveProfile = () => {
    alert("Profile updated!");
    setShowEditModal(false);
  };

  return (
    <div style={styles.container}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <h2>{user.displayName || "Your Name"}</h2>
        <button style={styles.settingsBtn} onClick={() => setShowSettings(true)}>
          <FaCog size={22} />
        </button>
      </div>

      {/* Avatar */}
      <div style={styles.avatarContainer}>
        <img src={user.photoURL || "https://via.placeholder.com/100"} alt="profile" style={styles.avatar} />
        <p style={styles.email}>{user.email}</p>
        <h3>⭐ Level {level}</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ProgressRing progress={xpProgress} />
        </div>
        <p>{xpProgress}/100 XP to next level</p>
      </div>

      {/* Coins & daily reward */}
      <div style={styles.coinBox}>
        <FaCoins size={20} />
        <span>{coins} Coins</span>
        <button style={styles.claimBtn} onClick={claimDailyCoins}>Daily Reward</button>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <h3>{stat.value}</h3>
              <FaInfoCircle size={14} style={{ marginLeft: 5, cursor: "pointer" }} title={stat.info} />
            </div>
            <p style={{ opacity: 0.7, fontSize: 12 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ marginTop: 30 }}>
        <h3>🏅 Achievements</h3>
        <div style={styles.badgeContainer}>
          {badges.map((badge) => (
            <div key={badge.id} style={{ ...styles.badge, background: badge.unlocked ? "#FFD700" : "#333", color: badge.unlocked ? "#000" : "#777" }}>
              <div style={{ fontSize: 22 }}>{badge.icon}</div>
              {badge.name}
            </div>
          ))}
        </div>
      </div>

      {/* Most read stories */}
      <div style={{ marginTop: 30 }}>
        <h3>🔥 Most Read Stories</h3>
        {userStats?.mostReadStories?.length > 0 ? (
          <ul>
            {userStats.mostReadStories.slice(0, 5).map((s) => (
              <li key={s.id}>{s.title} ({s.readCount})</li>
            ))}
          </ul>
        ) : <p style={{ opacity: 0.7 }}>No stories read yet.</p>}
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.actionBtn} onClick={() => setTab("stories")}>
          <FaBook /> My Stories
        </button>
        <button style={styles.actionBtn} onClick={() => setShowEditModal(true)}>
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Edit modal */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Profile</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
            <div style={styles.modalActions}>
              <button style={styles.saveBtn} onClick={handleSaveProfile}>Save</button>
              <button style={styles.cancelBtn} onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {showSettings && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Settings</h2>
            <button style={styles.settingItem}>Dark Mode</button>
            <button style={styles.settingItem}>Notifications</button>
            <button style={styles.settingItem}>Account</button>
            <button style={styles.cancelBtn} onClick={() => setShowSettings(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: { padding: 20, color: "#fff", background: "#0b0b0b", minHeight: "100vh", fontFamily: "system-ui" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  settingsBtn: { background: "none", border: "none", color: "#FFD700", cursor: "pointer" },
  avatarContainer: { marginTop: 20, textAlign: "center" },
  avatar: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover" },
  email: { opacity: 0.7 },
  coinBox: { marginTop: 20, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" },
  claimBtn: { background: "#FFD700", border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer" },
  statsContainer: { display: "flex", justifyContent: "space-around", marginTop: 30 },
  statCard: { background: "#1a1a1a", padding: 15, borderRadius: 12, width: "30%", textAlign: "center" },
  badgeContainer: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 },
  badge: { padding: 10, borderRadius: 10, minWidth: 80, textAlign: "center", fontSize: 12 },
  actions: { marginTop: 30, display: "flex", gap: 15 },
  actionBtn: { flex: 1, background: "#FFD700", color: "#000", border: "none", padding: "10px 15px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", fontWeight: "bold" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#1a1a1a", padding: 20, borderRadius: 15, width: 300, textAlign: "center" },
  settingItem: { display: "block", width: "100%", margin: "10px 0", padding: 10, background: "#333", color: "#fff", border: "none", borderRadius: 8 },
  cancelBtn: { marginTop: 10, background: "#FFD700", border: "none", padding: 10, borderRadius: 8, cursor: "pointer" },
  input: { width: "90%", margin: "10px 0", padding: 10, borderRadius: 10, border: "none" },
  modalActions: { display: "flex", justifyContent: "space-around", marginTop: 20 },
  saveBtn: { background: "#FFD700", color: "#000", border: "none", padding: "10px 15px", borderRadius: 10, cursor: "pointer" },
};
