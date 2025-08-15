/**
 * Analytics Configuration for Hannah Idalia Website
 * Comprehensive tracking for performance and user behavior
 */

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Replace with actual GA4 ID

// Enhanced ecommerce and event tracking
function initializeAnalytics() {
    // Initialize Google Analytics
    if (typeof gtag !== 'undefined') {
        // Track page views
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
        });
        
        // Track consultation bookings
        trackConsultationEvents();
        
        // Track form submissions
        trackFormSubmissions();
        
        // Track scroll depth
        trackScrollDepth();
        
        // Track file downloads
        trackFileDownloads();
        
        // Track external link clicks
        trackExternalLinks();
    }
}

// Track consultation booking events
function trackConsultationEvents() {
    // Track consultation button clicks
    document.querySelectorAll('a[href*="contact"], a[href*="calendly"], .btn-primary').forEach(button => {
        if (button.textContent.toLowerCase().includes('consultation') || 
            button.textContent.toLowerCase().includes('book') ||
            button.textContent.toLowerCase().includes('schedule')) {
            
            button.addEventListener('click', function() {
                gtag('event', 'consultation_click', {
                    event_category: 'engagement',
                    event_label: this.textContent.trim(),
                    page_location: window.location.href
                });
            });
        }
    });
    
    // Track Calendly widget interactions
    if (window.Calendly) {
        window.Calendly.initBadgeWidget({
            url: 'https://calendly.com/hannahidalia/consultation',
            text: 'Schedule time with me',
            color: '#2c5282',
            textColor: '#ffffff',
            branding: false
        });
        
        // Track Calendly events
        window.addEventListener('message', function(e) {
            if (e.data.event && e.data.event.indexOf('calendly') === 0) {
                gtag('event', 'calendly_interaction', {
                    event_category: 'scheduling',
                    event_label: e.data.event,
                    page_location: window.location.href
                });
            }
        });
    }
}

// Track form submissions
function trackFormSubmissions() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const formId = this.id || 'unknown_form';
            const formAction = this.action || 'no_action';
            
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: formId,
                form_action: formAction,
                page_location: window.location.href
            });
        });
    });
}

// Track scroll depth for engagement measurement
function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();
    
    function calculateScrollPercentage() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.round((scrollTop / docHeight) * 100);
    }
    
    window.addEventListener('scroll', function() {
        const currentScroll = calculateScrollPercentage();
        maxScroll = Math.max(maxScroll, currentScroll);
        
        milestones.forEach(milestone => {
            if (currentScroll >= milestone && !tracked.has(milestone)) {
                tracked.add(milestone);
                gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${milestone}%`,
                    value: milestone,
                    page_location: window.location.href
                });
            }
        });
    });
}

// Track file downloads
function trackFileDownloads() {
    document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"]').forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.href.split('/').pop();
            gtag('event', 'file_download', {
                event_category: 'engagement',
                event_label: fileName,
                file_url: this.href,
                page_location: window.location.href
            });
        });
    });
}

// Track external link clicks
function trackExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                gtag('event', 'external_link_click', {
                    event_category: 'engagement',
                    event_label: this.href,
                    external_url: this.href,
                    page_location: window.location.href
                });
            });
        }
    });
}

// Track Core Web Vitals
function trackWebVitals() {
    // This would integrate with web-vitals library
    // npm install web-vitals
    
    if (typeof webVitals !== 'undefined') {
        webVitals.getCLS(metric => {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'CLS',
                value: Math.round(metric.value * 1000),
                custom_parameter_1: metric.id
            });
        });
        
        webVitals.getFID(metric => {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'FID',
                value: Math.round(metric.value),
                custom_parameter_1: metric.id
            });
        });
        
        webVitals.getFCP(metric => {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'FCP',
                value: Math.round(metric.value),
                custom_parameter_1: metric.id
            });
        });
        
        webVitals.getLCP(metric => {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'LCP',
                value: Math.round(metric.value),
                custom_parameter_1: metric.id
            });
        });
        
        webVitals.getTTFB(metric => {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'TTFB',
                value: Math.round(metric.value),
                custom_parameter_1: metric.id
            });
        });
    }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
    trackWebVitals();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAnalytics,
        trackConsultationEvents,
        trackFormSubmissions,
        trackScrollDepth,
        trackFileDownloads,
        trackExternalLinks,
        trackWebVitals
    };
}