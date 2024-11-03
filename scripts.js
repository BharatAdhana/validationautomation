

// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme Toggle
    const toggle = document.getElementById('toggle');
    const body = document.body;

    toggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h4');

        question.addEventListener('click', () => {
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ item
            item.classList.toggle('active');
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000, // Animation duration in ms
        once: true,     // Whether animation should happen only once
        easing: 'ease-in-out', // Easing function
    });

    // GSAP Animations for Sections (Optional: Customize as needed)
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Vanta.js Background Animation (Optional)
    VANTA.WAVES({
        el: ".hero", // The element to apply the animation to
        color: 0xffd700, // Gold color
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1.5,
        zoom: 0.75,
        backgroundColor: 0x001122 // Match your dark theme background
    });

    // Custom Mouse Cursor Animation (Optional)
    // Simple example using CSS and JS
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Change cursor appearance on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
});


