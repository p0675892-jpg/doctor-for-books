import { useState } from "react";
import Tesseract from "tesseract.js";

export default function SnapExplain() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setLoading(true);

    // OCR with Tesseract
    Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        generateExplanation(text);
      })
      .finally(() => setLoading(false));
  };

  // Generate explanation based on extracted text
  const generateExplanation = (text) => {
    if (!text) return;

    const topic = text.split("\n")[0] || "This topic";

    const explanation = `📘 Simple Explanation
${topic.charAt(0).toUpperCase() + topic.slice(1)} explained simply.

🔑 Key Points
• Understand what ${topic} means
• Learn how ${topic} works
• Connect ${topic} to other ideas

🌍 Real-Life Example
Think about ${topic} in everyday life.

📝 Possible Exam Questions
1. Define ${topic}
2. Explain ${topic} with an example

🧠 Quick Quiz
Try explaining ${topic} in your own words.`;

    setResult(explanation);
  };

  return (
    <div style={styles.container}>
      <h2>📸 Snap & Explain</h2>
      <p style={{ opacity: 0.7 }}>Upload a page or take a picture to get a simple explanation + quiz.</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={styles.fileInput}
      />

      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={styles.imagePreview}
        />
      )}

      {loading && <p style={{ marginTop: 10 }}>Processing image… 🔍</p>}

      {result && (
        <pre style={styles.resultBox}>{result}</pre>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  fileInput: {
    marginTop: 12,
    marginBottom: 12,
  },
  imagePreview: {
    maxWidth: "100%",
    marginTop: 10,
    borderRadius: 12,
    border: "1px solid #333",
  },
  resultBox: {
    background: "#1a1a1a",
    color: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 14,
    whiteSpace: "pre-wrap",
    lineHeight: 1.6,
  },
};
