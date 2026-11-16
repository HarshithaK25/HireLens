// ======================================================
// HIRELENS AI - COMPLETE FRONTEND ENGINE
// NO BACKEND | NO LOGIN | LOCALSTORAGE
// ======================================================

const $ = id => document.getElementById(id);

const STORAGE = "hirelens_ai_demo_v1";

function notify(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.hirelensToast);
  window.hirelensToast = setTimeout(
    () => toast.classList.remove("show"), 2800
  );
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;",
    '"':"&quot;", "'":"&#39;"
  })[c]);
}

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE)) || {};
  } catch {
    return {};
  }
}

let store = readStore();

let profile = store.profile || {
  fullName:"",
  email:"",
  college:"",
  course:"Data Science",
  studyYear:"2nd Year",
  preferredRole:"Data Analyst",
  skills:"",
  about:""
};

let applications = store.applications || [];
let resumeAnalysis = store.resumeAnalysis || null;
let resumeText = "";
let uploadedFile = null;
let activeMode = "";

function saveStore() {
  store = {profile, applications, resumeAnalysis};
  try {
    localStorage.setItem(STORAGE, JSON.stringify(store));
  } catch (error) {
    notify("Browser storage is full. Some data could not be saved.");
  }
}

// ======================================================
// 1. BENGALURU COMPANY KNOWLEDGE DIRECTORY
// 100 COMPANY PROFILES
// Indicative skills, not official vacancies.
// ======================================================

const companyNames = [
  "Infosys","Wipro","TCS","Accenture","IBM",
  "Cognizant","Capgemini","HCLTech","Tech Mahindra","LTIMindtree",
  "Oracle","SAP Labs","Microsoft","Amazon","Google",
  "Cisco","Intel","NVIDIA","AMD","Qualcomm",
  "Samsung R&D","Bosch","Siemens","Mercedes-Benz Research","Toyota Connected",
  "JPMorgan Chase","Goldman Sachs","Morgan Stanley","Wells Fargo","Deloitte",
  "EY","KPMG","PwC","KPMG Global Services","Genpact",
  "Flipkart","Walmart Global Tech","Swiggy","Zomato","PhonePe",
  "Razorpay","CRED","Groww","Zerodha","Paytm",
  "Myntra","Meesho","BigBasket","Udaan","Ninjacart",
  "Freshworks","Zoho","Atlassian","Salesforce","Adobe",
  "Intuit","ServiceNow","VMware","Dell Technologies","HP",
  "Target","Tesco","JLL Technologies","Thomson Reuters","S&P Global",
  "LinkedIn","Uber","Airbnb","Expedia Group","Booking Holdings",
  "ShareChat","InMobi","Ola","Ather Energy","Rapido",
  "PhonePe Technology","Juspay","Perfios","Pine Labs","Cashfree Payments",
  "Thoughtworks","Publicis Sapient","EPAM Systems","UST","Mphasis",
  "Persistent Systems","Cyient","L&T Technology Services","GlobalLogic","Akamai",
  "Nokia","Ericsson","Broadcom","Micron Technology","Texas Instruments",
  "GE HealthCare","Philips","Novo Nordisk","Biocon","Curefit"
];

const companyGroups = [
  {
    industry:"IT Services",
    skills:["Java","Python","SQL","Cloud Computing","Agile","Git","Communication"],
    roles:["Software Engineer","Data Analyst"]
  },
  {
    industry:"Product & Software",
    skills:["Python","JavaScript","React","Node.js","SQL","AWS","Data Structures","Git"],
    roles:["Software Developer","Full Stack Developer"]
  },
  {
    industry:"Consulting",
    skills:["SQL","Excel","Python","Power BI","Communication","Problem Solving","Agile"],
    roles:["Business Analyst","Technology Consultant"]
  },
  {
    industry:"Finance & Fintech",
    skills:["Python","SQL","Java","Financial Analysis","Excel","Data Analytics","Cybersecurity"],
    roles:["Data Analyst","Software Engineer"]
  },
  {
    industry:"Startups & E-commerce",
    skills:["Python","SQL","JavaScript","React","Product Analytics","Communication","AWS"],
    roles:["Data Analyst","Frontend Developer"]
  },
  {
    industry:"Cloud & Semiconductor",
    skills:["C++","Python","Linux","Cloud Computing","C","Embedded Systems","Networking"],
    roles:["Systems Engineer","Software Engineer"]
  }
];

const companies = companyNames.map((name,i) => {
  const group = companyGroups[i % companyGroups.length];
  return {
    id:i+1,
    name,
    industry:group.industry,
    skills:[...group.skills],
    roles:[...group.roles],
    location:"Bengaluru, Karnataka",
    description:`Technology and professional opportunities associated with ${name}.`
  };
});

