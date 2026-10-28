/* =========================================================
   STRUMSTART — feedback.js
   Star rating widget + form submit handling. Saved locally
   under "strumstart_feedback" (array of entries), since this
   is a static front-end project with no backend by default.
   ========================================================= */

function initStarRating() {
  const rating = document.getElementById("star-rating");
  if (!rating) return;
  const stars = rating.querySelectorAll("span");
  let value = 0;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      value = Number(star.dataset.value);
      stars.forEach(s => s.classList.toggle("on", Number(s.dataset.value) <= value));
      rating.dataset.value = value;
    });
    star.addEventListener("mouseenter", () => {
      stars.forEach(s => s.classList.toggle("on", Number(s.dataset.value) <= Number(star.dataset.value)));
    });
  });
  rating.addEventListener("mouseleave", () => {
    stars.forEach(s => s.classList.toggle("on", Number(s.dataset.value) <= value));
  });
}

function initFeedbackForm() {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const rating = document.getElementById("star-rating");
    const entry = {
      date: new Date().toISOString(),
      name: form.name.value.trim(),
      experience: form.experience.value,
      easy: form.easy.value.trim(),
      difficult: form.difficult.value.trim(),
      suggestions: form.suggestions.value.trim(),
      rating: Number(rating?.dataset.value || 0)
    };

    if (!entry.name || !entry.rating) {
      alert("Please add your name and a star rating before submitting.");
      return;
    }

    const all = JSON.parse(localStorage.getItem("strumstart_feedback") || "[]");
    all.push(entry);
    localStorage.setItem("strumstart_feedback", JSON.stringify(all));

    form.style.display = "none";
    document.getElementById("feedback-success").classList.add("show");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStarRating();
  initFeedbackForm();
});
