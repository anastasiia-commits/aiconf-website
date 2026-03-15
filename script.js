/* ===========================
   BAIC — Conference Scripts
   =========================== */

// ---- Utility ----
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

// ---- Footer year ----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ---- Toast ----
const toast = document.getElementById("toast");
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

document.addEventListener("click", (e) => {
  const btn = e.target && e.target.closest && e.target.closest("[data-buy]");
  if (!btn) return;
  const type = btn.getAttribute("data-buy");
  showToast(`✓ Ticket "${type}" selected — payment integration coming soon.`);
});

// ---- Hamburger mobile nav ----
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

if (hamburger && mainNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on nav link click
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

// ============================================================
//   ROUND CAROUSEL FACTORY
//   Creates an infinite looping carousel for any track
// ============================================================
function createRoundCarousel({ trackId, prevId, nextId, dotsContainerId, getVisibleCount, cardSelector }) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const cards = Array.from(track.children);
  const total = cards.length;
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsContainer = dotsContainerId ? document.getElementById(dotsContainerId) : null;
  const GAP = 20;

  let currentIndex = 0;
  let isTransitioning = false;

  function setCardWidths() {
    const visCount = getVisibleCount();
    const trackWidth = track.parentElement.offsetWidth;
    const cardWidth = (trackWidth - GAP * (visCount - 1)) / visCount;
    cards.forEach(c => { c.style.flex = `0 0 ${cardWidth}px`; });
  }

  // Build dots
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    const visCount = getVisibleCount();
    const dotCount = total - visCount + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("button");
      dot.className = "dot-item" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".dot-item");
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function getCardWidth() {
    if (!cards[0]) return 0;
    return cards[0].getBoundingClientRect().width + GAP;
  }

  function getMaxIndex() {
    const visCount = getVisibleCount();
    return Math.max(0, total - visCount);
  }

  function applyTranslate(animate = true) {
    const cardWidth = getCardWidth();
    const offset = currentIndex * cardWidth;
    track.style.transition = animate
      ? "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function goTo(index) {
    if (isTransitioning) return;
    const maxIndex = getMaxIndex();
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    currentIndex = index;
    isTransitioning = true;
    applyTranslate(true);
    updateDots();
    updateActiveCard();
    setTimeout(() => { isTransitioning = false; }, 460);
  }

  function updateActiveCard() {
    cards.forEach((c, i) => {
      c.classList.toggle("active", i === currentIndex);
    });
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  // Touch / swipe support
  let touchStartX = 0;
  let touchDeltaX = 0;
  track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; touchDeltaX = 0; }, { passive: true });
  track.addEventListener("touchmove", (e) => { touchDeltaX = e.touches[0].clientX - touchStartX; }, { passive: true });
  track.addEventListener("touchend", () => { if (touchDeltaX < -50) next(); else if (touchDeltaX > 50) prev(); });

  // Keyboard support
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); });

  // Handle resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setCardWidths();
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      applyTranslate(false);
      buildDots();
      updateDots();
      updateActiveCard();
    }, 100);
  });

  // Init
  setCardWidths();
  buildDots();
  applyTranslate(false);
  updateActiveCard();
}

// ============================================================
//   ABOUT CAROUSEL (3 visible on desktop, 2 on tablet, 1 on mobile)
// ============================================================
createRoundCarousel({
  trackId: "aboutCards",
  prevId: "aboutPrev",
  nextId: "aboutNext",
  dotsContainerId: "aboutDots",
  getVisibleCount: () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 860) return 2;
    return 3;
  }
});

// ============================================================
//   SPEAKERS CAROUSEL (4 visible on desktop, 3 on tablet, 1 on mobile)
// ============================================================
createRoundCarousel({
  trackId: "speakersCarousel",
  prevId: "speakersPrev",
  nextId: "speakersNext",
  dotsContainerId: "speakerDots",
  getVisibleCount: () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 860) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }
});

// ============================================================
//   SCROLL REVEAL (subtle fade-in for cards)
// ============================================================
if ("IntersectionObserver" in window) {
  const revealEls = document.querySelectorAll(
    ".program-card, .speaker-card, .info-card, .ticket-card, .about-card, .org-card, .sponsor-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = entry.target.style.transform
            ? entry.target.style.transform.replace("translateY(20px)", "translateY(0)")
            : "";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => {
    // Don't override carousel active state
    if (!el.classList.contains("about-card") && !el.classList.contains("speaker-card")) {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    }
    observer.observe(el);
  });
}
