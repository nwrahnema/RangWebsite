const REVEAL_LIMIT = 8;

function initReveal() {
  const revealTargets = Array.from(document.querySelectorAll('section'))
    .slice(1)
    .filter(section => !section.classList.contains('key-projects-intro'))
    .slice(0, REVEAL_LIMIT);

  revealTargets.forEach(section => section.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -48px 0px' }
  );

  revealTargets.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initReveal);
