import { useState, useEffect } from "react";

export default function Stories() {
  const stories = [
    {
      title: "The 20-Minute Genius",
      type: "Educational",
      text: "Ada studied just 20 minutes every day while others waited for exam season. When exams came, she wasn’t panicking — she was reviewing. Consistency quietly beat intensity.",
    },

    {
      title: "Comma Saves Lives",
      type: "English Funny",
      text: "A student wrote: 'Let’s eat grandma.' Teacher replied: 'Please use commas. Grammar can prevent cannibalism.'",
    },

    {
      title: "The Lazy Neuron",
      type: "Math Funny",
      text: "A neuron refused to fire signals until exam day. Unfortunately, by then the brain had declared a state of emergency.",
    },

    {
      title: "Quiet Strength",
      type: "Emotional",
      text: "You don’t need to understand everything today. Understanding grows quietly, like roots under soil before a tree appears.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState(0);

  // Load saved likes
  useEffect(() => {
    const saved = parseInt(localStorage.getItem("dfb_story_likes")) || 0;
    setLikes(saved);
  }, []);

  const like = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem("dfb_story_likes", newLikes);
  };

  const nextStory = () => {
    setIndex((index + 1) % stories.length);
  };

  const story = stories[index];

  return (
    <div style={styles.container}>
      <h1>Stories 📖</h1>

      <div style={styles.card}>
        <small style={styles.type}>{story.type}</small>

        <h2>{story.title}</h2>

        {/* SCROLLABLE TEXT */}
        <div style={styles.textBox}>{story.text}</div>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button onClick={like}>❤️ Like</button>
        <button onClick={nextStory}>➡️ Next Story</button>
      </div>

      <p style={{ opacity: 0.7 }}>{likes} readers loved this</p>

      <p style={styles.footer}>“Stories teach what facts can’t.” 💛</p>
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
    marginTop: 10,
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

  footer: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },
};
