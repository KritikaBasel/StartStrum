/* =========================================================
   STRUMSTART — app.js
   Shared shell: sidebar, topbar, footer, search, scroll
   reveal, back-to-top, reading progress, bookmarks.
   Every page includes this file + sets `document.body.dataset.page`.
   ========================================================= */

const LESSONS = [
  { id: "introduction", title: "Introduction to Guitar", desc: "Guitar types & how the instrument works", href: root("lessons/introduction.html"), time: 5 },
  { id: "anatomy",      title: "Guitar Anatomy", desc: "Every part of the guitar, labeled", href: root("lessons/anatomy.html"), time: 4 },
  { id: "posture",      title: "Holding the Guitar", desc: "Sitting, standing & hand position", href: root("lessons/posture.html"), time: 5 },
  { id: "tuning",       title: "Tuning the Guitar", desc: "Standard tuning E A D G B E", href: root("lessons/tuning.html"), time: 5 },
  { id: "chords",       title: "Chord Diagrams & First Chords", desc: "Read diagrams, learn C G Am Em D", href: root("lessons/chords.html"), time: 11 },
  { id: "strumming",    title: "Strumming Patterns", desc: "Down, up, down-up & a metronome", href: root("lessons/strumming.html"), time: 6 },
  { id: "first-song",   title: "Your First Song", desc: "Put every chord together", href: root("lessons/first-song.html"), time: 7 },
  { id: "quiz",         title: "Beginner Quiz", desc: "Test what you've learned", href: root("lessons/quiz.html"), time: 4 },
  { id: "tracker",      title: "Practice Tracker", desc: "Log streaks & earn badges", href: root("lessons/tracker.html"), time: 2 },
  { id: "feedback",     title: "Feedback", desc: "Tell us how the guide felt", href: root("lessons/feedback.html"), time: 3 },
  { id: "resources",    title: "Resources", desc: "Tuners, apps, chord libraries & more", href: root("lessons/resources.html"), time: 2 },
];

function root(path) {
  // Works whether current page is at site root or inside /lessons/
  const inLessons = location.pathname.includes("/lessons/");
  return inLessons ? path.replace("lessons/", "") : path;
}
function homeHref() {
  return location.pathname.includes("/lessons/") ? "../index.html" : "index.html";
}

