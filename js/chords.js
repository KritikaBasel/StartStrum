/* =========================================================
   STRUMSTART — chords.js
   Chord data + SVG fretboard generator + interactive
   chord viewer + practice timers. Used on chords.html.
   Frets array is read low-E to high-E: "x" = muted,
   0 = open, 1-4 = fret number.
   ========================================================= */

const CHORDS = [
  {
    id: "C", name: "C Major", difficulty: "medium",
    frets: ["x", 3, 2, 0, 1, 0],
    fingers: ["", 3, 2, "", 1, ""],
    searchQuery: "how to play C major chord guitar beginner",
    mistakes: [
      "Muting the low E string by accident — make sure it doesn't ring.",
      "Fingers collapsing flat instead of staying arched on the tips.",
      "Thumb creeping too high over the top of the neck."
    ]
  },
  {
    id: "G", name: "G Major", difficulty: "medium",
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, "", "", "", 3],
    searchQuery: "how to play G major chord guitar beginner",
    mistakes: [
      "Buzzing on the high E string — press just behind the fret.",
      "Fingers touching the open strings in the middle by accident.",
      "Wrist bent too far, making the stretch harder than it needs to be."
    ]
  },
  {
    id: "Am", name: "A Minor", difficulty: "easy",
    frets: ["x", 0, 2, 2, 1, 0],
    fingers: ["", "", 2, 3, 1, ""],
    searchQuery: "how to play A minor chord guitar beginner",
    mistakes: [
      "Accidentally strumming the low E string — it should stay silent.",
      "Fingers bunched too close together, causing muted notes.",
      "Pressing too hard, which tires your hand out fast."
    ]
  },
  {
    id: "Em", name: "E Minor", difficulty: "easy",
    frets: [0, 2, 2, 0, 0, 0],
    fingers: ["", 2, 3, "", "", ""],
    searchQuery: "how to play E minor chord guitar beginner",
    mistakes: [
      "Using the wrong fingers, which makes switching chords slower later.",
      "Not pressing close enough to the fret, causing buzz.",
      "Forgetting this is the easiest chord to rest your hand on!"
    ]
  },
  {
    id: "D", name: "D Major", difficulty: "medium",
    frets: ["x", "x", 0, 2, 3, 2],
    fingers: ["", "", "", 1, 3, 2],
    searchQuery: "how to play D major chord guitar beginner",
    mistakes: [
      "Strumming the low E or A string by mistake — start your strum from the D string.",
      "Triangle shape collapsing because fingers aren't arched.",
      "Losing the beat while focusing on finger placement — start slow."
    ]
  }
];

function chordById(id) { return CHORDS.find(c => c.id === id); }

