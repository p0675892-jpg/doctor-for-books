import React from "react";

export default function Avatar({ mood = "neutral" }) {
  return (
    <div className="avatar">
      <div className="avatar-face">🙂</div>
      <p className="avatar-text">
        {mood === "welcome"
          ? "Hello, I’m Dr. E. Let’s learn together."
          : "I'm here to help."}
      </p>
    </div>
  );
}
