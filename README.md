# Airco Montage Limburg

Professional website voor airconditioning installatie, onderhoud en reparatie in Zuid-Limburg.

## Features

- 🏠 **Homepage** met hero section, diensten overzicht en contact formulieren
- 📍 **Stad-specifieke landing pages** voor Heerlen, Sittard en Maastricht
- 🛍️ **Producten showcase** met filter functionaliteit per merk
- ❓ **FAQ pagina** met veelgestelde vragen
- 🔄 **Domain-based branding** - Automatische aanpassing op basis van domeinnaam
- 📱 **Volledig responsive** - Geoptimaliseerd voor alle apparaten
- 🚀 **SEO geoptimaliseerd** - Schema.org structured data, meta tags, sitemap
- ⚡ **Performance** - Lazy loading, optimized images, minified assets

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5.3.2 (via CDN)
- EmailJS voor contact formulieren
- Vite voor development en build
- Font: Inter (Google Fonts)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Domain-based Branding

De website past zich automatisch aan op basis van het domein:
- `aircomontagelimburg.nl` - Airco Montage Limburg branding
- `staycoolairco.nl` - StayCool Airco branding

Voor local development gebruik: `http://localhost:8847/?brand=staycoolairco.nl`

## Project Structure

```
├── index.html          # Homepage
├── faq.html           # FAQ pagina
├── producten.html     # Producten overzicht
├── heerlen.html       # Stad landing page
├── sittard.html       # Stad landing page
├── maastricht.html    # Stad landing page
├── css/
│   └── style.css      # Alle styling
├── js/
│   └── main.js        # JavaScript functionaliteit
├── public/            # Statische assets
│   └── images/        # Alle afbeeldingen
├── dist/              # Production build output
└── vite.config.js     # Vite configuratie
```

## Contact

Voor vragen over deze website, neem contact op met:
- Tel: 046 202 1430
- Email: info@aircomontagelimburg.nl

---

© 2024 Airco Montage Limburg. Alle rechten voorbehouden.