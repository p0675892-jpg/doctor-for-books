import React, { useState, useEffect } from "react";
import { FaCog, FaEdit, FaBook, FaInfoCircle } from "react-icons/fa";

// Fully upgraded Profile component with tooltips/microcopy
export default function Profile({ user, userStats, setUserStats, setTab }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [streak, setStreak] = useState(0);

  // Calculate streak based on lastReadDates
  useEffect(() => {
    if (userStats.lastReadDates && userStats.lastReadDates.length > 0) {
      const today = new Date();
      let count = 0;
      for (let i = userStats.lastReadDates.length - 1; i >= 0; i--) {
        const date = new Date(userStats.lastReadDates[i]);
        const diff = (today - date) / (1000 * 60 * 60 * 24);
        if (diff <= count) count++;
        else break;
      }
      setStreak(count);
    }
  }, [userStats.lastReadDates]);

  // Dummy edit profile data
  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSaveProfile = () => {
    // Here you can integrate real save logic (Firebase/Auth)
    alert("Profile updated!");
    setShowEditModal(false);
  };

  // Stats with tooltips/microcopy
  const stats = [
    {
      label: "Stories Read",
      value: userStats.storiesRead || 0,
      info: "Total stories you've read so far. Click a story in Most Read to view it again!",
    },
    {
      label: "Daily Streak",
      value: streak,
      info: "Read at least one story each day to maintain your streak.",
    },
    {
      label: "SL Points",
      value: userStats.slPoints || 0,
      info: "Earn points by reading stories, flipping cards, and daily practice.",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <h2 style={styles.username}>{user.displayName || "Your Name"}</h2>
        <button style={styles.settingsBtn} onClick={() => alert("Go to Settings")}>
          <FaCog size={22} />
        </button>
      </div>

      {/* Profile Avatar */}
      <div style={styles.avatarContainer}>
        <img
          src={user.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          style={styles.avatar}
        />
        <p style={styles.email}>{user.email}</p>
      </div>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statHeader}>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <FaInfoCircle
                size={16}
                style={{ marginLeft: 6, cursor: "pointer" }}
                title={stat.info} // Hover tooltip for desktop
                onClick={() => alert(stat.info)} // Tap tooltip for mobile
              />
            </div>
            <p style={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Most Read Stories */}
      <div style={{ marginTop: 30 }}>
        <h3>
          🔥 Most Read Stories{" "}
          <FaInfoCircle
            size={14}
            title="These are the stories you read most. Click on a title to read again!"
            style={{ cursor: "pointer" }}
            onClick={() =>
              alert("These are the stories you read most. Click on a title to read again!")
            }
          />
        </h3>
        {userStats.mostReadStories && userStats.mostReadStories.length > 0 ? (
          <ul>
            {userStats.mostReadStories.slice(0, 5).map((s) => (
              <li
                key={s.id}
                style={{ cursor: "pointer" }}
                onClick={() => alert(`Open story: ${s.title}`)}
              >
                {s.title} ({s.readCount})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ opacity: 0.7 }}>No stories read yet.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button style={styles.actionBtn} onClick={() => setTab("stories")}>
          <FaBook /> My Stories
        </button>
        <button style={styles.actionBtn} onClick={() => setShowEditModal(true)}>
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <div style={styles.modalActions}>
              <button style={styles.saveBtn} onClick={handleSaveProfile}>
                Save
              </button>
              <button style={styles.cancelBtn} onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  container: {
    padding: 20,
    color: "#fff",
    minHeight: "100vh",
    background: "#0b0b0b",
    fontFamily: "system-ui",
  },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  username: { margin: 0, fontSize: 24 },
  settingsBtn: { background: "none", border: "none", color: "#FFD700", cursor: "pointer" },
  avatarContainer: { marginTop: 20, textAlign: "center" },
  avatar: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover" },
  email: { marginTop: 10, opacity: 0.7 },
  statsContainer: { display: "flex", justifyContent: "space-around", marginTop: 30 },
  statCard: { background: "#1a1a1a", padding: 15, borderRadius: 15, width: "30%", textAlign: "center" },
  statHeader: { display: "flex", justifyContent: "center", alignItems: "center" },
  statValue: { margin: 0, fontSize: 22, fontWeight: "bold" },
  statLabel: { margin: 0, opacity: 0.7, fontSize: 12 },
  actions: { marginTop: 30, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 15 },
  actionBtn: {
    flex: 1,
    minWidth: 130,
    background: "#FFD700",
    color: "#000",
    border: "none",
    padding: "10px 15px",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#1a1a1a",
    padding: 20,
    borderRadius: 16,
    width: 300,
    textAlign: "center",
  },
  input: { width: "90%", margin: "10px 0", padding: 10, borderRadius: 10, border: "none" },
  modalActions: { display: "flex", justifyContent: "space-around", marginTop: 20 },
  saveBtn: { background: "#FFD700", color: "#000", border: "none", padding: "10px 15px", borderRadius: 10, cursor: "pointer" },
  cancelBtn: { background: "#333", color: "#fff", border: "none", padding: "10px 15px", borderRadius: 10, cursor: "pointer" },
};
