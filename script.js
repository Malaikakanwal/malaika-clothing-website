/* ======================================================
   MALAIKA CLOTHES — Frontend Script (No backend required)
====================================================== */

/* --------- TOAST HELPER --------- */
function showToast(message, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  // trigger show
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* --------- NAVBAR SCROLL EFFECT (home page only) --------- */
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('solid')) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------- HAMBURGER TOGGLE --------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

/* --------- ACTIVE NAV LINK --------- */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* --------- SHOP CATEGORY TABS --------- */
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.tab;
      document.querySelectorAll('.product-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------- ADD TO CART BUTTONS --------- */
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn-cart')) {
    const card = e.target.closest('.product-card');
    const name = card ? card.querySelector('.product-name')?.textContent : 'item';
    showToast(`🛍️ "${name}" added to cart!`, 'success');
  }
});

/* --------- CONTACT FORM --------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Message sent successfully!', 'success');
    contactForm.reset();
  });
}

/* --------- LOGIN FORM --------- */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Login successful! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}

/* --------- SIGNUP FORM --------- */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass    = document.getElementById('password')?.value;
    const confirm = document.getElementById('confirmPassword')?.value;
    if (pass && confirm && pass !== confirm) {
      showToast('⚠️ Passwords do not match.', 'error');
      return;
    }
    showToast('🎉 Account created! Redirecting to login...', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1800);
  });
}

/* --------- SCROLL REVEAL --------- */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
})();
