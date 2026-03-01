const projects = [
  {
    id: 'asus',
    name: 'ASUS',
    tag: 'Performance launch',
    metrics: [
      { label: 'Views in one month', value: '+12,000,000' },
      { label: 'Search impact', value: 'TikTok trending' },
      { label: 'Campaign result', value: 'Most successful in ASUS history' }
    ],
    kpis: ['Eng. rate: 12%', 'Total engagement: 1.5M', 'Link clicks: 1.6K'],
    videoUrl: 'https://www.youtube.com/@rangglobal',
    videoLabel: 'Watch the ASUS case study on YouTube'
  },
  {
    id: 'zhiyun',
    name: 'ZHIYUN',
    tag: 'Cinematic social growth',
    metrics: [
      { label: 'Short film performance', value: '+7,000,000 views' },
      { label: 'Activation result', value: '350+ tickets sold in <24h' },
      { label: 'Conversion lift', value: '300% increase in sales' }
    ],
    kpis: ['Sold-out event', 'Creator-led activation', 'Record-breaking conversions'],
    videoUrl: 'https://www.youtube.com/@rangglobal',
    videoLabel: 'Watch the ZHIYUN case study on YouTube'
  },
  {
    id: 'microsoft',
    name: 'MICROSOFT COPILOT',
    tag: 'Back-to-school campaign',
    metrics: [
      { label: 'Views in one month', value: '+700,000' },
      { label: 'CTR benchmark', value: 'Highest campaign click-through rate' },
      { label: 'Engagement outcome', value: '56,000 clicks' }
    ],
    kpis: ['Top-performing content', 'High-intent traffic', 'Strong audience response'],
    videoUrl: 'https://www.youtube.com/@rangglobal',
    videoLabel: 'Watch the Microsoft Copilot case study on YouTube'
  }
];

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = `project-card is-${project.id}`;

  const metrics = project.metrics
    .map(({ label, value }) => `
      <li class="metric-item">
        <p class="metric-label">${label}</p>
        <p class="metric-value">${value}</p>
      </li>
    `)
    .join('');

  const kpis = project.kpis
    .map((kpi) => `<li class="kpi-pill">${kpi}</li>`)
    .join('');

  card.innerHTML = `
    <div class="project-top">
      <h3 class="project-name">${project.name}</h3>
      <span class="project-tag">${project.tag}</span>
    </div>
    <ul class="project-metrics">${metrics}</ul>
    <ul class="kpis">${kpis}</ul>
    <a class="watch-link" href="${project.videoUrl}" target="_blank" rel="noopener noreferrer" aria-label="${project.videoLabel}">
      Watch case study
    </a>
  `;

  return card;
}

function initProjectList() {
  const list = document.querySelector('#project-list');

  if (!list) {
    return;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    fragment.appendChild(createProjectCard(project));
  });

  list.appendChild(fragment);
}

function initReveal() {
  const sections = document.querySelectorAll('.section-reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectList();
  initReveal();
});
