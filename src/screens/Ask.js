import { useState, useEffect } from "react";

export default function Ask({ user }) {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load weekly history
  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("dfb_history") || "[]");
    setHistory(h);
  }, []);

  const askAI = async (question) => {
    if (!question.trim()) return;

    setLoading(true);

    // Add user message
    setMessages((m) => [...m, { role: "user", text: question }]);

    try {
      const res = await fetch(
        "https://a7e9a764-6003-4151-81fb-310a8b8c76f7-00-3f5w33in1d1pc.kirk.replit.dev/treatment/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            uid: user.uid,
          }),
        }
      );

      const data = await res.json();

      const reply = data.answer || "Hmm… I need internet to be brilliant 😅";

      setMessages((m) => [...m, { role: "ai", text: reply }]);

      // Save history
      const newHistory = [question, ...history].slice(0, 7);
      setHistory(newHistory);
      localStorage.setItem("dfb_history", JSON.stringify(newHistory));
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "No internet 😅 — I’m still smart, just offline.",
        },
      ]);
    }

    setLoading(false);
  };

  const simplifyLast = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");

    if (lastUserMsg) {
      askAI("Explain this in very simple terms: " + lastUserMsg.text);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* TOP FLOATING TOOL */}
      <div style={styles.topTool}>
        🧮
        <div style={{ fontSize: 10 }}>Math Soon</div>
      </div>

      <h1>Ask Dr. E 🔍</h1>

      <p style={{ opacity: 0.7 }}>Messy English is fine — I understand 😎</p>

      {/* CHAT AREA */}
      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <p style={{ opacity: 0.6 }}>Ask anything… I don’t judge 😌</p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={m.role === "user" ? styles.userMsg : styles.aiMsg}
          >
            {m.text}
          </div>
        ))}

        {loading && <p style={{ opacity: 0.7 }}>Dr. E is thinking… 🧠</p>}
      </div>

      {/* INPUT */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type your question…"
        style={styles.input}
      />

      <button
        style={styles.askBtn}
        onClick={() => {
          askAI(q);
          setQ("");
        }}
      >
        Diagnose
      </button>

      {/* SIMPLIFY BUTTON */}
      {messages.length > 1 && (
        <button style={styles.simpleBtn} onClick={simplifyLast}>
          Explain Simpler
        </button>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div style={styles.history}>
          <h3>Recent Questions</h3>
          {history.map((item, i) => (
            <p key={i}>• {item}</p>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <p style={styles.footer}>“Confusion means learning is happening.” 💛</p>
    </div>
  );
}

const styles = {
  chatBox: {
    background: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    minHeight: 200,
    marginBottom: 12,
  },

  userMsg: {
    textAlign: "right",
    marginBottom: 8,
    color: "#FFD700",
  },

  aiMsg: {
    textAlign: "left",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  askBtn: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
  },

  simpleBtn: {
    width: "100%",
    padding: 10,
    background: "#333",
    marginBottom: 12,
  },

  history: {
    marginTop: 16,
    opacity: 0.9,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },

  topTool: {
    position: "fixed",
    top: 70,
    right: 16,
    background: "#FFD700",
    color: "#000",
    padding: "10px 12px",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
};
