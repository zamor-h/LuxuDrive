
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