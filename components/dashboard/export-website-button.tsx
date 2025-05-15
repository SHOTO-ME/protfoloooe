"use client"

import { useState } from "react"
import { Download, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useResumeStore } from "@/lib/resume-store"
import { toast } from "@/hooks/use-toast"
import { generatePortfolioZip } from "@/lib/portfolio-generator"

export default function ExportWebsiteButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { resume } = useResumeStore()

  const handleExport = async () => {
    setIsGenerating(true)

    try {
      await generatePortfolioZip(resume)
      toast({
        title: "Portfolio website generated",
        description: "Your portfolio website has been downloaded successfully.",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error generating portfolio website:", error)
      toast({
        title: "Error",
        description: "Failed to generate portfolio website. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)} className="flex items-center">
        <Download className="h-4 w-4 mr-2" />
        Website
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Portfolio Website</DialogTitle>
            <DialogDescription>
              You are about to download a complete, responsive HTML website of your portfolio.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800">Important License Information</h4>
                <p className="text-sm text-amber-700 mt-1">
                  The generated portfolio includes "Generated using PortfolioX" branding in the footer. This is part of
                  our licensing terms and cannot be removed.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isGenerating}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isGenerating}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Download Website"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
