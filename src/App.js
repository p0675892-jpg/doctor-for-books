import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Sl from "./screens/Sl";
import Home from "./screens/Home";
import Ask from "./screens/Ask";
import Stories from "./screens/Stories";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Sign from "./screens/Sign";
import { FaHome, FaQuestionCircle, FaHandPaper, FaBook, FaUser } from 'react-icons/fa';

export default function App() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("home");

  // 🔐 Firebase Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => {
      unsub();
    };
  }, []);

  // 🌑 Loading
  if (user === undefined) {
    return (
      <div style={styles.loading}>
        <div>
          <h2>Doctor for Books 🧠</h2>
          <p style={{ opacity: 0.7 }}>Preparing your study space…</p>
        </div>
      </div>
    );
  }

  // 🚪 Not signed in
  if (!user) return <Sign />;

  // 🧭 Screen Router
  const renderScreen = () => {
    switch (tab) {
      case "home": return <Home user={user} setTab={setTab} />;
      case "ask": return <Ask user={user} />;
      case "sl": return <Sl />;
      case "stories": return <Stories />;
      case "profile": return <Profile user={user} setTab={setTab} />;
      case "settings": return <Settings user={user} setTab={setTab} />;
      default: return <Home user={user} setTab={setTab} />;
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.screen}>{renderScreen()}</div>
      <nav style={styles.nav}>
        <NavBtn icon={<FaHome size={22} />} label="Home" active={tab === "home"} onClick={() => setTab("home")} />
        <NavBtn icon={<FaQuestionCircle size={22} />} label="Ask" active={tab === "ask"} onClick={() => setTab("ask")} />
        <NavBtn icon={<FaHandPaper size={22} />} label="Sl" active={tab === "sl"} onClick={() => setTab("sl")} />
        <NavBtn icon={<FaBook size={22} />} label="Stories" active={tab === "stories"} onClick={() => setTab("stories")} />
        <NavBtn icon={<FaUser size={22} />} label="Profile" active={tab === "profile"} onClick={() => setTab("profile")} />
      </nav>
    </div>
  );
}

// ---------- Nav Button ----------
function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.navBtn,
        color: active ? "#FFD700" : "#888", // Gold active, gray inactive
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <small>{label}</small>
    </button>
  );
}

const styles = {
  app: {
    background: "#000", // Black background
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
    background: "#000",
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
