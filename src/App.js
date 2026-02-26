import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Sign from "./screens/Sign";
import Home from "./screens/Home";
import Ask from "./screens/Ask";
import Stories from "./screens/Stories";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

export default function App() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("home");

  // 🔐 FIREBASE AUTH
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

  // 🌑 LOADING
  if (user === undefined) {
    return (
      <div style={styles.loading}>
        <div>
          <h2>Doctor for Books 🧠</h2>
          <p style={{ opacity: 0.7 }}>
            Preparing your study space…
          </p>
        </div>
      </div>
    );
  }

  // 🚪 NOT SIGNED IN
  if (!user) return <Sign />;

  // 🧭 SCREEN ROUTER
  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <Home user={user} setTab={setTab} />;
      case "ask":
        return <Ask user={user} />;
      case "sign":
        return <Sign />;
      case "stories":
        return <Stories />;
      case "profile":
        return <Profile user={user} setTab={setTab} />;
      case "settings":
        return <Settings user={user} setTab={setTab} />;
      default:
        return <Home user={user} setTab={setTab} />;
    }
  };

  return (
    <div style={styles.app}>
      {/* SCREEN */}
      <div style={styles.screen}>{renderScreen()}</div>

      {/* 🔻 YOUR ORIGINAL NAV ORDER */}
      <nav style={styles.nav}>
        <NavBtn
          icon="🏠"
          label="Home"
          active={tab === "home"}
          onClick={() => setTab("home")}
        />

        <NavBtn
          icon="❓"
          label="Ask"
          active={tab === "ask"}
          onClick={() => setTab("ask")}
        />

        <NavBtn
          icon="🔐"
          label="Sign"
          active={tab === "sign"}
          onClick={() => setTab("sign")}
        />

        <NavBtn
          icon="📚"
          label="Stories"
          active={tab === "stories"}
          onClick={() => setTab("stories")}
        />

        <NavBtn
          icon="👤"
          label="Profile"
          active={tab === "profile"}
          onClick={() => setTab("profile")}
        />
      </nav>
    </div>
  );
}

/* ---------- NAV BUTTON ---------- */

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.navBtn,
        color: active ? "#FFD700" : "#aaa",
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <small>{label}</small>
    </button>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  app: {
    background: "#0b0b0b",
    color: "white",
    minHeight: "100vh",
    fontFamily: "system-ui",
  },

  screen: {
    paddingBottom: 80,
  },

  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    background: "#111",
    borderTop: "1px solid #222",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 999,
  },

  navBtn: {
    background: "none",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 12,
    cursor: "pointer",
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