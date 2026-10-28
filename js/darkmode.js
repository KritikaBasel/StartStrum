/* =========================================================
   STRUMSTART — darkmode.js
   Applies theme instantly (before paint) to avoid flash,
   then wires up the toggle button once the shell exists.
   ========================================================= */

(function applyStoredTheme() {
  const saved = localStorage.getItem("strumstart_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

document.addEventListener("DOMContentLoaded", () => {
  // Wait a tick since app.js injects the toggle button into the DOM
  const tryBind = () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) { requestAnimationFrame(tryBind); return; }
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("strumstart_theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("strumstart_theme", "dark");
      }
    });
  };
  tryBind();
});
