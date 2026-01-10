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
// ===== Auto-hide header while hovering interactive elements =====
(() => {
  const header = document.querySelector(".header");
  if (!header) return;

  // Какие элементы считаем "интерактивными" (наведение на них прячет header)
  const hoverSelectors = [
    ".btn",
    ".card",
    ".chip",
    ".price-card",
    ".gallery__item",
    ".video",
    "a" // ссылки тоже
  ];

  const isDesktop = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  let hideTimer = null;
  let showTimer = null;

  const hide = () => {
    if (!isDesktop()) return;
    header.classList.add("is-hidden");
  };

  const show = () => {
    header.classList.remove("is-hidden");
  };

  const scheduleHide = () => {
    if (!isDesktop()) return;
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 120); // небольшая задержка, чтобы не дергалось
  };

  const scheduleShow = () => {
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    showTimer = setTimeout(show, 140);
  };

  const attach = () => {
    // На мобильных не надо
    if (!isDesktop()) return;

    const nodes = document.querySelectorAll(hoverSelectors.join(","));
    nodes.forEach((el) => {
      el.addEventListener("mouseenter", scheduleHide);
      el.addEventListener("mouseleave", scheduleShow);
    });

    // Если пользователь навёл мышь в верхнюю часть экрана — возвращаем header
    window.addEventListener("mousemove", (e) => {
      if (!isDesktop()) return;
      if (e.clientY < 80) show();
    });
  };

  // Подождём загрузки DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
})();
