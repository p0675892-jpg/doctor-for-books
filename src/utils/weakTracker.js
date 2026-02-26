// Simple V1 Weak Area Tracker (Offline)

const KEY = "dfb_weak_data";

function getData() {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// 🔍 Record activity
export function recordWeakArea(area, weight = 1) {
  const data = getData();

  data[area] = (data[area] || 0) + weight;

  saveData(data);
}

// 🏆 Get most likely weak area
export function getWeakArea() {
  const data = getData();

  let max = 0;
  let weakest = null;

  for (const key in data) {
    if (data[key] > max) {
      max = data[key];
      weakest = key;
    }
  }

  return weakest || "General Studies";
}

// 🧹 Optional reset
export function resetWeakAreas() {
  localStorage.removeItem(KEY);
}
