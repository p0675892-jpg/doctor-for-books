import { useState } from "react";

const storiesData = [
  {
    id: 1,
    title: "First Science Test Triumph",
    short: "I failed my first science test… but then I learned a trick.",
    full: "I failed my first science test, and it felt terrible. But I decided to spend 15 minutes daily reviewing formulas. Within a month, my grades improved drastically. Remember: small daily steps build your future. 💛",
  },
  {
    id: 2,
    title: "Surviving Semester Stress",
    short: "Stress hit me hard this semester…",
    full: "Stress hit me hard this semester, but I started planning my week in small chunks. Even 10 minutes of focused study per subject helped me regain control. Balance is key, breathe, and keep going.",
  },
  {
    id: 3,
    title: "The Power of Teaching",
    short: "I thought I knew it until I taught it…",
    full: "I thought I knew the concept until I tried teaching it to my friend. Explaining it aloud revealed gaps I never noticed. Teaching others is a secret weapon for understanding.",
  },
  {
    id: 4,
    title: "Morning Motivation",
    short: "I hate mornings, but this changed everything.",
    full: "I hate mornings, but I started reviewing one small topic every morning. By the end of the month, my memory improved, and I felt accomplished before breakfast. Start small, stay consistent.",
  },
  {
    id: 5,
    title: "Turning Mistakes into Wins",
    short: "Every mistake is secretly a lesson…",
    full: "Every mistake is secretly a lesson. I once copied the wrong formula, failed, but later, I created my own formula sheet. Mistakes guide us. Learn from them, don’t fear them.",
  },
  {
    id: 6,
    title: "Study Playlist Magic",
    short: "Music helped me focus like nothing else.",
    full: "I created a playlist with soft focus music. Whenever I studied with it, I concentrated better and retained more. Little tweaks can change results dramatically.",
  },
  {
    id: 7,
    title: "Late Night Epiphany",
    short: "I finally understood physics at 11 PM…",
    full: "I finally understood physics at 11 PM. Sometimes, your brain needs quiet hours. Don’t rush; the right time will click for you.",
  },
  {
    id: 8,
    title: "The Importance of Notes",
    short: "Writing notes saved my grades.",
    full: "Writing notes saved my grades. Summarizing each topic in 3 lines forced me to understand it, not just memorize. Notes are your personal brain assistant.",
  },
  {
    id: 9,
    title: "Group Study Lesson",
    short: "We argued, but we learned a lot.",
    full: "We argued in group study, but every disagreement became a learning point. Discussion deepens understanding. Collaborate, don’t compete.",
  },
  {
    id: 10,
    title: "Micro-Break Power",
    short: "A 5-minute break changed my focus.",
    full: "Taking micro-breaks of 5 minutes after every 25 minutes of study boosted my focus. Even small rests improve efficiency.",
  },
  {
    id: 11,
    title: "From Fear to Curiosity",
    short: "Math scared me, until I asked why…",
    full: "Math scared me, until I asked why every step exists. Curiosity replaced fear. Question everything. Fear fades when curiosity grows.",
  },
  {
    id: 12,
    title: "The Reward Trick",
    short: "I gave myself tiny rewards…",
    full: "I gave myself tiny rewards for completing tasks: 5 min game, favorite snack. Motivation skyrocketed. Celebrate small wins.",
  },
  {
    id: 13,
    title: "Silent Library Success",
    short: "Studying silently changed everything.",
    full: "Studying in silence in the library allowed full concentration. No distractions, pure progress. Environment matters.",
  },
  {
    id: 14,
    title: "The Note Swap",
    short: "Swapped notes with a friend…",
    full: "Swapped notes with a friend; realized I missed key points. Peer learning exposes gaps. Share and learn together.",
  },
  {
    id: 15,
    title: "Motivation Mantra",
    short: "I wrote a small mantra on my desk…",
    full: "I wrote a small mantra on my desk: 'One step today beats ten tomorrow.' Seeing it daily reminded me to keep moving, even when tired.",
  },
  {
    id: 16,
    title: "The Power Nap",
    short: "A short nap saved my brain…",
    full: "A short 20-minute nap between study sessions boosted my memory. Rest is fuel for learning.",
  },
  {
    id: 17,
    title: "From Confusion to Clarity",
    short: "I didn’t get a topic… until I drew it…",
    full: "I didn’t get a topic until I drew diagrams and linked ideas. Visualizing concepts can unlock understanding quickly.",
  },
  {
    id: 18,
    title: "Consistency Beats Intensity",
    short: "Studying 15 min daily > 3 hours once…",
    full: "Studying 15 min daily is more effective than cramming 3 hours once a week. Small daily actions compound.",
  },
  {
    id: 19,
    title: "The Teaching Experiment",
    short: "Taught my sibling, learned twice as much.",
    full: "Teaching my sibling a topic reinforced my understanding. Explaining aloud is a hidden power.",
  },
  {
    id: 20,
    title: "Celebrating Micro-Successes",
    short: "Finished 2 topics today! 🥳",
    full: "Finished 2 topics today! Celebrate small achievements; they accumulate into major wins. Motivation grows when you notice progress.",
  },
];

export default function Stories() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleStory = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <h1>📖 Stories</h1>
      <p style={{ opacity: 0.7 }}>Motivation and experiences from students like you.</p>

      {storiesData.map((s) => (
        <div key={s.id} style={styles.card} onClick={() => toggleStory(s.id)}>
          <h3>{s.title}</h3>
          <p>{expandedId === s.id ? s.full : s.short}</p>
          <p style={{ opacity: 0.6, fontSize: 12 }}>
            {expandedId === s.id ? "Click to collapse" : "Click to read full story"}
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 20, paddingBottom: 100 },
  card: { background: "#1a1a1a", padding: 16, borderRadius: 16, marginBottom: 14, cursor: "pointer" },
};
