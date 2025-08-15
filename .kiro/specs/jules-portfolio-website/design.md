# Design Document

## Overview

This design document outlines the architecture and design approach for Hannah Idalia's professional coaching website focused on burnout recovery and sustainable thriving. The site will be built as a static HTML website with clean, modern design that positions Hannah as a premium coach while making it easy for potential clients to book consultation calls. The site will be hosted at hannahidalia.com.

## Architecture

### Site Structure
The website will follow a simple, focused structure:

```
publicJules/
├── index.html (Homepage)
├── about.html (About Hannah)
├── services.html (Coaching Programs)
├── contact.html (Contact & Booking)
├── blog.html (Optional - Future expansion)
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── hero-image.jpg
│       ├── hannah-headshot.jpg
│       └── other-assets/
└── README.md
```

### Technology Stack
- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern CSS with Flexbox/Grid for responsive layouts
- **Vanilla JavaScript**: Minimal JS for progressive enhancement
- **External Integrations**: Calendly/Acuity for scheduling

## Components and Interfaces

### Navigation Component
- **Desktop**: Horizontal navigation bar with logo and menu items
- **Mobile**: Hamburger menu that transforms into slide-out navigation
- **Active States**: Clear indication of current page
- **Menu Items**: Home, About, Services, Contact, (Blog - future)

### Hero Section Component
- **Layout**: Full-width section with background image or gradient
- **Content**: Compelling headline, subheadline, and primary CTA button
- **Visual**: Professional photo of Hannah positioned strategically
- **CTA**: Prominent "Book Your Consultation" button

### Service Cards Component
- **Layout**: Card-based design for 3-month and 6-month programs
- **Content**: Program name, duration, key benefits, and CTA
- **Visual Hierarchy**: Clear differentiation between programs
- **Responsive**: Stack vertically on mobile devices

### Contact Form Component
- **Fields**: Name, Email, Phone (optional), Message
- **Validation**: Client-side validation with clear error messages
- **Integration**: Form submission handling (can integrate with Netlify Forms or similar)
- **Accessibility**: Proper labels and ARIA attributes

### Scheduling Integration Component
- **Platform**: Calendly or Acuity Scheduling embedded widget
- **Placement**: Multiple strategic locations throughout the site
- **Styling**: Custom CSS to match site design
- **Fallback**: Direct contact information if scheduling fails

## Data Models

### Page Content Structure
```javascript
// Homepage Content
{
  hero: {
    headline: "Transform Burnout into Brilliance",
    subheadline: "Sustainable coaching for professionals ready to thrive",
    ctaText: "Book Your Free Consultation",
    backgroundImage: "hero-image.jpg"
  },
  benefits: [
    "Recover from burnout sustainably",
    "Rediscover joy in your work",
    "Build lasting resilience"
  ],
  contact: {
    email: "hello@hannahidalia.com"
  }
}

// Services Content
{
  programs: [
    {
      name: "3-Month Transformation",
      duration: "12 weeks",
      description: "Intensive program for rapid burnout recovery",
      benefits: ["Weekly 1:1 sessions", "Custom action plans", "Email support"],
      cta: "Learn More"
    },
    {
      name: "6-Month Mastery",
      duration: "24 weeks",
      description: "Comprehensive program for sustainable thriving",
      benefits: ["Bi-weekly sessions", "Quarterly reviews", "Resource library"],
      cta: "Learn More"
    }
  ]
}
```

### Contact Form Data
```javascript
{
  name: "string (required)",
  email: "string (required, validated)",
  phone: "string (optional)",
  message: "string (required)",
  preferredContact: "email|phone",
  consultationInterest: "3-month|6-month|unsure"
}
```

## Error Handling

### Form Validation
- **Client-side**: Real-time validation with immediate feedback
- **Required Fields**: Clear indication of missing information
- **Email Validation**: Proper email format checking
- **Error Messages**: User-friendly, actionable error descriptions

### Scheduling Integration Errors
- **Fallback Contact**: If Calendly/Acuity fails, show contact form
- **Error Messages**: Clear instructions for alternative booking methods
- **Graceful Degradation**: Site remains functional without JavaScript

### Image Loading
- **Lazy Loading**: Images load as they come into viewport
- **Alt Text**: Descriptive alt text for all images
- **Fallback**: Placeholder or background color if images fail to load

## Testing Strategy

### Cross-Browser Testing
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers

### Responsive Testing
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Testing Tools**: Browser dev tools, real device testing
- **Touch Targets**: Minimum 44px for mobile interactions

### Performance Testing
- **Page Speed**: Target under 3 seconds load time
- **Image Optimization**: WebP format with JPEG fallbacks
- **CSS/JS Minification**: Compressed files for production
- **Lighthouse Audits**: Regular performance, accessibility, and SEO audits

### Accessibility Testing
- **WCAG 2.1 AA Compliance**: Meet accessibility standards
- **Screen Reader Testing**: Test with NVDA/JAWS
- **Keyboard Navigation**: Full site navigable without mouse
- **Color Contrast**: Minimum 4.5:1 ratio for text

### User Experience Testing
- **Task Completion**: Can users easily book a consultation?
- **Information Architecture**: Is content easy to find and understand?
- **Mobile Experience**: Does the site work well on mobile devices?
- **Load Testing**: How does the site perform under traffic?

## Visual Design Principles

### Color Palette
- **Primary**: Professional blue or teal (#2C5282 or similar)
- **Secondary**: Warm accent color (#ED8936 or similar)
- **Neutral**: Grays for text and backgrounds (#2D3748, #718096, #F7FAFC)
- **Success**: Green for positive actions (#38A169)

### Typography
- **Headings**: Modern sans-serif (Inter, Poppins, or system fonts)
- **Body Text**: Readable serif or sans-serif (Georgia, system fonts)
- **Hierarchy**: Clear distinction between H1, H2, H3, and body text
- **Line Height**: 1.6 for body text, 1.2 for headings

### Layout Principles
- **White Space**: Generous spacing for clean, premium feel
- **Grid System**: Consistent 12-column grid for alignment
- **Visual Hierarchy**: Clear information hierarchy with size, color, and spacing
- **Mobile-First**: Design for mobile, enhance for desktop

### Imagery Style
- **Professional**: High-quality, professional photography
- **Authentic**: Real photos of Hannah, not stock imagery where possible
- **Consistent**: Cohesive visual style across all images
- **Optimized**: Properly sized and compressed for web

This design creates a professional, trustworthy presence that clearly communicates Hannah's value proposition while making it extremely easy for potential clients to take the next step and book a consultation call.