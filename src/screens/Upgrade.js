import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Upgrade({ user }) {
  const [proof, setProof] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!proof) {
      alert("Please upload proof of payment");
      return;
    }

    await addDoc(collection(db, "payments"), {
      userId: user.uid,
      email: user.email,
      plan: "Premium Monthly",
      amount: 1000,
      proofName: proof.name,
      status: "pending",
      timestamp: Date.now(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.center}>
        <h2>Payment Submitted ✅</h2>
        <p>Dr. E will activate your premium after verification.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upgrade to Premium 💎</h1>

      <div style={styles.card}>
        <h3>Premium Benefits</h3>
        <p>✔ Unlimited questions</p>
        <p>✔ Advanced explanations</p>
        <p>✔ Exam-focused mode</p>
        <p>✔ Full offline access</p>
      </div>

      <div style={styles.card}>
        <h3>Payment Details</h3>
        <p>Bank: Example Bank</p>
        <p>Account Name: Doctor for Books</p>
        <p>Account Number: 1234567890</p>
        <p>Amount: ₦1,000</p>
      </div>

      <input type="file" onChange={(e) => setProof(e.target.files[0])} />

      <button style={styles.button} onClick={handleSubmit}>
        Submit Proof
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    background: "#0b0b0b",
    color: "#fff",
    minHeight: "100vh",
  },

  title: { color: "#FFD700" },

  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },

  button: {
    width: "100%",
    padding: 14,
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    marginTop: 14,
    cursor: "pointer",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
    color: "#fff",
  },
};
