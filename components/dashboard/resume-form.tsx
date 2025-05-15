"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Plus, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import ThemeSelector from "./theme-selector"
import { useResumeStore } from "@/lib/resume-store"
import { ImageUpload, MultipleImageUpload } from "@/components/ui/image-upload"

// Update the component to accept and use activeTab and setActiveTab props
export default function ResumeForm({
  activeTab,
  setActiveTab,
}: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const {
    resume,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
  } = useResumeStore()

  const handleAIGenerate = (field: string) => {
    toast({
      title: "AI Generation",
      description: `Generating optimized content for ${field}...`,
    })

    // Simulate AI generation
    setTimeout(() => {
      if (field === "summary") {
        updatePersonalInfo({
          ...resume.personalInfo,
          summary:
            "Experienced software engineer with a passion for creating elegant solutions to complex problems. Skilled in full-stack development with expertise in React, Node.js, and cloud technologies. Proven track record of delivering high-quality applications on time and within budget.",
        })
      }

      toast({
        title: "Content Generated",
        description: "AI has optimized your content!",
      })
    }, 1500)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Build Your Resume</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8 overflow-x-auto">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="profileImage">Profile Picture</Label>
            <ImageUpload
              value={resume.personalInfo.profileImage}
              onChange={(value) => updatePersonalInfo({ ...resume.personalInfo, profileImage: value })}
              label="Upload Profile Picture"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={resume.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, firstName: e.target.value })}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={resume.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, lastName: e.target.value })}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={resume.personalInfo.title}
              onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, title: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={resume.personalInfo.email}
              onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, email: e.target.value })}
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={resume.personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, phone: e.target.value })}
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={resume.personalInfo.location}
              onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, location: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary">Professional Summary</Label>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleAIGenerate("summary")}>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate with AI
              </Button>
            </div>
            <Textarea
              id="summary"
              value={resume.personalInfo.summary}
              onChange={(e) => updatePersonalInfo({ ...resume.personalInfo, summary: e.target.value })}
              placeholder="Experienced professional with a background in..."
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          {resume.experience.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Label htmlFor={`companyLogo-${index}`}>Company Logo</Label>
                <ImageUpload
                  value={exp.companyLogo}
                  onChange={(value) => updateExperience(index, { ...exp, companyLogo: value })}
                  label="Upload Company Logo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={exp.position}
                    onChange={(e) => updateExperience(index, { ...exp, position: e.target.value })}
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, { ...exp, startDate: e.target.value })}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, { ...exp, endDate: e.target.value })}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleAIGenerate(`experience-${index}`)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Enhance with AI
                  </Button>
                </div>
                <Textarea
                  id={`description-${index}`}
                  value={exp.description}
                  onChange={(e) => updateExperience(index, { ...exp, description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              addExperience({
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
                companyLogo: "",
              })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          {resume.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Education #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Label htmlFor={`institutionLogo-${index}`}>Institution Logo</Label>
                <ImageUpload
                  value={edu.institutionLogo}
                  onChange={(value) => updateEducation(index, { ...edu, institutionLogo: value })}
                  label="Upload Institution Logo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, { ...edu, institution: e.target.value })}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                    placeholder="Bachelor of Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`eduStartDate-${index}`}>Start Date</Label>
                  <Input
                    id={`eduStartDate-${index}`}
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, { ...edu, startDate: e.target.value })}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                  <Input
                    id={`eduEndDate-${index}`}
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, { ...edu, endDate: e.target.value })}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`field-${index}`}>Field of Study</Label>
                <Input
                  id={`field-${index}`}
                  value={edu.field}
                  onChange={(e) => updateEducation(index, { ...edu, field: e.target.value })}
                  placeholder="Computer Science"
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              addEducation({
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                institutionLogo: "",
              })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {resume.skills.map((skill, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Skill #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`skillName-${index}`}>Skill Name</Label>
                  <Input
                    id={`skillName-${index}`}
                    value={skill.name}
                    onChange={(e) => updateSkill(index, { ...skill, name: e.target.value })}
                    placeholder="JavaScript"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`skillLevel-${index}`}>Proficiency Level</Label>
                  <Input
                    id={`skillLevel-${index}`}
                    value={skill.level}
                    onChange={(e) => updateSkill(index, { ...skill, level: e.target.value })}
                    placeholder="Expert"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={() => addSkill({ name: "", level: "" })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>

          <Button variant="outline" className="w-full" onClick={() => handleAIGenerate("skills")}>
            <Sparkles className="h-4 w-4 mr-2" />
            Suggest Skills with AI
          </Button>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {resume.projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Project #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`projectName-${index}`}>Project Name</Label>
                <Input
                  id={`projectName-${index}`}
                  value={project.name}
                  onChange={(e) => updateProject(index, { ...project, name: e.target.value })}
                  placeholder="E-commerce Platform"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`projectUrl-${index}`}>Project URL</Label>
                <Input
                  id={`projectUrl-${index}`}
                  value={project.url}
                  onChange={(e) => updateProject(index, { ...project, url: e.target.value })}
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`projectDescription-${index}`}>Description</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleAIGenerate(`project-${index}`)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Enhance with AI
                  </Button>
                </div>
                <Textarea
                  id={`projectDescription-${index}`}
                  value={project.description}
                  onChange={(e) => updateProject(index, { ...project, description: e.target.value })}
                  placeholder="Describe your project, technologies used, and your role..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Project Images</Label>
                <MultipleImageUpload
                  values={project.images}
                  onChange={(values) => updateProject(index, { ...project, images: values })}
                  maxImages={5}
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => addProject({ name: "", url: "", description: "", images: [] })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          {resume.socialLinks.map((link, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Social Link #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeSocialLink(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`platform-${index}`}>Platform</Label>
                  <Input
                    id={`platform-${index}`}
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, { ...link, platform: e.target.value })}
                    placeholder="LinkedIn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`}>URL</Label>
                  <Input
                    id={`url-${index}`}
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, { ...link, url: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={() => addSocialLink({ platform: "", url: "" })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <ThemeSelector />
        </TabsContent>
      </Tabs>
    </div>
  )
}
