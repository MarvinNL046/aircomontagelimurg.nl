# Deployment Instructies voor aircomontagelimburg.nl

## Probleem: 404 errors voor JS/CSS bestanden

Als je 404 errors krijgt voor `/js/main.js` of andere bestanden, volg deze stappen:

## Oplossing 1: Upload de INHOUD van de dist folder

1. Open je FTP/hosting control panel
2. Navigeer naar je website root (meestal `public_html` of `www`)
3. Upload de **INHOUD** van de `dist` folder, NIET de dist folder zelf
4. De structuur moet zijn:
   ```
   public_html/
   ├── index.html
   ├── faq.html
   ├── heerlen.html
   ├── maastricht.html
   ├── producten.html
   ├── sittard.html
   ├── .htaccess
   ├── js/
   │   └── main.js
   ├── css/
   │   └── style.css
   ├── assets/
   │   └── (alle afbeeldingen)
   └── images/
       └── (alle afbeeldingen)
   ```

## Oplossing 2: Als je hosting een specifieke folder structuur heeft

Sommige hosting providers verwachten dat je de bestanden in een specifieke folder zet:

1. Check bij je hosting provider waar de website bestanden moeten staan
2. Typische locaties zijn:
   - `/public_html/`
   - `/www/`
   - `/htdocs/`
   - `/domains/aircomontagelimburg.nl/public_html/`

## Oplossing 3: Build script aanpassen

Als je hosting provider de bestanden direct uit de GitHub repository serveert, dan moet je:

1. De bestanden uit de `dist` folder naar de root verplaatsen
2. Of de build configuratie aanpassen om direct naar de root te builden

## Checklist voor deployment:

- [ ] Upload `.htaccess` bestand (belangrijk voor performance en redirects)
- [ ] Zorg dat alle bestanden in de juiste folder staan (NIET in een subfolder)
- [ ] Test of `/js/main.js` bereikbaar is via: `https://aircomontagelimburg.nl/js/main.js`
- [ ] Test of `/css/style.css` bereikbaar is via: `https://aircomontagelimburg.nl/css/style.css`
- [ ] Clear browser cache na upload (Ctrl+Shift+R)

## Voor GitHub Pages deployment:

Als je GitHub Pages gebruikt, moet je:
1. In repository settings > Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: `/` (root) 
5. Dan moet je de inhoud van dist naar de root verplaatsen

## Contact

Bij problemen, check:
- Browser console voor exacte foutmeldingen
- Network tab om te zien welke bestanden 404 geven
- Hosting provider documentatie voor juiste folder structuur