// ======================================================
// 2. DEMO OPPORTUNITIES
// These are illustrative listings, not actual vacancies.
// ======================================================

const opportunities = [
  {id:1,company:"Infosys",title:"Data Analyst Intern",category:"Internship",mode:"Hybrid",skills:["Python","SQL","Excel","Power BI"],pay:"Demo stipend",location:"Bengaluru"},
  {id:2,company:"Microsoft",title:"Software Engineering Intern",category:"Internship",mode:"Hybrid",skills:["Python","Java","Data Structures","Git"],pay:"Demo stipend",location:"Bengaluru"},
  {id:3,company:"Amazon",title:"Software Development Intern",category:"Internship",mode:"On-site",skills:["Java","Python","Data Structures","SQL"],pay:"Demo stipend",location:"Bengaluru"},
  {id:4,company:"Google",title:"Data Science Intern",category:"Internship",mode:"Hybrid",skills:["Python","Machine Learning","Statistics","SQL"],pay:"Demo stipend",location:"Bengaluru"},
  {id:5,company:"Accenture",title:"Junior Data Analyst",category:"Job",mode:"Hybrid",skills:["SQL","Python","Power BI","Excel"],pay:"Not specified",location:"Bengaluru"},
  {id:6,company:"Wipro",title:"Graduate Software Engineer",category:"Job",mode:"On-site",skills:["Java","Python","SQL","Problem Solving"],pay:"Not specified",location:"Bengaluru"},
  {id:7,company:"Flipkart",title:"Frontend Developer Intern",category:"Internship",mode:"Hybrid",skills:["HTML","CSS","JavaScript","React"],pay:"Demo stipend",location:"Bengaluru"},
  {id:8,company:"PhonePe",title:"Backend Developer",category:"Job",mode:"On-site",skills:["Java","Spring Boot","SQL","API"],pay:"Not specified",location:"Bengaluru"},
  {id:9,company:"IBM",title:"AI/ML Intern",category:"Internship",mode:"Remote",skills:["Python","Machine Learning","TensorFlow","Statistics"],pay:"Demo stipend",location:"Remote"},
  {id:10,company:"Deloitte",title:"Business Analyst Intern",category:"Internship",mode:"Hybrid",skills:["SQL","Excel","Power BI","Communication"],pay:"Demo stipend",location:"Bengaluru"},
  {id:11,company:"NVIDIA",title:"Junior Software Engineer",category:"Job",mode:"On-site",skills:["C++","Python","Linux","Data Structures"],pay:"Not specified",location:"Bengaluru"},
  {id:12,company:"Razorpay",title:"Data Analyst",category:"Job",mode:"Hybrid",skills:["Python","SQL","Statistics","Data Visualization"],pay:"Not specified",location:"Bengaluru"}
];

// ======================================================
// 3. SAMPLE CANDIDATES
// Fictional demonstration profiles.
// ======================================================

const candidates = [
  {id:1,name:"Ananya Sharma",role:"Data Science",college:"Bengaluru Institute of Technology",year:"3rd Year",skills:["Python","SQL","Machine Learning","Pandas","Statistics"],projects:"ML prediction project and data dashboard"},
  {id:2,name:"Rahul Kumar",role:"Software Engineering",college:"RNS Institute of Technology",year:"2nd Year",skills:["Java","Python","Data Structures","Git","SQL"],projects:"Student management system"},
  {id:3,name:"Priya Nair",role:"Web Development",college:"PES University",year:"3rd Year",skills:["HTML","CSS","JavaScript","React","Node.js"],projects:"E-commerce website"},
  {id:4,name:"Arjun Rao",role:"Cybersecurity",college:"BMS College of Engineering",year:"4th Year",skills:["Python","Linux","Networking","Cybersecurity","SQL"],projects:"Network security monitoring"},
  {id:5,name:"Sneha Reddy",role:"Data Science",college:"RV College of Engineering",year:"3rd Year",skills:["Python","SQL","Power BI","Excel","Statistics"],projects:"Sales analytics dashboard"},
  {id:6,name:"Karthik M",role:"Software Engineering",college:"Dayananda Sagar College",year:"2nd Year",skills:["Java","C++","Data Structures","SQL","Git"],projects:"Library management system"}
];

// ======================================================
// 4. SKILL MATCHING ENGINE
// Transparent keyword overlap.
// Not a trained machine-learning model.
// ======================================================

