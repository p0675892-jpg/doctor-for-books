import { useState, useEffect } from "react";

export default function Stories() {
  const stories = [
    {
      id: 1,
      title: "When Numbers Became Friendly",
      type: "Math Emotional",
      sections: [
        "Ada believed she was bad at maths. Not just weak — fundamentally broken. Numbers felt like strangers speaking a language she never learned.",

        "One afternoon, a quiet teacher told her something strange: 'Math isn’t about being fast. It’s about being patient.'",

        "Instead of rushing, Ada began solving just ONE problem daily. Slowly, numbers stopped attacking her. They started cooperating.",

        "Weeks later, she noticed something shocking — problems that once looked impossible now felt… ordinary.",

        "Confidence didn’t arrive loudly. It crept in quietly, disguised as familiarity.",

        "Ada didn’t become a genius overnight. She became consistent. And consistency did the rest.",
      ],
    },

    {
      id: 2,
      title: "Comma Saves Lives",
      type: "English Funny",
      sections: [
        "A student proudly submitted an essay containing the sentence: 'Let’s eat grandma.'",

        "The teacher paused. Concerned. Slightly alarmed.",

        "She returned the paper with one correction: 'Please use commas. Grammar can prevent cannibalism.'",

        "From that day forward, the student respected punctuation with near-religious devotion.",

        "Language isn’t just about sounding smart. Sometimes it’s literally about survival.",
      ],
    },

    {
      id: 3,
      title: "The Lazy Neuron",
      type: "Science Funny",
      sections: [
        "Inside one student’s brain lived a neuron named Greg.",

        "Greg had one job: transmit signals during exams.",

        "Unfortunately, Greg preferred naps.",

        "During study sessions, Greg was mysteriously unavailable. During exams, he panicked and attempted to do three months of work in thirty seconds.",

        "The brain filed a formal complaint. Greg promised to improve next semester.",

        "He did not.",
      ],
    },

    {
      id: 4,
      title: "Quiet Strength",
      type: "Emotional",
      sections: [
        "Progress rarely feels dramatic while it’s happening.",

        "You don’t suddenly wake up brilliant. You wake up slightly less confused than yesterday.",

        "Learning grows underground first — like roots. Invisible. Slow. Necessary.",

        "One day, without warning, understanding breaks through the surface.",

        "And everyone assumes you were always capable.",

        "They never saw the silent effort.",
      ],
    },
  ];

  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const [open, setOpen] = useState(false);

  // ⭐ Random start each day
  useEffect(() => {
    const daySeed = new Date().getDate();
    setIndex(daySeed % stories.length);

    const savedLikes = JSON.parse(
      localStorage.getItem("dfb_story_likes") || "{}"
    );
    setLikes(savedLikes);
  }, []);

  const story = stories[index];
  const likeCount = likes[story.id] || 0;

  const like = () => {
    const newLikes = {
      ...likes,
      [story.id]: (likes[story.id] || 0) + 1,
    };

    setLikes(newLikes);
    localStorage.setItem("dfb_story_likes", JSON.stringify(newLikes));
  };

  const nextStory = () => {
    setOpen(false);
    setIndex((index + 1) % stories.length);
  };

  // 📖 FULL READING MODE
  if (open) {
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

      <p style={{ opacity: 0.7 }}>
        Small stories. Big understanding.
      </p>

      <div style={styles.card}>
        <small style={styles.type}>{story.type}</small>

        <h2>{story.title}</h2>

        <p>
          {story.sections[0].slice(0, 140)}...
        </p>

        <button
          style={styles.readBtn}
          onClick={() => setOpen(true)}
        >
          📖 Read Full Story
        </button>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button style={styles.likeBtn} onClick={like}>
          ❤️ Like
        </button>

        <button style={styles.nextBtn} onClick={nextStory}>
          ➡️ Next Story
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
};
