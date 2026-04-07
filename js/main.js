// Navigation toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            siteNav.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !siteNav.contains(event.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                siteNav.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', 'false');
                siteNav.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Show success message
                showStatus('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    clearStatus();
                }, 5000);
            }
        });
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    });
});

// Form validation functions
function validateForm() {
    const form = document.getElementById('contact-form');
    let isValid = true;
    
    // Validate name
    const nameField = form.querySelector('#name');
    const nameError = form.querySelector('[data-for="name"]');
    if (!nameField.value.trim()) {
        showError(nameError, 'Name is required');
        isValid = false;
    } else if (nameField.value.trim().length < 2) {
        showError(nameError, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailField = form.querySelector('#email');
    const emailError = form.querySelector('[data-for="email"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim()) {
        showError(emailError, 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(emailField.value.trim())) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate topic
    const topicField = form.querySelector('#topic');
    const topicError = form.querySelector('[data-for="topic"]');
    if (!topicField.value) {
        showError(topicError, 'Please select a topic');
        isValid = false;
    }
    
    // Validate message
    const messageField = form.querySelector('#message');
    const messageError = form.querySelector('[data-for="message"]');
    if (!messageField.value.trim()) {
        showError(messageError, 'Message is required');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showError(messageError, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function showStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';
    }
}

function clearStatus() {
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .menu-block, .zen-copy, .visit-hours, .visit-form-wrap');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
