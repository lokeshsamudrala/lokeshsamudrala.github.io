// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');
const navbar = document.getElementById('navbar');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Back to top functionality
function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling for navigation links
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            closeMobileMenu();
        }
    }
}

// Contact form handling
// function handleContactForm(e) {
//     e.preventDefault();
    
//     const formData = new FormData(contactForm);
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const subject = formData.get('subject');
//     const message = formData.get('message');
    
//     // Create mailto link
//     const mailtoLink = `mailto:lokeshsamudrala28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
//     window.location.href = mailtoLink;
    
//     // Show success message
//     showNotification('Thank you for your message! Your email client should open now.', 'success');
    
//     // Reset form
//     contactForm.reset();
// }

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 1rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
            }
            
            .notification-success i:first-child {
                color: #10b981;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #64748b;
                margin-left: auto;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            [data-theme="dark"] .notification {
                background: #1e293b;
                border-color: #334155;
                color: #f1f5f9;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    
    timelineItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    skillCategories.forEach((category, index) => {
        category.classList.add('slide-in-left');
        category.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(category);
    });
    
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    const originalText = titleElement.innerHTML;
    const highlightText = '<span class="highlight">Lokesh Samudrala</span>';
    const beforeText = "Hi, I'm ";
    
    titleElement.innerHTML = beforeText;
    
    let index = 0;
    const nameText = "Lokesh Samudrala";
    
    function typeWriter() {
        if (index < nameText.length) {
            if (index === 0) {
                titleElement.innerHTML = beforeText + '<span class="highlight">' + nameText.charAt(index);
            } else if (index === nameText.length - 1) {
                titleElement.innerHTML = beforeText + '<span class="highlight">' + nameText.substring(0, index + 1) + '</span>';
            } else {
                titleElement.innerHTML = beforeText + '<span class="highlight">' + nameText.substring(0, index + 1);
            }
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Back to top button
    backToTop.addEventListener('click', scrollToTop);
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Resume download
    // downloadResumeBtn.addEventListener('click', downloadResume);
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleBackToTop();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    handleNavbarScroll();
    handleBackToTop();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);