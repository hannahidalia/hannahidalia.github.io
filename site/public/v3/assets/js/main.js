// Main JavaScript file for Hannah Idalia website
// Progressive enhancement - site works without JavaScript
// Performance optimized with lazy loading and efficient event handling

// Performance monitoring and optimization
(function() {
    'use strict';
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
        // This would be implemented with a web vitals library
        console.log('Web Vitals tracking initialized');
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        });
    }
    
    // Preload critical resources
    const preloadCriticalResources = () => {
        // Preload hero image if not already loaded
        const heroImage = document.querySelector('.hero-background');
        if (heroImage && !heroImage.style.backgroundImage) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = '/assets/images/hero-background.jpg';
            document.head.appendChild(link);
        }
    };
    
    // Initialize performance optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadCriticalResources);
    } else {
        preloadCriticalResources();
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initBackToTop();
    initContactForm();
    initSchedulingWidget();
    initBlogFunctionality();
});

/**
 * Initialize mobile navigation functionality
 * Requirement: 7.2 - Mobile hamburger menu functionality
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Enhanced keyboard navigation
        link.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Enhanced keyboard navigation for mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            navToggle.focus(); // Return focus to toggle button
        }
        
        // Tab trapping in mobile menu
        if (navMenu.classList.contains('active') && event.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        toggleHamburgerAnimation(navToggle, false);
        document.body.classList.remove('nav-open');
        
        // Announce menu closure to screen readers
        announceToScreenReader('Navigation menu closed');
    }
    
    function openMobileMenu() {
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        toggleHamburgerAnimation(navToggle, true);
        document.body.classList.add('nav-open');
        
        // Focus first menu item and announce to screen readers
        const firstMenuItem = navMenu.querySelector('.nav-link');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
        }
        announceToScreenReader('Navigation menu opened');
    }
}

/**
 * Animate hamburger menu lines
 */
function toggleHamburgerAnimation(toggle, isOpen) {
    const lines = toggle.querySelectorAll('.hamburger-line');
    
    if (isOpen) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}

/**
 * Initialize smooth scrolling for anchor links
 * Requirement: 7.4 - Smooth scrolling to section anchors
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip empty hash links
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

/**
 * Initialize back to top functionality
 * Requirement: 7.5 - Back to top functionality on longer pages
 */
