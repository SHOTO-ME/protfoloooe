"use client"

import { useState } from "react"
import { useResumeStore } from "@/lib/resume-store"
import { Download, Share2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import ExportWebsiteButton from "./export-website-button"
import { generatePDF } from "@/lib/pdf-generator"
import { generateDOCX } from "@/lib/docx-generator"

export default function ResumePreview() {
  const { resume } = useResumeStore()
  const [isExporting, setIsExporting] = useState<string | null>(null)

  const handleExport = async (format: string) => {
    setIsExporting(format)

    try {
      if (format === "PDF") {
        await generatePDF(resume)
        toast({
          title: "PDF Generated",
          description: "Your PDF has been downloaded successfully.",
        })
      } else if (format === "DOCX") {
        await generateDOCX(resume)
        toast({
          title: "DOCX Generated",
          description: "Your DOCX file has been downloaded successfully.",
        })
      }
    } catch (error) {
      console.error(`Error generating ${format}:`, error)
      toast({
        title: `Error Generating ${format}`,
        description: "There was an error generating your file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(null)
    }
  }

  const handleShare = () => {
    toast({
      title: "Share Feature",
      description: "This feature will be available soon!",
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">Preview</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("PDF")} disabled={isExporting !== null}>
            {isExporting === "PDF" ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("DOCX")} disabled={isExporting !== null}>
            {isExporting === "DOCX" ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                DOCX
              </>
            )}
          </Button>
          <ExportWebsiteButton />
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white border shadow-sm rounded-lg">
        <div className="max-w-[800px] mx-auto p-8" style={{ borderTop: `5px solid ${resume.theme.color}` }}>
          {/* Header with Profile Image */}
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
            {resume.personalInfo.profileImage && (
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 flex-shrink-0"
                style={{ borderColor: resume.theme.color }}
              >
                <img
                  src={resume.personalInfo.profileImage || "/placeholder.svg?height=128&width=128"}
                  alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              </div>
            )}
            <div className={`text-center ${resume.personalInfo.profileImage ? "md:text-left" : ""} flex-1`}>
              <h1 className="text-3xl font-bold mb-1" style={{ color: resume.theme.color }}>
                {resume.personalInfo.firstName} {resume.personalInfo.lastName}
              </h1>
              {resume.personalInfo.title && <p className="text-lg text-slate-600 mb-2">{resume.personalInfo.title}</p>}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 text-sm text-slate-600">
                {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
                {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
              </div>
            </div>
          </div>

          {/* Summary */}
          {resume.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: resume.theme.color }}>
                Professional Summary
              </h2>
              <p className="text-sm">{resume.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: resume.theme.color }}>
                Work Experience
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="flex gap-3">
                    {exp.companyLogo && (
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border">
                        <img
                          src={exp.companyLogo || "/placeholder.svg?height=48&width=48"}
                          alt={exp.company}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      </div>
                    )}
                    <div className={exp.companyLogo ? "flex-1" : "w-full"}>
                      <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="font-bold">{exp.position}</h3>
                        <span className="text-sm text-slate-600">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{exp.company}</p>
                      <p className="text-sm mt-1">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: resume.theme.color }}>
                Education
              </h2>
              <div className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div key={index} className="flex gap-3">
                    {edu.institutionLogo && (
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border">
                        <img
                          src={edu.institutionLogo || "/placeholder.svg?height=48&width=48"}
                          alt={edu.institution}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      </div>
                    )}
                    <div className={edu.institutionLogo ? "flex-1" : "w-full"}>
                      <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="font-bold">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <span className="text-sm text-slate-600">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p className="text-sm">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: resume.theme.color }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${resume.theme.color}20`,
                      color: resume.theme.color,
                    }}
                  >
                    {skill.name} {skill.level && `(${skill.level})`}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: resume.theme.color }}>
                Projects
              </h2>
              <div className="space-y-6">
                {resume.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-bold">
                      {project.name}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-normal ml-2"
                          style={{ color: resume.theme.color }}
                        >
                          View Project
                        </a>
                      )}
                    </h3>
                    <p className="text-sm mt-1">{project.description}</p>

                    {project.images && project.images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.images.map((image, imgIndex) =>
                          image ? (
                            <div key={imgIndex} className="w-24 h-16 rounded-md overflow-hidden border">
                              <img
                                src={image || "/placeholder.svg?height=64&width=96"}
                                alt={`${project.name} image ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=64&width=96"
                                }}
                              />
                            </div>
                          ) : null,
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {resume.socialLinks.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: resume.theme.color }}>
                Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {resume.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: resume.theme.color }}
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
