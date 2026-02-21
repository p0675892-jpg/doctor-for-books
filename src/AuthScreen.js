import React, { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthScreen() {
  const [signupMode, setSignupMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      if (signupMode) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Doctor for Books</h1>
      <p style={styles.subtitle}>
        {signupMode ? "Create your account" : "Welcome back"}
      </p>

      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={handleAuth}>
        {signupMode ? "Create Account" : "Login"}
      </button>

      <p style={styles.toggle} onClick={() => setSignupMode(!signupMode)}>
        {signupMode
          ? "Already have an account? Login"
          : "New here? Create account"}
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#FFD700",
    marginBottom: 8,
  },

  subtitle: {
    marginBottom: 20,
    color: "#ccc",
  },

  input: {
    width: 260,
    padding: 12,
    margin: 8,
    borderRadius: 8,
    border: "none",
  },

  button: {
    background: "#FFD700",
    color: "#000",
    border: "none",
    padding: "12px 24px",
    borderRadius: 10,
    fontWeight: "bold",
    marginTop: 12,
    cursor: "pointer",
  },

  toggle: {
    marginTop: 18,
    cursor: "pointer",
    color: "#aaa",
  },
};
