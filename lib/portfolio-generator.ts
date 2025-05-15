import JSZip from "jszip"
import FileSaver from "file-saver"
import { minify } from "terser"
import type { ResumeState } from "./resume-store"

// HTML template for the portfolio website
const generateHtml = (resume: ResumeState["resume"]) => {
  const fullName = `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`
  const title = resume.personalInfo.title
  const summary = resume.personalInfo.summary
  const email = resume.personalInfo.email
  const phone = resume.personalInfo.phone
  const location = resume.personalInfo.location
  const themeColor = resume.theme.color
  const profileImage = resume.personalInfo.profileImage || ""

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullName} - Portfolio</title>
  <link rel="stylesheet" href="./assets/styles.css">
  <meta name="description" content="Professional portfolio of ${fullName}, ${title}">
</head>
<body>
  <header>
    <div class="container">
      <div class="header-content">
        ${profileImage ? `<div class="profile-image"><img src="./images/profile.jpg" alt="${fullName}" /></div>` : ""}
        <div class="header-text">
          <h1>${fullName}</h1>
          <p class="title">${title}</p>
        </div>
      </div>
    </div>
  </header>

  <main>
    <section class="container" id="about">
      <h2>About Me</h2>
      <p>${summary}</p>
      
      <div class="contact-info">
        <div class="contact-item">
          <strong>Email:</strong> ${email}
        </div>
        <div class="contact-item">
          <strong>Phone:</strong> ${phone}
        </div>
        <div class="contact-item">
          <strong>Location:</strong> ${location}
        </div>
      </div>
    </section>

    <section class="container" id="experience">
      <h2>Experience</h2>
      <div class="timeline">
        ${resume.experience
          .map(
            (exp) => `
          <div class="timeline-item">
            ${exp.companyLogo ? `<div class="company-logo"><img src="./images/company-${exp.company.replace(/\s+/g, "-").toLowerCase()}.jpg" alt="${exp.company}" /></div>` : ""}
            <div class="timeline-content">
              <div class="timeline-item-header">
                <h3>${exp.position}</h3>
                <p class="timeline-date">${exp.startDate} - ${exp.endDate}</p>
              </div>
              <p class="timeline-company">${exp.company}</p>
              <p>${exp.description}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>

    <section class="container" id="education">
      <h2>Education</h2>
      <div class="timeline">
        ${resume.education
          .map(
            (edu) => `
          <div class="timeline-item">
            ${edu.institutionLogo ? `<div class="institution-logo"><img src="./images/institution-${edu.institution.replace(/\s+/g, "-").toLowerCase()}.jpg" alt="${edu.institution}" /></div>` : ""}
            <div class="timeline-content">
              <div class="timeline-item-header">
                <h3>${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</h3>
                <p class="timeline-date">${edu.startDate} - ${edu.endDate}</p>
              </div>
              <p class="timeline-company">${edu.institution}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>

    <section class="container" id="skills">
      <h2>Skills</h2>
      <div class="skills-container">
        ${resume.skills
          .map(
            (skill) => `
          <div class="skill-tag">
            ${skill.name}${skill.level ? ` (${skill.level})` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    </section>

    <section class="container" id="projects">
      <h2>Projects</h2>
      ${resume.projects
        .map(
          (project, index) => `
        <div class="project-item">
          <h3>${project.name}</h3>
          ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">View Project</a>` : ""}
          <p>${project.description}</p>
          ${
            project.images.length > 0
              ? `
          <div class="project-images">
            ${project.images
              .map(
                (_, imgIndex) => `
              <div class="project-image">
                <img src="./images/project-${index + 1}-${imgIndex + 1}.jpg" alt="${project.name} image ${imgIndex + 1}" />
              </div>
            `,
              )
              .join("")}
          </div>
          `
              : ""
          }
        </div>
      `,
        )
        .join("")}
    </section>

    <section class="container" id="contact">
      <h2>Contact</h2>
      <div class="social-links">
        ${resume.socialLinks
          .map(
            (link) => `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">${link.platform}</a>
        `,
          )
          .join("")}
      </div>
    </section>
  </main>

  <footer id="portfolio-footer"></footer>
  <script src="./protected/branding.js"></script>
  <script src="./assets/script.js"></script>
</body>
</html>`
}

// CSS for the portfolio website
const generateCss = (themeColor: string) => {
  return `/* Base styles */
:root {
  --primary-color: ${themeColor};
  --text-color: #333;
  --background-color: #fff;
  --light-bg: #f8f9fa;
  --border-color: #e9ecef;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
header {
  background-color: var(--primary-color);
  color: white;
  padding: 60px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

header .title {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Sections */
section {
  padding: 60px 0;
  border-bottom: 1px solid var(--border-color);
}

section:last-child {
  border-bottom: none;
}

h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: var(--primary-color);
}

/* About section */
.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.contact-item {
  flex: 1;
  min-width: 200px;
  background-color: var(--light-bg);
  padding: 15px;
  border-radius: 5px;
}

/* Timeline for experience and education */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.timeline-item {
  display: flex;
  gap: 20px;
  background-color: var(--light-bg);
  padding: 20px;
  border-radius: 5px;
  border-left: 4px solid var(--primary-color);
}

.company-logo, .institution-logo {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
}

.company-logo img, .institution-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.timeline-content {
  flex: 1;
}

.timeline-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.timeline-item h3 {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-right: 15px;
}

.timeline-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.timeline-company {
  font-weight: 500;
  margin-bottom: 10px;
}

/* Skills section */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* Projects section */
.project-item {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--light-bg);
  border-radius: 5px;
}

.project-item h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.project-link {
  display: inline-block;
  color: var(--primary-color);
  text-decoration: none;
  margin-bottom: 10px;
  font-weight: 500;
}

.project-link:hover {
  text-decoration: underline;
}

.project-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.project-image {
  width: 120px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Social links */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.social-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.9;
}

/* Footer */
footer {
  padding: 20px 0;
  background-color: var(--light-bg);
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  header {
    padding: 40px 0;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  section {
    padding: 40px 0;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .timeline-item-header {
    flex-direction: column;
  }
  
  .timeline-date {
    margin-top: 5px;
  }

  .timeline-item {
    flex-direction: column;
  }

  .company-logo, .institution-logo {
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  header {
    padding: 30px 0;
  }
  
  header h1 {
    font-size: 1.8rem;
  }
  
  .contact-info {
    flex-direction: column;
  }
  
  .contact-item {
    min-width: 100%;
  }
  
  .social-links {
    flex-direction: column;
  }
  
  .social-link {
    width: 100%;
    text-align: center;
  }

  .project-images {
    justify-content: center;
  }
}`
}

// JavaScript for the portfolio website
const generateJs = () => {
  return `// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Add any interactive functionality here
  console.log('Portfolio website loaded successfully');
  
  // Example: Add active class to sections when scrolled into view
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});`
}

// Branding JavaScript (to be minified)
const brandingJs = `
// PortfolioX Branding Script
// This script adds the required attribution to the portfolio
// Removing or modifying this script is against the license terms

document.getElementById("portfolio-footer").innerHTML = 
  '<p style="text-align:center;font-size:14px;color:#888;">Generated using <strong>PortfolioX</strong></p>';
`

// License text
const licenseText = `LICENSE AGREEMENT FOR PORTFOLIOX GENERATED WEBSITE

This license agreement ("License") is a legal agreement between you (either an individual or a single entity) and PortfolioX for the use of the generated portfolio website ("Website").

1. GRANT OF LICENSE
   PortfolioX grants you a non-exclusive, non-transferable license to use and modify the Website for personal or commercial purposes, subject to the restrictions below.

2. RESTRICTIONS
   a. You may NOT remove, hide, or modify the "Generated using PortfolioX" footer attribution that appears on the Website.
   b. You may NOT modify, decompile, or reverse engineer the "branding.js" file located in the "/protected" directory.
   c. You may NOT use any technical means to circumvent or remove the footer attribution.

3. OWNERSHIP
   PortfolioX retains all intellectual property rights in the branding elements of the Website. All other content of the Website belongs to you.

4. TERMINATION
   This License will terminate automatically if you fail to comply with the limitations described herein. Upon termination, you must destroy all copies of the Website.

5. DISCLAIMER OF WARRANTY
   The Website is provided "AS IS" without warranty of any kind. PortfolioX disclaims all warranties, either express or implied, including warranties of merchantability and fitness for a particular purpose.

6. LIMITATION OF LIABILITY
   In no event shall PortfolioX be liable for any damages whatsoever arising out of the use of or inability to use the Website.

By using the Website, you acknowledge that you have read this License, understand it, and agree to be bound by its terms.

© ${new Date().getFullYear()} PortfolioX. All rights reserved.`

// Helper function to convert base64 to blob
function b64toBlob(b64Data: string, contentType = "image/jpeg") {
  try {
    // Check if the data is a valid base64 string
    if (!b64Data || typeof b64Data !== "string") {
      console.error("Invalid base64 data:", b64Data)
      // Return a small transparent placeholder image
      return new Blob([new Uint8Array([])], { type: contentType })
    }

    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)
      const byteNumbers = new Array(slice.length)

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  } catch (error) {
    console.error("Error converting base64 to blob:", error)
    // Return a small transparent placeholder image
    return new Blob([new Uint8Array([])], { type: contentType })
  }
}

// Main function to generate and download the portfolio website
export const generatePortfolioZip = async (resume: ResumeState["resume"]) => {
  try {
    const zip = new JSZip()

    // Create folder structure
    const assetsFolder = zip.folder("assets")
    const protectedFolder = zip.folder("protected")
    const imagesFolder = zip.folder("images")

    // Add files
    zip.file("index.html", generateHtml(resume))
    assetsFolder?.file("styles.css", generateCss(resume.theme.color))
    assetsFolder?.file("script.js", generateJs())
    zip.file("LICENSE.txt", licenseText)

    // Minify branding.js
    try {
      const minifiedBranding = await minify(brandingJs, {
        compress: {
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          keep_fnames: false,
          keep_classnames: false,
          keep_fargs: false,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
        },
      })
      protectedFolder?.file("branding.js", minifiedBranding.code || brandingJs)
    } catch (error) {
      console.error("Error minifying branding.js:", error)
      // Fallback to unminified version
      protectedFolder?.file("branding.js", brandingJs)
    }

    // Add images with error handling
    if (resume.personalInfo.profileImage) {
      try {
        // Convert base64 to blob
        const profileImageParts = resume.personalInfo.profileImage.split(",")
        if (profileImageParts.length > 1) {
          const profileImageData = profileImageParts[1]
          const profileImageBlob = b64toBlob(profileImageData)
          imagesFolder?.file("profile.jpg", profileImageBlob)
        }
      } catch (error) {
        console.error("Error processing profile image:", error)
      }
    }

    // Add company logos with error handling
    for (const exp of resume.experience) {
      if (exp.companyLogo) {
        try {
          const logoDataParts = exp.companyLogo.split(",")
          if (logoDataParts.length > 1) {
            const logoData = logoDataParts[1]
            const logoBlob = b64toBlob(logoData)
            imagesFolder?.file(`company-${exp.company.replace(/\s+/g, "-").toLowerCase()}.jpg`, logoBlob)
          }
        } catch (error) {
          console.error(`Error processing company logo for ${exp.company}:`, error)
        }
      }
    }

    // Add institution logos with error handling
    for (const edu of resume.education) {
      if (edu.institutionLogo) {
        try {
          const logoDataParts = edu.institutionLogo.split(",")
          if (logoDataParts.length > 1) {
            const logoData = logoDataParts[1]
            const logoBlob = b64toBlob(logoData)
            imagesFolder?.file(`institution-${edu.institution.replace(/\s+/g, "-").toLowerCase()}.jpg`, logoBlob)
          }
        } catch (error) {
          console.error(`Error processing institution logo for ${edu.institution}:`, error)
        }
      }
    }

    // Add project images with error handling
    for (let projectIndex = 0; projectIndex < resume.projects.length; projectIndex++) {
      const project = resume.projects[projectIndex]
      if (project.images && project.images.length > 0) {
        for (let imageIndex = 0; imageIndex < project.images.length; imageIndex++) {
          const image = project.images[imageIndex]
          if (image) {
            try {
              const imageDataParts = image.split(",")
              if (imageDataParts.length > 1) {
                const imageData = imageDataParts[1]
                const imageBlob = b64toBlob(imageData)
                imagesFolder?.file(`project-${projectIndex + 1}-${imageIndex + 1}.jpg`, imageBlob)
              }
            } catch (error) {
              console.error(`Error processing project image ${imageIndex + 1} for ${project.name}:`, error)
            }
          }
        }
      }
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" })
    FileSaver.saveAs(content, "PortfolioX-User-Portfolio.zip")

    return true
  } catch (error) {
    console.error("Error generating portfolio zip:", error)
    throw error
  }
}
