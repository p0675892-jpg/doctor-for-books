export default function Settings({ setTab }) {
  return (
    <div style={styles.page}>
      
      {/* 🔙 Top Bar */}
      <div style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => setTab("home")}
        >
          ← Back
        </button>

        <h2 style={styles.title}>Settings ⚙️</h2>
      </div>

      {/* 📜 Scrollable Content */}
      <div style={styles.content}>

        <Section title="Account">
          <Item text="Edit Profile" />
          <Item text="Change Password" />
          <Item text="Sign Out (coming soon)" />
        </Section>

        <Section title="Study Preferences">
          <Item text="Learning Style" />
          <Item text="Difficulty Level" />
          <Item text="Notifications" />
        </Section>

        <Section title="App Settings">
          <Item text="Theme: Dark (default)" />
          <Item text="Language: English" />
          <Item text="Offline Mode (V2)" />
        </Section>

        <Section title="About Doctor for Books">
          <p style={styles.paragraph}>
            Doctor for Books is your AI study companion designed
            to help you understand, revise, and master any subject.
          </p>

          <p style={styles.paragraph}>
            Version: V1 (Echo Universe Product)
          </p>
        </Section>

        {/* 👇 Extra space so scrolling feels natural */}
        <div style={{ height: 40 }} />

      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

function Item({ text }) {
  return (
    <div style={styles.item}>
      {text}
    </div>
  );
}

/* ---------- Styles ---------- */

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f0f",
    color: "white",
    fontFamily: "system-ui, sans-serif"
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px",
    borderBottom: "1px solid #222"
  },

  backBtn: {
    background: "#222",
    border: "none",
    color: "white",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  title: {
    margin: 0,
    fontSize: 20
  },

  content: {
    flex: 1,
    overflowY: "auto",   // 🔥 THIS MAKES IT SCROLLABLE
    padding: 16
  },

  section: {
    marginBottom: 28
  },

  sectionTitle: {
    marginBottom: 10,
    color: "#f5c542" // gold accent (Echo Universe vibe ✨)
  },

  item: {
    padding: "12px 14px",
    marginBottom: 8,
    background: "#1b1b1b",
    borderRadius: 10
  },

  paragraph: {
    opacity: 0.85,
    lineHeight: 1.5
  }
};