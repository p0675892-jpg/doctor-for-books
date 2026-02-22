import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import AuthScreen from "./AuthScreen";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let resolved = false;

    const unsubscribe = onAuthStateChanged(auth, (u) => {
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
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // 🌑 Loading screen
  if (user === undefined) {
    return (
      <div style={styles.loading}>
        <div>
          <h2>Doctor for Books 🧠</h2>
          <p>Preparing your study space...</p>
        </div>
      </div>
    );
  }

  // 🚪 Not logged in → show login
  if (!user) return <AuthScreen />;

  // 👑 Logged in → show MAIN APP
  return <Dashboard user={user} />;
}

// ⭐ Simple V1 Dashboard (replace later)
function Dashboard({ user }) {
  return (
    <div style={styles.app}>
      <h1>Doctor for Books 🧠</h1>
      <p>Welcome, {user.email}</p>
      <p>Your study assistant is ready.</p>
    </div>
  );
}

const styles = {
  loading: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b0b0b",
    color: "#fff",
    fontFamily: "system-ui",
    textAlign: "center",
  },
  app: {
    padding: 40,
    fontFamily: "system-ui",
  },
};