import React from "react";

export default function NavBar({ setScreen }) {
  return (
    <div className="navbar">
      <button onClick={() => setScreen("home")}>
        🏠<span>Home</span>
      </button>
      <button onClick={() => setScreen("ask")}>
        🧠<span>Ask</span>
      </button>
      <button onClick={() => setScreen("progress")}>
        📈<span>Progress</span>
      </button>
      <button onClick={() => setScreen("sign")}>
        🤟<span>Sign</span>
      </button>
      <button onClick={() => setScreen("stories")}>
        📚<span>Stories</span>
      </button>
      <button onClick={() => setScreen("settings")}>
        ⚙️<span>Settings</span>
      </button>
    </div>
  );
}
