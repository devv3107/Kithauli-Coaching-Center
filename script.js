/* ============================================================
   KITHAULI COACHING CENTER — script.js
   Features: Navbar, Courses, Testimonials, Counters,
             Form Validation, Scroll Reveal, Back to Top
   ============================================================ */

// ---- Course Data ----
const courses = [
  { emoji: '🔢', title: 'Mathematics', grade: 'Class 1–5', tab: 'primary', desc: 'Building number sense, basic operations, shapes, and measurements with fun, activity-based learning.' },
  { emoji: '🌍', title: 'Environmental Science', grade: 'Class 1–5', tab: 'primary', desc: 'Understanding our world — plants, animals, weather, and our environment through stories and activities.' },
  { emoji: '📖', title: 'English Language', grade: 'Class 1–5', tab: 'primary', desc: 'Reading, writing, grammar, and communication skills tailored for young learners.' },
  { emoji: '📐', title: 'Mathematics', grade: 'Class 6–8', tab: 'middle', desc: 'Algebra, geometry, fractions, ratios, and data handling with a strong conceptual foundation.' },
  { emoji: '🔬', title: 'Science', grade: 'Class 6–8', tab: 'middle', desc: 'Physics, Chemistry, and Biology concepts made clear with experiments and visual explanations.' },
  { emoji: '🗺️', title: 'Social Science', grade: 'Class 6–8', tab: 'middle', desc: 'History, Geography, Civics, and Economics for a well-rounded understanding of the world.' },
  { emoji: '∞', title: 'Mathematics', grade: 'Class 9–10', tab: 'high', desc: 'Real numbers, polynomials, triangles, statistics — complete CBSE & UP Board syllabus coverage.' },
  { emoji: '⚗️', title: 'Science (PCB)', grade: 'Class 9–10', tab: 'high', desc: 'Physics, Chemistry, and Biology for Class 9–10 with focus on board exam preparation.' },
  { emoji: '📝', title: 'Hindi & English', grade: 'Class 9–10', tab: 'high', desc: 'Language and literature coaching for scoring high in board language papers.' },
  { emoji: '📊', title: 'Mathematics (Adv.)', grade: 'Class 11–12', tab: 'high', desc: 'Calculus, vectors, 3D geometry, probability — deep dive for senior secondary students.' },
  { emoji: '💡', title: 'Physics', grade: 'Class 11–12', tab: 'high', desc: 'Mechanics, thermodynamics, electromagnetism, and optics with derivation practice.' },
  { emoji: '🧪', title: 'Chemistry', grade: 'Class 11–12', tab: 'high', desc: 'Organic, Inorganic, and Physical Chemistry for board and competitive exams.' },
  { emoji: '🏹', title: 'JEE Foundation', grade: 'Class 9–12', tab: 'competitive', desc: 'Physics, Chemistry, Mathematics focused on IIT-JEE Mains & Advanced patterns.' },
  { emoji: '🩺', title: 'NEET Preparation', grade: 'Class 11–12', tab: 'competitive', desc: 'Biology, Physics, and Chemistry intensive program for NEET aspirants.' },
  { emoji: '📋', title: 'UP Board Special', grade: 'Class 10 & 12', tab: 'competitive', desc: 'Targeted preparation for UP Board board exams with model papers and mock tests.' },
];

