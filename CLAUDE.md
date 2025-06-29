# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Airco Montage Limburg is a multi-brand airconditioning installation website with domain-based branding, city-specific landing pages, and integrated contact forms using EmailJS.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:8847)
npm run dev

# Build for production
npm run build

# Build for Netlify deployment (includes static assets)
npm run build:netlify

# Preview production build
npm run preview

# Alternative dev servers
npm run dev:live    # Using live-server
npm run serve       # Using Python http.server
```

## Architecture & Key Concepts

### Domain-Based Branding System
The website automatically adapts its branding based on the domain:
- `aircomontagelimburg.nl` → Airco Montage Limburg
- `staycoolairco.nl` → StayCool Airco

Configuration in `js/main.js`:
- BRAND_CONFIG object contains all brand-specific data
- getCurrentBrand() determines active brand
- applyBranding() updates DOM elements dynamically

For local development: `http://localhost:8847/?brand=staycoolairco.nl`

### Build System
- **Vite** handles bundling with specific configuration:
  - Multiple HTML entry points (index, city pages, products, FAQ)
  - External JS/CSS files are NOT bundled (copied manually)
  - Assets organized into specific folders during build
  - Console logs stripped in production

### EmailJS Integration
- Service ID and Template ID defined in `js/main.js`
- Forms wait for EmailJS to load before initialization
- Template parameters include both English and Dutch field names
- `full_message` parameter contains all form data as fallback

### Page Structure
- **index.html**: Homepage with hero form and main contact form
- **City pages** (heerlen/sittard/maastricht.html): SEO-optimized local landing pages
- **producten.html**: Product showcase with brand filtering
- **faq.html**: FAQ page with structured data

### Deployment (Netlify)
- `netlify.toml` configures build and headers
- `build:netlify` script copies static files (js/, css/, sitemap.xml, robots.txt, favicon.ico)
- All assets served from `/dist` directory

## Critical Implementation Details

### Form Handling
- Forms initialized only once via `waitForEmailJS()`
- Each form tracks initialization with `data-initialized` attribute
- City/woonplaats field recently added to collect location data

### Image Paths
- Development: `public/images/`
- Production: `/assets/` (transformed by build)
- Product images use various sources, check consistency

### CSS/JS Loading
- Bootstrap 5.3.2 and Bootstrap Icons via CDN
- Custom CSS in `css/style.css`
- Custom JS in `js/main.js` (not bundled by Vite)
- EmailJS loaded before custom scripts

## Recent Issues & Solutions

1. **404 errors on Netlify**: Static files (js/css) weren't being copied to dist
   - Solution: `build:netlify` script explicitly copies these files

2. **Duplicate emails**: Forms were initialized twice
   - Solution: Removed duplicate initialization, added initialization check

3. **Missing form fields**: Woonplaats wasn't collected
   - Solution: Added city field to all forms

4. **Navbar visibility**: Hamburger menu invisible on scroll
   - Solution: Added dynamic styling for toggler based on navbar state