/* script.js - carousel + tech modal logic */

// --- Carousel (auto 3 seconds) ---
(function () {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    current = index;
  }

  function next() { showSlide((current + 1) % slides.length); }
  function prev() { showSlide((current - 1 + slides.length) % slides.length); }

  // Next/prev buttons
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });

  // auto-advance
  function start() { timer = setInterval(next, 3000); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  // pause on hover
  const carousel = document.getElementById('carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
  }

  // init
  if (slides.length) showSlide(0);
  start();
})();

// --- Tech modal ---
(function () {
  const techData = {
    "HTML": "<p>Strong foundation building semantic, accessible HTML for responsive pages.</p>",
    "CSS": "<p>Experience with layout, responsive design, and simple animations. Comfortable with Flexbox and Grid.</p>",
    "JavaScript": "<p>Interactivity and small utilities. DOM manipulation, fetch API, and vanilla JS patterns.</p>",
    "Python": "<p>Automation scripts and data processing for small ETL tasks and CSV handling.</p>",
    "Excel": "<p>Data entry, formulas, pivot tables, and data cleaning to keep information accurate and accessible.</p>",
    "Zapier": "<p>Automations for repetitive workflows—creating zaps to move data between apps reliably.</p>",
    "ChatGPT": "<p>Using AI tools for content generation, prompt engineering, and automation of routine text tasks.</p>"
  };

  const modal = document.getElementById('techModal');
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');

  function openModal(tech) {
    modalTitle.textContent = tech;
    modalBody.innerHTML = techData[tech] || "<p>No details yet.</p>";
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  // attach click on items
  document.querySelectorAll('.tech-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tech = btn.getAttribute('data-tech');
      openModal(tech);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // close with escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
})();

