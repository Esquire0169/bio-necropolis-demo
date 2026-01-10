// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  }
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Video modal
const modal = document.getElementById("videoModal");
const openVideo = document.getElementById("openVideo");
const closeVideo = document.getElementById("closeVideo");
const closeVideoBtn = document.getElementById("closeVideoBtn");
const video = document.getElementById("memorialVideo");

function openModal(){
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  // autoplay is intentionally not forced (UX + mobile policies)
  setTimeout(() => video?.focus?.(), 50);
}

function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

openVideo?.addEventListener("click", openModal);
closeVideo?.addEventListener("click", closeModal);
closeVideoBtn?.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

// Copy link button
const btnCopyLink = document.getElementById("btnCopyLink");
btnCopyLink?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    btnCopyLink.textContent = "Ссылка скопирована";
    setTimeout(() => (btnCopyLink.textContent = "Скопировать ссылку"), 1400);
  } catch {
    alert("Не удалось скопировать. Скопируйте вручную из адресной строки.");
  }
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
// ===== Liquid nav indicator (iOS-like) =====
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const indicator = nav.querySelector(".nav-indicator");
  const links = [...nav.querySelectorAll("a")];

  const isDesktop = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const moveIndicator = (el) => {
    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    indicator.style.width = `${rect.width + 12}px`;
    indicator.style.transform =
      `translateX(${rect.left - navRect.left - 6}px)`;
  };

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!isDesktop()) return;
      moveIndicator(link);
      indicator.style.opacity = "1";
    });
  });

  nav.addEventListener("mouseleave", () => {
    indicator.style.opacity = "0";
  });
})();
