import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // your firebase setup
import { doc, updateDoc } from "firebase/firestore";

// For web payments (Stripe / Paystack)
import { loadStripe } from "@stripe/stripe-js";

export default function Profile({ user }) {
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [level, setLevel] = useState("Young Scholar");
  const [pro, setPro] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Load user data from localStorage or Firebase
    const s = parseInt(localStorage.getItem("dfb_streak")) || 0;
    const b = JSON.parse(localStorage.getItem("dfb_badges")) || [];
    const l = localStorage.getItem("dfb_level") || "Young Scholar";
    const p = localStorage.getItem("dfb_pro") === "true";

    setStreak(s);
    setBadges(b);
    setLevel(l);
    setPro(p);
  }, []);

  // ---------------- Web / PWA Payment ----------------
  const handleWebPayment = async () => {
    // Example: Stripe Checkout session
    const stripe = await loadStripe("pk_test_YOUR_STRIPE_PUBLIC_KEY"); // replace with real key
    // Fetch session ID from backend (not shown here)
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ uid: user.uid }),
    });
    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  // ---------------- Mobile / In-App Purchase ----------------
  const handleMobilePayment = async () => {
    // Placeholder for Capacitor IAP / Google Play Billing
    // Once purchase is verified, unlock Pro:
    await unlockPro();
    alert("🎉 Purchase verified! Pro features unlocked!");
  };

  const unlockPro = async () => {
    setPro(true);
    localStorage.setItem("dfb_pro", "true");
    // Update Firebase user record
    try {
      await updateDoc(doc(db, "users", user.uid), { pro: true });
    } catch (err) {
      console.error("Firebase update failed:", err);
    }
  };

  const handleUpgrade = async () => {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Mobile
      handleMobilePayment();
    } else {
      // Web / PWA
      handleWebPayment();
    }
  };

  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  return (
    <div style={styles.container}>
      <h1>👤 {user.displayName || "Student"}'s Profile</h1>
      <p style={{ opacity: 0.7 }}>
        Level: {level} — {streak} day{streak !== 1 ? "s" : ""} of Dr. E check-ups!
      </p>

      {/* Badges */}
      <div style={styles.section}>
        <h3>🏅 Badges Earned</h3>
        {badges.length > 0 ? (
          <div style={styles.badgeRow}>
            {badges.map((b, i) => (
              <div key={i} style={styles.badge}>{b}</div>
            ))}
          </div>
        ) : (
          <p style={{ opacity: 0.7 }}>No badges yet. Keep learning!</p>
        )}
      </div>

      {/* Pro Upgrade */}
      <div style={styles.section}>
        <h3>✨ Premium / Pro Features</h3>
        {pro ? (
          <p style={{ opacity: 0.8 }}>You’re enjoying Pro features. Keep learning!</p>
        ) : (
          <button style={styles.proBtn} onClick={handleUpgrade}>
            Upgrade to Pro 💛
          </button>
        )}
      </div>

      {/* Settings */}
      <div style={styles.section}>
        <button style={styles.settingsBtn} onClick={toggleSettings}>
          {settingsOpen ? "Close Settings ⚙️" : "Open Settings ⚙️"}
        </button>

        {settingsOpen && (
          <div style={styles.settingsCard}>
            <h4>Account Settings</h4>
            <p>Email: {user.email}</p>
            <p>Notifications: On</p>
            <p>Dark Mode: Enabled</p>
            <button style={styles.settingsOption}>Change Password</button>
            <button style={styles.settingsOption}>Logout</button>
          </div>
        )}
      </div>

      {/* Motivational Footer */}
      <p style={styles.footer}>
        “Every step you take today builds your unstoppable future.” 💛
      </p>
    </div>
  );
}

const styles = {
  container: { padding: 20, paddingBottom: 100 },
  section: { background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 14 },
  badgeRow: { display: "flex", flexWrap: "wrap", gap: 10 },
  badge: { padding: 8, background: "#FFD700", borderRadius: 12, fontWeight: "bold", color: "#000" },
  proBtn: { width: "100%", padding: 12, background: "#FFD700", color: "#000", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer" },
  settingsBtn: { width: "100%", padding: 10, borderRadius: 12, background: "#333", color: "#fff", border: "none", cursor: "pointer" },
  settingsCard: { marginTop: 10, padding: 12, background: "#222", borderRadius: 12 },
  settingsOption: { width: "100%", padding: 10, marginTop: 8, borderRadius: 12, background: "#FFD700", color: "#000", border: "none", cursor: "pointer" },
  footer: { textAlign: "center", marginTop: 20, opacity: 0.7 },
};

