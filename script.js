const sections = document.querySelectorAll('.section-panel[id]');
const reelStops = document.querySelectorAll('.reel-stop');

// Mouse tracking for film burn effect
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});
const setActiveStop = (id) => {
  reelStops.forEach((stop) => {
    stop.classList.toggle('active', stop.dataset.target === id);
  });
};

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        history.replaceState(null, '', `#${id}`);
        setActiveStop(id);
      }
    });
  },
  {
    rootMargin: '-35% 0px -45% 0px',
    threshold: 0.15
  }
);

const fadeObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
  }
);

sections.forEach((section, index) => {
  navObserver.observe(section);

  if (index === 0) {
    section.classList.add('is-visible');
  } else {
    fadeObserver.observe(section);
  }
});

if (window.location.hash) {
  setActiveStop(window.location.hash.slice(1));
}
