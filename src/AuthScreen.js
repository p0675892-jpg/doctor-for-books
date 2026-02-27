import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export default function AuthScreen() {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!email || !password) {
      showToast("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };

  const showError = (error) => {
    let message = "Something went wrong. Try again.";
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "Account already exists. Try logging in.";
        break;
      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;
      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password.";
        break;
      case "auth/network-request-failed":
        message = "Check your internet connection.";
        break;
      default:
        console.error("Unhandled error:", error);
    }
    showToast(message);
  };

  return (
    <div style={styles.page}>
      {toast && <div style={styles.toast}>{toast}</div>}
      <div style={styles.card}>
        <h2>Doctor for Books 🧠</h2>
        <h3>{mode === "login" ? "Welcome back" : "Create account"}</h3>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={styles.mainBtn}
          onClick={mode === "login" ? handleLogin : handleSignup}
          disabled={loading}
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>
        <p style={{ marginTop: 12 }}>
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
        </p>
        <button
          style={styles.switchBtn}
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "         
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "system-ui",
  },
  card: {
    background: "#1a1a1a",
    padding: 24,
    borderRadius: 16,
    width: 320,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 12,
    borderRadius: 10,
    border: "none",
  },
  mainBtn: {
    width: "100%",
    padding: 12,
    marginTop: 16,
    background: "         
    color: "#000",
    borderRadius: 12,
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "         
    cursor: "pointer",
    marginTop: 6,
  },
  toast: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#333",
    color: "white",
    padding: "10px 20px",
    borderRadius: 8,
    zIndex: 100,
  },
};
