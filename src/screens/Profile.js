import React from "react";
import { FaCog, FaEdit, FaBook } from "react-icons/fa";

// Profile component
export default function Profile({ user, setTab }) {
  // Dummy stats for now
  const stats = [
    { label: "Stories Read", value: 12 },
    { label: "Questions Asked", value: 8 },
    { label: "SL Points", value: 45 },
  ];

  return (
    <div style={styles.container}>
      {/* Top section: Settings + User Info */}
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
            <h3 style={styles.statValue}>{stat.value}</h3>
            <p style={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button style={styles.actionBtn} onClick={() => setTab("stories")}>
          <FaBook /> My Stories
        </button>
        <button style={styles.actionBtn} onClick={() => alert("Edit Profile")}>
          <FaEdit /> Edit Profile
        </button>
      </div>
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
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    margin: 0,
    fontSize: 24,
  },
  settingsBtn: {
    background: "none",
    border: "none",
    color: "#FFD700",
    cursor: "pointer",
  },
  avatarContainer: {
    marginTop: 20,
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
  },
  email: {
    marginTop: 10,
    opacity: 0.7,
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 30,
  },
  statCard: {
    background: "#1a1a1a",
    padding: 15,
    borderRadius: 15,
    width: "30%",
    textAlign: "center",
  },
  statValue: {
    margin: 0,
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    margin: 0,
    opacity: 0.7,
    fontSize: 12,
  },
  actions: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 15,
  },
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
};
