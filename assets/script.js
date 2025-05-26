document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
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
    
    // Form submission handling
  document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const form = event.target;
    const toast = document.getElementById('toast');
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Collect form data
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const company = form.company.value.trim();
    const products = Array.from(form.querySelectorAll('input[name="products"]:checked')).map(input => input.value);
    const help = form.help.value.trim();
    const hearAbout = form.hearAbout.value;
    
    // Client-side validation
    let hasError = false;
    
    if (!firstName) {
        form.firstName.nextElementSibling.textContent = 'First name is required';
        hasError = true;
    }
    if (!lastName) {
        form.lastName.nextElementSibling.textContent = 'Last name is required';
        hasError = true;
    }
    if (!email) {
        form.email.nextElementSibling.textContent = 'Email is required';
        hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        form.email.nextElementSibling.textContent = 'Invalid email format';
        hasError = true;
    }
    if (products.length === 0) {
        form.querySelector('.checkbox-group .error-message').textContent = 'Please select at least one product';
        hasError = true;
    }
    if (!hearAbout) {
        form.hearAbout.nextElementSibling.textContent = 'Please select an option';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Prepare form data for Formspree
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('company', company);
    formData.append('products', products.join(', '));
    formData.append('help', help);
    formData.append('hearAbout', hearAbout);
    formData.append('_subject', 'New Contact Form Submission');
    formData.append('_language', 'en');
    
    // Show toast notification
    const showToast = (message, type) => {
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    };
    
    try {
       
        const response = await fetch('https://formspree.io/f/xpwdgobl', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showToast('Thank you! Your message has been sent.', 'success');
            form.reset();
        } else {
            showToast('Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        showToast('An error occurred. Please try again later.', 'error');
    }
});
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .product-card, .feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-content, .product-card, .feature-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Particle animation for hero background
    const createParticles = function() {
        const particlesContainer = document.querySelector('.bg-particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
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
    
    // Add animation styles for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: floatParticle linear infinite;
            opacity: 0;
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});