const skillAliases = {
  "ml":"Machine Learning",
  "ai":"Artificial Intelligence",
  "js":"JavaScript",
  "reactjs":"React",
  "nodejs":"Node.js",
  "powerbi":"Power BI",
  "postgres":"PostgreSQL",
  "data structures and algorithms":"Data Structures",
  "dsa":"Data Structures",
  "aws":"AWS",
  "azure":"Azure"
};

const allSkills = [
  "Python","SQL","Java","C","C++","JavaScript","HTML","CSS",
  "React","Node.js","Machine Learning","Deep Learning",
  "Artificial Intelligence","TensorFlow","PyTorch","Pandas",
  "NumPy","Statistics","Power BI","Tableau","Excel",
  "Data Analysis","Data Visualization","NLP","Computer Vision",
  "Flask","Django","MongoDB","MySQL","PostgreSQL",
  "AWS","Azure","Git","Docker","Linux","Data Structures",
  "Communication","Leadership","Problem Solving",
  "Spring Boot","Networking","Cybersecurity",
  "Financial Analysis","Agile","Cloud Computing",
  "Embedded Systems","C#","Figma","API",
  "Product Analytics"
];

function normalize(text) {
  return String(text || "").toLowerCase()
    .replace(/[^a-z0-9+#. ]/g," ")
    .replace(/\s+/g," ").trim();
}

function findSkills(text) {
  const source = normalize(text);
  let found = allSkills.filter(skill =>
    new RegExp(
      "(^|[^a-z0-9])" +
      skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&") +
      "($|[^a-z0-9])"
    ).test(source)
  );

  Object.entries(skillAliases).forEach(([alias,skill]) => {
    if (source.includes(alias) && !found.includes(skill)) {
      found.push(skill);
    }
  });

  return [...new Set(found)];
}

function calculateMatch(candidateSkills, requiredSkills) {
  if (!requiredSkills.length) return 0;
  const matches = requiredSkills.filter(s =>
    candidateSkills.some(c => normalize(c) === normalize(s))
  );
  return Math.round(matches.length / requiredSkills.length * 100);
}

function analyzeText(text, requiredSkills = []) {
  const detected = findSkills(text);
  const required = requiredSkills.length
    ? requiredSkills : detected;

  const matched = required.filter(s =>
    detected.some(d => normalize(d) === normalize(s))
  );

  const missing = required.filter(s =>
    !matched.some(m => normalize(m) === normalize(s))
  );

  const projectEvidence =
    /project|developed|built|implemented|dashboard|application/i.test(text);

  const educationEvidence =
    /b\.?tech|b\.?e\.|bachelor|master|degree|college|university/i.test(text);

  const score = required.length
    ? calculateMatch(detected, required)
    : 0;

  const readiness = Math.min(100,
    Math.round(
      score * .65 +
      (projectEvidence ? 20 : 5) +
      (educationEvidence ? 15 : 5)
    )
  );

  return {
    score:readiness,
    skillScore:score,
    detected,
    matched,
    missing,
    projectEvidence,
    educationEvidence
  };
}

// ======================================================
// 5. NAVIGATION
// ======================================================

const pageNames = {
  overview:"Overview",
  opportunities:"Find opportunities",
  applications:"My applications",
  profile:"My profile",
  resume:"Resume studio",
  recruiter:"Recruiter overview",
  candidates:"Candidate directory",
  compare:"Compare candidates",
  reports:"Reports & insights",
  companies:"Company directory"
};

function go(page) {
  if (!pageNames[page]) return;

  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );

  document.querySelectorAll(".nav").forEach(n =>
    n.classList.remove("active")
  );

  $(page).classList.add("active");

  const nav = document.querySelector(
    `.nav[data-page="${page}"]`
  );
  if (nav) nav.classList.add("active");

  $("pageTitle").textContent = pageNames[page];
  $("breadcrumb").textContent = pageNames[page];

  window.scrollTo({top:0,behavior:"smooth"});

  renderAll();
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click",() => go(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click",() => go(button.dataset.go));
});

$("menuToggle").addEventListener("click",() => {
  document.querySelector(".sidebar").classList.toggle("mobile-open");
});

// ======================================================
// 6. PROFILE
// ======================================================

function loadProfile() {
  $("fullName").value = profile.fullName || "";
  $("email").value = profile.email || "";
  $("college").value = profile.college || "";
  $("course").value = profile.course || "";
  $("studyYear").value = profile.studyYear || "";
  $("preferredRole").value = profile.preferredRole || "";
  $("skills").value = profile.skills || "";
  $("about").value = profile.about || "";

  renderProfile();
}

