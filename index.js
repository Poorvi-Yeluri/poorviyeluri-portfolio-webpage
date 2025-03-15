document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupMobileNavigation();
  setupGradientOverlay();
  populateResume();
});

function populateResume() {
  fetch("resume.json")
    .then((response) => response.json())
    .then(({ basics, skills, work }) => {
      populateAboutSection(basics);
      populateSkillsSection(skills);
      populateExperienceSection(work);
    })
    .catch((error) => console.error("Error loading resume:", error));
}

function populateAboutSection(basics) {
  document.getElementById("about-section").innerHTML = `
    <div class="mobile-section-title">About</div>
    <div class="content-text" style="line-height: 1.6em">
      <p>
        Hi, I'm <strong style="color: white">${basics.name}</strong>, a Full Stack Developer based in Melbourne, Australia. I'm currently pursuing a
        <strong style="color: white">Bachelor of Information Technology</strong> with a focus on
        <strong style="color: white">Software Development</strong>.
      </p>
      <p>${basics.summary}</p>
    </div>
  `;
}

function populateSkillsSection(skills) {
  const skillsHTML = `
    <div class="mobile-section-title">Skills</div>
    <div class="skills-container">
      ${skills
        .map(
          (skillCategory) => `
        <div class="skill-category">
          <div class="skill-category-title">${skillCategory.name}</div>
          <div class="card-footer">
            ${skillCategory.keywords
              .map((skill) => `<div class="pill">${skill}</div>`)
              .join("")}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
  document.getElementById("skills-section").innerHTML = skillsHTML;
}


function populateExperienceSection(workExperience) {
  const experienceSection = document.getElementById("experience-section");
  const experienceHTML = `
    <div class="mobile-section-title">Experience</div>
    ${workExperience.map(job => {
      return `
        <div class="card">
        <div class="card-info">
        <div class="card-header">${job.position}</div>
        <div class="card-sub-header">${job.company}</div>
        <div class="card-date small-header-text">${job.startDate} – ${job.endDate}</div>
            <div class="card-content">
              <ul>
                ${job.highlights.map(highlight => `<li>${highlight}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join("")}
  `;
  experienceSection.innerHTML = experienceHTML;
}

function setupNavigation() {
  const navLinks = document.querySelectorAll("#nav-links .nav-link-item");
  const defaultSection = "about-section";

  function updateActiveLink() {
    const currentHash = window.location.hash.substring(1) || defaultSection;
    navLinks.forEach((link) => link.classList.remove("active"));
    document
      .querySelector(`#nav-links .nav-link-item[data-section="${currentHash}"]`)
      ?.classList.add("active");
  }

  window.addEventListener("hashchange", updateActiveLink);
}

function setupMobileNavigation() {
  const mobileNav = document.getElementById("mobile-bottom-nav");
  if (!mobileNav) return;

  mobileNav.addEventListener("click", (event) => {
    const clickedLink = event.target.closest(".bottom-nav-link-item");
    if (!clickedLink) return;

    document
      .querySelectorAll(".bottom-nav-link-item")
      .forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  });
}

function setupGradientOverlay() {
  const topGradientOverlay = document.getElementById("top-gradient-overlay");
  const bottomGradientOverlay = document.getElementById("bottom-gradient-overlay");

  if (!topGradientOverlay || !bottomGradientOverlay) return;

  topGradientOverlay.style.background = `radial-gradient(
    circle at top right,
    rgba(29, 78, 216, 0.15) 10%,
    transparent 40%
  )`;
  topGradientOverlay.style.backgroundAttachment = "fixed";

  bottomGradientOverlay.style.background = `radial-gradient(
    circle at bottom right,
    rgba(29, 78, 216, 0.15) 10%,
    transparent 40%
    )`;
    bottomGradientOverlay.style.backgroundAttachment = "fixed";
}
