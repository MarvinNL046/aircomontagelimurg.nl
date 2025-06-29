#!/bin/bash

# Build script for deployment
echo "Building for deployment..."

# Clean previous build
rm -rf dist

# Run Vite build
npm run build

# Post-build: copy additional files to dist
echo "Copying additional files to dist..."
cp -r js dist/ 2>/dev/null || true
cp -r public dist/ 2>/dev/null || true
cp favicon.ico dist/ 2>/dev/null || true
cp robots.txt dist/ 2>/dev/null || true
cp sitemap.xml dist/ 2>/dev/null || true

# Fix image paths in dist HTML files
echo "Fixing image paths..."
find dist -name "*.html" -exec sed -i 's#public/images/#images/#g' {} \;

# Move public/images to images in dist
if [ -d "dist/public/images" ]; then
    mv dist/public/images dist/images
    rmdir dist/public 2>/dev/null || true
fi

echo "Build complete!"
echo "The 'dist' folder contains all files ready for deployment."
echo ""
echo "Deploy these files from the dist folder:"
echo "- All .html files"
echo "- css/ folder"
echo "- js/ folder" 
echo "- images/ folder"
echo "- assets/ folder"
echo "- favicon.ico"
echo "- robots.txt"
echo "- sitemap.xml"