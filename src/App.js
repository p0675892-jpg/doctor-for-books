import React, { useEffect, useState, Suspense, lazy } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthScreen from "./AuthScreen";
import Sl from "./screens/Sl";
import Home from "./screens/Home";
import Ask from "./screens/Ask";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import SnapExplain from "./screens/SnapExplain";
import { FaHome, FaQuestionCircle, FaHandPaper, FaBook, FaUser, FaCamera, FaCog } from 'react-icons/fa';

// Lazy load Stories to reduce initial load
const Stories = lazy(() => import("./screens/Stories"));

// ---------- Error Boundary ----------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: "center", color: "red" }}>
          <h2>Oops! Something went wrong 😔</h2>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("home");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  // Loading
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

  // Not signed in
  if (!user) return <AuthScreen />;

  const renderScreen = () => {
    switch (tab) {
      case "home": return <Home user={user} setTab={setTab} />;
      case "ask": return <Ask user={user} />;
      case "sl": return <Sl />;
      case "stories":
        return (
          <Suspense fallback={<div style={{ padding: 20 }}>Loading Stories...</div>}>
            <Stories />
          </Suspense>
        );
      case "snap": return <SnapExplain />;
      case "profile": return <Profile user={user} setTab={setTab} />;
      case "settings": return <Settings user={user} setTab={setTab} />;
      default: return <Home user={user} setTab={setTab} />;
    }
  };

  return (
    <ErrorBoundary>
      <div style={styles.app}>
        <div style={styles.screen}>{renderScreen()}</div>
        <nav style={styles.nav}>
          <NavBtn icon={<FaHome size={22} />} label="Home" active={tab === "home"} onClick={() => setTab("home")} />
          <NavBtn icon={<FaQuestionCircle size={22} />} label="Ask" active={tab === "ask"} onClick={() => setTab("ask")} />
          <NavBtn icon={<FaHandPaper size={22} />} label="SL" active={tab === "sl"} onClick={() => setTab("sl")} />
          <NavBtn icon={<FaBook size={22} />} label="Stories" active={tab === "stories"} onClick={() => setTab("stories")} />
          <NavBtn icon={<FaCamera size={22} />} label="Snap" active={tab === "snap"} onClick={() => setTab("snap")} />
          <NavBtn icon={<FaUser size={22} />} label="Profile" active={tab === "profile"} onClick={() => setTab("profile")} />
          <NavBtn icon={<FaCog size={22} />} label="Settings" active={tab === "settings"} onClick={() => setTab("settings")} />
        </nav>
      </div>
    </ErrorBoundary>
  );
}

// ---------- Nav Button ----------
function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.navBtn,
        color: active ? "#FFD700" : "#888",
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <small>{label}</small>
    </button>
  );
}

// ---------- STYLES ----------
const styles = {
  app: { background: "#000", color: "white", minHeight: "100vh", fontFamily: "system-ui" },
  screen: { paddingBottom: 80 },
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
  navBtn: { background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 12, cursor: "pointer" },
  loading: { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0b", color: "#fff", textAlign: "center" },
};
