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
   // Form Validation and Submission
// Form Validation and Submission
// Form Validation and Submission
 // Form validation and submission
   // Form Validation and Submission
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (!form) {
        console.error('Form element with ID "contactForm" not found in DOM.');
        return;
    }

    if (!toast) {
        console.error('Toast element with ID "toast" not found in DOM.');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = form.querySelector('.submit-button');
        if (submitButton) {
            submitButton.disabled = true;
        }

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.className = 'error-message';
        });

        // Client-side validation
        let hasError = false;
        const requiredFields = [
            {
                field: form.name,
                error: 'Name is required'
            },
            {
                field: form.email,
                error: 'Email is required',
                validate: (value) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : null
            },
            {
                field: form.phone,
                error: 'Phone number is required',
                validate: (value) => !/^\+?\d{10,15}$/.test(value) ? 'Invalid phone number' : null
            }
        ];

        requiredFields.forEach(({ field, error, validate }) => {
            if (!field) {
                console.error(`Form field for ${error.toLowerCase()} not found`);
                hasError = true;
                return;
            }
            const value = field.value.trim();
            const errorElement = field.nextElementSibling;
            if (!value) {
                if (errorElement) {
                    errorElement.textContent = error;
                    errorElement.className = 'error-message show';
                }
                hasError = true;
            } else if (validate) {
                const validationError = validate(value);
                if (validationError && errorElement) {
                    errorElement.textContent = validationError;
                    errorElement.className = 'error-message show';
                    hasError = true;
                }
            }
        });

        if (hasError) {
            if (submitButton) submitButton.disabled = false;
            return;
        }

        // Form submission
        try {
            const response = await fetch('https://formspree.io/f/xpwdgobl', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                toast.textContent = 'Thank you! Your request has been submitted.';
                toast.className = 'toast success show';
                form.reset();
                setTimeout(() => {
                    toast.className = 'toast success';
                }, 3000);
            } else {
                const errorData = await response.json();
                toast.textContent = errorData.error || 'Failed to send message. Please try again.';
                toast.className = 'toast error show';
                setTimeout(() => {
                    toast.className = 'toast error';
                }, 3000);
            }
        } catch (error) {
            toast.textContent = 'An error occurred. Please try again later.';
            toast.className = 'toast error show';
            setTimeout(() => {
                toast.className = 'toast error';
            }, 3000);
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .spec-item, .component-card, .video-wrapper');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.feature-card, .spec-item, .component-card, .video-wrapper').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Add floating animation to feature icons
  
});


document.addEventListener('DOMContentLoaded', function() {
  const specRows = document.querySelectorAll('.spec-row');
  
  specRows.forEach(row => {
    const name = row.querySelector('.spec-name');
    
    name.addEventListener('click', function() {
      // Toggle the active class on the parent row
      row.classList.toggle('active');
    });
  });




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