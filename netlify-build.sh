#!/bin/bash

echo "Building for Netlify deployment..."

# Run Vite build
npm run build

# Copy JS and CSS files to dist
echo "Copying JS and CSS files..."
cp -r js dist/ 2>/dev/null || true
cp -r css dist/ 2>/dev/null || true

# Ensure public folder contents are in dist
if [ -d "public" ]; then
    echo "Copying public folder contents..."
    cp -r public/* dist/ 2>/dev/null || true
fi

# List dist contents for verification
echo "Build complete. Dist folder contents:"
ls -la dist/

echo "Netlify build completed successfully!"