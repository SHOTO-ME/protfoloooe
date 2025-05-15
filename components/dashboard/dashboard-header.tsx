"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Save, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { useResumeStore } from "@/lib/resume-store"
import { generatePDF } from "@/lib/pdf-generator"
import { generateDOCX } from "@/lib/docx-generator"

export default function DashboardHeader() {
  const pathname = usePathname()
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const { resume } = useResumeStore()

  const handleSave = () => {
    setIsSaving(true)

    try {
      // Save to localStorage for persistence
      localStorage.setItem("portfolioX-resume", JSON.stringify(resume))

      setTimeout(() => {
        setIsSaving(false)
        toast({
          title: "Saved successfully",
          description: "Your portfolio has been saved to your browser.",
        })
      }, 1000)
    } catch (error) {
      console.error("Error saving resume:", error)
      setIsSaving(false)
      toast({
        title: "Error saving",
        description: "There was an error saving your portfolio.",
        variant: "destructive",
      })
    }
  }

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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between p-4 px-2 sm:px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-4 md:mr-8">
            <span className="text-xl md:text-2xl font-bold text-emerald-600">
              Portfolio<span className="text-slate-900">X</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-4 md:space-x-6">
            <Link
              href="/dashboard"
              className={`text-sm font-medium ${pathname === "/dashboard" ? "text-emerald-600" : "text-slate-600 hover:text-slate-900"}`}
            >
              Editor
            </Link>
            <Link
              href="/dashboard/ai"
              className={`text-sm font-medium ${pathname === "/dashboard/ai" ? "text-emerald-600" : "text-slate-600 hover:text-slate-900"}`}
            >
              AI Assistant
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-slate-600"
            onClick={handleSave}
            disabled={isSaving || isExporting !== null}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Save
              </>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-slate-600"
                disabled={isSaving || isExporting !== null}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("PDF")}>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("DOCX")}>Export as DOCX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
