// script.js
console.log("Karnage Website Loaded");

/* Hero Slider Logic */
document.addEventListener('DOMContentLoaded', () => {
    // Select the new full width slider elements
    const slides = document.querySelectorAll('.slide-full');
    // If old slider is present and commented out, querySelectorAll might return empty if looking for .slide-full
    // Ensure we are targeting the right class names from HTML step
    const dots = document.querySelectorAll('.slider-dots-full .dot');
    const sliderSection = document.querySelector('.hero-slider-full'); // Not strictly needed for bg color anymore but good ref
    let currentSlideIndex = 0;

    // Function to set background color
    function updateBackgroundColor(index) {
        const color = slides[index].getAttribute('data-bg-color');
        console.log(`Updating background to: ${color}`);
        if (color && sliderSection) {
            sliderSection.style.backgroundColor = color;
        }
    }

    // Auto rotate using animation end
    let slideTimer;
    function restartAnimation(index) {
        clearTimeout(slideTimer);
        // Force reflow to restart CSS animation
        const activeCircle = dots[index].querySelector('.progress-ring__circle');

        // Clone and replace to strip old listeners and reset animation cleanly
        const newCircle = activeCircle.cloneNode(true);
        activeCircle.parentNode.replaceChild(newCircle, activeCircle);

        newCircle.style.animation = 'none';
        newCircle.offsetHeight; /* trigger reflow */
        newCircle.style.animation = 'progress 6s linear forwards';

        // Listen for animation end
        slideTimer = setTimeout(handleAnimationEnd, 6000);
    }

    function handleAnimationEnd() {
        nextSlide();
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function showSlide(index) {
        // Handle wrapping
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update background
        updateBackgroundColor(index);

        currentSlideIndex = index;

        // Start animation on new dot
        restartAnimation(index);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove any pending animation listeners from current active dot
            // (Handled by cloneNode in restartAnimation, but good to be safe if we didn't clone)
            // Since we clone on every start, the old one is garbage collected or just sits there without listener if it was the one listening?
            // Actually, the 'animationend' is on the circle. If we switch slide, we should probably stop the old animation?
            // Since we remove .active class, CSS might stop animation?
            // Let's rely on showSlide restarting the NEW one.

            showSlide(index);
        });
    });

    // Initialize
    updateBackgroundColor(currentSlideIndex); // Set initial color immediately
    showSlide(currentSlideIndex); // Start the first slide logic

});

/* Mobile Menu Logic */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Create overlay dynamically if not exists
    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('mobile-overlay');
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark'); // Use close icon
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Mobile Dropdown Toggle
    const dropdownTrigger = document.querySelector('.nav-item.has-dropdown > .nav-link');
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            // Check if we are in mobile view logic (by checking nav active or window width)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent navigation
                const parent = dropdownTrigger.parentElement;
                parent.classList.toggle('active');

                // Toggle chevron icon
                const icon = dropdownTrigger.querySelector('i');
                if (icon) {
                    if (parent.classList.contains('active')) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    }

    // Intro Loader Logic
    const introLoader = document.getElementById('intro-loader');
    const pageWrapper = document.getElementById('page-wrapper');
    const body = document.body;

    if (introLoader) {
        // Prevent scrolling while intro is playing
        body.classList.add('no-scroll');

        // Set a timeout for 4 seconds
        setTimeout(() => {
            introLoader.classList.add('fade-out');
            body.classList.remove('no-scroll');

            // Start fading in the main content
            if (pageWrapper) {
                pageWrapper.classList.add('visible');
            }

            // Remove from DOM after transition
            setTimeout(() => {
                introLoader.remove();
            }, 1000); // Wait for CSS transition
        }, 4000);
    } else if (pageWrapper) {
        // Fail-safe: show content if loader is missing
        pageWrapper.classList.add('visible');
    }

    // Category Wishlist Toggle
    const wishlistBtns = document.querySelectorAll('.category-item-wishlist, .product-actions button');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigating to top of page
            btn.classList.toggle('active');
        });
    });

    // Product Gallery Thumbnail Logic
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Remove active class from all
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');

                // Update main image src
                const thumbImg = this.querySelector('img');
                if (thumbImg) {
                    mainImage.src = thumbImg.src;
                }
            });
        });
    }

    // Product Variant Toggle Logic
    const variantBtns = document.querySelectorAll('.variant-btn');
    if (variantBtns.length > 0) {
        variantBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                variantBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Product Color Swatch Toggle
    const swatches = document.querySelectorAll('.color-swatch-wrap');
    if (swatches.length > 0) {
        swatches.forEach(swatch => {
            swatch.addEventListener('click', function () {
                swatches.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

});
// Category Filtering and Sorting Logic
document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.querySelector('.category-catalog-grid');
    const filterSort = document.getElementById('filter-sort');
    const filterType = document.getElementById('filter-type');
    const priceSlider = document.getElementById('price-range-slider');
    const resultsCount = document.querySelector('.category-results-count');

    if (catalogGrid && (filterSort || filterType || priceSlider)) {
        const products = Array.from(catalogGrid.querySelectorAll('.category-item-card'));
        const promoBanner = catalogGrid.querySelector('.category-promo-banner');

        products.forEach((card, index) => {
            card.setAttribute('data-index', index);
        });

        function updateCatalog() {
            const sortVal = filterSort ? filterSort.value : 'default';
            const typeVal = filterType ? filterType.value : 'all';
            const maxPrice = priceSlider ? parseInt(priceSlider.value) : Infinity;

            let visibleCount = 0;

            let filteredProducts = products.filter(card => {
                const cardType = card.getAttribute('data-type');
                const cardPrice = parseInt(card.getAttribute('data-price')) || 0;
                
                const matchType = (typeVal === 'all') || (cardType === typeVal);
                const matchPrice = cardPrice <= maxPrice;
                
                return matchType && matchPrice;
            });

            // Sorting
            if (sortVal === 'price-asc') {
                filteredProducts.sort((a, b) => parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price')));
            } else if (sortVal === 'price-desc') {
                filteredProducts.sort((a, b) => parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price')));
            } else {
                filteredProducts.sort((a, b) => parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index')));
            }

            // Remove existing cards
            products.forEach(card => card.remove());

            // Re-append in order
            filteredProducts.forEach(card => {
                catalogGrid.appendChild(card);
                visibleCount++;
            });

            if (resultsCount) {
                resultsCount.textContent = 'Showing ' + visibleCount + ' of ' + products.length + ' products';
            }
        }

        // Apply hash-based filtering on load
        function applyHashFilter() {
            const hash = window.location.hash.replace('#', '');
            if (hash && filterType) {
                const validOptions = Array.from(filterType.options).map(opt => opt.value);
                if (validOptions.includes(hash)) {
                    filterType.value = hash;
                }
            }
            updateCatalog();
        }

        if (filterSort) filterSort.addEventListener('change', updateCatalog);
        if (filterType) filterType.addEventListener('change', updateCatalog);
        if (priceSlider) priceSlider.addEventListener('input', updateCatalog);
        
        // Listen for hash changes
        window.addEventListener('hashchange', applyHashFilter);

        // Initial apply
        applyHashFilter();
    }
});

/* --- Mini-Cart & Scroll Animations Logic --- */
document.addEventListener('DOMContentLoaded', () => {
    const cartTrigger = document.getElementById('cart-drawer-trigger');
    const cartDrawer = document.getElementById('mini-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');

    function openCart() {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeCartDrawer() {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    // Trigger cart on 'Add to Cart' button click (Static HTML Example)
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    // --- Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
}); 
