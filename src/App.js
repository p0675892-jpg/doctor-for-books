import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import AuthScreen from "./AuthScreen";
import Home from "./screens/Home";
import Ask from "./screens/Ask";
import Sign from "./screens/Sign";       // ✋ Sign Hub
import Stories from "./screens/Stories";
import Profile from "./screens/Profile";

export default function App() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("ask"); // ⭐ Start on Ask (best UX)

  // 🔐 AUTH CHECK
  useEffect(() => {
    let resolved = false;

    const unsub = onAuthStateChanged(auth, (u) => {
      if (!resolved) {
        resolved = true;
        setUser(u || null);
      }
    });

    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        setUser(null);
      }
    }, 5000);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  // ⏳ Loading screen
  if (user === undefined) {
    return (
      <div style={styles.loading}>
        <h2>Doctor for Books 🧠</h2>
        <p>Preparing your study space...</p>
      </div>
    );
  }

  // 🚪 Not logged in
  if (!user) return <AuthScreen />;

  // 🧭 Screen router
  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <Home user={user} setTab={setTab} />;
      case "ask":
        return <Ask user={user} />;
      case "sign":
        return <Sign user={user} />;
      case "stories":
        return <Stories user={user} />;
      case "profile":
        return <Profile user={user} />;
      default:
        return <Ask user={user} />;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.screen}>{renderScreen()}</div>

      {/* 🔻 5-TAB BOTTOM NAV */}
      <nav style={styles.nav}>
        <NavBtn label="🏠" text="Home" active={tab === "home"} onClick={() => setTab("home")} />
        <NavBtn label="❓" text="Ask" active={tab === "ask"} onClick={() => setTab("ask")} />
        <NavBtn label="✋" text="Sign" active={tab === "sign"} onClick={() => setTab("sign")} />
        <NavBtn label="📚" text="Stories" active={tab === "stories"} onClick={() => setTab("stories")} />
        <NavBtn label="👤" text="Profile" active={tab === "profile"} onClick={() => setTab("profile")} />
      </nav>
    </div>
  );
}

// ⭐ Reusable button
function NavBtn({ label, text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: active ? "#FFD700" : "#aaa",
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 20 }}>{label}</span>
      {text}
    </button>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  screen: { flex: 1, padding: 20 },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
    background: "#111",
    borderTop: "1px solid #222",
  },
  loading: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b0b0b",
    color: "#fff",
    textAlign: "center",
  },
};