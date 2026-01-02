
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});


// HEADER SCROLL BEHAVIOR
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class when user scrolls down
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// --- Hero Carousel Logic ---
const carouselImages = document.querySelectorAll("#heroCarousel img");
let currentImg = 0;
let carouselInterval;

function nextImage() {
  carouselImages[currentImg].classList.remove("active");
  currentImg = (currentImg + 1) % carouselImages.length;
  carouselImages[currentImg].classList.add("active");
}

function startCarousel() {
  carouselInterval = setInterval(nextImage, 5000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

startCarousel();

// Pause carousel on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

// FAQ ACCORDION
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    // Close other open items
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });

    // Toggle current item
    item.classList.toggle('active');
  });
});


// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


// BRANDS CAROUSEL - PAUSE ON HOVER
const brandsCarousel = document.querySelector('.brands-carousel');

if (brandsCarousel) {
  brandsCarousel.addEventListener('mouseenter', () => {
    brandsCarousel.style.animationPlayState = 'paused';
  });

  brandsCarousel.addEventListener('mouseleave', () => {
    brandsCarousel.style.animationPlayState = 'running';
  });
}


// MOBILE MENU TOGGLE (Basic Implementation)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';

  // Animate hamburger icon
  const spans = mobileMenuBtn.querySelectorAll('span');
  if (navLinks.style.display === 'flex') {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.style.display = 'none';
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});


// PERFORMANCE OPTIMIZATION

// Log page load time for performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// CONTACT FORM HANDLING
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  // Set minimum date for date inputs
  const today = new Date().toISOString().split('T')[0];
  const pickupDate = contactForm.querySelector('#pickupDate');
  const returnDate = contactForm.querySelector('#returnDate');

  if (pickupDate) pickupDate.min = today;
  if (returnDate) returnDate.min = today;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic form validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        field.style.borderColor = 'var(--border)';
      }
    });

    // Email validation
    const emailField = contactForm.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && emailField.value && !emailRegex.test(emailField.value)) {
      emailField.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Date validation
    const pickupDate = contactForm.querySelector('#pickupDate');
    const returnDate = contactForm.querySelector('#returnDate');

    if (pickupDate.value && returnDate.value) {
      const pickup = new Date(pickupDate.value);
      const returnD = new Date(returnDate.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (pickup < today) {
        pickupDate.style.borderColor = '#ef4444';
        isValid = false;
        alert('Pickup date cannot be in the past');
      } else if (returnD <= pickup) {
        returnDate.style.borderColor = '#ef4444';
        isValid = false;
        alert('Return date must be after pickup date');
      } else {
        pickupDate.style.borderColor = 'var(--border)';
        returnDate.style.borderColor = 'var(--border)';
      }
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  });

  // Real-time validation feedback
  contactForm.addEventListener('input', (e) => {
    if (e.target.hasAttribute('required') && e.target.value.trim()) {
      e.target.style.borderColor = 'var(--border)';
    }
  });
}