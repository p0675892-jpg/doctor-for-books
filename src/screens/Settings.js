import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Settings({ setTab, user }) {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={() => setTab("profile")} style={styles.back}>
          ← Back
        </button>

        <h2 style={{ margin: 0 }}>Settings</h2>

        <div style={{ width: 60 }} />
      </div>

      {/* ACCOUNT */}
      <div style={styles.section}>
        <h3>Account</h3>

        <div style={styles.card}>
          <div style={styles.row}>
            <span>Email</span>
            <span style={styles.muted}>{user?.email}</span>
          </div>

          <button
            style={styles.actionBtn}
            onClick={() => setTab("profile")}
          >
            Edit profile
          </button>
        </div>
      </div>

      {/* LEARNING PREFERENCES */}
      <div style={styles.section}>
        <h3>Learning Preferences</h3>

        <div style={styles.card}>
          <div style={styles.row}>
            <span>Notifications</span>
            <span style={styles.muted}>Enabled</span>
          </div>

          <div style={styles.row}>
            <span>Daily reminders</span>
            <span style={styles.muted}>Active</span>
          </div>

          <div style={styles.row}>
            <span>Theme</span>
            <span style={styles.muted}>Dark (recommended)</span>
          </div>
        </div>
      </div>

      {/* PREMIUM */}
      <div style={styles.section}>
        <h3>Premium</h3>

        <div style={styles.premiumCard}>
          <p style={{ marginTop: 0 }}>
            Unlock advanced learning tools and unlimited guidance.
          </p>

          <button style={styles.upgradeBtn}>
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* PRIVACY */}
      <div style={styles.section}>
        <h3>Privacy & Data</h3>

        <div style={styles.card}>
          <div style={styles.row}>
            <span>Data usage</span>
            <span style={styles.muted}>Local + Secure</span>
          </div>

          <div style={styles.row}>
            <span>Clear local data</span>
            <span style={styles.muted}>Available</span>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div style={styles.section}>
        <h3>About</h3>

        <div style={styles.card}>
          <p style={{ marginTop: 0 }}>
            Doctor for Books is designed to help students understand faster,
            remember longer, and study with clarity.
          </p>

          <p style={styles.muted}>
            Version 1.0 • An Echo Universe Product
          </p>
        </div>
      </div>

      {/* LOGOUT */}
      <div style={{ marginTop: 30 }}>
        <button style={styles.logout} onClick={logout}>
          Sign out
        </button>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    padding: 20,
    background: "#0b0b0f",
    color: "white",
    minHeight: "100vh",
    fontFamily: "system-ui",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  back: {
    background: "#1a1a1f",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: 10,
    cursor: "pointer",
  },

  section: {
    marginBottom: 26,
  },

  card: {
    background: "#151518",
    padding: 16,
    borderRadius: 14,
  },

  premiumCard: {
    background: "#FFD700",
    color: "#000",
    padding: 16,
    borderRadius: 14,
  },

  upgradeBtn: {
    marginTop: 10,
    padding: 10,
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },

  actionBtn: {
    marginTop: 12,
    padding: 10,
    background: "#222",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  muted: {
    opacity: 0.6,
  },

  logout: {
    width: "100%",
    padding: 14,
    background: "#2a1111",
    color: "#ff7a7a",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
