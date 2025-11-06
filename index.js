document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon from bars to close
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a link is clicked (for single-page navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 2. Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's a contact or download link which shouldn't scroll
            if (this.getAttribute('href') === '#contact' || this.getAttribute('download') !== null) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight + 1; // +1 to ensure it sits perfectly below the fixed header

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Scroll Reveal Animation (Content Smoother Scroller) ---
    const contentBlocks = document.querySelectorAll('.content-block');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once the element is visible
                // observer.unobserve(entry.target);
            } else {
                 // Optional: Remove 'visible' class when scrolling out of view
                 // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    contentBlocks.forEach(block => {
        observer.observe(block);
    });
    
    // Ensure hero section is visible immediately
    document.getElementById('hero').classList.add('visible');


    // --- 4. Testimonials Carousel ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlide = 0;

    const showSlide = (index) => {
        // Hide all slides and remove active class
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Show the current slide and set active class
        slides[index].style.display = 'block';
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Event listeners for buttons
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showSlide(index);
        });
    });

    // Auto-advance the carousel every 5 seconds (optional)
    setInterval(nextSlide, 5000);

    // Initialize the first slide
    if (slides.length > 0) {
        showSlide(currentSlide);
    }
});