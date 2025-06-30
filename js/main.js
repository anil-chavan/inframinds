/* ─── Mobile Nav ─── */
const nav = document.getElementById("navLinks");
const burger = document.getElementById("hamburger");
burger?.addEventListener("click", () => nav.classList.toggle("open"));

/* ─── Dark‑Mode Toggle (same as before) ─── */
const btn=document.querySelector(".theme-toggle")||(()=>{const b=document.createElement("button");b.className="theme-toggle";b.textContent="☾";document.body.appendChild(b);return b;})();
function setT(m){document.documentElement.setAttribute("data-theme",m);localStorage.setItem("theme",m);btn.textContent=m==="dark"?"☀":"☾";}
setT(localStorage.getItem("theme")|| (matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
btn.addEventListener("click",()=>setT(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark"));

/* ─── Reveal on scroll ─── */
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target);}}),{threshold:.15});
document.querySelectorAll(".hidden").forEach(el=>obs.observe(el));

/* ─── Dynamic Services Detail ─── */
const detailsBox=document.getElementById("service-detail");
const offerings={
  devops:{
    title:"DevOps — Relentless Delivery Engine",
    bullets:[
      "End‑to‑end CI/CD blueprints with Jenkins, GitHub Actions & Argo CD",
      "Immutable infrastructure via Terraform, CloudFormation & Pulumi",
      "Observability stack — Prometheus, Grafana, Loki, ELK",
      "24×7 Site Reliability Engineering & chaos‑driven resilience"
    ]
  },
  mlops:{
    title:"MLOps — Unstoppable ML at Scale",
    bullets:[
      "Automated model pipelines with MLflow, Kubeflow & KServe",
      "Data/Model drift detection & retraining triggers",
      "Feature stores & experiment tracking built for velocity",
      "GPU‑optimised Kubernetes inferencing with zero‑downtime rollouts"
    ]
  },
  dataops:{
    title:"DataOps — Turbo‑Charged Data Pipelines",
    bullets:[
      "Real‑time streaming ETL on Kafka & Flink",
      "Data observability, lineage & quality gates",
      "Secure lakehouses on S3 / ADLS with Iceberg & Delta",
      "Golden‑path governance, cataloguing, and GDPR compliance"
    ]
  },
  aiops:{
    title:"AIOps — Intelligent Operations",
    bullets:[
      "Predictive alerting using advanced anomaly detection",
      "Self‑healing playbooks & runbooks",
      "Noise reduction & root‑cause isolation with graph analytics",
      "ChatOps integrations for lightning‑fast response"
    ]
  },
  cloud:{
    title:"Cloud Infrastructure — Fortified & Cost‑Optimised",
    bullets:[
      "AWS, Azure, GCP architecture & migration warfare plans",
      "Zero‑trust networking & automated compliance (CIS, NIST)",
      "Serverless accelerators — Lambda, Cloud Functions, Fargate",
      "FinOps governance slashing cloud spend by 30 %+"
    ]
  },
  resume: {
    title: "Resume Optimization — Leave a Lasting Impression",
    bullets: [
      "Role‑targeted, keyword‑rich resumes that beat ATS filters",
      "Professional formatting with clear technical impact statements",
      "Multiple versions tailored for DevOps, MLOps, Cloud roles",
      "GitHub, LinkedIn & portfolio integration for full showcase"
    ]
  },
  interview: {
    title: "Interview Preparation — Be Ready, Be Fearless",
    bullets: [
      "Focused prep sessions for DevOps, Cloud & Data positions",
      "Custom question banks based on your resume & JD",
      "Behavioral interview guidance using STAR methodology",
      "Negotiation tips and closing strategies"
    ]
  },
  mock: {
    title: "Mock Interviews & Notes — Train Like It’s Real",
    bullets: [
      "Live 1:1 mock interviews simulating actual pressure",
      "Real‑time feedback on technical & communication areas",
      "Personalized notes for each domain (DevOps, MLOps, Cloud)",
      "Actionable improvement plan with follow‑up sessions"
    ]
  }
};
document.querySelectorAll(".card[data-key]").forEach(card=>{
  card.addEventListener("click",()=>{
    const key=card.dataset.key;
    const info=offerings[key];
    detailsBox.innerHTML=`
      <h3>${info.title}</h3>
      <ul>${info.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>
      <p style="margin-top:1.25rem"><a href="#contact" class="btn btn-primary">Discuss This Service</a></p>`;
    detailsBox.classList.remove("hidden");
    detailsBox.scrollIntoView({behavior:"smooth"});
  });
});

/* ─── Contact Form Submission ─── */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    });

    if (res.ok) {
      status.textContent = "✅ Thanks! We’ll be in touch shortly.";
      form.reset();
    } else {
      status.textContent = "⚠️ Something went wrong. Please try again.";
    }
  } catch (err) {
    status.textContent = "⚠️ Network error. Please retry later.";
  }
});

// Redirect to homepage on page reload
if (performance.getEntriesByType("navigation")[0].type === "reload") {
  // If current page is NOT home page, redirect
  if (!location.pathname.endsWith("index.html")) {
    window.location.href = "index.html";
  }
}
// If the page is index.html and there's a hash (like #services), remove it on reload
if (
  performance.getEntriesByType("navigation")[0].type === "reload" &&
  location.pathname.endsWith("index.html") &&
  location.hash
) {
  // Replace the URL without hash and reload from top
  history.replaceState(null, null, location.pathname);
  window.scrollTo(0, 0);
}
