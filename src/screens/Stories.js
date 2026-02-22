import { useState, useEffect } from "react";

export default function Stories() {
  const stories = [
    {
      id: 1,
      title: "The 20-Minute Genius",
      type: "Educational",
      text:
        "Ada studied just 20 minutes every day while others waited for exam season. When exams came, she wasn’t panicking — she was reviewing. Consistency quietly beat intensity.",
    },
    {
      id: 2,
      title: "Comma Saves Lives",
      type: "English Funny",
      text:
        "A student wrote: 'Let’s eat grandma.' Teacher replied: 'Please use commas. Grammar can prevent cannibalism.'",
    },
    {
      id: 3,
      title: "The Lazy Neuron",
      type: "Math Funny",
      text:
        "A neuron refused to fire signals until exam day. Unfortunately, by then the brain had declared a state of emergency.",
    },
    {
      id: 4,
      title: "Quiet Strength",
      type: "Emotional",
      text:
        "You don’t need to understand everything today. Understanding grows quietly, like roots under soil before a tree appears.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});

  // ⭐ Random start each day (feels fresh)
  useEffect(() => {
    const daySeed = new Date().getDate();
    setIndex(daySeed % stories.length);

    const savedLikes = JSON.parse(
      localStorage.getItem("dfb_story_likes") || "{}"
    );
    setLikes(savedLikes);
  }, []);

  const like = () => {
    const storyId = stories[index].id;
    const newLikes = { ...likes, [storyId]: (likes[storyId] || 0) + 1 };

    setLikes(newLikes);
    localStorage.setItem("dfb_story_likes", JSON.stringify(newLikes));
  };

  const nextStory = () => {
    setIndex((index + 1) % stories.length);
  };

  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const story = stories[(index + week) % stories.length];
  const likeCount = likes[story.id] || 0;

  if (open) {
    return (
      <div style={{ padding: 20 }}>
        <h2>{story.title}</h2>
  
        <div style={{ lineHeight: 1.7 }}>
          {story.text.repeat(8)}
        </div>
  
        <button onClick={() => setOpen(false)}>
          ⬅️ Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Stories 📖</h1>
      <p style={{ opacity: 0.7 }}>
        Small stories. Big understanding.
      </p>

      {/* PROGRESS DOTS */}
      <div style={styles.dots}>
        {stories.map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              background: i === index ? "#FFD700" : "#444",
            }}
          />
        ))}
      </div>

      {/* STORY CARD */}
      <div style={styles.card}>
        <small style={styles.type}>{story.type}</small>

        <h2>{story.title}</h2>

        <div style={styles.textBox}>{story.text}</div>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button style={styles.likeBtn} onClick={like}>
          ❤️ Like
        </button>

        <button style={styles.nextBtn} onClick={nextStory}>
          ➡️ Next
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

  textBox: {
    maxHeight: 260,
    overflowY: "auto",
    marginTop: 10,
    lineHeight: 1.6,
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

  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },

  dots: {
    display: "flex",
    gap: 6,
    marginTop: 10,
    justifyContent: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
};