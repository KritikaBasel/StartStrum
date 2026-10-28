/* =========================================================
   STRUMSTART — quiz.js
   Multiple choice questions + drag-and-drop chord matching.
   Score is saved to localStorage so the tracker/badges can
   react to it.
   ========================================================= */

const QUIZ_QUESTIONS = [
  {
    q: "Which string is the thickest on a guitar?",
    options: [
      "High E (1st string)",
      "Low E (6th string)",
      "B string",
      "G string",
    ],
    correct: 1,
  },
  {
    q: "On a chord diagram, what does an open circle above a string mean?",
    options: [
      "Don't play that string",
      "Play that string open (no finger)",
      "Press fret 1",
      "Mute with your thumb",
    ],
    correct: 1,
  },
  {
    q: "What does an 'x' above a string mean on a chord diagram?",
    options: [
      "Play it loudly",
      "It's the root note",
      "Don't play / mute that string",
      "Use your pinky",
    ],
    correct: 2,
  },
  {
    q: "In standard tuning, what are the six strings from low to high?",
    options: ["E A D G B E", "E B G D A E", "A D G B E A", "E A D F B E"],
    correct: 0,
  },
  {
    q: "Which finger usually plays the note marked '1' on a chord diagram?",
    options: ["Thumb", "Index finger", "Ring finger", "Pinky"],
    correct: 1,
  },
];

function initMultipleChoice() {
  const wrap = document.getElementById("quiz-questions");
  if (!wrap) return;

  let answers = new Array(QUIZ_QUESTIONS.length).fill(null);

  wrap.innerHTML = QUIZ_QUESTIONS.map(
    (item, qi) => `
    <div class="quiz-card" data-qindex="${qi}">
      <div class="q-num">Question ${qi + 1} of ${QUIZ_QUESTIONS.length}</div>
      <h3>${item.q}</h3>

      <div class="quiz-options">
        ${item.options
          .map(
            (opt, oi) => `
          <div class="quiz-option" data-oi="${oi}">
            ${opt}
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
  ).join("");

  wrap.querySelectorAll(".quiz-card").forEach((card) => {
    const qi = Number(card.dataset.qindex);

    card.querySelectorAll(".quiz-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        if (document.getElementById("quiz-submitted")) return;

        card
          .querySelectorAll(".quiz-option")
          .forEach((o) => o.classList.remove("selected"));

        opt.classList.add("selected");

        answers[qi] = Number(opt.dataset.oi);
      });
    });
  });

  const submitBtn = document.getElementById("quiz-submit");

  submitBtn.addEventListener("click", () => {
    if (answers.includes(null)) {
      alert("Please answer all the questions first.");
      return;
    }

    let correctCount = 0;

    wrap.querySelectorAll(".quiz-card").forEach((card) => {
      const qi = Number(card.dataset.qindex);

      const correctIdx = QUIZ_QUESTIONS[qi].correct;

      card.querySelectorAll(".quiz-option").forEach((opt) => {
        const oi = Number(opt.dataset.oi);

        if (oi === correctIdx) {
          opt.classList.add("correct");
        } else if (oi === answers[qi]) {
          opt.classList.add("incorrect");
        }
      });

      if (answers[qi] === correctIdx) correctCount++;
    });

    submitBtn.disabled = true;

    showScore(correctCount, QUIZ_QUESTIONS.length);
  });
}
function showScore(correct, total) {
  const scoreBox = document.getElementById("quiz-score");

  if (!scoreBox) return;

  const pct = Math.round((correct / total) * 100);

  scoreBox.querySelector(".big-score").textContent = `${correct}/${total}`;

  scoreBox.querySelector(".score-msg").textContent =
    pct === 100
      ? "Perfect score! 🎸"
      : pct >= 60
        ? "Nice work! Keep practicing."
        : "Good first attempt. Review the lessons and try again.";

  scoreBox.style.display = "block";

  setTimeout(() => {
    scoreBox.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);

  const results = JSON.parse(
    localStorage.getItem("strumstart_quiz_results") || "[]",
  );
  results.push({
    date: new Date().toISOString(),
    correct,
    total,
  });

  localStorage.setItem("strumstart_quiz_results", JSON.stringify(results));
}

const results = JSON.parse(
  localStorage.getItem("strumstart_quiz_results") || "[]",
);
results.push({ date: new Date().toISOString(), correct, total });
localStorage.setItem("strumstart_quiz_results", JSON.stringify(results));

/* ---- Drag & drop: match chord name to diagram ---- */
function initDragDrop() {
  const pool = document.getElementById("dnd-pool");
  const targets = document.querySelectorAll(".dnd-target");
  const check = document.getElementById("dnd-check");
  const feedback = document.getElementById("dnd-feedback");
  if (!pool || !targets.length) return;

  let dragged = null;

  pool.querySelectorAll(".dnd-item").forEach((item) => {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", () => {
      dragged = item;
    });
    // touch/keyboard fallback: click item, then click a target
    item.addEventListener("click", () => {
      pool
        .querySelectorAll(".dnd-item")
        .forEach((i) => (i.style.outline = "none"));
      item.style.outline = "2px solid var(--coral)";
      dragged = item;
    });
  });

  targets.forEach((target) => {
    target.addEventListener("dragover", (e) => {
      e.preventDefault();
      target.classList.add("over");
    });
    target.addEventListener("dragleave", () => target.classList.remove("over"));
    target.addEventListener("drop", (e) => {
      e.preventDefault();
      target.classList.remove("over");
      placeItem(target);
    });
    target.addEventListener("click", () => {
      if (dragged) placeItem(target);
    });
  });

  function placeItem(target) {
    if (!dragged) return;
    target.textContent = dragged.textContent;
    target.dataset.filledWith = dragged.dataset.chord;
    target.classList.add("filled");
    dragged.style.visibility = "hidden";
    dragged = null;
  }

  if (check) {
    check.addEventListener("click", () => {
      let correct = 0;
      targets.forEach((t) => {
        const ok = t.dataset.filledWith === t.dataset.answer;
        t.style.borderColor = t.dataset.filledWith
          ? ok
            ? "var(--success)"
            : "var(--coral)"
          : "var(--line)";
        if (ok) correct++;
      });
      feedback.textContent = `${correct} of ${targets.length} matched correctly.`;
      feedback.style.display = "block";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMultipleChoice();
  initDragDrop();
});
