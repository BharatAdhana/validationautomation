// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // ------------------------------
    // 1. Hamburger Menu Toggle
    // ------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar ul');

    if (hamburger && navLinks) {
        // Initialize ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');

        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close the menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Close the menu on ESC key press
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus(); // Return focus to hamburger
            }
        });
    }

    // ------------------------------
    // 2. Theme Toggle with Persistence
    // ------------------------------
    const toggle = document.getElementById('toggle');
    const body = document.body;

    // Function to set theme
    const setTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-theme');
            toggle.checked = true;
        } else {
            body.classList.remove('dark-theme');
            toggle.checked = false;
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        // If no saved theme, use system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }

    // Event listener for theme toggle
    if (toggle) {
        toggle.addEventListener('change', () => {
            const isDark = toggle.checked;
            setTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ------------------------------
    // 3. FAQ Toggle with Accessibility
    // ------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');

        if (question && answer) {
            // Initialize ARIA attributes
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');

            const toggleFAQ = () => {
                const isActive = item.classList.toggle('active');
                question.setAttribute('aria-expanded', isActive);
                answer.setAttribute('aria-hidden', !isActive);

                // Close other open FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('h4');
                        const otherAnswer = otherItem.querySelector('p');
                        if (otherQuestion && otherAnswer) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherAnswer.setAttribute('aria-hidden', 'true');
                        }
                    }
                });
            };

            // Click event
            question.addEventListener('click', toggleFAQ);

            // Keyboard accessibility
            question.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleFAQ();
                }
            });
        }
    });

    // ------------------------------
    // 4. Initialize AOS (Already handled in HTML)
    // ------------------------------
    // AOS.init({
    //     duration: 1000, // Animation duration in ms
    //     once: true,     // Whether animation should happen only once
    //     easing: 'ease-in-out', // Easing function
    // });

    // ------------------------------
    // 5. GSAP Animations for Sections
    // ------------------------------
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
    }

    // ------------------------------
    // 6. Custom Mouse Cursor Animation
    // ------------------------------
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const speed = 0.15; // Adjust the speed of the cursor following

        // Throttle the mousemove event using requestAnimationFrame
        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
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
    }

    // ------------------------------
    // 7. Smooth Scroll for Anchor Links (Optional Enhancement)
    // ------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------
    // 8. Contact Form Submission Handling (Already in Contact HTML)
    // ------------------------------
    // Assuming contact form handling is embedded in the HTML, no changes needed here.
});
