# StrumStart 🎸
### Interactive Beginner Guitar Learning Guide

A fully static, front-end-only web app that teaches complete beginners to play
guitar — no build tools, no backend, no dependencies. Open `index.html` in
any browser and it works.

## How to run it

**Easiest:** double-click `index.html` — it'll open in your browser and mostly work.

**Recommended:** serve it locally so relative paths and audio features behave
consistently across browsers:

```bash
cd StrumStart
python3 -m http.server 8000
# then open http://localhost:8000
```

Or in VS Code, install the "Live Server" extension and click "Go Live."

## File structure

```
StrumStart/
├── index.html                 Landing page
├── lessons/
│   ├── introduction.html      Lesson 1 — guitar types
│   ├── anatomy.html           Lesson 2 — labeled hover diagram
│   ├── posture.html           Lesson 3 — sitting/standing/hand position
│   ├── tuning.html            Lesson 4 — standard tuning + playable tones
│   ├── chords.html            Lesson 5 — chord diagrams + first 5 chords
│   ├── strumming.html         Lesson 6 — patterns + working metronome
│   ├── first-song.html        Lesson 7 — chord progression practice
│   ├── quiz.html              Lesson 8 — multiple choice + drag & drop
│   ├── tracker.html           Lesson 9 — 30-day practice calendar
│   ├── feedback.html          Lesson 10 — feedback form
│   └── resources.html         Bonus — external tools & links
├── css/
│   ├── style.css               Design system + all components
│   ├── responsive.css          Tablet & mobile breakpoints
│   └── darkmode.css            [data-theme="dark"] overrides
├── js/
│   ├── app.js                  Shared shell: sidebar, topbar, footer, search,
│   │                           scroll reveal, back-to-top, reading progress
│   ├── darkmode.js              Dark mode toggle + persistence
│   ├── chords.js                Chord data, SVG diagram generator, timers
│   ├── quiz.js                  Multiple choice + drag & drop logic
│   ├── tracker.js               Calendar, streaks, achievement badges
│   └── feedback.js              Star rating + form handling
├── assets/
│   ├── images/  icons/  videos/   (empty — everything is inline SVG/emoji
│   │                                today, so there's zero load time; drop
│   │                                real photos/icons here if you want to
│   │                                replace any of the placeholder art)
└── README.md
```

## What's already working

- **Interactive chord library** — click any of the 5 starter chords (C, G,
  Am, Em, D) to see a generated fretboard diagram, difficulty, and common
  beginner mistakes.
- **Playable reference tones** on the Tuning page (real Web Audio oscillator,
  correct frequencies for standard EADGBE tuning).
- **Working metronome** with adjustable BPM on the Strumming page.
- **Practice timers** on every chord card (2-minute countdown).
- **Quiz** with instant grading + a drag-and-drop chord-matching activity.
- **Practice tracker** — 30-day calendar, streaks, and 4 unlockable badges,
  all persisted in `localStorage`.
- **Feedback form** with a 5-star rating widget, saved to `localStorage`.
- **Dark mode**, **live search**, **reading progress bar**, **scroll reveal
  animations**, **back-to-top button**, and a **fully responsive** layout
  down to mobile.

## Design language

"Fretboard & Sunset" — navy (`#2C3E50`), sand (`#F4A261`) and coral
(`#E76F51`) on a warm off-white background, Poppins for headings and Inter
for body text. The signature visual motif is the guitar string: wavy SVG
divider lines between sections, and a fretboard-style dotted progress track
on the landing page roadmap.

## Extending it further

Everything reads from small, centralized data arrays, so adding content is
mostly editing arrays rather than writing new markup:

- **Add a chord** → add an entry to `CHORDS` in `js/chords.js` (fret
  positions, finger numbers, difficulty, common mistakes). It automatically
  appears in both the interactive viewer and the card grid.
- **Add a quiz question** → add an entry to `QUIZ_QUESTIONS` in `js/quiz.js`.
- **Add a lesson page** → copy any existing lesson file as a template, then
  add it to the `LESSONS` array in `js/app.js` so it shows up in search.

### Ideas from the original brief you could tackle next
- A rotatable 3D guitar model (Three.js) on the Anatomy page.
- Firebase (or any backend) so the Feedback form persists across devices
  instead of just the current browser.
- A Progressive Web App manifest + service worker for offline access.
- Real recorded audio samples instead of the sine-wave reference tones.
