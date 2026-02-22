import { useState, useEffect, useRef } from "react";

export default function Ask({ user }) {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  // ⭐ Quick prompts (viral hook)
  const quickPrompts = [
    "Explain photosynthesis simply",
    "Summarise this topic",
    "Give exam questions on algebra",
    "Why is this important?",
  ];

  // Load weekly history
  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("dfb_history") || "[]");
    setHistory(h);
    inputRef.current?.focus();
  }, []);

  const askAI = async (question) => {
    if (!question.trim()) return;

    setLoading(true);

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

      const reply =
        data.answer ||
        "Hmm… my brain needs internet to shine 😅";

      setMessages((m) => [...m, { role: "ai", text: reply }]);

      const newHistory = [question, ...history].slice(0, 7);
      setHistory(newHistory);
      localStorage.setItem("dfb_history", JSON.stringify(newHistory));
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "No internet 😅 — I’m still smart, just temporarily offline.",
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
      {/* FLOATING TOOL */}
      <div style={styles.topTool}>
        🧮
        <div style={{ fontSize: 10 }}>Math Soon</div>
      </div>

      <h1>Ask Dr. E 🔍</h1>
      <p style={{ opacity: 0.7 }}>
        Messy English is fine — I understand 😎
      </p>

      {/* QUICK PROMPTS */}
      {messages.length === 0 && (
        <div style={styles.prompts}>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              style={styles.promptBtn}
              onClick={() => askAI(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* CHAT */}
      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <p style={{ opacity: 0.6 }}>
            Tell me what’s confusing you… I don’t judge 😌
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={m.role === "user" ? styles.userMsg : styles.aiMsg}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <p style={{ opacity: 0.7 }}>
            Dr. E is thinking… 🧠
          </p>
        )}
      </div>

      {/* INPUT */}
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="What are you struggling with?"
        style={styles.input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            askAI(q);
            setQ("");
          }
        }}
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

      {/* SIMPLIFY */}
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
            <p
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => askAI(item)}
            >
              • {item}
            </p>
          ))}
        </div>
      )}

      <p style={styles.footer}>
        “Confusion means learning is happening.” 💛
      </p>
    </div>
  );
}

const styles = {
  chatBox: {
    background: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    minHeight: 220,
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
  prompts: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  promptBtn: {
    padding: "6px 10px",
    borderRadius: 10,
    border: "none",
    background: "#333",
    color: "#fff",
    fontSize: 12,
    cursor: "pointer",
  },
};