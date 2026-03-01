const KEY = "dfb_weak_data";

function getData() {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

function saveData(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(data));
  }
}

export function recordWeakArea(area, weight = 1) {
  const data = getData();
  data[area] = (data[area] || 0) + weight;
  saveData(data);
}

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

export function resetWeakAreas() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(KEY);
  }
}
