import { useState } from "react";
import { auth } from "./firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export default function AuthScreen() {
  const [mode, setMode] = useState("login"); // login or signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 AUTH HANDLER
  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

    } catch (error) {
      let message = "Something went wrong";

      switch (error.code) {
        case "auth/wrong-password":
          message = "Incorrect password";
          break;

        case "auth/user-not-found":
          message = "Account not found";
          break;

        case "auth/email-already-in-use":
          message = "Email already registered";
          break;

        case "auth/weak-password":
          message = "Password must be at least 6 characters";
          break;

        case "auth/invalid-email":
          message = "Invalid email address";
          break;

        case "auth/network-request-failed":
          message = "Network error. Check internet";
          break;

        default:
          message = "Authentication failed";
      }

      alert(message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* 🩺 APP TITLE */}
      <h1 style={styles.title}>Doctor for Books 🧠</h1>

      <p style={styles.subtitle}>
        {mode === "login"
          ? "Welcome back — let's continue healing your learning"
          : "Create your learning account"}
      </p>

      {/* 📧 EMAIL */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      {/* 🔒 PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {/* 🚀 MAIN BUTTON */}
      <button
        onClick={handleAuth}
        style={styles.button}
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : mode === "login"
          ? "Login"
          : "Create Account"}
      </button>

      {/* 🔄 SWITCH MODE */}
      <p style={styles.switchText}>
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </p>

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
        style={styles.switchBtn}
      >
        {mode === "login"
          ? "Create Account"
          : "Back to Login"}
      </button>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "system-ui",
  },

  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    opacity: 0.7,
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    width: "100%",
    maxWidth: 320,
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    border: "none",
    background: "#1a1a1a",
    color: "white",
    fontSize: 16,
  },

  button: {
    width: "100%",
    maxWidth: 320,
    padding: 14,
    background: "#FFD700",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16,
    marginTop: 6,
  },

  switchText: {
    marginTop: 18,
    opacity: 0.7,
  },

  switchBtn: {
    background: "transparent",
    border: "none",
    color: "#FFD700",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 4,
  },
};
