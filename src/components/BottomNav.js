import React from "react";
import { FaHome, FaBrain, FaBook, FaHandPaper, FaUser } from 'react-icons/fa';

const tabs = [
  { id: "home", label: "Home", icon: <FaHome size={22} /> },
  { id: "ask", label: "Ask", icon: <FaBrain size={22} /> },
  { id: "stories", label: "Stories", icon: <FaBook size={22} /> },
  { id: "sl", label: "SL", icon: <FaHandPaper size={22} /> },
  { id: "profile", label: "Profile", icon: <FaUser size={22} /> },
];

export default function BottomNav({ tab, setTab }) {
  return (
    <div style={styles.container}>
      {tabs.map((t) => {
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              ...styles.button,
              ...(active ? styles.activeButton : {}),
            }}
            aria-label={t.label}
  aria-current={active ? "page" : undefined}
  role="tab"
  aria-selected={active}
    tabIndex={0}
          >
            <div style={styles.icon}>{t.icon}</div>
            <div
              style={{
                ...styles.label,
                color: active ? "#FFD700" : "#aaa",                 
              }}
            >
              {t.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    background: "rgba(0,0,0,0.95)",
    backdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid rgba(255,215,0,0.25)",
    zIndex: 999,
  },
  button: {
    flex: 1,
    height: "100%",
    background: "none",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  activeButton: {
    transform: "translateY(-5px)",
    filter: "drop-shadow(0 0 10px rgba(255,215,0,0.7))",
  },
  icon: {
    fontSize:22,
    marginBottom: 4,
    display: 'block',
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
  },
};

