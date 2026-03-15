import { useState, useEffect } from "react";

// ---------------- LONGER, ENGAGING STORIES ----------------
const storiesData = [
  {
    id: 1,
    title: "First Science Test Triumph",
    short: "I failed my first science test… but then I learned a trick.",
    full: "I failed my first science test, and it felt terrible. But I decided to spend 15 minutes daily reviewing formulas. Within a month, my grades improved drastically. By sticking to my plan, I also gained confidence, and learning became fun rather than stressful. Trust me i know it won't be, it is never actually easy at first but with time, once you start to see what you have acheived you will never regret not giving up. You can do this. Stay strong"
  },
  {
    id: 2,
    title: "Surviving Semester Stress",
    short: "Stress hit me hard this semester…",
    full: "Stress hit me hard this semester. I felt overwhelmed with assignments, tests, and life outside school. I started planning my week in small chunks and gave myself 10 minutes of focused study per subject each day. Slowly, I regained control and saw progress."
  },
  const storiesDataBatch2 = [
  {
    id: 3,
    title: "The Midnight Snack Adventure",
    short: "I went to the store at midnight…",
    full: "I went to the store at midnight because I was craving suya. Halfway there, I realized I forgot my wallet. I laughed, ran back home, got my wallet, and finally bought the suya. Lesson: small obstacles make success tastier. Never underestimate the power of persistence… and hunger!"
  },
  {
    id: 4,
    title: "Zoom Call Fails",
    short: "Forgot my camera was on…",
    full: "During a Zoom class, I forgot my camera was on and made the weirdest faces while thinking I was off-camera. My classmates sent memes after class. Lesson: always double-check, but sometimes embarrassment makes you unforgettable!"
  },
  {
    id: 5,
    title: "Uber Adventures Abroad",
    short: "Driver couldn’t find the address…",
    full: "In London, my Uber driver kept circling because he couldn’t find the street. I finally helped him using Google Maps. Lesson: even abroad, problem-solving and patience are key. And always tip extra if they try their best!"
  },
  {
    id: 6,
    title: "The Accidental Language Teacher",
    short: "I taught my neighbor English by accident…",
    full: "A neighbor asked for help translating a sign. I ended up teaching him some English words and phrases. By the end, he could tell a short story. Sometimes helping others teaches you more than you expected."
  },
  {
    id: 7,
    title: "Power Outage Productivity",
    short: "No electricity? I wrote an essay by candlelight.",
    full: "During a Lagos blackout, I couldn’t use my laptop. I grabbed a notebook and wrote a full essay by candlelight. Sometimes losing convenience sparks creativity. Candlelight is underrated for focus!"
  },
  {
    id: 8,
    title: "The Library Nap That Worked",
    short: "I slept in the library… and it helped.",
    full: "I was exhausted during revision week and napped in the library. Surprisingly, I woke up refreshed and retained the formulas I was struggling with. Lesson: short naps aren’t laziness; they’re fuel for the brain."
  },
  {
    id: 9,
    title: "The Meme Study Hack",
    short: "Memes made me memorize history.",
    full: "I made memes of historical events to remember dates. Surprisingly, it worked better than rote memorization. Lesson: creativity and humor can make boring topics stick in your mind."
  },
  {
    id: 10,
    title: "Public Transport Comedy",
    short: "BRT in Lagos is like a circus.",
    full: "Squeezing into BRT buses during rush hour taught me patience, human psychology, and survival skills. Sometimes life’s funniest lessons happen in the most crowded places!"
  },
  {
    id: 11,
    title: "The Wrong Classroom",
    short: "Sat in a class I didn’t register for…",
    full: "I walked into a class thinking it was mine, only to realize it was a completely different subject. I stayed and learned a few things anyway. Lesson: even mistakes can teach you something useful."
  },
  {
    id: 12,
    title: "Travel Confusion",
    short: "I asked for directions in Paris… wrong language.",
    full: "I tried asking a local in Paris for directions in English, but they replied in French. After a few confused gestures and smiles, we both laughed, and I eventually found the place. Humor transcends language!"
  },
  {
    id: 13,
    title: "The Last-Minute Hero",
    short: "Forgot homework… explained it perfectly.",
    full: "I forgot my homework and panicked. When the teacher asked, I explained verbally, making connections and examples. She graded it well! Lesson: quick thinking + honesty can save the day… sometimes."
  },
  {
    id: 14,
    title: "Snack Panic",
    short: "Ran out of popcorn during movie night…",
    full: "During a movie night, I realized I had no popcorn. I improvised using plantain chips, and surprisingly, it was tastier. Lesson: creativity makes small problems fun instead of stressful."
  },
  {
    id: 15,
    title: "The WiFi Struggle",
    short: "Internet went off in the middle of submission…",
    full: "Just when I was about to submit an assignment online, WiFi went down. I panicked, restarted my modem, and prayed. Luckily, it came back in time. Lesson: tech issues are inevitable, but staying calm works wonders."
  },
  {
    id: 16,
    title: "The Surprising Tutor",
    short: "Stranger helped me understand calculus.",
    full: "I stayed late in the library, struggling with calculus. A stranger noticed and offered a tip that simplified the problem. Sometimes help comes from unexpected people at unexpected times."
  },
  {
    id: 17,
    title: "The Rainy Day Adventure",
    short: "It rained… I got soaked, but laughed.",
    full: "Walking home in Lagos, heavy rain drenched me. I slipped, laughed, and realized life’s little surprises make memories. Lesson: embrace small chaos—it makes life richer."
  },
  {
    id: 18,
    title: "Airport Chaos",
    short: "Almost missed my flight…",
    full: "I sprinted through the airport, forgot my passport, but luckily found it last second. Lesson: stay organized, but laugh at yourself when chaos hits. Stories like this become legendary later."
  },
  {
    id: 19,
    title: "The Accidental Social Media Star",
    short: "I posted a funny study fail… went viral.",
    full: "I shared a photo of my messy notes online, expecting nothing. It went viral among classmates, and everyone shared their fails too. Lesson: your relatable moments can inspire and connect others."
  },
  {
    id: 20,
    title: "The Overdue Library Book",
    short: "I returned a library book… 2 months late.",
    full: "I panicked when returning it and the librarian laughed. Surprisingly, she just gave me a small fine and some tips on returning books on time. Lesson: honesty and humility can turn a stressful situation into a funny memory."
  },
  {
    id: 21,
    title: "The Study Buddy Surprise",
    short: "My friend taught me better than the lecturer.",
    full: "During group study, my friend explained a tricky topic in a way I understood instantly. Lesson: sometimes peer teaching beats formal teaching, and collaboration is powerful."
  },
  {
    id: 22,
    title: "The Great Exam Dream",
    short: "Dreamed I failed… and woke up motivated.",
    full: "I dreamt I failed my exam badly. Woke up panicked, reviewed the topic, and actually did well. Lesson: even nightmares can motivate you if you channel them positively!"
  },
  {
    id: 23,
    title: "The Power of Notes",
    short: "Writing notes saved me.",
    full: "I summarized chapters in 3 lines each. Surprisingly, that small effort helped me remember complex topics. Lesson: small daily actions compound over time."
  },
  {
    id: 24,
    title: "The Late-Night Genius",
    short: "Found the solution at 1 AM…",
    full: "I couldn’t solve a problem all day. At 1 AM, in quiet, everything clicked. Lesson: sometimes your brain just needs calm hours to work wonders."
  },
  {
    id: 25,
    title: "Cooking Disaster",
    short: "Tried to cook… almost burned the house.",
    full: "I tried cooking for the first time, pan caught fire, I laughed, and salvaged something edible. Lesson: mistakes are part of learning, and humor makes it bearable."
  },
  {
    id: 26,
    title: "The Lost Phone",
    short: "Misplaced my phone in class… found it in the fridge.",
    full: "I was stressed looking for my phone everywhere. Hours later, I opened the fridge to grab water… there it was! Lesson: stress makes us blind to obvious places. Laugh first, panic later!"
  },
  {
    id: 27,
    title: "The Group Project Chaos",
    short: "Everyone procrastinated… somehow delivered.",
    full: "Our team left work to the last minute, chaos ensued, but somehow we submitted on time. Lesson: teamwork, humor, and a little luck save even chaotic projects."
  },
  {
    id: 28,
    title: "The Accidental Run",
    short: "Chased a bus I thought was mine…",
    full: "I ran after a bus, realized it was the wrong one, and laughed. Lesson: life’s little mistakes make funny stories and remind us not to take everything too seriously."
  },
  {
    id: 29,
    title: "The Lecture Nap",
    short: "Slept in class… woke up wiser?",
    full: "I dozed off in a lecture, dreamt the topic, and woke up actually understanding part of it. Lesson: naps sometimes refresh the mind more than cramming."
  },
  {
    id: 30,
    title: "The Surprise Quiz",
    short: "Unexpected quiz… aced it by luck.",
    full: "I walked in expecting no test, saw a surprise quiz, panicked, and guessed half the answers… and aced it! Lesson: luck helps, but preparation multiplies it."
  },
];
  

const DEFAULT_STORIES_PER_DAY = 5;

export default function Stories() {
  const [expandedId, setExpandedId] = useState(null);
  const [progress, setProgress] = useState(() =>
    JSON.parse(localStorage.getItem("storiesProgress")) || { index: 0, date: "", streak: 0, lastRead: "" }
  );
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("storiesFavorites")) || {}
  );
  const [storiesPerDay, setStoriesPerDay] = useState(() =>
    JSON.parse(localStorage.getItem("storiesPerDay")) || DEFAULT_STORIES_PER_DAY
  );
  const [readCounts, setReadCounts] = useState(() =>
    JSON.parse(localStorage.getItem("storiesReadCounts")) || {}
  );

  // --- Daily stories logic & streak + missed days ---
  useEffect(() => {
    const today = new Date().toDateString();
    const lastRead = progress.lastRead || today;

    const lastDate = new Date(lastRead);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / 86400000); // difference in days

    let newIndex = progress.index;
    let newStreak = progress.streak;

    if (diffDays > 0) {
      // Advance stories for missed days
      newIndex = Math.min(progress.index + diffDays * storiesPerDay, storiesData.length);
      // Update streak: only consecutive days count
      newStreak = diffDays === 1 ? progress.streak + 1 : 1;
    }

    const newProgress = { index: newIndex, date: today, streak: newStreak, lastRead: today };
    setProgress(newProgress);
    localStorage.setItem("storiesProgress", JSON.stringify(newProgress));
  }, [storiesPerDay]);

  // --- Stories for today ---
  const startIndex = Math.max(progress.index - storiesPerDay, 0);
  const todaysStories = storiesData.slice(startIndex, progress.index);

  // --- Toggle story expand/collapse ---
  const toggleStory = (id) => {
    setExpandedId(expandedId === id ? null : id);

    // Track read counts
    setReadCounts((prev) => {
      const newCounts = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem("storiesReadCounts", JSON.stringify(newCounts));
      return newCounts;
    });
  };

  // --- Toggle favorites ---
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = { ...prev, [id]: !prev[id] };
      localStorage.setItem("storiesFavorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  // --- Most-read stories ---
  const mostReadStories = Object.entries(readCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => storiesData.find((s) => s.id === +id));

  return (
    <div style={styles.container}>
      <h1>📖 Daily Stories</h1>
      <p style={{ opacity: 0.7 }}>Daily motivational stories to inspire learning and consistency.</p>

      {/* Streak */}
      <p style={styles.streak}>🔥 Current Reading Streak: {progress.streak} day(s)</p>

      {/* Stories per day input */}
      <div style={styles.storiesPerDayInput}>
        <label>Stories per day: </label>
        <input
          type="number"
          value={storiesPerDay}
          min={1}
          max={10}
          onChange={(e) => {
            const val = Math.max(1, Math.min(10, +e.target.value));
            setStoriesPerDay(val);
            localStorage.setItem("storiesPerDay", JSON.stringify(val));
          }}
        />
      </div>

      {/* Today's Stories */}
      <div style={styles.cardsContainer}>
        {todaysStories.map((s) => (
          <div
            key={s.id}
            style={{
              ...styles.card,
              transform: expandedId === s.id ? "scale(1.03)" : "scale(1)",
              boxShadow: expandedId === s.id ? "0 10px 20px rgba(255,215,0,0.4)" : "0 4px 8px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <h3 style={styles.cardTitle}>{s.title}</h3>
            <p style={styles.cardContent}>{expandedId === s.id ? s.full : s.short}</p>
            <div style={styles.cardActions}>
              <span style={styles.actionText} onClick={() => toggleStory(s.id)}>
                {expandedId === s.id ? "Click to collapse" : "Click to read full story"}
              </span>
              <span style={styles.actionText} onClick={() => toggleFavorite(s.id)}>
                {favorites[s.id] ? "💛 Favorited" : "🤍 Add to favorites"}
              </span>
            </div>
            <p style={styles.readCount}>Read {readCounts[s.id] || 0} time(s)</p>
          </div>
        ))}
      </div>

      {/* Most-read Highlight */}
      {mostReadStories.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>🏆 Most Read Stories</h2>
          {mostReadStories.map((s) => (
            <p key={s.id}>• {s.title} ({readCounts[s.id]} reads)</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  container: { padding: 20, paddingBottom: 100, fontFamily: "system-ui, sans-serif", color: "#fff", background: "#111" },
  streak: { fontWeight: "bold", color: "#FFD700" },
  storiesPerDayInput: { marginBottom: 10 },
  cardsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 },
  card: {
    background: "#1a1a1a",
    padding: 20,
    borderRadius: 16,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: { fontWeight: "bold", color: "#FFD700", marginBottom: 10 },
  cardContent: { marginBottom: 10, lineHeight: 1.5 },
  cardActions: { display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.8, marginBottom: 5 },
  actionText: { cursor: "pointer", userSelect: "none" },
  readCount: { fontSize: 12, opacity: 0.6 },
};
