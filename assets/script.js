document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Countdown Timer
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30);

    const updateCountdown = () => {
        const now = new Date();
        const timeLeft = countdownDate - now;

        if (timeLeft <= 0) {
            document.getElementById('countdown').innerHTML = 'Offer Expired!';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Form Submission Handling
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const headerToast = document.getElementById('headerToast');

    const showToast = (message, isError = false) => {
        const target = isError ? toast : headerToast;
        target.textContent = message;
        target.style.display = 'block';
        target.style.background = isError ? '#ff4d4f' : '#3b82f6';
        setTimeout(() => {
            target.style.display = 'none';
        }, 3000);
    };

    const validateForm = () => {
        let isValid = true;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const checkboxes = document.querySelectorAll('input[name="products"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (!firstName.value.trim()) {
            firstName.nextElementSibling.textContent = 'First name is required';
            isValid = false;
        }

        if (!lastName.value.trim()) {
            lastName.nextElementSibling.textContent = 'Last name is required';
            isValid = false;
        }

        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.nextElementSibling.textContent = 'Valid email is required';
            isValid = false;
        }

        const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        if (!checked) {
            checkboxes[0].closest('.checkbox-group').querySelector('.error-message').textContent = 'Select at least one product';
            isValid = false;
        }

        return isValid;
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                showToast('Please fix the errors in the form', true);
                return;
            }

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (key === 'products') {
                    data[key] = data[key] ? [...data[key], value] : [value];
                } else {
                    data[key] = value;
                }
            });

            try {
                const response = await fetch('https://formspree.io/f/xpwdgobl', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: new FormData(form)
                });

                if (response.ok) {
                    showToast('Thank you! Your message has been sent.', false);
                    form.reset();
                } else {
                    showToast('Failed to send message. Please try again.', true);
                }
            } catch (error) {
                showToast('An error occurred. Please try again later.', true);
            }
        });
    }

    // Animation on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hero-content, .hero-form, .section');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.hero-content, .hero-form, .section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Particle Animation for Hero Background
    const createParticles = () => {
        const particlesContainer = document.querySelector('.bg-particles');
        if (!particlesContainer) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;

            particlesContainer.appendChild(particle);
        }
    };

    createParticles();
});




document.addEventListener('DOMContentLoaded', function() {
  // Pause animations on hover
  const rows = document.querySelectorAll('.partners-row');
  
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const track = row.querySelector('.partners-track');
      track.style.animationPlayState = 'paused';
    });
    
    row.addEventListener('mouseleave', () => {
      const track = row.querySelector('.partners-track');
      track.style.animationPlayState = 'running';
    });
  });
  
  // Adjust animation duration based on number of logos
  const tracks = document.querySelectorAll('.partners-track');
  tracks.forEach(track => {
    const logoCount = track.querySelectorAll('.partner-logo').length;
    const duration = Math.max(20, logoCount * 2); // Minimum 20s
    track.style.animationDuration = `${duration}s`;
  });
});



// testimonial section
document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentIndex = 0;
  let intervalId;
  
  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  }
  
  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 3000);
  }
  
  function stopAutoSlide() {
    clearInterval(intervalId);
  }
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });
  
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showTestimonial(parseInt(dot.dataset.index));
      startAutoSlide();
    });
  });
  
  // Pause on hover
  const slider = document.querySelector('.testimonials-slider');
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  
  // Initialize
  startAutoSlide();
});