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
    function restartAnimation(index) {
        // Force reflow to restart CSS animation
        const activeCircle = dots[index].querySelector('.progress-ring__circle');

        // Clone and replace to strip old listeners and reset animation cleanly
        const newCircle = activeCircle.cloneNode(true);
        activeCircle.parentNode.replaceChild(newCircle, activeCircle);

        newCircle.style.animation = 'none';
        newCircle.offsetHeight; /* trigger reflow */
        newCircle.style.animation = 'progress 5s linear forwards';

        // Listen for animation end
        newCircle.addEventListener('animationend', handleAnimationEnd, { once: true });
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
});

// Category Filtering and Sorting Logic
document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.querySelector('.category-catalog-grid');
    const filterSort = document.getElementById('filter-sort');
    const filterConnectivity = document.getElementById('filter-connectivity');
    const filterType = document.getElementById('filter-type');
    const resultsCount = document.querySelector('.category-results-count');

    if (catalogGrid && filterSort) {
        const products = Array.from(catalogGrid.querySelectorAll('.category-item-card'));
        const promoBanner = catalogGrid.querySelector('.category-promo-banner');

        products.forEach((card, index) => {
            card.setAttribute('data-index', index);
            
            // Shopify price might have formatting like '.99' or 'Rs. 1,299.00'. 
            // We need to parse just the numbers.
            let rawPrice = card.getAttribute('data-price') || '0';
            let parsedPrice = rawPrice.replace(/[^0-9.]/g, ''); // keep only numbers and decimals
            card.dataset.parsedPrice = parseFloat(parsedPrice);
        });

        function updateCatalog() {
            const sortVal = filterSort.value;
            const connVal = filterConnectivity.value;
            const typeVal = filterType.value;

            let visibleCount = 0;

            let filteredProducts = products.filter(card => {
                const cardConn = card.getAttribute('data-connectivity') || '';
                const cardType = card.getAttribute('data-type') || '';
                
                const matchConn = (connVal === 'all') || (cardConn.includes(connVal));
                const matchType = (typeVal === 'all') || (cardType.includes(typeVal));
                
                return matchConn && matchType;
            });

            if (sortVal === 'price-asc') {
                filteredProducts.sort((a, b) => a.dataset.parsedPrice - b.dataset.parsedPrice);
            } else if (sortVal === 'price-desc') {
                filteredProducts.sort((a, b) => b.dataset.parsedPrice - a.dataset.parsedPrice);
            } else {
                filteredProducts.sort((a, b) => parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index')));
            }

            products.forEach(card => card.style.display = 'none');

            if (promoBanner) {
                catalogGrid.appendChild(promoBanner);
            }

            filteredProducts.forEach(card => {
                catalogGrid.appendChild(card);
                card.style.display = 'flex'; // Since .category-item-card is a flex container
                visibleCount++;
            });
            
            // Handle if there are no products
            const emptyMessage = catalogGrid.querySelector('.empty-message');
            if (visibleCount === 0) {
              if(!emptyMessage) {
                 const msg = document.createElement('div');
                 msg.className = 'empty-message';
                 msg.style = 'grid-column: 1 / -1; text-align: center; padding: 40px; color: #888;';
                 msg.innerHTML = '<p>No products match your filters.</p>';
                 catalogGrid.appendChild(msg);
              }
            } else {
              if(emptyMessage) emptyMessage.remove();
            }

            // Keep products that are removed from the DOM hidden, wait I used display = none
            // We just need to append them in correct order. The flex ordering will handle display if they are block/flex.
        }

        filterSort.addEventListener('change', updateCatalog);
        filterConnectivity.addEventListener('change', updateCatalog);
        filterType.addEventListener('change', updateCatalog);
        
        updateCatalog();
    }
});

// --- Scroll Reveal Logic ---
document.addEventListener('DOMContentLoaded', () => {
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