// ---- Render Courses ----
function renderCourses(activeTab) {
  const grid = document.getElementById('coursesGrid');
  grid.innerHTML = '';
  courses.forEach((c, i) => {
    if (activeTab !== 'all' && c.tab !== activeTab) return;
    const card = document.createElement('div');
    card.className = 'course-card reveal';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="course-emoji">${c.emoji}</div>
      <h3>${c.title}</h3>
      <div class="course-grade">${c.grade}</div>
      <p>${c.desc}</p>
      <span class="course-tag">${c.tab === 'competitive' ? 'Competitive' : c.tab.charAt(0).toUpperCase() + c.tab.slice(1)}</span>
    `;
    grid.appendChild(card);
  });
  // Trigger reveal for newly injected cards
  setTimeout(() => observeReveal(), 50);
}

// ---- Course Tabs ----
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCourses(btn.dataset.tab);
  });
});

renderCourses('all');

// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('show');
  }
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Animated Counters ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe counters and hero stats
const counterEls = document.querySelectorAll('.counter-num, .hstat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ---- Testimonial Slider ----
const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('testimonialDots');
let currentSlide = 0;

cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'tdot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  cards[currentSlide].classList.remove('active');
  document.querySelectorAll('.tdot')[currentSlide].classList.remove('active');
  currentSlide = (n + cards.length) % cards.length;
  cards[currentSlide].classList.add('active');
  document.querySelectorAll('.tdot')[currentSlide].classList.add('active');
}
cards[0].classList.add('active');
document.getElementById('tNext').addEventListener('click', () => goToSlide(currentSlide + 1));
document.getElementById('tPrev').addEventListener('click', () => goToSlide(currentSlide - 1));

// Auto-advance testimonials
let testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
document.querySelector('.testimonials').addEventListener('mouseenter', () => clearInterval(testimonialInterval));
document.querySelector('.testimonials').addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

// ---- Scroll Reveal ----
function observeReveal() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => ro.observe(el));
}

// Add reveal class to key sections
document.querySelectorAll(
  '.faculty-card, .batch-card, .counter-card, .cinfo-card, .about-hl'
).forEach(el => el.classList.add('reveal'));
observeReveal();

// ---- Form Validation Helper ----
function showErr(id, msg) {
  const el = document.getElementById('err-' + id);
  if (el) el.textContent = msg;
  const input = document.getElementById(id);
  if (input) input.classList.toggle('invalid', !!msg);
}
function clearErrs(...ids) {
  ids.forEach(id => showErr(id, ''));
}

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s+\-()]/g, ''));
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Enrollment Form ----
document.getElementById('enrollForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const studentName = document.getElementById('studentName').value.trim();
  const grade = document.getElementById('grade').value;
  const subject = document.getElementById('subject').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  clearErrs('studentName', 'grade', 'subject', 'phone', 'email');
  let valid = true;

  if (!studentName) { showErr('studentName', 'Student name is required.'); valid = false; }
  if (!grade) { showErr('grade', 'Please select a class.'); valid = false; }
  if (!subject) { showErr('subject', 'Please enter a subject.'); valid = false; }
  if (!phone) { showErr('phone', 'Phone number is required.'); valid = false; }
  else if (!isValidPhone(phone)) { showErr('phone', 'Enter a valid 10-digit phone number.'); valid = false; }
  if (email && !isValidEmail(email)) { showErr('email', 'Enter a valid email address.'); valid = false; }

  if (valid) {
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Submitting…';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('enrollSuccess').classList.add('show');
      this.reset();
      btn.textContent = 'Submit Enrollment →';
      btn.disabled = false;
      this.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  }
});

// ---- Contact Form ----
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const cName = document.getElementById('cName').value.trim();
  const cEmail = document.getElementById('cEmail').value.trim();
  const cMessage = document.getElementById('cMessage').value.trim();

  clearErrs('cName', 'cEmail', 'cMessage');
  let valid = true;

  if (!cName) { showErr('cName', 'Name is required.'); valid = false; }
  if (!cEmail) { showErr('cEmail', 'Email is required.'); valid = false; }
  else if (!isValidEmail(cEmail)) { showErr('cEmail', 'Enter a valid email address.'); valid = false; }
  if (!cMessage) { showErr('cMessage', 'Message cannot be empty.'); valid = false; }

  if (valid) {
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('contactSuccess').classList.add('show');
      this.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }, 800);
  }
});

// ---- Active Nav Link Highlight on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = 'var(--blue)';
  });
}, { passive: true });
