import { useState, useEffect } from "react";
import storiesData from './stories.json';

export default function Stories() {
  const stories = storiesData;
  const categories = [...new Set(stories.map(s => s.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const [open, setOpen] = useState(false);

  const filteredStories = stories.filter(s => s.category === activeCategory);
  const story = filteredStories[index];

  const likeCount = story ? (likes[story.id] || 0) : 0;

  const like = () => {
    if (!story) return;
    const newLikes = { ...likes, [story.id]: (likes[story.id] || 0) + 1 };
    setLikes(newLikes);
    localStorage.setItem("dfb_story_likes", JSON.stringify(newLikes));
  };

  const nextStory = () => {
    setOpen(false);
    setIndex((index + 1) % filteredStories.length);
  };

  // 📖 FULL READING MODE
  if (open && story) {
    return (
      <div style={styles.readContainer}>
        <h2>{story.title}</h2>
        <small style={{ opacity: 0.7 }}>{story.type}</small>
        <div style={styles.longText}>
          {story.sections.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <button style={styles.backBtn} onClick={() => setOpen(false)}>
          ⬅️ Back to Stories
        </button>
      </div>
    );
  }

  // 📚 STORY LIST MODE
  return (
    <div style={styles.container}>
      <h1>Stories 📖</h1>
      <p style={{ opacity: 0.7 }}> Small stories. Big understanding. </p>

      {/* Tabs */}
      <div style={styles.tabs}>
        {categories.map(cat => (
          <button
            key={cat}
            style={{
              ...styles.tabBtn,
              background: activeCategory === cat ? "#FFD700" : #1a1a1a"                     
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {story ? (
        <div style={styles.card}>
          <small style={styles.type}>{story.type}</small>
          <h2>{story.title}</h2>
          <p>
            {story.sections[0].slice(0, 140)}...
          </p>
          <button style={styles.readBtn} onClick={() => setOpen(true)}>
            📖 Read Full Story
          </button>
        </div>
      ) : (
        <p>No stories in this category 😔</p>
      )}

      {             }
      <div style={styles.actions}>
        <button style={styles.likeBtn} onClick={like}>
          ❤️ Like
        </button>
        <button style={styles.nextBtn} onClick={nextStory}>
          ➡️ Next Story
        </button>
        <button style={styles.surpriseBtn} onClick={() => setIndex(Math.floor(Math.random() * filteredStories.length))}>
          🎲 Surprise me
        </button>
      </div>
      <p style={{ opacity: 0.7 }}>
        {likeCount} readers loved this
      </p>
      <p style={styles.footer}>
        “Stories teach what facts can’t.” 💛
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },
  card: {
    background: "#1a1a1a",
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  type: {
    opacity: 0.7,
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 14,
  },
  likeBtn: {
    flex: 1,
    padding: 10,
  },
  nextBtn: {
    flex: 1,
    padding: 10,
  },
  surpriseBtn: {
    padding: 10,
    background: "         
    borderRadius: 8,
    color: "white",
  },
  readBtn: {
    marginTop: 12,
    padding: 10,
    width: "100%",
    background: "#FFD700",
    borderRadius: 10,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },
  readContainer: {
    padding: 20,
  },
  longText: {
    marginTop: 16,
    lineHeight: 1.8,
    fontSize: 16,
    maxHeight: "65vh",
    overflowY: "auto",
  },
  backBtn: {
    marginTop: 16,
    padding: 12,
    width: "100%",
  },
  tabs: {
    display: "flex",
    gap: 8,
    margin: "12px 0",
  },
  tabBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    color: "white",
  },
};