function renderProfile() {
  const name = profile.fullName || "Guest Student";
  const initials = name.split(/\s+/).filter(Boolean)
    .map(x => x[0]).join("").slice(0,2).toUpperCase() || "GU";

  $("sidebarName").textContent = name;
  $("sidebarAvatar").textContent = initials;
  $("previewAvatar").textContent = initials;
  $("previewName").textContent = name;
  $("previewRole").textContent = profile.preferredRole || "Your preferred role";
  $("previewCollege").textContent = profile.college || "Add your college";

  const skills = findSkills(profile.skills);
  $("previewSkills").innerHTML = skills.length
    ? skills.map(s => `<span class="skill">${escapeHTML(s)}</span>`).join("")
    : "Add skills to display them here.";
}

$("profileForm").addEventListener("submit",e => {
  e.preventDefault();

  profile = {
    fullName:$("fullName").value.trim(),
    email:$("email").value.trim(),
    college:$("college").value.trim(),
    course:$("course").value.trim(),
    studyYear:$("studyYear").value,
    preferredRole:$("preferredRole").value.trim(),
    skills:$("skills").value.trim(),
    about:$("about").value.trim()
  };

  saveStore();
  renderProfile();
  notify("Profile saved successfully.");
});

// ======================================================
// 7. OPPORTUNITIES
// ======================================================

function renderOpportunities() {
  const search = normalize($("opSearch").value);
  const category = $("opCategory").value;
  const location = $("opLocation").value;

  const filtered = opportunities.filter(o => {
    const text = normalize(
      o.title+" "+o.company+" "+o.skills.join(" ")
    );

    return (!search || text.includes(search)) &&
      (!category || o.category === category) &&
      (!location || o.location === location) &&
      (!activeMode || o.mode === activeMode);
  });

  $("opCount").textContent = filtered.length+" opportunities";

  $("opportunityList").innerHTML = filtered.length
    ? filtered.map(o => opportunityCard(o)).join("")
    : '<div class="empty">No matching opportunities found.</div>';

  document.querySelectorAll("[data-apply]").forEach(button => {
    button.addEventListener("click",() =>
      applyOpportunity(Number(button.dataset.apply))
    );
  });

  document.querySelectorAll("[data-company]").forEach(button => {
    button.addEventListener("click",() => {
      $("companySearch").value = button.dataset.company;
      go("companies");
      renderCompanies();
    });
  });
}

function opportunityCard(o) {
  const company = companies.find(c => c.name === o.company);
  const match = calculateMatch(
    findSkills(profile.skills),
    o.skills
  );

  return `
    <article class="content-card">
      <span class="tag">${escapeHTML(o.category)}</span>
      <h3>${escapeHTML(o.title)}</h3>
      <p><b>Company:</b> ${escapeHTML(o.company)}</p>
      <p><b>Location:</b> ${escapeHTML(o.location)}</p>
      <p><b>Work mode:</b> ${escapeHTML(o.mode)}</p>
      <p><b>Compensation:</b> ${escapeHTML(o.pay)}</p>
      <div class="badges">
        ${o.skills.map(s=>`<span class="skill">${escapeHTML(s)}</span>`).join("")}
      </div>
      <p class="good">✦ ${match}% profile skill overlap</p>
      <small>Indicative match, not a hiring prediction.</small>
      <div class="export-buttons">
        <button class="primary" data-apply="${o.id}">Apply Now ↗</button>
        <button class="secondary" data-company="${escapeHTML(o.company)}">Company details</button>
      </div>
    </article>
  `;
}

document.querySelectorAll("#opSearch,#opCategory,#opLocation")
  .forEach(el => el.addEventListener("input",renderOpportunities));

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click",() => {
    activeMode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach(b =>
      b.classList.toggle("active",b === button)
    );
    renderOpportunities();
  });
});

function applyOpportunity(id) {
  const opportunity = opportunities.find(o => o.id === id);
  if (!opportunity) return;

  if (!profile.fullName || !profile.email) {
    notify("Complete your name and email in My Profile first.");
    go("profile");
    return;
  }

  if (!resumeAnalysis) {
    notify("Upload and analyze your resume before applying.");
    go("resume");
    return;
  }

  if (applications.some(a => a.opportunityId === id)) {
    notify("You have already applied to this demo opportunity.");
    return;
  }

  const coverLetter = prompt("Enter a short cover letter (optional):") || "";

  applications.unshift({
    id:Date.now(),
    opportunityId:id,
    title:opportunity.title,
    company:opportunity.company,
    category:opportunity.category,
    date:new Date().toISOString(),
    status:"Applied",
    coverLetter,
    match:calculateMatch(
      resumeAnalysis.detected,
      opportunity.skills
    )
  });

  saveStore();
  renderAll();
  notify("Demo application submitted successfully.");
  go("applications");
}

