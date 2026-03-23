import os
import glob
import re
import codecs

dropdown_html = """<li class="nav-item has-dropdown">
                        <a href="#" class="nav-link">CATEGORIES <i class="fa-solid fa-chevron-down"></i></a>

                        <!-- Mega Menu Dropdown -->
                        <div class="mega-dropdown">
                            <div class="dropdown-content">
                                <div class="category-grid">
                                    <a href="category.html" class="category-card">
                                        <div class="cat-image-wrapper">
                                            <img src="assets/keyboardheader.png" alt="Keyboards" class="cat-img">
                                        </div>
                                        <span class="cat-title">Keyboards</span>
                                    </a>
                                    <a href="category.html" class="category-card">
                                        <div class="cat-image-wrapper">
                                            <img src="assets/mouseheader.png" alt="Mice" class="cat-img">
                                        </div>
                                        <span class="cat-title">Mouse</span>
                                    </a>
                                    <a href="category.html" class="category-card">
                                        <div class="cat-image-wrapper">
                                            <img src="assets/mousepadheader.png" alt="Mousepads" class="cat-img">
                                        </div>
                                        <span class="cat-title">Mousepads</span>
                                    </a>
                                    <a href="category.html" class="category-card">
                                        <div class="cat-image-wrapper">
                                            <img src="assets/Headphone.png" alt="Headsets" class="cat-img">
                                        </div>
                                        <span class="cat-title">Headsets</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>"""

target_pattern1 = re.compile(r'<li class="nav-item has-dropdown">\s*<a href="index(?:\-original)?\.html" class="nav-link">CATEGORIES <i class="fa-solid fa-chevron-down"></i></a>\s*</li>', re.MULTILINE)
target_pattern2 = re.compile(r'<li class="nav-item has-dropdown">\s*<a href="#" class="nav-link">CATEGORIES <i class="fa-solid fa-chevron-down"></i></a>\s*</li>', re.MULTILINE)

fixed = 0
for file in glob.glob("e:/karnage/karnage normal/*.html"):
    with codecs.open(file, 'r', 'utf-8') as f:
        content = f.read()
    
    if 'class="mega-dropdown"' not in content:
        orig_len = len(content)
        content = target_pattern1.sub(dropdown_html, content)
        content = target_pattern2.sub(dropdown_html, content)
        if len(content) != orig_len:
            print(f"Fixed dropdown in {file}")
            fixed += 1
            with codecs.open(file, 'w', 'utf-8') as f:
                f.write(content)
        else:
            print(f"Pattern matched nothing in {file} even though no mega-dropdown")

print(f"Done! Fixed {fixed} files.")
