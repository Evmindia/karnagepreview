import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

correct_code = """// script.js
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
                if (e.target.tagName.toLowerCase() === 'i' || e.target.tagName.toLowerCase() === 'a') {
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
"""

start_idx = content.find('    // Intro Loader Logic')
if start_idx != -1:
    rest_of_code = content[start_idx:]
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(correct_code + rest_of_code)
    print("Fixed script.js")
else:
    print("Could not find Intro Loader Logic")
