import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Sign from "./screens/Sign";
import Home from "./screens/Home";
import Ask from "./screens/Ask";
import Stories from "./screens/Stories";
import Profile from "./screens/Profile";

import "./styles/styles.css";

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = checking auth
  const [tab, setTab] = useState("home");

  // 🔐 AUTH CHECK WITH SAFETY TIMEOUT
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });

    // ⏰ Safety fallback (prevents infinite loading)
    const timeout = setTimeout(() => {
      setUser(null);
    }, 6000);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  // ⏳ LOADING SCREEN (SHORT ONLY)
  if (user === undefined) {
    return (
      <div className="loading">
        <h2>Doctor for Books 👩‍⚕️</h2>
        <p>Preparing your study space...</p>
      </div>
    );
  }

  // 🔐 NOT SIGNED IN → SIGN SCREEN
  if (!user) {
    return <Sign />;
  }

  // 🧭 TAB ROUTER
  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <Home />;
      case "ask":
        return <Ask />;
      case "stories":
        return <Stories />;
      case "profile":
        return <Profile setTab={setTab} />;
      default:
        return <Home />;
    }
  };

  // 🏠 MAIN APP
  return (
    <div className="app-container">
      <div className="screen">{renderScreen()}</div>

      {/* 🔻 BOTTOM NAV */}
      <nav className="bottom-nav">
        <button
          className={tab === "home" ? "active" : ""}
          onClick={() => setTab("home")}
        >
          🏠
          <span>Home</span>
        </button>

        <button
          className={tab === "ask" ? "active" : ""}
          onClick={() => setTab("ask")}
        >
          ❓
          <span>Ask</span>
        </button>

        <button
          className={tab === "stories" ? "active" : ""}
          onClick={() => setTab("stories")}
        >
          📚
          <span>Stories</span>
        </button>

        <button
          className={tab === "profile" ? "active" : ""}
          onClick={() => setTab("profile")}
        >
          👤
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}