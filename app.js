const storageVersion = "risk-sentinel-ai-2026-06-05";

const riskLibrary = {
  inflation: {
    title: "Inflation",
    category: "Economic Risk",
    description: "High inflation is impacting business costs, consumer spending and profit margins across the UK.",
    likelihood: "High",
    impact: "High",
    trend: "Worsening",
    sectors: ["Retail", "Hospitality", "Manufacturing", "Construction"],
    drivers: ["Rising energy prices", "Wage growth", "Supply chain costs", "Global inflation"],
    developments: ["BoE rate held at 5.25%", "CPI inflation 3.2% in April", "Retail sales slowdown"],
    indicators: ["CPI: 3.2%", "Producer prices: +1.1%", "BoE base rate: 5.25%"],
    analysis: "Inflation is likely to remain elevated in the short term. Monitor interest rates, wage growth and margin pressure.",
    mitigation: "Review pricing strategy, hedge energy costs and monitor wage pressure.",
    reviewDate: "2026-06-15"
  },
  "cyber attack": {
    title: "Cyber Attack",
    category: "Technology Risk",
    description: "Threat actors are targeting UK organisations through credential theft, ransomware and supplier compromise.",
    likelihood: "High",
    impact: "High",
    trend: "Worsening",
    sectors: ["Financial services", "Healthcare", "Professional services", "Public sector"],
    drivers: ["Credential reuse", "Third-party software exposure", "Ransomware-as-a-service", "Remote access tools"],
    developments: ["NCSC warns of supplier compromise", "Phishing campaigns increasing", "Insurance scrutiny rising"],
    indicators: ["Phishing reports: rising", "Patch latency: medium", "Supplier assurance: partial"],
    analysis: "Prioritise identity controls, backups, recovery testing and supplier security checks for critical services.",
    mitigation: "Test incident response, enforce MFA and review supplier access.",
    reviewDate: "2026-06-10"
  },
  "supply chain": {
    title: "Supply Chain Disruption",
    category: "Operational Risk",
    description: "Transport delays, supplier fragility and input shortages can interrupt fulfilment and raise operating costs.",
    likelihood: "Medium",
    impact: "High",
    trend: "Stable",
    sectors: ["Manufacturing", "Construction", "Retail", "Food and drink"],
    drivers: ["Port congestion", "Supplier insolvency", "Geopolitical disruption", "Freight cost volatility"],
    developments: ["Delivery lead times uneven", "Supplier payment terms tightening", "Inventory buffers being rebuilt"],
    indicators: ["Freight cost: volatile", "Supplier health: mixed", "Lead time: elevated"],
    analysis: "Map critical suppliers, qualify alternates and monitor cash stress across tier-one and tier-two partners.",
    mitigation: "Identify alternate suppliers, review inventory buffers and track critical lead times.",
    reviewDate: "2026-06-20"
  },
  "interest rates": {
    title: "Interest Rates",
    category: "Economic Risk",
    description: "Sustained borrowing costs may reduce investment appetite and increase debt servicing pressure.",
    likelihood: "Medium",
    impact: "Medium",
    trend: "Improving",
    sectors: ["Property", "Construction", "Retail", "SME finance"],
    drivers: ["Bank of England policy", "Inflation expectations", "Lender risk appetite", "Refinancing cycles"],
    developments: ["Rate path remains cautious", "Mortgage affordability constrained", "Debt covenants under review"],
    indicators: ["Base rate: 5.25%", "Credit conditions: tight", "Consumer confidence: fragile"],
    analysis: "Stress-test refinancing plans and cash flow under delayed rate cuts or tighter lending terms.",
    mitigation: "Review debt maturity, update cash forecasts and model covenant headroom.",
    reviewDate: "2026-07-01"
  }
};

