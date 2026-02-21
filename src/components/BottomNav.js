import React from "react";

const tabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "ask", label: "Ask", icon: "🧠" },
  { id: "stories", label: "Stories", icon: "📚" },
  { id: "sign", label: "Sign", icon: "🤟" },
  { id: "profile", label: "Profile", icon: "👤" },
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
    fontSize: 22,
    marginBottom: 4,
  },

  label: {
    fontSize: 12,
    fontWeight: 600,
  },
};
