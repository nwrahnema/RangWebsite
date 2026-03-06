const sections = document.querySelectorAll('.section-panel[id]');
const reelStops = document.querySelectorAll('.reel-stop');

const setActiveStop = (id) => {
  reelStops.forEach((stop) => {
    stop.classList.toggle('active', stop.dataset.target === id);
  });
};

const observer = new IntersectionObserver(
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

sections.forEach((section) => observer.observe(section));

if (window.location.hash) {
  setActiveStop(window.location.hash.slice(1));
}
