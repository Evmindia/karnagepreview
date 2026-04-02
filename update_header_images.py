import os

# Paths of original images (from Arsenal)
keyboards_img = "assets/Gray background Visage.jpg.jpeg"
mouse_img = "mouseassets/Blink/Blink - White.jpg"
mousepads_img = "Mousepad Image/Mousepad - M.jpg"
headsets_img = "assets/headsets/Headphone.jpg"

root_dir = r"e:\karnage\karnage normal"

# Helper to adjust paths based on file location
def get_rel_path(img_path, depth):
    if depth == 0:
        return img_path
    elif depth == 1:
        return f"../{img_path}"
    elif depth == 2:
        return f"../../{img_path}"
    return img_path

def update_html(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Determine depth
    rel_path = os.path.relpath(file_path, root_dir)
    depth = rel_path.count(os.sep)

    # Images for this depth
    k_img = get_rel_path(keyboards_img, depth)
    m_img = get_rel_path(mouse_img, depth)
    mp_img = get_rel_path(mousepads_img, depth)
    h_img = get_rel_path(headsets_img, depth)

    # Regex would be better but let's try simple replacement for the specific blocks.
    # The structure is fairly consistent in the category-grid.
    
    # We need to find the category-grid and replace the images inside it.
    # Pattern: 
    # <a href="...gaming-keyboards/" class="category-card">
    #   <div class="cat-image-wrapper">
    #     <img src="..." ...>
    #   </div>
    #   <span class="cat-title">Keyboards</span>
    # </a>

    # Let's perform a more surgical replacement by matching the whole block.
    # Note: different files might have different relative paths in the href and src.

    # I'll use a more generic approach: find the category-card blocks.
    
    import re

    # Pattern for Keyboards
    content = re.sub(
        r'(<a href="[^"]*gaming-keyboards/" class="category-card">[\s\S]*?<img src=")([^"]*)("[\s\S]*?<span class="cat-title">Keyboards</span>)',
        rf'\1{k_img}\3',
        content
    )

    # Pattern for Mice
    content = re.sub(
        r'(<a href="[^"]*gaming-mice/" class="category-card">[\s\S]*?<img src=")([^"]*)("[\s\S]*?<span class="cat-title">Mouse</span>)',
        rf'\1{m_img}\3',
        content
    )

    # Pattern for Mousepads
    content = re.sub(
        r'(<a href="[^"]*mousepads/" class="category-card">[\s\S]*?<img src=")([^"]*)("[\s\S]*?<span class="cat-title">Mousepads</span>)',
        rf'\1{mp_img}\3',
        content
    )

    # Pattern for Headsets
    content = re.sub(
        r'(<a href="[^"]*gaming-headsets/" class="category-card">[\s\S]*?<img src=")([^"]*)("[\s\S]*?<span class="cat-title">Headsets</span>)',
        rf'\1{h_img}\3',
        content
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

# File list from grep
html_files = [
    r"e:\karnage\karnage normal\support.html",
    r"e:\karnage\karnage normal\sitemap.html",
    r"e:\karnage\karnage normal\product.html",
    r"e:\karnage\karnage normal\mousepads\swift-xxl\index.html",
    r"e:\karnage\karnage normal\mousepads\swift-m\index.html",
    r"e:\karnage\karnage normal\mousepads\swift-l\index.html",
    r"e:\karnage\karnage normal\mousepads\index.html",
    r"e:\karnage\karnage normal\mousepads\glide-extended\index.html",
    r"e:\karnage\karnage normal\index.html",
    r"e:\karnage\karnage normal\gaming-mice\templar-white\index.html",
    r"e:\karnage\karnage normal\gaming-mice\templar-black\index.html",
    r"e:\karnage\karnage normal\gaming-mice\inferno-white\index.html",
    r"e:\karnage\karnage normal\gaming-mice\inferno-black\index.html",
    r"e:\karnage\karnage normal\gaming-mice\index.html",
    r"e:\karnage\karnage normal\gaming-mice\blink-white\index.html",
    r"e:\karnage\karnage normal\gaming-mice\blink-black\index.html",
    r"e:\karnage\karnage normal\gaming-keyboards\visage-white\index.html",
    r"e:\karnage\karnage normal\gaming-keyboards\visage-95-blue\index.html",
    r"e:\karnage\karnage normal\gaming-keyboards\visage-95\index.html",
    r"e:\karnage\karnage normal\gaming-keyboards\visage\index.html",
    r"e:\karnage\karnage normal\gaming-keyboards\index.html",
    r"e:\karnage\karnage normal\gaming-headsets\velocity\index.html",
    r"e:\karnage\karnage normal\gaming-headsets\index.html",
    r"e:\karnage\karnage normal\category.html",
    r"e:\karnage\karnage normal\cart.html",
    r"e:\karnage\karnage normal\blogs.html",
    r"e:\karnage\karnage normal\about.html"
]

for f_path in html_files:
    if os.path.exists(f_path):
        update_html(f_path)
    else:
        print(f"File not found: {f_path}")