function initBackToTop() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #2c5282;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize contact form validation and submission
 * Requirement: 6.4, 6.5 - Form validation with real-time feedback
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('.form-submit');
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoading = submitButton.querySelector('.submit-loading');
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Validate on blur (when user leaves field)
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear errors on input if field was previously invalid
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormStatus('Please correct the errors above.', 'error');
            // Focus on first error field
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        hideFormStatus();
        
        try {
            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Submit form (placeholder implementation)
            const success = await submitContactForm(data);
            
            if (success) {
                showFormStatus('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                
                // Clear any error states
                inputs.forEach(input => {
                    clearError(input);
                });
            } else {
                throw new Error('Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('Sorry, there was an error sending your message. Please try again or email me directly at hello@hannahidalia.com.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(field)} is required.`;
        isValid = false;
    }
    // Email validation
    else if (fieldName === 'email' && value && !validateEmail(value)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
    }
    // Phone validation (if provided)
    else if (fieldName === 'phone' && value && !validatePhone(value)) {
        errorMessage = 'Please enter a valid phone number.';
        isValid = false;
    }
    // Message length validation
    else if (fieldName === 'message' && value && value.length < 10) {
        errorMessage = 'Please provide a more detailed message (at least 10 characters).';
        isValid = false;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Get user-friendly field label
 */
function getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('.form-label');
    return label ? label.textContent.replace(' *', '') : field.name;
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
function validatePhone(phone) {
    // Basic phone validation - accepts various formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

/**
 * Validate required fields
 */
function validateRequired(value) {
    return value.trim().length > 0;
}

/**
 * Show form error message with enhanced accessibility
 */
function showError(input, message) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.setAttribute('role', 'alert');
    }
    
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorElement ? errorElement.id || 'error-' + input.name : '');
    
    // Announce error to screen readers
    announceToScreenReader(`Error: ${message}`);
    
    // Add shake animation for visual feedback (respects reduced motion)
    if (!document.body.classList.contains('reduced-motion')) {
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

/**
 * Clear form error message with accessibility support
 */
function clearError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.removeAttribute('role');
    }
    
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    input.removeAttribute('aria-describedby');
    
    // Add success state for better feedback
    if (input.value.trim()) {
        input.classList.add('success');
        setTimeout(() => {
            input.classList.remove('success');
        }, 2000);
    }
}

/**
 * Show form status message
 */
function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Hide form status message
 */
function hideFormStatus() {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
    }
}

/**
 * Submit contact form data
 * This is a placeholder - replace with actual form submission logic
 */
async function submitContactForm(data) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, we'll simulate success
    // In a real implementation, you would:
    // 1. Send data to your backend API
    // 2. Use a service like Netlify Forms, Formspree, or EmailJS
    // 3. Integrate with your email service
    
    console.log('Form data to submit:', data);
    
    // Simulate random success/failure for demo
    // In production, remove this and implement actual submission
    return Math.random() > 0.1; // 90% success rate for demo
}

/**
 * Initialize scheduling widget error handling
 */
function initSchedulingWidget() {
    const schedulingWidget = document.querySelector('.scheduling-widget');
    const fallbackContent = document.querySelector('.booking-fallback');
    
    if (!schedulingWidget || !fallbackContent) return;
    
    // Check if Calendly script loads successfully
    let calendlyLoaded = false;
    
    // Set a timeout to show fallback if Calendly doesn't load
    setTimeout(() => {
        if (!calendlyLoaded && !document.querySelector('.calendly-inline-widget iframe')) {
            showSchedulingFallback();
        }
    }, 5000);
    
    // Listen for Calendly events (if available)
    if (window.Calendly) {
        calendlyLoaded = true;
    } else {
        // Check periodically if Calendly has loaded
        const checkCalendly = setInterval(() => {
            if (window.Calendly || document.querySelector('.calendly-inline-widget iframe')) {
                calendlyLoaded = true;
                clearInterval(checkCalendly);
            }
        }, 500);
        
        // Stop checking after 10 seconds
        setTimeout(() => {
            clearInterval(checkCalendly);
            if (!calendlyLoaded) {
                showSchedulingFallback();
            }
        }, 10000);
    }
}

/**
 * Show scheduling fallback content
 */
function showSchedulingFallback() {
    const schedulingWidget = document.querySelector('.scheduling-widget');
    const fallbackContent = document.querySelector('.booking-fallback');
    
    if (schedulingWidget && fallbackContent) {
        schedulingWidget.innerHTML = `
            <div class="scheduling-widget-error">
                <h3>Scheduling Widget Unavailable</h3>
                <p>We're having trouble loading the scheduling widget. Please use the contact information below to reach out directly.</p>
            </div>
        `;
        fallbackContent.style.display = 'block';
    }
}

// Add shake animation CSS for form validation feedback
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Inject shake animation CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

/**
 * Announce message to screen readers
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Enhanced keyboard navigation for interactive elements
 */
function initKeyboardNavigation() {
    // Add keyboard support for elements with role="button"
    const buttonElements = document.querySelectorAll('[role="button"]:not(button)');
    buttonElements.forEach(element => {
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
        
        // Ensure focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Enhanced focus management for modals and overlays
    const overlays = document.querySelectorAll('.modal, .overlay, .popup');
    overlays.forEach(overlay => {
        overlay.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const closeButton = this.querySelector('.close, [aria-label*="close"], [aria-label*="Close"]');
                if (closeButton) {
                    closeButton.click();
                }
            }
        });
    });
}

/**
 * Initialize accessibility enhancements
 */
function initAccessibilityEnhancements() {
    initKeyboardNavigation();
    initAriaLiveRegions();
    initFocusManagement();
    initColorContrastSupport();
}

/**
 * Initialize ARIA live regions for dynamic content
 */
function initAriaLiveRegions() {
    // Create global announcement region if it doesn't exist
    if (!document.getElementById('aria-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
}

/**
 * Enhanced focus management
 */
function initFocusManagement() {
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Focus management for dynamic content
    const dynamicContent = document.querySelectorAll('[data-dynamic-content]');
    dynamicContent.forEach(content => {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const firstFocusable = content.querySelector('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
                    if (firstFocusable) {
                        firstFocusable.focus();
                    }
                }
            });
        });
        
        observer.observe(content, { childList: true, subtree: true });
    });
}

/**
 * Color contrast and visual accessibility support
 */
function initColorContrastSupport() {
    // Detect high contrast mode preference
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Detect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    // Listen for changes in preferences
    if (window.matchMedia) {
        window.matchMedia('(prefers-contrast: high)').addEventListener('change', function(e) {
            document.body.classList.toggle('high-contrast', e.matches);
        });
        
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e) {
            document.body.classList.toggle('reduced-motion', e.matches);
        });
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    initAccessibilityEnhancements();
});

// Export functions for potential use in other scripts
window.HannahIdalia = {
    validateEmail,
    validateRequired,
    validatePhone,
    showError,
    clearError,
    showFormStatus,
    hideFormStatus,
    submitContactForm,
    announceToScreenReader,
    initAccessibilityEnhancements
};
/**
 
* Initialize blog functionality
 * Requirement: 8.1, 8.2, 8.3, 8.4 - Blog navigation and categorization
 */
function initBlogFunctionality() {
    initBlogCategoryFilter();
    initBlogPostLoader();
    initNewsletterSignup();
    initBlogPostContent();
}

/**
 * Initialize blog category filtering
 */
function initBlogCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (!categoryButtons.length || !articleCards.length) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles
            articleCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    // Add fade-in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update URL without page reload
            if (history.pushState) {
                const url = selectedCategory === 'all' ? 
                    window.location.pathname : 
                    `${window.location.pathname}?category=${selectedCategory}`;
                history.pushState({ category: selectedCategory }, '', url);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.category) {
            const categoryButton = document.querySelector(`[data-category="${event.state.category}"]`);
            if (categoryButton) {
                categoryButton.click();
            }
        }
    });
    
    // Initialize category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const categoryButton = document.querySelector(`[data-category="${categoryParam}"]`);
        if (categoryButton) {
            categoryButton.click();
        }
    }
}

/**
 * Initialize blog post loading functionality
 */
function initBlogPostLoader() {
    const loadMoreButton = document.querySelector('.load-more-btn');
    
    if (!loadMoreButton) return;
    
    let currentPage = 1;
    const postsPerPage = 6;
    
    loadMoreButton.addEventListener('click', async function() {
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        try {
            // Simulate loading more posts
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In a real implementation, you would fetch more posts from an API
            const newPosts = await loadMoreBlogPosts(currentPage + 1, postsPerPage);
            
            if (newPosts && newPosts.length > 0) {
                appendBlogPosts(newPosts);
                currentPage++;
                
                // Hide load more button if no more posts
                if (newPosts.length < postsPerPage) {
                    this.style.display = 'none';
                }
            } else {
                this.style.display = 'none';
            }
            
        } catch (error) {
            console.error('Error loading more posts:', error);
            this.textContent = 'Error loading posts';
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        } finally {
            if (this.style.display !== 'none') {
                this.textContent = originalText;
                this.disabled = false;
            }
        }
    });
}

/**
 * Simulate loading more blog posts
 * In a real implementation, this would fetch from an API
 */
async function loadMoreBlogPosts(page, limit) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, return empty array to simulate no more posts
    // In a real implementation, you would fetch actual blog posts
    return [];
}

/**
 * Append new blog posts to the articles grid
 */
function appendBlogPosts(posts) {
    const articlesGrid = document.querySelector('.articles-grid');
    if (!articlesGrid) return;
    
    posts.forEach(post => {
        const articleCard = createArticleCard(post);
        articlesGrid.appendChild(articleCard);
    });
}

/**
 * Create article card HTML element
 */
function createArticleCard(post) {
    const article = document.createElement('article');
    article.className = 'article-card';
    article.setAttribute('data-category', post.category);
    
    article.innerHTML = `
        <div class="article-image">
            <div class="article-image-placeholder" role="img" aria-label="Article image placeholder"></div>
        </div>
        <div class="article-content">
            <div class="article-meta">
                <span class="article-category">${post.categoryDisplay}</span>
                <span class="article-date">${post.date}</span>
            </div>
            <h3 class="article-title">
                <a href="blog-post.html?post=${post.slug}">${post.title}</a>
            </h3>
            <p class="article-excerpt">${post.excerpt}</p>
            <div class="article-footer">
                <a href="blog-post.html?post=${post.slug}" class="read-more-link">Read More</a>
                <div class="article-cta">
                    <a href="contact.html" class="btn btn-outline btn-small">Book Consultation</a>
                </div>
            </div>
        </div>
    `;
    
    return article;
}

/**
 * Initialize newsletter signup functionality
 */
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-signup');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('#newsletter-email');
        const submitButton = this.querySelector('.newsletter-btn');
        const originalText = submitButton.textContent;
        
        // Basic email validation
        if (!validateEmail(emailInput.value.trim())) {
            showNewsletterStatus('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Show loading state
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        hideNewsletterStatus();
        
        try {
            // Submit newsletter signup
            const success = await submitNewsletterSignup(emailInput.value.trim());
            
            if (success) {
                showNewsletterStatus('Thank you for subscribing! You\'ll receive our latest insights soon.', 'success');
                emailInput.value = '';
            } else {
                throw new Error('Subscription failed');
            }
            
        } catch (error) {
            console.error('Newsletter signup error:', error);
            showNewsletterStatus('Sorry, there was an error. Please try again later.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Submit newsletter signup
 * Placeholder implementation - replace with actual service
 */
async function submitNewsletterSignup(email) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, integrate with:
    // - Mailchimp, ConvertKit, or similar email service
    // - Your backend API
    // - Newsletter service provider
    
    console.log('Newsletter signup:', email);
    
    // Simulate success for demo
    return Math.random() > 0.1; // 90% success rate
}

/**
 * Show newsletter status message
 */
function showNewsletterStatus(message, type) {
    let statusElement = document.querySelector('.newsletter-status');
    
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.className = 'newsletter-status';
        const newsletterForm = document.querySelector('.newsletter-signup');
        newsletterForm.appendChild(statusElement);
    }
    
    statusElement.textContent = message;
    statusElement.className = `newsletter-status ${type}`;
    statusElement.style.display = 'block';
    statusElement.style.marginTop = '1rem';
    statusElement.style.padding = '0.75rem';
    statusElement.style.borderRadius = '0.5rem';
    statusElement.style.fontSize = '0.875rem';
    
    if (type === 'success') {
        statusElement.style.backgroundColor = '#d4edda';
        statusElement.style.color = '#155724';
        statusElement.style.border = '1px solid #c3e6cb';
    } else {
        statusElement.style.backgroundColor = '#f8d7da';
        statusElement.style.color = '#721c24';
        statusElement.style.border = '1px solid #f5c6cb';
    }
}

/**
 * Hide newsletter status message
 */
function hideNewsletterStatus() {
    const statusElement = document.querySelector('.newsletter-status');
    if (statusElement) {
        statusElement.style.display = 'none';
    }
}

/**
 * Initialize blog post content functionality
 */
function initBlogPostContent() {
    // Only run on blog post pages
    if (!document.querySelector('.blog-post')) return;
    
    initBlogPostLoader();
    initReadingProgress();
    initSocialSharing();
    updateBlogPostFromURL();
}

/**
 * Initialize reading progress indicator
 */
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2c5282, #667eea);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Initialize social sharing functionality
 */
function initSocialSharing() {
    // Add social sharing buttons if they don't exist
    const postHeader = document.querySelector('.post-header .container');
    if (!postHeader || document.querySelector('.social-share')) return;
    
    const shareContainer = document.createElement('div');
    shareContainer.className = 'social-share';
    shareContainer.style.cssText = `
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
    `;
    
    const shareText = document.createElement('span');
    shareText.textContent = 'Share: ';
    shareText.style.color = '#718096';
    shareText.style.fontSize = '0.875rem';
    
    const shareButtons = [
        { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}` },
        { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
        { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` }
    ];
    
    shareContainer.appendChild(shareText);
    
    shareButtons.forEach(button => {
        const shareLink = document.createElement('a');
        shareLink.href = button.url;
        shareLink.target = '_blank';
        shareLink.rel = 'noopener noreferrer';
        shareLink.textContent = button.name;
        shareLink.style.cssText = `
            color: #2c5282;
            font-size: 0.875rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            transition: background-color 0.3s ease;
        `;
        
        shareLink.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e2e8f0';
        });
        
        shareLink.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        shareContainer.appendChild(shareLink);
    });
    
    postHeader.appendChild(shareContainer);
}

/**
 * Update blog post content based on URL parameters
 */
function updateBlogPostFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');
    
    if (!postSlug) return;
    
    // In a real implementation, you would fetch post data from an API
    // For now, we'll just update the title to show it's working
    const currentTitle = document.getElementById('current-post-title');
    if (currentTitle) {
        currentTitle.textContent = `Post: ${postSlug}`;
    }
}

// Blog functionality is now included in the main DOMContentLoaded initialization