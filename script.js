const projects = [
  {
    name: "ASUS",
    accent: "asus",
    badge: "Case Study",
    metrics: [
      { intro: "Within a month", value: "+12,000,000 views" },
      { intro: "Became the suggested search on", value: "TikTok trending" },
      { intro: "Established itself as the", value: "Most successful campaign in ASUS history" }
    ],
    kpis: [
      { label: "Eng. rate", value: "12%" },
      { label: "Total Eng.", value: "1.5M" },
      { label: "Link Clicks", value: "1.6K" }
    ],
    watchLabel: "Watch ASUS case study",
    watchHref: "https://www.youtube.com/@rangglobal"
  },
  {
    name: "ZHIYUN",
    accent: "zhiyun",
    badge: "Case Study",
    metrics: [
      { intro: "RANG produced a short film gaining", value: "+7,000,000 views" },
      {
        intro: "Organized and promoted an in-person activation in Toronto, selling over 350 tickets in less than 24h resulting in a",
        value: "Sold-Out Event"
      },
      { intro: "Helped ZHIYUN achieve record-breaking conversions, driving sales by", value: "300% Increase in Sales" }
    ],
    kpis: [
      { label: "Views", value: "7M+" },
      { label: "Tickets", value: "350+" },
      { label: "Sales Lift", value: "300%" }
    ],
    watchLabel: "Watch ZHIYUN case study",
    watchHref: "https://www.youtube.com/@rangglobal"
  },
  {
    name: "Microsoft Copilot",
    accent: "copilot",
    badge: "Case Study",
    metrics: [
      { intro: "Within a month", value: "+700,000 views" },
      { intro: "Became the highest click-through rate for a", value: "Back-To-School campaign" },
      { intro: "Set a new record in audience engagement", value: "56,000 clicks" }
    ],
    kpis: [
      { label: "Views", value: "700K+" },
      { label: "Clicks", value: "56K" },
      { label: "Campaign", value: "Top CTR" }
    ],
    watchLabel: "Watch Microsoft Copilot case study",
    watchHref: "https://www.youtube.com/@rangglobal"
  }
];

function renderProjects(items) {
  const list = document.getElementById("project-list");
  if (!list) return;

  const fragment = document.createDocumentFragment();

  items.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.accent = project.accent;

    const metricHtml = project.metrics
      .map((metric) => `<li>${metric.intro}<strong>${metric.value}</strong></li>`)
      .join("");

    const kpiHtml = project.kpis
      .map((kpi) => `<div class="kpi-item"><p class="kpi-label">${kpi.label}</p><p class="kpi-value">${kpi.value}</p></div>`)
      .join("");

    card.innerHTML = `
      <div class="project-card__head">
        <h3>${project.name}</h3>
        <p class="project-chip">${project.badge}</p>
      </div>
      <ul class="metric-list">${metricHtml}</ul>
      <div class="kpi-grid">${kpiHtml}</div>
      <div class="project-footer">
        <a class="watch-link" href="${project.watchHref}" target="_blank" rel="noopener noreferrer" aria-label="${project.watchLabel} in a new tab">${project.watchLabel} →</a>
      </div>
    `;

    fragment.appendChild(card);
  });

  list.appendChild(fragment);
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  items.forEach((item) => observer.observe(item));
}

window.addEventListener("DOMContentLoaded", () => {
  renderProjects(projects);
  setupReveal();
});
