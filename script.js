document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileNavToggle || !navLinks) return;

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileNavToggle.click();
            }
        });
    });

    // Achievement Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '').replace(',', '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc) + (target > 1000 ? '+' : '');
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString() + '+';
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Sticky Navbar Transition
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Fade-In Animation
    const fadeElems = document.querySelectorAll('.section, .feature-strip, .achievements-section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        elem.classList.add('fade-in-section');
        fadeObserver.observe(elem);
    });
});