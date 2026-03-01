const projects = [
  {
    slug: "asus",
    brand: "ASUS",
    chip: "TikTok campaign",
    metrics: [
      { value: "+12,000,000 views", note: "Within one month" },
      { value: "TikTok trending search", note: "Became a suggested search" },
      { value: "Most successful campaign", note: "In ASUS campaign history" }
    ],
    kpis: [
      ["Engagement rate", "12%"],
      ["Total engagement", "1.5M"],
      ["Link clicks", "1.6K"]
    ],
    watchHref: "https://www.asus.com/"
  },
  {
    slug: "zhiyun",
    brand: "ZHIYUN",
    chip: "Film + activation",
    metrics: [
      { value: "+7,000,000 views", note: "Short film performance" },
      { value: "Sold-out event", note: "350+ tickets sold in under 24h" },
      { value: "300% sales increase", note: "Record-breaking conversions" }
    ],
    kpis: [
      ["Activation city", "Toronto"],
      ["Tickets sold", "350+"],
      ["Sales lift", "300%"]
    ],
    watchHref: "https://www.zhiyun-tech.com/"
  },
  {
    slug: "microsoft",
    brand: "MICROSOFT COPILOT",
    chip: "Back-to-school",
    metrics: [
      { value: "+700,000 views", note: "Within one month" },
      { value: "Highest click-through", note: "For the BTS campaign period" },
      { value: "56,000 clicks", note: "Record audience interaction" }
    ],
    kpis: [
      ["Views", "700K+"],
      ["Clicks", "56K"],
      ["Campaign type", "Back-to-school"]
    ],
    watchHref: "https://www.microsoft.com/"
  }
];

const revealSelector = ".reveal";

function renderProjects() {
  const grid = document.querySelector("#projects-grid");
  const template = document.querySelector("#project-card-template");

  if (!grid || !template) return;

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const node = template.content.firstElementChild.cloneNode(true);

    node.classList.add(`is-${project.slug}`);
    node.querySelector(".project-brand").textContent = project.brand;
    node.querySelector(".chip").textContent = project.chip;

    const metricsList = node.querySelector(".project-metrics");
    project.metrics.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.value}</strong><span>${item.note}</span>`;
      metricsList.appendChild(li);
    });

    const kpiList = node.querySelector(".project-kpis");
    project.kpis.forEach(([label, value]) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${label}</span><b>${value}</b>`;
      kpiList.appendChild(li);
    });

    const watchLink = node.querySelector(".watch-link");
    watchLink.href = project.watchHref;
    watchLink.setAttribute("aria-label", `Watch ${project.brand} case study`);

    fragment.appendChild(node);
  });

  grid.appendChild(fragment);
}

function initReveal() {
  const items = document.querySelectorAll(revealSelector);
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  items.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initReveal();
});
