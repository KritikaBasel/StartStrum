/* =========================================================
   STRUMSTART — tracker.js
   30-day practice calendar with star ratings, streak/stat
   calculation, and unlockable achievement badges. All state
   lives in localStorage under "strumstart_practice".
   ========================================================= */

const TRACKER_KEY = "strumstart_practice";
const TOTAL_DAYS = 30;

function loadPractice() {
  return JSON.parse(localStorage.getItem(TRACKER_KEY) || "{}"); // { "1": 4, "2": 5, ... } day -> stars
}
function savePractice(data) {
  localStorage.setItem(TRACKER_KEY, JSON.stringify(data));
}

function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  const data = loadPractice();

  const dow = ["S", "M", "T", "W", "T", "F", "S"];
  let html = dow.map(d => `<div class="cal-day head">${d}</div>`).join("");

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const stars = data[day] || 0;
    const done = stars > 0;
    html += `
      <div class="cal-day ${done ? "done" : ""}" data-day="${day}" tabindex="0" role="button"
           aria-label="Day ${day}${done ? ", practiced, " + stars + " stars" : ", not logged"}">
        <span>${day}</span>
        ${done ? `<span class="stars">${"⭐".repeat(stars)}</span>` : ""}
      </div>`;
  }
  grid.innerHTML = html;

  grid.querySelectorAll(".cal-day:not(.head)").forEach(cell => {
    cell.addEventListener("click", () => openStarPicker(cell.dataset.day));
    cell.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openStarPicker(cell.dataset.day); });
  });

  updateStats(data);
  updateAchievements(data);
}

function openStarPicker(day) {
  const data = loadPractice();
  const current = data[day] || 0;
  const rating = prompt(`How did Day ${day}'s practice go? Enter stars 1-5 (0 to clear):`, current || 3);
  if (rating === null) return;
  const n = Math.max(0, Math.min(5, parseInt(rating, 10) || 0));
  if (n === 0) delete data[day];
  else data[day] = n;
  savePractice(data);
  renderCalendar();
}

function updateStats(data) {
  const days = Object.keys(data);
  const daysCompleted = days.length;
  const avgStars = daysCompleted ? (days.reduce((s, d) => s + data[d], 0) / daysCompleted).toFixed(1) : "0.0";

  // longest streak of consecutive numbered days
  let longest = 0, current = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    if (data[d]) { current++; longest = Math.max(longest, current); }
    else current = 0;
  }

  const elDays = document.getElementById("stat-days");
  const elStreak = document.getElementById("stat-streak");
  const elStars = document.getElementById("stat-stars");
  if (elDays) elDays.textContent = daysCompleted;
  if (elStreak) elStreak.textContent = longest;
  if (elStars) elStars.textContent = avgStars;

  const bar = document.getElementById("tracker-progress-fill");
  if (bar) bar.style.width = Math.round((daysCompleted / TOTAL_DAYS) * 100) + "%";
}

const ACHIEVEMENTS = [
  { id: "first-chord", emoji: "🎸", name: "First Chord", test: d => Object.keys(d).length >= 1 },
  { id: "three-days", emoji: "🔥", name: "3-Day Streak", test: d => longestStreak(d) >= 3 },
  { id: "practice-master", emoji: "⭐⭐", name: "Practice Master", test: d => Object.keys(d).length >= 10 },
  { id: "five-star", emoji: "🌟", name: "Perfect Session", test: d => Object.values(d).some(v => v === 5) },
];

function longestStreak(data) {
  let longest = 0, current = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    if (data[d]) { current++; longest = Math.max(longest, current); }
    else current = 0;
  }
  return longest;
}

function updateAchievements(data) {
  const wrap = document.getElementById("achievement-grid");
  if (!wrap) return;
  wrap.innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = a.test(data);
    return `
      <div class="achievement ${unlocked ? "unlocked" : ""}">
        <div class="emoji">${a.emoji}</div>
        <div class="a-name">${a.name}</div>
      </div>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderCalendar);