// ======================================================
// 8. APPLICATIONS
// ======================================================

function renderApplications() {
  const jobs = applications.filter(a => a.category === "Job").length;
  const interns = applications.filter(a => a.category === "Internship").length;

  $("allApps").textContent = applications.length;
  $("jobApps").textContent = jobs;
  $("internApps").textContent = interns;

  $("applicationList").innerHTML = applications.length
    ? applications.map(a => `
      <div class="content-card">
        <h3>${escapeHTML(a.title)}</h3>
        <p><b>Company:</b> ${escapeHTML(a.company)}</p>
        <p><b>Category:</b> ${escapeHTML(a.category)}</p>
        <p><b>Applied:</b> ${new Date(a.date).toLocaleDateString("en-IN")}</p>
        <p><b>Skill overlap:</b> ${a.match}%</p>
        <span class="status">${escapeHTML(a.status)}</span>
        <button class="secondary" data-remove="${a.id}">Withdraw demo application</button>
      </div>
    `).join("")
    : '<div class="empty">You have not applied to any opportunities yet.</div>';

  document.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click",() => {
      if (!confirm("Withdraw this demo application?")) return;
      applications = applications.filter(a => a.id !== Number(button.dataset.remove));
      saveStore();
      renderAll();
      notify("Application removed.");
    });
  });
}

// ======================================================
// 9. RESUME EXTRACTION
// ======================================================

$("resumeFile").addEventListener("change",e => {
  uploadedFile = e.target.files[0] || null;
  $("resumeFileName").textContent = uploadedFile
    ? uploadedFile.name
    : "No file selected";
  resumeText = "";
});

async function extractResume(file) {
  const ext = file.name.split(".").pop().toLowerCase();

  if (file.size > 5*1024*1024) {
    throw new Error("Resume must be smaller than 5 MB.");
  }

  if (ext === "txt") return await file.text();

  if (ext === "pdf") {
    if (!window.pdfjsLib) throw new Error("PDF library unavailable.");

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({
      data:await file.arrayBuffer()
    }).promise;

    let text = "";

    for (let i=1;i<=pdf.numPages;i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item=>item.str).join(" ")+" ";
    }

    return text;
  }

  if (ext === "docx") {
    if (!window.mammoth) throw new Error("DOCX library unavailable.");

    const result = await mammoth.extractRawText({
      arrayBuffer:await file.arrayBuffer()
    });

    return result.value;
  }

  throw new Error("Only PDF, DOCX and TXT files are supported.");
}

$("analyzeResume").addEventListener("click",async () => {
  if (!uploadedFile) {
    notify("Please select a resume first.");
    return;
  }

  const button = $("analyzeResume");
  button.disabled = true;
  button.textContent = "Analyzing...";

  try {
    resumeText = await extractResume(uploadedFile);

    if (!resumeText.trim()) {
      throw new Error("No readable text found. The PDF may be scanned.");
    }

    const required = findSkills(profile.skills).length
      ? findSkills(profile.skills)
      : companies.slice(0,20).flatMap(c=>c.skills).slice(0,8);

    resumeAnalysis = analyzeText(resumeText,required);
    saveStore();
    renderResume();

    $("resumeStatus").textContent =
      "Resume analyzed locally. No server upload occurred.";

    notify("Resume analysis completed.");
  } catch(error) {
    notify(error.message);
    $("resumeStatus").textContent = error.message;
  } finally {
    button.disabled = false;
    button.textContent = "✧ Analyze my resume";
  }
});

function renderResume() {
  if (!resumeAnalysis) return;

  const r = resumeAnalysis;
  $("resumeInsights").innerHTML = `
    <div class="score">${r.score}%<small>Resume readiness indicator</small></div>
    <div class="progress-bar">
      <div class="chart-bar" style="width:${r.score}%;height:8px"></div>
    </div>
    <h3>Detected skills</h3>
    <div class="badges">
      ${r.detected.map(s=>`<span class="skill">${escapeHTML(s)}</span>`).join("") || "No known skills detected"}
    </div>
    <h3 class="good">✓ Matched skills (${r.matched.length})</h3>
    <p>${r.matched.map(escapeHTML).join(", ") || "None identified"}</p>
    <h3 class="warning">△ Skills to improve (${r.missing.length})</h3>
    <p>${r.missing.map(escapeHTML).join(", ") || "No gaps identified against the selected profile skills."}</p>
    <h3>Resume feedback</h3>
    <p>${r.projectEvidence ? "✓ Project evidence detected." : "Add detailed project descriptions and outcomes."}</p>
    <p>${r.educationEvidence ? "✓ Education information detected." : "Add your education details."}</p>
    <small>Keyword-based guidance, not an ATS certification or hiring decision.</small>
  `;

  $("statReadiness").textContent = r.score+"%";
}

