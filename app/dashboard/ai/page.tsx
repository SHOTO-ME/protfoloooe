"use client"

import { useState } from "react"
import { Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useResumeStore } from "@/lib/resume-store"

export default function AiAssistantPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const { updatePersonalInfo, resume } = useResumeStore()

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt for the AI assistant.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setAiResponse("")

    // Simulate AI response generation
    setTimeout(() => {
      let response = ""

      if (prompt.toLowerCase().includes("summary")) {
        response =
          'I\'ve generated a professional summary for your profile:\n\n"Innovative Senior Software Engineer with over 5 years of experience developing scalable web applications. Expertise in React, Node.js, and cloud technologies with a proven track record of leading development teams and delivering high-quality solutions. Passionate about clean code, performance optimization, and mentoring junior developers."'

        // Update the resume store with the generated summary
        updatePersonalInfo({
          ...resume.personalInfo,
          summary:
            "Innovative Senior Software Engineer with over 5 years of experience developing scalable web applications. Expertise in React, Node.js, and cloud technologies with a proven track record of leading development teams and delivering high-quality solutions. Passionate about clean code, performance optimization, and mentoring junior developers.",
        })

        toast({
          title: "Summary updated",
          description: "The generated summary has been added to your resume.",
        })
      } else if (prompt.toLowerCase().includes("job description") || prompt.toLowerCase().includes("experience")) {
        response =
          'Based on your background, I\'ve enhanced your job description:\n\n"Led the development of a cloud-based SaaS platform serving over 10,000 users. Architected and implemented a microservices infrastructure using Node.js, Docker, and Kubernetes, resulting in 99.9% uptime and 40% improved scalability. Mentored a team of 5 junior developers, conducted regular code reviews, and established best practices that reduced bug reports by 30%."'
      } else if (prompt.toLowerCase().includes("skills")) {
        response =
          "Here are some relevant skills for your profile as a Senior Software Engineer:\n\n- JavaScript/TypeScript (Expert)\n- React.js & Redux (Expert)\n- Node.js & Express (Advanced)\n- RESTful API Design (Advanced)\n- Docker & Kubernetes (Intermediate)\n- AWS/Cloud Services (Intermediate)\n- CI/CD Pipelines (Intermediate)\n- MongoDB & SQL Databases (Advanced)\n- System Architecture (Intermediate)\n- Agile Methodologies (Advanced)"
      } else {
        response =
          "I'm your AI assistant for resume and portfolio creation. I can help you with:\n\n- Writing professional summaries\n- Enhancing job descriptions\n- Suggesting relevant skills\n- Optimizing project descriptions\n- Creating cover letters\n- Providing feedback on your resume\n\nJust let me know what you need help with!"
      }

      setAiResponse(response)
      setIsGenerating(false)
    }, 2000)
  }

  const handleApplyChanges = () => {
    toast({
      title: "Changes applied",
      description: "The AI-generated content has been applied to your resume.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Sparkles className="h-8 w-8 text-emerald-500 mr-3" />
        <h1 className="text-3xl font-bold">AI Resume Assistant</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">How can I help with your resume?</h2>
        <p className="text-slate-600 mb-6">
          I can help you write professional summaries, enhance job descriptions, suggest skills, and more. Just tell me
          what you need!
        </p>

        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="e.g., 'Write a professional summary for a Senior Software Engineer' or 'Suggest skills for a UX Designer'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {aiResponse && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">AI Response</h2>
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-4 whitespace-pre-line">
            {aiResponse}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleApplyChanges} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Apply to Resume
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Quick Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto py-3 px-4 text-left"
            onClick={() => setPrompt("Write a professional summary for a Senior Software Engineer")}
          >
            <div>
              <div className="flex items-center mb-1">
                <Sparkles className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="font-medium">Professional Summary</span>
              </div>
              <p className="text-sm text-slate-600">Generate a compelling professional summary</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Button>

          <Button
            variant="outline"
            className="justify-start h-auto py-3 px-4 text-left"
            onClick={() => setPrompt("Enhance my job description for a Senior Software Engineer position")}
          >
            <div>
              <div className="flex items-center mb-1">
                <Sparkles className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="font-medium">Job Description</span>
              </div>
              <p className="text-sm text-slate-600">Enhance your job descriptions with achievements</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Button>

          <Button
            variant="outline"
            className="justify-start h-auto py-3 px-4 text-left"
            onClick={() => setPrompt("Suggest relevant skills for a Senior Software Engineer")}
          >
            <div>
              <div className="flex items-center mb-1">
                <Sparkles className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="font-medium">Skills Suggestion</span>
              </div>
              <p className="text-sm text-slate-600">Get relevant skills for your profession</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Button>

          <Button
            variant="outline"
            className="justify-start h-auto py-3 px-4 text-left"
            onClick={() => setPrompt("Write a cover letter for a Senior Software Engineer position at a tech startup")}
          >
            <div>
              <div className="flex items-center mb-1">
                <Sparkles className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="font-medium">Cover Letter</span>
              </div>
              <p className="text-sm text-slate-600">Generate a tailored cover letter</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </div>
    </div>
  )
}
