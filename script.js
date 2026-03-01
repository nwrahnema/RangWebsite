const projects = [
    {
        title: 'ASUS',
        accent: 'asus',
        metrics: [
            { intro: 'Within a month,', value: '+12,000,000 views' },
            { intro: 'Became the suggested search on', value: 'TikTok trending' },
            { intro: 'Established itself as the', value: 'Most successful campaign in ASUS history' }
        ],
        kpis: [
            { label: 'Eng. rate', value: '12%' },
            { label: 'Total Eng.', value: '1.5M' },
            { label: 'Link Clicks', value: '1.6K' }
        ],
        watchText: 'Click to watch'
    },
    {
        title: 'ZHIYUN',
        accent: 'zhiyun',
        metrics: [
            { intro: 'RANG produced a short film gaining', value: '+7,000,000 views' },
            {
                intro: 'Organized and promoted an in-person activation in Toronto, selling over 350 tickets in less than 24h resulting in a',
                value: 'Sold-Out Event'
            },
            { intro: 'Helped ZHIYUN achieve record-breaking conversions, driving sales by 300%', value: '300% Increase in Sales' }
        ],
        watchText: 'Click to watch'
    },
    {
        title: 'MICROSOFT COPILOT',
        accent: 'microsoft',
        metrics: [
            { intro: 'Within a month,', value: '+700,000 views' },
            { intro: 'Became the highest click-through rate for a', value: 'Back-To-School campaign' },
            { intro: 'Set a new record in audience engagement', value: '56,000 clicks' }
        ],
        kpis: [
            { label: 'Eng. rate', value: '13%' },
            { label: 'Total Eng.', value: '92K' },
            { label: 'Link Clicks', value: '56K' }
        ],
        watchText: 'Click to watch'
    }
];

const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function renderProjects() {
    const projectsSection = document.querySelector('#projects');

    if (!projectsSection) {
        return;
    }

    projectsSection.innerHTML = projects
        .map((project) => {
            const metricRows = project.metrics
                .map(
                    (metric) =>
                        `<p class="project-card-intro">${metric.intro}</p><h3 class="project-card-metric">${metric.value}</h3>`
                )
                .join('');

            const kpiRows = project.kpis?.length
                ? `<div class="project-kpi-grid">${project.kpis
                      .map(
                          (kpi) => `<div class="project-kpi-item"><p class="project-kpi-label">${kpi.label}</p><p class="project-kpi-value">${kpi.value}</p></div>`
                      )
                      .join('')}</div>`
                : '';

            const mediaLink = project.link
                ? `<a class="watch-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.watchText ?? 'Click to watch'}</a>`
                : `<p class="watch-link">${project.watchText ?? 'Click to watch'}</p>`;

            return `
                <article class="project-card is-${project.accent}" aria-labelledby="project-${project.accent}-title">
                    <div class="container">
                        <h2 class="project-title" id="project-${project.accent}-title">${project.title}</h2>
                        <div class="project-card-grid">
                            <div class="project-card-content">${metricRows}${kpiRows}</div>
                            <div class="project-card-media">
                                <div class="phone-mockup">
                                    <div class="phone-screen">
                                        <div class="phone-content">${project.media ?? ''}</div>
                                    </div>
                                </div>
                                ${mediaLink}
                            </div>
                        </div>
                    </div>
                </article>
            `;
        })
        .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();

    const revealTargets = document.querySelectorAll('section, .project-card');
    revealTargets.forEach((target) => observer.observe(target));

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});