// ======================================================
// 10. CANDIDATE DIRECTORY
// ======================================================

function candidateScore(c) {
  const required = findSkills(profile.skills);
  return calculateMatch(c.skills,required);
}

function renderCandidates() {
  const query = normalize($("candidateSearch").value);
  const role = $("candidateRole").value;
  const sort = $("candidateSort").value;

  let data = candidates.filter(c => {
    const text = normalize(c.name+" "+c.role+" "+c.skills.join(" "));
    return (!query || text.includes(query)) &&
      (!role || c.role === role);
  });

  data.sort((a,b) => sort === "name"
    ? a.name.localeCompare(b.name)
    : candidateScore(b)-candidateScore(a)
  );

  $("candidateList").innerHTML = data.length
    ? data.map(c => `
      <div class="content-card">
        <div class="candidate">
          <div class="candidate-avatar">${escapeHTML(c.name.split(" ").map(x=>x[0]).join("").slice(0,2))}</div>
          <div class="candidate-info">
            <b>${escapeHTML(c.name)}</b>
            <small>${escapeHTML(c.role)} · ${escapeHTML(c.year)}</small>
          </div>
          <div class="score">${candidateScore(c)}%<small>Skill overlap</small></div>
        </div>
        <p><b>College:</b> ${escapeHTML(c.college)}</p>
        <p><b>Projects:</b> ${escapeHTML(c.projects)}</p>
        <div class="badges">${c.skills.map(s=>`<span class="skill">${escapeHTML(s)}</span>`).join("")}</div>
      </div>
    `).join("")
    : '<div class="empty">No candidates found.</div>';
}

["candidateSearch","candidateRole","candidateSort"].forEach(id => {
  $(id).addEventListener("input",renderCandidates);
});

// ======================================================
// 11. COMPARE CANDIDATES
// ======================================================

function populateCompare() {
  [1,2,3].forEach(n => {
    const select = $("compare"+n);
    const oldValue = select.value;

    select.innerHTML = (n===3 ? '<option value="">None</option>' : "") +
      candidates.map(c =>
        `<option value="${c.id}">${escapeHTML(c.name)}</option>`
      ).join("");

    if ([...select.options].some(o=>o.value===oldValue)) {
      select.value=oldValue;
    }
  });

  $("compare2").selectedIndex = candidates.length > 1 ? 1 : 0;
}

$("compareBtn").addEventListener("click",() => {
  const ids = [1,2,3].map(n => $("compare"+n).value)
    .filter(Boolean);

  const unique = [...new Set(ids)];

  if (unique.length < 2) {
    notify("Select at least two different candidates.");
    return;
  }

  const selected = unique.map(id =>
    candidates.find(c=>c.id===Number(id))
  );

  $("compareResults").innerHTML = `
    <table class="compare-table">
      <tr><th>Criteria</th>
        ${selected.map(c=>`<th>${escapeHTML(c.name)}</th>`).join("")}
      </tr>
      <tr><td>Role</td>${selected.map(c=>`<td>${escapeHTML(c.role)}</td>`).join("")}</tr>
      <tr><td>College</td>${selected.map(c=>`<td>${escapeHTML(c.college)}</td>`).join("")}</tr>
      <tr><td>Skill match</td>${selected.map(c=>`<td>${candidateScore(c)}%</td>`).join("")}</tr>
      <tr><td>Skills</td>${selected.map(c=>`<td>${c.skills.map(escapeHTML).join(", ")}</td>`).join("")}</tr>
      <tr><td>Projects</td>${selected.map(c=>`<td>${escapeHTML(c.projects)}</td>`).join("")}</tr>
    </table>
  `;
});

// ======================================================
// 12. COMPANY DIRECTORY
// ======================================================