const defaultRisks = [
  {
    title: "Inflation",
    category: "Economic Risk",
    likelihood: "High",
    impact: "High",
    owner: "Jane Smith",
    status: "Open",
    reviewDate: "2026-06-15"
  },
  {
    title: "Cyber Attack",
    category: "Technology Risk",
    likelihood: "High",
    impact: "High",
    owner: "Mark Lee",
    status: "In Progress",
    reviewDate: "2026-06-10"
  },
  {
    title: "Supply Chain Disruption",
    category: "Operational Risk",
    likelihood: "Medium",
    impact: "High",
    owner: "Sarah Brown",
    status: "Open",
    reviewDate: "2026-06-20"
  }
];

const state = {
  currentRisk: riskLibrary.inflation,
  register: loadRegister()
};

const elements = {
  searchForm: document.querySelector("#risk-search"),
  query: document.querySelector("#risk-query"),
  riskTitle: document.querySelector("#risk-title"),
  riskCategory: document.querySelector("#risk-category"),
  riskDescription: document.querySelector("#risk-description"),
  sectorsList: document.querySelector("#sectors-list"),
  likelihood: document.querySelector("#likelihood"),
  impact: document.querySelector("#impact"),
  trend: document.querySelector("#trend"),
  insights: document.querySelector("#insight-grid"),
  registerForm: document.querySelector("#register-form"),
  owner: document.querySelector("#owner"),
  mitigation: document.querySelector("#mitigation"),
  status: document.querySelector("#status"),
  reviewDate: document.querySelector("#review-date"),
  registerBody: document.querySelector("#register-body"),
  riskTotal: document.querySelector("#risk-total"),
  exposureLegend: document.querySelector("#exposure-legend"),
  categoryBars: document.querySelector("#category-bars"),
  donut: document.querySelector("#risk-donut"),
  toast: document.querySelector("#toast"),
  saveAlerts: document.querySelector("#save-alerts"),
  updatedAt: document.querySelector("#updated-at")
};

function loadRegister() {
  if (localStorage.getItem("riskSentinelVersion") !== storageVersion) {
    localStorage.setItem("riskSentinelVersion", storageVersion);
    localStorage.removeItem("riskSentinelRegister");
  }

  const saved = localStorage.getItem("riskSentinelRegister");
  if (!saved) return [...defaultRisks];

  try {
    return JSON.parse(saved);
  } catch {
    return [...defaultRisks];
  }
}

function saveRegister() {
  localStorage.setItem("riskSentinelVersion", storageVersion);
  localStorage.setItem("riskSentinelRegister", JSON.stringify(state.register));
}

function findRisk(query) {
  const normalized = query.trim().toLowerCase();
  if (riskLibrary[normalized]) return riskLibrary[normalized];

  const match = Object.entries(riskLibrary).find(([key, risk]) => {
    return normalized.includes(key) || key.includes(normalized) || risk.title.toLowerCase().includes(normalized);
  });

  if (match) return match[1];

  return {
    ...riskLibrary.inflation,
    title: titleCase(query || "Emerging Risk"),
    category: "Emerging Risk",
    description: "This topic has been added as an emerging risk for review against UK data, news signals and business exposure.",
    likelihood: "Medium",
    impact: "Medium",
    trend: "Monitoring",
    sectors: ["Operations", "Finance", "People", "Customers"],
    drivers: ["Market uncertainty", "Regulatory movement", "Supplier exposure", "Customer demand shifts"],
    developments: ["Initial signal detected", "Evidence base requires review", "Assign an owner for monitoring"],
    indicators: ["Data confidence: medium", "Business exposure: to assess", "Review cadence: weekly"],
    analysis: "Treat this as a watchlist item until enough evidence is available to confirm likelihood, impact and mitigation.",
    mitigation: "Assign owner, validate exposure and collect supporting evidence.",
    reviewDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)
  };
}

