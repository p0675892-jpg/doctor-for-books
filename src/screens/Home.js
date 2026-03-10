import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Home({ user, setTab }) {
  const [userData, setUserData] = useState(null);
  const [checkupDone, setCheckupDone] = useState(false);
  const [dailyBrainDose, setDailyBrainDose] = useState({});
  const [motivation, setMotivation] = useState("");

  // Load user data from Firebase
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        const lastCheck = docSnap.data().lastCheckupDate;
        const today = new Date().toDateString();
        setCheckupDone(lastCheck === today);
      }
    }
    fetchUser();
  }, [user]);

  // Generate Daily Brain Dose (can expand later)
  useEffect(() => {
    const dose = {
      topic: "Inertia",
      idea: "Inertia means an object resists change in motion.",
      example: "When a bus stops suddenly, your body moves forward.",
      miniChallenge: "Why do passengers lean backward when a bus starts moving?",
      answer: "Due to inertia, your body wants to keep moving at the same speed."
    };
    setDailyBrainDose(dose);
  }, []);

  // Handle Doctor Daily Checkup
  const handleCheckup = async (wentWell) => {
    if (!userData) return;
    const docRef = doc(db, "users", user.uid);
    const today = new Date().toDateString();

    // Update checkup date and increment visits
    await updateDoc(docRef, {
      lastCheckupDate: today,
      doctorVisits: (userData.doctorVisits || 0) + 1
    });

    setCheckupDone(true);
    setUserData((prev) => ({
      ...prev,
      doctorVisits: (prev.doctorVisits || 0) + 1,
      lastCheckupDate: today
    }));

    // Set motivation based on answer
    if (wentWell) {
      setMotivation("🎉 Amazing! Keep that energy going! Every step counts.");
    } else {
      setMotivation("💛 It's okay! Tomorrow is a new day. You can still shine.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Welcome */}
      <h1>Welcome back, {userData?.name || "Student"} 👋</h1>
      <p style={{ opacity: 0.7 }}>Every small step today builds your future.</p>

      {/* Doctor Daily Checkup */}
      {!checkupDone && (
        <div style={styles.card}>
          <h3>Doctor's check-up</h3>
          <p>Hope you did well in school today?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.checkBtn} onClick={() => handleCheckup(true)}>Yes ✅</button>
            <button style={styles.checkBtn} onClick={() => handleCheckup(false)}>Not really ❌</button>
          </div>
        </div>
      )}

      {motivation && (
        <div style={styles.card}>
          <h3>Dr E Motivation</h3>
          <p>{motivation}</p>
        </div>
      )}

      {/* Daily Brain Dose */}
      <div style={styles.card}>
        <h3>🧠 Daily Brain Dose</h3>
        <p><strong>Topic:</strong> {dailyBrainDose.topic}</p>
        <p><strong>Quick Idea:</strong> {dailyBrainDose.idea}</p>
        <p><strong>Example:</strong> {dailyBrainDose.example}</p>
        <p><strong>Mini Challenge:</strong> {dailyBrainDose.miniChallenge}</p>
        <button
          style={styles.mainBtn}
          onClick={() => alert(dailyBrainDose.answer)}
        >
          Reveal Answer
        </button>
      </div>

      {/* Quick Revision */}
      <div style={styles.card}>
        <h3>📝 Quick Revision</h3>
        <p>Small Doctor Test</p>
        <button style={styles.mainBtn} onClick={() => setTab("ask")}>
          Take Test
        </button>
      </div>

      {/* Continue Learning */}
      <div style={styles.card}>
        <h3>📚 Continue Learning</h3>
        <p>Last topic: {userData?.lastTopic || "No topic yet"}</p>
        <button style={styles.mainBtn} onClick={() => setTab("ask")}>
          Continue
        </button>
      </div>

      {/* Doctor Visit Counter */}
      <div style={styles.card}>
        <h3>🏥 Educational Doctor Visits</h3>
        <p>{userData?.doctorVisits || 0} visits</p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  checkBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    fontWeight: "bold",
    background: "#FFD700",
    border: "none",
    cursor: "pointer",
  },
  mainBtn: {
    width: "100%",
    padding: 12,
    background: "#FFD700",
    borderRadius: 12,
    fontWeight: "bold",
    marginTop: 8,
    cursor: "pointer",
  },
};