function renderCompanies() {
  const query = normalize($("companySearch").value);
  const industry = $("companyIndustry").value;

  const filtered = companies.filter(c => {
    const text = normalize(
      c.name+" "+c.industry+" "+c.skills.join(" ")+" "+c.roles.join(" ")
    );

    return (!query || text.includes(query)) &&
      (!industry || c.industry === industry);
  });

  $("companyCount").textContent =
    `${filtered.length} of ${companies.length} company profiles`;

  $("companyList").innerHTML = filtered.length
    ? filtered.map(c => `
      <div class="content-card">
        <span class="company-industry">${escapeHTML(c.industry)}</span>
        <h3>${escapeHTML(c.name)}</h3>
        <p>⌖ ${escapeHTML(c.location)}</p>
        <p>${escapeHTML(c.description)}</p>
        <p><b>Representative roles</b></p>
        <div class="badges">
          ${c.roles.map(r=>`<span class="skill">${escapeHTML(r)}</span>`).join("")}
        </div>
        <p><b>Technology and skill profiles</b></p>
        <div class="badges">
          ${c.skills.map(s=>`<span class="skill">${escapeHTML(s)}</span>`).join("")}
        </div>
        <button class="secondary" data-company-op="${escapeHTML(c.name)}">Find related opportunities</button>
      </div>
    `).join("")
    : '<div class="empty">No matching companies found.</div>';

  document.querySelectorAll("[data-company-op]").forEach(button => {
    button.addEventListener("click",() => {
      const name=button.dataset.companyOp;
      $("opSearch").value=name;
      go("opportunities");
      renderOpportunities();
    });
  });
}

$("companySearch").addEventListener("input",renderCompanies);
$("companyIndustry").addEventListener("change",renderCompanies);

// ======================================================
// 13. RECRUITER OVERVIEW
// ======================================================

function renderRecruiter() {
  const scores = candidates.map(c=>candidateScore(c));

  $("recCandidates").textContent=candidates.length;
  $("recStrong").textContent=scores.filter(s=>s>=75).length;
  $("recApplications").textContent=applications.length;

  const buckets = [
    {label:"0–49%",count:scores.filter(s=>s<50).length},
    {label:"50–74%",count:scores.filter(s=>s>=50&&s<75).length},
    {label:"75–100%",count:scores.filter(s=>s>=75).length}
  ];

  $("matchChart").innerHTML=buckets.map(b=>`
    <div class="chart-col">
      <b>${b.count}</b>
      <div class="chart-bar" style="height:${Math.max(5,b.count/Math.max(1,candidates.length)*100)}%"></div>
      <small>${b.label}</small>
    </div>
  `).join("");

  $("recentApplications").innerHTML=applications.length
    ? applications.slice(0,5).map(a=>`
      <div class="content-card">
        <b>${escapeHTML(a.title)}</b>
        <p>${escapeHTML(a.company)} · ${escapeHTML(a.category)}</p>
        <small>${new Date(a.date).toLocaleDateString("en-IN")}</small>
      </div>
    `).join("")
    : '<div class="empty">No applications submitted yet.</div>';
}

// ======================================================
// 14. CAREER ASSISTANT
// Local rule-based assistant.
// ======================================================

function assistantAnswer(question) {
  const q=normalize(question);

  if (/company|companies|employer/.test(q)) {
    return `HIRELENS includes ${companies.length} Bengaluru company profiles. Some examples are Infosys, Google, Microsoft, Amazon, Flipkart and Wipro. Open Company Directory to search industries and representative skills.`;
  }

  if (/internship/.test(q)) {
    return "Explore the Internships category in Find Opportunities. This demo contains illustrative internship listings, not verified vacancies.";
  }

  if (/job|jobs|opportunit/.test(q)) {
    return `There are ${opportunities.length} illustrative demo opportunities: ${opportunities.filter(o=>o.category==="Job").length} jobs and ${opportunities.filter(o=>o.category==="Internship").length} internships.`;
  }

  if (/python|sql|java|react|power bi|machine learning/.test(q)) {
    const skill=findSkills(question);
    return skill.length
      ? `The skill profile includes ${skill.join(", ")}. Relevant company and role profiles can be found in the Company Directory and Opportunities sections.`
      : "Explore the company directory for technology skill profiles.";
  }

  if (/resume|improve|cv/.test(q)) {
    return resumeAnalysis
      ? `Your current resume readiness indicator is ${resumeAnalysis.score}%. Matched skills: ${resumeAnalysis.matched.join(", ")||"None"}. Skills to improve: ${resumeAnalysis.missing.join(", ")||"None identified"}. Add measurable project outcomes and evidence for relevant skills.`
      : "Open Resume Studio and upload your PDF or DOCX resume. The browser will extract text and provide skill-based feedback.";
  }

  if (/candidate|recruit/.test(q)) {
    return `The recruiter workspace currently has ${candidates.length} fictional sample candidates. You can search and compare their skill profiles.`;
  }

  if (/demand|popular|skills/.test(q)) {
    return "Common technology skill families in this demo include Python, SQL, Java, JavaScript, Data Structures, React, Cloud Computing, Machine Learning, Power BI and communication.";
  }

  if (/application/.test(q)) {
    return `You have submitted ${applications.length} demo application(s). Visit My Applications to review them.`;
  }

  return "I can help you explore Bengaluru companies, technology skills, jobs, internships, resume improvement and candidate comparisons. What would you like to explore?";
}

