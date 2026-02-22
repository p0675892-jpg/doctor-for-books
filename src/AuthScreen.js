import { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ width: 320, textAlign: "center" }}>
        <h1 style={{ color: "#FFD700" }}>Doctor for Books</h1>
        <p style={{ opacity: 0.7 }}>
          {isSignup ? "Create account" : "Welcome back"}
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && <p style={{ color: "#ff6b6b", fontSize: 14 }}>{error}</p>}

        <button onClick={handleAuth} disabled={loading} style={buttonStyle}>
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          style={{
            marginTop: 16,
            cursor: "pointer",
            opacity: 0.8,
          }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New here? Create account"}
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 8,
  border: "none",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  marginTop: 16,
  background: "#FFD700",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
};