function titleCase(value) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function renderRisk(risk) {
  state.currentRisk = risk;
  elements.riskTitle.textContent = risk.title;
  elements.riskCategory.textContent = risk.category;
  elements.riskDescription.textContent = risk.description;
  elements.likelihood.textContent = risk.likelihood;
  elements.impact.textContent = risk.impact;
  elements.trend.textContent = risk.trend;
  elements.likelihood.className = scoreClass(risk.likelihood);
  elements.impact.className = scoreClass(risk.impact);
  elements.updatedAt.textContent = `Last updated: ${new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}`;

  elements.sectorsList.innerHTML = risk.sectors.map((sector) => `<li>${sector}</li>`).join("");
  elements.insights.innerHTML = [
    ["Key Drivers", risk.drivers],
    ["Recent Developments", risk.developments],
    ["Data Indicators", risk.indicators],
    ["AI Analysis", [risk.analysis]]
  ]
    .map(([heading, items]) => {
      return `<article class="insight-card"><h3>${heading}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;
    })
    .join("");

  elements.mitigation.value = risk.mitigation;
  elements.reviewDate.value = risk.reviewDate;
}

function scoreClass(score) {
  if (score === "High") return "high";
  if (score === "Medium") return "medium-text";
  return "low-text";
}

function badge(score) {
  return `<span class="badge ${score.toLowerCase()}">${score}</span>`;
}

function statusClass(status) {
  return {
    Open: "status-open",
    "In Progress": "status-progress",
    Monitoring: "status-monitoring",
    Closed: "status-closed"
  }[status] || "status-open";
}

function renderRegister() {
  elements.registerBody.innerHTML = state.register
    .map((risk) => {
      return `
        <tr>
          <td>${risk.title}</td>
          <td>${risk.category.replace(" Risk", "")}</td>
          <td>${badge(risk.likelihood)}</td>
          <td>${badge(risk.impact)}</td>
          <td>${risk.owner}</td>
          <td><span class="badge ${statusClass(risk.status)}">${risk.status}</span></td>
          <td>${formatDate(risk.reviewDate)}</td>
        </tr>
      `;
    })
    .join("");
}

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB");
}

function renderDashboard() {
  const total = state.register.length;
  const exposure = countBy(state.register, (risk) => risk.likelihood);
  const high = exposure.High || 0;
  const medium = exposure.Medium || 0;
  const low = exposure.Low || 0;
  const highEnd = total ? (high / total) * 100 : 0;
  const mediumEnd = total ? highEnd + (medium / total) * 100 : 0;

  elements.riskTotal.textContent = total;
  elements.donut.style.background = `conic-gradient(var(--red) 0 ${highEnd}%, var(--yellow) ${highEnd}% ${mediumEnd}%, var(--green) ${mediumEnd}% 100%)`;
  elements.exposureLegend.innerHTML = [
    ["High", high, "var(--red)"],
    ["Medium", medium, "var(--yellow)"],
    ["Low", low, "var(--green)"]
  ]
    .map(([label, value, color]) => `<div><span class="swatch" style="background:${color}"></span>${label}<strong>${value}</strong></div>`)
    .join("");

  const categories = countBy(state.register, (risk) => risk.category.replace(" Risk", ""));
  const max = Math.max(...Object.values(categories), 1);
  elements.categoryBars.innerHTML = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, value]) => {
      const width = Math.max(12, (value / max) * 100);
      return `<div class="bar-row"><span>${category}</span><div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div><strong>${value}</strong></div>`;
    })
    .join("");
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function showToast(message) {
  elements.toast.textContent = message;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.textContent = "";
  }, 2600);
}

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const risk = findRisk(elements.query.value);
  renderRisk(risk);
  document.querySelector("#summary").scrollIntoView({ block: "start" });
});

elements.registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const risk = state.currentRisk;
  state.register.unshift({
    title: risk.title,
    category: risk.category,
    likelihood: risk.likelihood,
    impact: risk.impact,
    owner: elements.owner.value,
    status: elements.status.value,
    reviewDate: elements.reviewDate.value
  });
  saveRegister();
  renderRegister();
  renderDashboard();
  showToast(`${risk.title} added to the register.`);
});

elements.saveAlerts.addEventListener("click", () => {
  showToast("Alert settings saved.");
});

renderRisk(state.currentRisk);
renderRegister();
renderDashboard();
