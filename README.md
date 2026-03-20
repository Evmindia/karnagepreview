# Asset Guide for Karnage Website

## Recommended Image Sizes

To ensure the best performance and visual quality on your brand website, please use the following recommended dimensions for your images.

### 1. Brand Logo
- **Format**: SVG (Preferred) or PNG with transparent background.
- **Dimensions**: 
  - Height: ~40px - 60px
  - Width: Auto (keep aspect ratio)

### 2. Category Dropdown Images
These images appear in the "Categories" mega menu.
- **Format**: JPG or WEBP (for better compression).
- **Aspect Ratio**: 1:1 (Square).
- **Dimensions**: 
  - **Recommended**: 600 x 600 pixels (Retina ready)
  - **Minimum**: 300 x 300 pixels
- **Style Note**: Use product images on a clean background (transparent or dark grey) or lifestyle shots clearly showing the product category.

### 3. Product Images (General)
For future product grids or details pages.
- **Format**: JPG or WEBP.
- **Dimensions**: 1000 x 1000 pixels.
- **Background**: Consistent background color (e.g., #121212) or transparent PNGs.

### 4. Hero Slider Images (Responsive)
The slider now supports separate images for Desktop and Mobile devices.
- **Desktop Images**:
  - class: `bg-desktop`
  - Dimensions: 1920 x 700 pixels (approx. 65vh height)
- **Mobile Images**:
  - class: `bg-mobile`
  - Dimensions: 1080 x 1200 pixels (approx. 65vh height)
- **Usage**: Look for the `.slide-full` divs in `index.html` and update the `background-image` url for both `bg-desktop` and `bg-mobile` divs.

### 5. Top Categories Section
These images appear in the grid below the marquee.
- **Format**: PNG (transparent) or high-quality JPG.
- **Aspect Ratio**: 1:1 (Square).
- **Dimensions**: 600 x 600 pixels.
- **Background**: The container uses a light gray background (`#f5f5f7`). Use images that look good on this color.

### 6. Launch Collection Section
The full-width collection hero below the categories.
- **Format**: JPG or WEBP.
- **Dimensions**: 1920 x 1080 pixels (Desktop).
- **Mobile Note**: For mobile, the center of the image will be highlighted. Ensure principal subjects are centered.
- **Style**: Use high-impact lifestyle or product family shots.

### 7. Top Products Section
These are the product cards with hover slide effects.
- **Dimensions**: 800 x 800 pixels (1:1 Square).
- **Secondary Image**: Provide a second image of the same product for the hover slide animation.
- **Format**: JPG or WEBP (80-90 quality).
- **Style**: Studio shots with clean black/dark backgrounds work best for the Karnage aesthetic.

