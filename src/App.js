import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

import BottomNav from "./components/BottomNav";

import Home from "./screens/Home";
import Ask from "./screens/Ask";
import Stories from "./screens/Stories";
import Sign from "./screens/Sign";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

export default function App() {
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(null);

  // 🔐 AUTH SYSTEM
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
      } else {
        // Auto login
        await signInAnonymously(auth);
      }
    });

    return () => unsub();
  }, []);

  // ⏳ LOADING SCREEN
  if (!user) {
    return (
      <div style={styles.loading}>
        <h2>Doctor for Books 🧑‍⚕️</h2>
        <p>Preparing your study space…</p>
      </div>
    );
  }

  // 🧠 SCREEN ROUTER
  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <Home user={user} />;

      case "ask":
        return <Ask user={user} />;

      case "stories":
        return <Stories user={user} />;

      case "sign":
        return <Sign user={user} />;

      case "profile":
        return <Profile user={user} setTab={setTab} />;

      case "settings":
        return <Settings user={user} setTab={setTab} />;

      default:
        return <Home user={user} />;
    }
  };

  return (
    <div style={styles.app}>
      {renderScreen()}

      {/* 📱 BOTTOM NAV */}
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

const styles = {
  app: {
    background: "#0f0f12",
    color: "white",
    minHeight: "100vh",
    paddingBottom: 80,
  },

  loading: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f0f12",
    color: "white",
  },
};
