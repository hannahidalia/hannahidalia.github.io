# Hannah Idalia - Professional Coaching Website

A static HTML website for Hannah Idalia's professional coaching practice, focused on helping professionals transform burnout into sustainable thriving.

## Project Structure

```
publicJules/
├── index.html          # Homepage
├── about.html          # About Hannah page
├── services.html       # Coaching programs page
├── contact.html        # Contact and booking page
├── assets/
│   ├── css/
│   │   └── main.css    # Main stylesheet with responsive design
│   ├── js/
│   │   └── main.js     # Progressive enhancement JavaScript
│   └── images/         # Website images and assets
└── README.md           # This file
```

## Features

- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1024px
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and semantic HTML
- **Performance**: Optimized for fast loading with minimal dependencies
- **Progressive Enhancement**: Works without JavaScript, enhanced with JS
- **SEO Optimized**: Proper meta tags and semantic structure

## Technology Stack

- HTML5 with semantic markup
- CSS3 with modern features (Flexbox, Grid, Custom Properties)
- Vanilla JavaScript for progressive enhancement
- No external dependencies or frameworks

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

The website is built as static HTML files and can be served by any web server. No build process is required.

### Local Development

Simply open the HTML files in a web browser or serve them with a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

### Deployment

The site can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web hosting

## Content Management

Content is managed directly in the HTML files. Key areas to update:

1. **Meta tags**: Update titles and descriptions in each HTML file
2. **Navigation**: Update menu items in the nav sections
3. **Content**: Replace placeholder content with actual copy
4. **Images**: Add optimized images to the assets/images/ directory
5. **Contact info**: Update email addresses and contact information

## Performance Optimization

- Images should be optimized and compressed
- Consider using WebP format with JPEG fallbacks
- Implement lazy loading for images below the fold
- Minify CSS and JavaScript for production

## Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content
- High contrast color scheme
- Touch-friendly button sizes (44px minimum)

## SEO Considerations

- Proper meta tags and descriptions
- Semantic HTML structure
- Open Graph tags for social sharing
- Structured data markup (to be added)
- Fast loading times
- Mobile-friendly design

## Future Enhancements

- Blog functionality
- Advanced form handling
- Analytics integration
- A/B testing capabilities
- Content management system integration