/* ---- SVG fretboard diagram ---- */
function fretboardSVG(chord, size = "full") {
  const stringsX = [20, 50, 80, 110, 140, 170]; // low E -> high E, left to right
  const fretY = [40, 75, 110, 145, 180];
  const nutY = 40;
  let s = `<svg viewBox="0 0 190 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${chord.name} chord diagram">`;

  // nut (thick top line)
  s += `<rect x="18" y="${nutY - 4}" width="154" height="5" fill="var(--navy)" />`;

  // frets
  fretY.forEach((y, i) => {
    if (i === 0) return;
    s += `<line x1="20" y1="${y}" x2="170" y2="${y}" stroke="var(--line)" stroke-width="2"/>`;
  });
  // strings
  stringsX.forEach(x => {
    s += `<line x1="${x}" y1="${nutY}" x2="${x}" y2="${fretY[4]}" stroke="var(--line)" stroke-width="2"/>`;
  });

  // fret numbers (only show "2" style label if chord starts above fret 1 — keep simple, omit for open-position chords)

  // open/mute markers above nut
  chord.frets.forEach((f, i) => {
    const x = stringsX[i];
    const y = nutY - 16;
    if (f === "x") {
      s += `<text x="${x}" y="${y + 6}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--coral)">×</text>`;
    } else if (f === 0) {
      s += `<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="var(--success)" stroke-width="2"/>`;
    }
  });

  // finger dots
  chord.frets.forEach((f, i) => {
    if (typeof f === "number" && f > 0) {
      const x = stringsX[i];
      const y = fretY[f - 1] + (fretY[f] - fretY[f - 1]) / 2;
      s += `<circle cx="${x}" cy="${y}" r="11" fill="var(--coral)"/>`;
      const fingerNum = chord.fingers[i];
      if (fingerNum !== "") {
        s += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="white">${fingerNum}</text>`;
      }
    }
  });

  s += `</svg>`;
  return s;
}

/* ---- Interactive viewer (Reading Chord Diagrams section) ---- */
function initChordViewer() {
  const chips = document.querySelectorAll("#chord-viewer .chord-chip");
  const detailImg = document.getElementById("viewer-diagram");
  const detailName = document.getElementById("viewer-name");
  const detailDiff = document.getElementById("viewer-diff");
  const detailTips = document.getElementById("viewer-tips");
  if (!chips.length || !detailImg) return;

  function show(id) {
    const chord = chordById(id);
    if (!chord) return;
    detailImg.innerHTML = fretboardSVG(chord);
    detailName.textContent = chord.name;
    detailDiff.textContent = chord.difficulty;
    detailDiff.className = "diff-tag diff-" + chord.difficulty;
    detailTips.innerHTML = chord.mistakes.map(m => `<li>${m}</li>`).join("");
    chips.forEach(c => c.classList.toggle("active", c.dataset.chord === id));
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => show(chip.dataset.chord));
  });
  show(chips[0].dataset.chord);
}

/* ---- Full chord cards (First Chords section) ---- */
function initChordCards() {
  const wrap = document.getElementById("chord-cards");
  if (!wrap) return;

  wrap.innerHTML = CHORDS.map(chord => `
    <div class="chord-detail reveal" id="chord-${chord.id}">
      <div>
        ${fretboardSVG(chord)}
        <span class="diff-tag diff-${chord.difficulty}">${chord.difficulty}</span>
      </div>
      <div>
        <h3>${chord.name}</h3>
        <p style="margin-top:6px;">Get your fingers into position, press just behind the fret, and strum only the strings marked with a dot or an open circle.</p>
        <p><strong style="color:var(--navy)">Common mistakes</strong></p>
        <ul class="tips-list">
          ${chord.mistakes.map(m => `<li>${m}</li>`).join("")}
        </ul>
        <div class="actions">
          <a class="btn btn-outline btn-sm" href="https://www.youtube.com/results?search_query=${encodeURIComponent(chord.searchQuery)}" target="_blank" rel="noopener">▶ Find a video lesson</a>
          <button class="btn btn-ghost btn-sm start-timer" data-chord="${chord.id}">Start 2 min practice</button>
        </div>
        <div class="timer-widget" id="timer-${chord.id}" style="display:none;">
          <div class="time">2:00</div>
          <div>
            <button class="btn btn-sm pause-timer" data-chord="${chord.id}">Pause</button>
            <button class="btn btn-sm reset-timer" data-chord="${chord.id}" style="background:transparent;color:white;border:1px solid rgba(255,255,255,0.4);">Reset</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  setupScrollReveal();
  initPracticeTimers();
}

/* ---- Practice timers ---- */
function initPracticeTimers() {
  const timers = {}; // chordId -> {seconds, interval, running}

  document.querySelectorAll(".start-timer").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.chord;
      const widget = document.getElementById("timer-" + id);
      widget.style.display = "flex";
      startTimer(id);
    });
  });
  document.querySelectorAll(".pause-timer").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.chord;
      const t = timers[id];
      if (!t) return;
      if (t.running) {
        clearInterval(t.interval);
        t.running = false;
        btn.textContent = "Resume";
      } else {
        startTimer(id);
        btn.textContent = "Pause";
      }
    });
  });
  document.querySelectorAll(".reset-timer").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.chord;
      if (timers[id]) clearInterval(timers[id].interval);
      timers[id] = { seconds: 120, running: false };
      updateTimerDisplay(id);
    });
  });

  function startTimer(id) {
    if (!timers[id]) timers[id] = { seconds: 120, running: false };
    const t = timers[id];
    if (t.running) return;
    t.running = true;
    t.interval = setInterval(() => {
      t.seconds--;
      updateTimerDisplay(id);
      if (t.seconds <= 0) {
        clearInterval(t.interval);
        t.running = false;
        document.querySelector(`#timer-${id} .time`).textContent = "Nice work! 🎉";
      }
    }, 1000);
  }

  function updateTimerDisplay(id) {
    const t = timers[id];
    const el = document.querySelector(`#timer-${id} .time`);
    if (!el || t.seconds < 0) return;
    const m = Math.floor(t.seconds / 60);
    const s = String(t.seconds % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initChordViewer();
  initChordCards();
});