const ICONS = {
  logo: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  lessons: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  quiz: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 4.99 2.5c-.7.7-1.6 1.1-1.6 2.5"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  practice: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  feedback: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" class="sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" class="moon"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>`,
  up: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
};

function injectSidebar() {
  const page = document.body.dataset.page || "";
  const links = [
    { id: "home", label: "Home", icon: ICONS.home, href: homeHref() },
    { id: "lessons", label: "Lessons", icon: ICONS.lessons, href: root("lessons/introduction.html") },
    { id: "quiz", label: "Quiz", icon: ICONS.quiz, href: root("lessons/quiz.html") },
    { id: "tracker", label: "Practice", icon: ICONS.practice, href: root("lessons/tracker.html") },
    { id: "feedback", label: "Feedback", icon: ICONS.feedback, href: root("lessons/feedback.html") },
  ];
  const nav = links.map(l => `
    <a href="${l.href}" class="${page === l.id ? "active" : ""}" aria-label="${l.label}">
      ${l.icon}<span class="tip">${l.label}</span>
    </a>`).join("");

  const el = document.createElement("aside");
  el.className = "sidebar";
  el.innerHTML = `
    <div class="logo-mark">${ICONS.logo}</div>
    <nav>${nav}</nav>
  `;
  document.body.prepend(el);
}

function injectTopbar() {
  const bar = document.createElement("div");
  bar.className = "topbar";
  bar.innerHTML = `
    <a class="brand" href="${homeHref()}">${ICONS.logo} StrumStart</a>
    <div class="search-box">
      ${ICONS.search}
      <input type="text" id="lesson-search" placeholder="Search lessons... e.g. C Major" autocomplete="off" aria-label="Search lessons">
      <div class="search-results" id="search-results"></div>
    </div>
    <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
      ${ICONS.sun}${ICONS.moon}
    </button>
  `;
  const sidebarEl = document.querySelector(".sidebar");
  document.body.insertBefore(bar, sidebarEl ? sidebarEl.nextSibling : document.body.firstChild);
}

function injectFooter() {
  if (document.querySelector("footer.site-footer")) return;
  const f = document.createElement("footer");
  f.className = "site-footer";
  f.innerHTML = `
    <div class="container">
      <div class="foot-grid">
        <div>
          <div class="foot-brand">🎸 StrumStart</div>
          <p style="font-size:0.85rem;max-width:260px;">An interactive beginner guitar guide — learn to play your first chords and song, one small lesson at a time.</p>
        </div>
        <div>
          <h4>Learn</h4>
          <ul>
            <li><a href="${root('lessons/introduction.html')}">Introduction</a></li>
            <li><a href="${root('lessons/chords.html')}">First Chords</a></li>
            <li><a href="${root('lessons/tuning.html')}">Tuning</a></li>
          </ul>
        </div>
        <div>
          <h4>Practice</h4>
          <ul>
            <li><a href="${root('lessons/quiz.html')}">Beginner Quiz</a></li>
            <li><a href="${root('lessons/tracker.html')}">Practice Tracker</a></li>
          </ul>
        </div>
        <div>
          <h4>More</h4>
          <ul>
            <li><a href="${root('lessons/feedback.html')}">Feedback</a></li>
            <li><a href="${homeHref()}">Home</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© 2026 StrumStart. Built for learning, not for profit.</span>
        <span>Made with 🎶 for beginners</span>
      </div>
    </div>
  `;
  document.body.appendChild(f);
}

function injectBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = ICONS.up;
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(btn);
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
}

function setupSearch() {
  const input = document.getElementById("lesson-search");
  const results = document.getElementById("search-results");
  if (!input) return;

  const CHORD_INDEX = [
    { title: "C Major chord", href: root("lessons/chords.html") + "#chord-C" },
    { title: "G Major chord", href: root("lessons/chords.html") + "#chord-G" },
    { title: "A Minor chord", href: root("lessons/chords.html") + "#chord-Am" },
    { title: "E Minor chord", href: root("lessons/chords.html") + "#chord-Em" },
    { title: "D Major chord", href: root("lessons/chords.html") + "#chord-D" },
  ];
  const INDEX = [...LESSONS, ...CHORD_INDEX];

  function render(list) {
    if (!list.length) {
      results.innerHTML = `<div class="empty">No lessons match that search.</div>`;
    } else {
      results.innerHTML = list.map(l => `<a href="${l.href}">${l.title}</a>`).join("");
    }
    results.classList.add("open");
  }

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove("open"); return; }
    const matches = INDEX.filter(l => l.title.toLowerCase().includes(q));
    render(matches);
  });
  input.addEventListener("focus", () => { if (input.value.trim()) results.classList.add("open"); });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) results.classList.remove("open");
  });
}

function setupScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

function setupReadingProgress() {
  const fill = document.querySelector(".progress-track .fill");
  if (!fill) return;
  const body = document.querySelector(".lesson-body");
  if (!body) return;
  window.addEventListener("scroll", () => {
    const rect = body.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
    fill.style.width = pct + "%";
  });
}

function setupBookmark() {
  const btn = document.getElementById("bookmark-btn");
  if (!btn) return;
  const key = "strumstart_bookmark";
  const id = document.body.dataset.page;
  const saved = localStorage.getItem(key);
  if (saved === id) btn.classList.add("active-bookmark");

  btn.addEventListener("click", () => {
    if (localStorage.getItem(key) === id) {
      localStorage.removeItem(key);
      btn.classList.remove("active-bookmark");
      btn.querySelector("span").textContent = "Bookmark this lesson";
    } else {
      localStorage.setItem(key, id);
      btn.classList.add("active-bookmark");
      btn.querySelector("span").textContent = "Bookmarked";
    }
  });
}

function markLastVisited() {
  const id = document.body.dataset.page;
  if (id && LESSONS.some(l => l.id === id)) {
    localStorage.setItem("strumstart_last_lesson", id);
  }
}

function initShell() {
  injectSidebar();
  injectTopbar();
  injectFooter();
  injectBackToTop();
  setupSearch();
  setupScrollReveal();
  setupReadingProgress();
  setupBookmark();
  markLastVisited();
}

document.addEventListener("DOMContentLoaded", initShell);
