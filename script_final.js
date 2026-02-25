// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  navMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches && target.matches("a.nav-link")) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!navMenu.classList.contains("is-open")) return;
    const clickedInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!clickedInside) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Program accordion: keep only one open at a time (optional but nice)
const programList = document.getElementById("programList");
if (programList) {
  programList.addEventListener("toggle", (e) => {
    const toggled = e.target;
    if (!(toggled instanceof HTMLDetailsElement)) return;
    if (!toggled.open) return;

    const all = programList.querySelectorAll("details.program-item");
    all.forEach((d) => {
      if (d !== toggled) d.open = false;
    });
  }, true);
}

// Speakers carousel scroll
const carousel = document.getElementById("speakersCarousel");
const prevBtn = document.getElementById("speakersPrev");
const nextBtn = document.getElementById("speakersNext");

function scrollCarousel(direction) {
  if (!carousel) return;
  const card = carousel.querySelector(".speaker-card");
  const step = card ? card.getBoundingClientRect().width + 14 : 300;
  carousel.scrollBy({ left: direction * step, behavior: "smooth" });
}

if (prevBtn) prevBtn.addEventListener("click", () => scrollCarousel(-1));
if (nextBtn) nextBtn.addEventListener("click", () => scrollCarousel(1));

// Tickets MVP: show toast instead of payment
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
  showToast(`MVP: Ticket "${type}" selected. Replace this with a real payment link later.`);
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());


// About slider
const aboutCards = document.getElementById("aboutCards");
const prev = document.querySelector(".slider-btn.prev");
const next = document.querySelector(".slider-btn.next");
let idx = 0;

function updateSlider(){
  if(!aboutCards) return;
  aboutCards.scrollTo({
    left: idx * aboutCards.clientWidth,
    behavior: "smooth"
  });
}

if(prev && next){
  prev.onclick = () => { idx = Math.max(0, idx-1); updateSlider(); };
  next.onclick = () => {
    idx = Math.min(aboutCards.children.length-1, idx+1);
    updateSlider();
  };
}
