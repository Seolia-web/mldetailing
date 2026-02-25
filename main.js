/* ========================================
   ML Detailing — Main JavaScript
   ======================================== */

// ---- Lenis Smooth Scroll ----
let lenis;
try {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} catch (e) {
  // Lenis not available, skip
}

// ---- AOS Init ----
document.addEventListener('DOMContentLoaded', function () {

  if (typeof AOS !== 'undefined') {
    AOS.init({
      offset: 80,
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
    });
  }

  // ---- Navbar Scroll Behavior ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- tsParticles (Hero) ----
  const particlesEl = document.getElementById('tsparticles');
  if (particlesEl && typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 55, density: { enable: true, area: 900 } },
        color: { value: '#5282FC' },
        opacity: { value: { min: 0.08, max: 0.25 } },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          distance: 160,
          color: '#5282FC',
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          outModes: { default: 'bounce' },
        },
      },
      detectRetina: true,
    });
  }

  // ---- Typed.js ----
  const typedEl = document.getElementById('typed-text');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Nettoyage automobile professionnel',
        'Detailing intérieur & extérieur',
        'Résultat visible et garanti',
        'Votre véhicule mérite le meilleur',
      ],
      typeSpeed: 52,
      backSpeed: 28,
      backDelay: 2200,
      loop: true,
      smartBackspace: false,
    });
  }

  // ---- CountUp.js ----
  const countUpElements = document.querySelectorAll('[data-countup]');
  if (countUpElements.length && typeof CountUp !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseFloat(entry.target.dataset.countup);
          const suffix = entry.target.dataset.suffix || '';
          const decimals = entry.target.dataset.decimals || 0;
          const cu = new CountUp(entry.target, target, {
            duration: 2.2,
            suffix: suffix,
            decimalPlaces: decimals,
          });
          cu.start();
        }
      });
    }, { threshold: 0.5 });
    countUpElements.forEach(el => observer.observe(el));
  }

  // ---- Vanilla Tilt ----
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (tiltElements.length && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(tiltElements, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      perspective: 1200,
    });
  }

  // ---- Before/After Slider ----
  const baContainer = document.querySelector('.before-after-container');
  const baSlider = document.querySelector('.before-after-slider-input');
  const afterImg = document.querySelector('.after-img');
  const sliderLine = document.querySelector('.slider-line');
  const sliderHandle = document.querySelector('.slider-handle');

  if (baContainer && baSlider && afterImg) {
    const updateSlider = (val) => {
      const pct = val;
      afterImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      if (sliderLine) sliderLine.style.left = pct + '%';
      if (sliderHandle) sliderHandle.style.left = pct + '%';
    };
    updateSlider(50);

    baSlider.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });

    // Touch support
    let dragging = false;
    baContainer.addEventListener('mousedown', () => dragging = true);
    window.addEventListener('mouseup', () => dragging = false);
    baContainer.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const rect = baContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      baSlider.value = pct;
      updateSlider(pct);
    });

    baContainer.addEventListener('touchstart', () => dragging = true, { passive: true });
    window.addEventListener('touchend', () => dragging = false);
    baContainer.addEventListener('touchmove', (e) => {
      const rect = baContainer.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      baSlider.value = pct;
      updateSlider(pct);
    }, { passive: true });
  }

  // ---- Web3Forms Submit Handler ----
  document.querySelectorAll('form[data-web3form]').forEach(form => {
    const thankYou = form.closest('.form-wrapper')
      ? form.closest('.form-wrapper').querySelector('.thank-you')
      : form.parentElement.querySelector('.thank-you');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
      }

      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          form.style.display = 'none';
          if (thankYou) thankYou.style.display = 'block';
        } else {
          throw new Error(data.message || 'Erreur lors de l\'envoi');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
      }
    });
  });

  // ---- GSAP ScrollTrigger (optional enhancements) ----
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Subtle fade-in on section titles
    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        }
      });
    });
  }

});
