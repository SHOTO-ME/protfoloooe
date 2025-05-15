import type { ResumeState } from "./resume-store"
import FileSaver from "file-saver"

export const generatePDF = async (resume: ResumeState["resume"]) => {
  try {
    // Create a formatted text representation of the resume
    const content = `
Resume of ${resume.personalInfo.firstName} ${resume.personalInfo.lastName}
=======================================================

${resume.personalInfo.title}
${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}

PROFESSIONAL SUMMARY
-------------------
${resume.personalInfo.summary}

EXPERIENCE
---------
${resume.experience
  .map(
    (exp) => `• ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})
  ${exp.description}
`,
  )
  .join("\n")}

EDUCATION
--------
${resume.education
  .map(
    (edu) => `• ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})
`,
  )
  .join("\n")}

SKILLS
-----
${resume.skills.map((skill) => `• ${skill.name} (${skill.level})`).join("\n")}

PROJECTS
-------
${resume.projects
  .map(
    (project) => `• ${project.name} ${project.url ? `(${project.url})` : ""}
  ${project.description}
`,
  )
  .join("\n")}

SOCIAL LINKS
-----------
${resume.socialLinks.map((link) => `• ${link.platform}: ${link.url}`).join("\n")}
    `

    // Create a blob that simulates a PDF file
    const blob = new Blob([content], { type: "application/pdf" })

    // Save the blob as a file
    FileSaver.saveAs(blob, `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.pdf`)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error("Failed to generate PDF")
  }
}
