import React, { useState } from "react";
import "./Sl.css"; // We'll use external CSS for flip animation

// Real SL structure (ready for deployment)
const slModules = [
  {
    id: "asl_001",
    category: "Alphabet",
    front: "A",
    back: "Closed fist with thumb on the side. Used in many words starting with A.",
  },
  {
    id: "asl_002",
    category: "Alphabet",
    front: "B",
    back: "Fingers extended straight, thumb across palm. Example: 'Book'.",
  },
  {
    id: "asl_003",
    category: "Alphabet",
    front: "C",
    back: "Hand forms a 'C' shape. Common in words like 'Cat'.",
  },
  {
    id: "phrases_001",
    category: "Phrases",
    front: "Hello",
    back: "Wave your hand near the side of your head.",
  },
  {
    id: "phrases_002",
    category: "Phrases",
    front: "Thank you",
    back: "Flat hand from chin outward.",
  },
  {
    id: "ethics_001",
    category: "Ethics",
    front: "Getting Attention",
    back: "Always tap lightly or wave before starting a conversation with a Deaf person.",
  },
  {
    id: "culture_001",
    category: "Culture",
    front: "ASL Fun Fact",
    back: "ASL has regional variations, just like spoken languages.",
  },
];

export default function Sl() {
  const [category, setCategory] = useState("Alphabet");
  const [flippedCards, setFlippedCards] = useState([]);

  // Filter modules by category
  const filteredModules = slModules.filter((m) => m.category === category);

  const toggleFlip = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((fid) => fid !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  return (
    <div className="sl-container">
      <h2 className="sl-header">Sign Language Hub 👐</h2>

      {/* Category Tabs */}
      <div className="sl-tabs">
        {["Alphabet", "Phrases", "Ethics", "Culture"].map((cat) => (
          <button
            key={cat}
            className={`sl-tab-btn ${cat === category ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules */}
      <div className="sl-modules">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className={`sl-card ${flippedCards.includes(module.id) ? "flipped" : ""}`}
            onClick={() => toggleFlip(module.id)}
          >
            <div className="sl-card-inner">
              <div className="sl-card-front">
                <p>{module.front}</p>
              </div>
              <div className="sl-card-back">
                <p>{module.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
