// script.js
console.log("Karnage Website Loaded");

/* Hero Slider Logic */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide-full');
    const dots = document.querySelectorAll('.slider-dots-full .dot');
    const sliderSection = document.querySelector('.hero-slider-full');
    let currentSlideIndex = 0;

    function updateBackgroundColor(index) {
        if (!slides[index]) return;
        const color = slides[index].getAttribute('data-bg-color');
        if (color && sliderSection) {
            sliderSection.style.backgroundColor = color;
        }
    }

    let slideTimer;
    function restartAnimation(index) {
        clearTimeout(slideTimer);
        if (!dots[index]) return;
        const activeCircle = dots[index].querySelector('.progress-ring__circle');
        if (!activeCircle) return;
        
        const newCircle = activeCircle.cloneNode(true);
        activeCircle.parentNode.replaceChild(newCircle, activeCircle);

        newCircle.style.animation = 'none';
        newCircle.offsetHeight; 
        newCircle.style.animation = 'progress 6s linear forwards';

        slideTimer = setTimeout(handleAnimationEnd, 6000);
    }

    function handleAnimationEnd() {
        nextSlide();
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function showSlide(index) {
        if (slides.length === 0) return;
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        updateBackgroundColor(index);
        currentSlideIndex = index;
        restartAnimation(index);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    if (slides.length > 0) {
        updateBackgroundColor(currentSlideIndex);
        showSlide(currentSlideIndex);
    }
});

/* Mobile Menu Logic */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('mobile-overlay');
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        if (mainNav) mainNav.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon && mainNav && mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
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
            if (window.innerWidth <= 768) {
                // If clicking the chevron icon, toggle dropdown
                if (e.target.tagName.toLowerCase() === 'i') {
                    e.preventDefault(); 
                    const parent = dropdownTrigger.parentElement;
                    parent.classList.toggle('active');

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
            }
        });
    }

    // Global Category Card Clickable Fix
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.category-item-card');
        if (card && !e.target.closest('a') && !e.target.closest('button')) {
            const buyBtn = card.querySelector('.btn-buy');
            if (buyBtn) {
                window.location.href = buyBtn.href;
            }
        }
    });

    // Intro Loader Logic
    const introLoader = document.getElementById('intro-loader');
    const pageWrapper = document.getElementById('page-wrapper');
    const body = document.body;

    if (introLoader) {
        body.classList.add('no-scroll');
        setTimeout(() => {
            introLoader.classList.add('fade-out');
            body.classList.remove('no-scroll');
            if (pageWrapper) {
                pageWrapper.classList.add('visible');
            }
            setTimeout(() => {
                introLoader.remove();
            }, 1000);
        }, 2000); // Reduced from 4s to 2s for better UX
    } else {
        if (pageWrapper) pageWrapper.classList.add('visible');
        body.classList.remove('no-scroll'); // Ensure scroll is enabled
    }

    // Category Wishlist Toggle
    const wishlistBtns = document.querySelectorAll('.category-item-wishlist, .product-actions button');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
        });
    });

    // Product Gallery Thumbnail Logic
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function () {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
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

            if (sortVal === 'price-asc') {
                filteredProducts.sort((a, b) => parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price')));
            } else if (sortVal === 'price-desc') {
                filteredProducts.sort((a, b) => parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price')));
            } else {
                filteredProducts.sort((a, b) => parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index')));
            }

            products.forEach(card => card.remove());
            filteredProducts.forEach(card => {
                catalogGrid.appendChild(card);
                visibleCount++;
            });

            if (resultsCount) {
                resultsCount.textContent = 'Showing ' + visibleCount + ' of ' + products.length + ' products';
            }
        }

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
        window.addEventListener('hashchange', applyHashFilter);
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
        if (cartDrawer) cartDrawer.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCartDrawer() {
        if (cartDrawer) cartDrawer.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
