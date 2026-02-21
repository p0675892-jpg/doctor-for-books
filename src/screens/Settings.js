import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Settings({ user, setTab }) {
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        setPremium(snap.data().premium || false);
      }
    }

    loadData();
  }, [user]);

  return (
    <div style={styles.container}>
      {/* 🔙 BACK */}
      <div style={styles.back} onClick={() => setTab("profile")}>
        ← Back
      </div>

      <h1 style={styles.title}>Settings ⚙️</h1>

      {/* 👤 ACCOUNT */}
      <div style={styles.card}>
        <h3>Account</h3>
        <p>Email: {user?.email}</p>

        <p>Plan: {premium ? "💎 Premium" : "🟡 Free"}</p>
      </div>

      {/* 💰 UPGRADE */}
      {!premium && (
        <div style={styles.card}>
          <h3>Upgrade to Premium 💎</h3>

          <p>✔ Unlimited questions</p>
          <p>✔ Advanced explanations</p>
          <p>✔ Longer stories</p>
          <p>✔ Multi-language support</p>

          <div style={styles.payment}>
            Bank Transfer (V1)
            <p>Bank: Example Bank</p>
            <p>Account: Doctor for Books</p>
            <p>Number: 1234567890</p>
            <p>Amount: ₦1,000</p>
          </div>

          <button style={styles.button}>
            Submit Proof (Profile → Upgrade)
          </button>
        </div>
      )}

      {/* ⚙️ PREFERENCES */}
      <div style={styles.card}>
        <h3>Preferences</h3>

        <p>Language: English</p>
        <p>Notifications: Enabled</p>
        <p>Offline Mode: Available</p>
      </div>

      {/* 🔒 ABOUT */}
      <div style={styles.card}>
        <h3>About</h3>

        <p>Doctor for Books</p>
        <p>A Product of Echo Universe</p>
        <p>Version 1.0</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
    background: "#0b0b0b",
    color: "#fff",
    minHeight: "100vh",
  },

  back: {
    fontSize: 18,
    cursor: "pointer",
    marginBottom: 10,
    color: "#FFD700",
  },

  title: {
    color: "#FFD700",
    marginBottom: 16,
  },

  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },

  payment: {
    background: "#2a1c00",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    color: "#FFD700",
  },

  button: {
    width: "100%",
    padding: 14,
    marginTop: 12,
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