function sendChat() {
  const input=$("chatInput");
  const question=input.value.trim();
  if(!question)return;

  const chat=$("chatMessages");
  const answer=assistantAnswer(question);

  chat.innerHTML+=`
    <div class="message user">${escapeHTML(question)}</div>
    <div class="message bot">${escapeHTML(answer)}</div>
  `;

  input.value="";
  chat.scrollTop=chat.scrollHeight;
}

$("sendChat").addEventListener("click",sendChat);
$("chatInput").addEventListener("keydown",e=>{
  if(e.key==="Enter")sendChat();
});

document.querySelectorAll("[data-question]").forEach(button=>{
  button.addEventListener("click",()=>{
    $("chatInput").value=button.dataset.question;
    sendChat();
  });
});

// ======================================================
// 15. CSV EXPORT
// ======================================================

function downloadCSV(filename,rows) {
  if(!rows.length) {
    notify("No data available to export.");
    return;
  }

  const csv=rows.map(row=>row.map(value=>
    '"'+String(value??"").replace(/"/g,'""')+'"'
  ).join(",")).join("\r\n");

  const blob=new Blob(["\uFEFF"+csv],{
    type:"text/csv;charset=utf-8"
  });

  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;
  link.download=filename;
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

$("exportApps").addEventListener("click",()=>{
  downloadCSV("HIRELENS_Applications.csv",[
    ["ID","Title","Company","Category","Date","Status","Match"],
    ...applications.map(a=>[
      a.id,a.title,a.company,a.category,a.date,a.status,a.match
    ])
  ]);
});

$("exportCandidates").addEventListener("click",()=>{
  downloadCSV("HIRELENS_Candidates.csv",[
    ["Name","Role","College","Year","Skills","Projects","Match"],
    ...candidates.map(c=>[
      c.name,c.role,c.college,c.year,c.skills.join("; "),
      c.projects,candidateScore(c)
    ])
  ]);
});

$("exportCompanies").addEventListener("click",()=>{
  downloadCSV("HIRELENS_Bengaluru_Companies.csv",[
    ["Company","Industry","Location","Roles","Representative Skills"],
    ...companies.map(c=>[
      c.name,c.industry,c.location,c.roles.join("; "),c.skills.join("; ")
    ])
  ]);
});

// ======================================================
// 16. DASHBOARD COUNTS AND RESET
// ======================================================

function renderOverview() {
  $("statApplications").textContent=applications.length;
  $("statOpportunities").textContent=opportunities.length;
  $("statCandidates").textContent=candidates.length;
  $("navAppCount").textContent=applications.length;

  $("recommendedList").innerHTML=opportunities.slice(0,3)
    .map(o=>`
      <div class="content-card">
        <b>${escapeHTML(o.title)}</b>
        <p>${escapeHTML(o.company)} · ${escapeHTML(o.category)}</p>
        <button class="secondary" data-recommend="${o.id}">Explore role</button>
      </div>
    `).join("");

  document.querySelectorAll("[data-recommend]").forEach(button=>{
    button.addEventListener("click",()=>{
      $("opSearch").value="";
      go("opportunities");
    });
  });
}

function renderAll() {
  renderOverview();
  renderApplications();
  renderResume();
  renderRecruiter();
  renderCandidates();
  renderCompanies();
  renderProfile();
}

$("resetDemo").addEventListener("click",()=>{
  if(!confirm("Reset all HIRELENS demo data in this browser?"))return;

  localStorage.removeItem(STORAGE);
  profile={
    fullName:"",
    email:"",
    college:"",
    course:"Data Science",
    studyYear:"2nd Year",
    preferredRole:"Data Analyst",
    skills:"",
    about:""
  };
  applications=[];
  resumeAnalysis=null;
  resumeText="";
  uploadedFile=null;
  $("resumeFile").value="";
  $("resumeFileName").textContent="No file selected";
  $("resumeInsights").innerHTML='<div class="empty">Upload a resume to start the analysis.</div>';
  $("resumeStatus").textContent="";
  loadProfile();
  renderAll();
  notify("Demo workspace reset successfully.");
});

// ======================================================
// 17. INITIALIZE APPLICATION
// ======================================================

function initializeHirelens() {
  loadProfile();
  populateCompare();

  renderAll();
  renderOpportunities();

  console.log("HIRELENS AI initialized successfully.");
  console.log("Company profiles:",companies.length);
  console.log("Demo opportunities:",opportunities.length);
  console.log("Demo candidates:",candidates.length);
}

document.addEventListener("DOMContentLoaded",initializeHirelens);