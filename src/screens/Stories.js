import { useEffect, useState } from "react";

// Example stories database
const STORIES_DB = [
  {
    id: 1,
    level: "JSS",
    sections: [
      "📌 Hook: How I passed my first math test without cramming!",
      "📖 Lesson: I reviewed for 10 minutes every day, focusing on formulas.",
      "💡 Moral: Consistency beats last-minute cramming!",
      "❓ Mini Question: What will you revise today for 10 minutes?"
    ]
  },
  {
    id: 2,
    level: "JSS",
    sections: [
      "📌 Hook: Surviving a tricky English comprehension!",
      "📖 Lesson: I read the passage twice and highlighted key words.",
      "💡 Moral: Attention to detail makes a difference!",
      "❓ Mini Question: Highlight three key points from your last lesson."
    ]
  },
  {
    id: 3,
    level: "Uni",
    sections: [
      "📌 Hook: How I managed exam stress last semester",
      "📖 Lesson: I broke study sessions into 45-minute focused blocks.",
      "💡 Moral: Balance and short breaks improve memory retention.",
      "❓ Mini Question: How will you structure your next study session?"
    ]
  },
  {
    id: 4,
    level: "Uni",
    sections: [
      "📌 Hook: Group projects can be challenging!",
      "📖 Lesson: I always clarify tasks upfront and assign roles.",
      "💡 Moral: Planning ahead reduces stress and improves results.",
      "❓ Mini Question: How will you plan your next group task?"
    ]
  }
];

export default function Stories({ userLevel = "JSS" }) {
  const [story, setStory] = useState(null);
  const [seenStories, setSeenStories] = useState([]);

  // Load seen stories from localStorage
  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem("dfb_seen_stories")) || [];
    setSeenStories(seen);
  }, []);

  // Pick a new story based on user level
  const pickStory = () => {
    const availableStories = STORIES_DB.filter(
      (s) => s.level === userLevel && !seenStories.includes(s.id)
    );

    // If all stories seen, reset
    const finalList = availableStories.length > 0 ? availableStories : STORIES_DB.filter(s => s.level === userLevel);

    const chosen = finalList[Math.floor(Math.random() * finalList.length)];
    setStory(chosen);

    // Save story as seen
    const newSeen = [...seenStories, chosen.id];
    localStorage.setItem("dfb_seen_stories", JSON.stringify(newSeen));
    setSeenStories(newSeen);
  };

  // On first load, pick a story
  useEffect(() => {
    pickStory();
  }, []);

  if (!story) return <p>Loading story…</p>;

  return (
    <div style={styles.container}>
      <h1>Stories 📚</h1>
      {story.sections.map((sec, i) => (
        <div key={i} style={styles.card}>
          <p>{sec}</p>
        </div>
      ))}
      <button style={styles.nextBtn} onClick={pickStory}>
        🔄 Next Story
      </button>
      <p style={styles.footer}>
        Keep reading daily to unlock new stories and tips!
      </p>
    </div>
  );
}

// ---------- STYLES ----------
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
  nextBtn: {
    width: "100%",
    padding: 12,
    background: "#FFD700",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.8,
  },
};
