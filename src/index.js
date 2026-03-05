import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/theme.css";

// ------------------- Service Worker Registration -------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((reg) => {
        console.log("Service Worker registered successfully:", reg);
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  });
}

// ------------------- Render React App -------------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
