// Smooth scroll animations for refined design
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        sections.forEach(section => {
            section.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Show hero immediately
    if (sections.length > 0) {
        sections[0].classList.add('visible');
    }
});
