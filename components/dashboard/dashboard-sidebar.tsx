"use client"

import { useState, useEffect } from "react"
import { User, Briefcase, GraduationCap, Award, Code, LinkIcon, ChevronRight, ChevronLeft, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Update the sections array to match exactly with the tabs in the resume form
const sections = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Award },
  { id: "links", label: "Links", icon: LinkIcon },
  { id: "theme", label: "Theme", icon: Palette },
]

// Update the sidebar component to accept initialCollapsed prop

// Update the component props and function signature
export default function DashboardSidebar({
  activeSection,
  setActiveSection,
  initialCollapsed = false,
}: {
  activeSection: string
  setActiveSection: (section: string) => void
  initialCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-collapse on small screens
      if (window.innerWidth < 1024 && !collapsed) {
        setCollapsed(true)
      } else if (window.innerWidth >= 1024 && collapsed) {
        setCollapsed(false)
      }
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [collapsed])

  return (
    <div
      className={cn(
        "bg-slate-800 text-white transition-all duration-300 relative h-full",
        collapsed ? "w-16" : "w-64",
        isMobile && collapsed && "w-0",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -right-3 top-4 bg-white text-slate-800 rounded-full h-6 w-6 p-0 shadow-md hover:bg-slate-100 z-10",
          isMobile && collapsed && "right-0",
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <div className="p-4 overflow-y-auto h-full">
        <h2
          className={cn(
            "font-bold transition-opacity duration-200",
            collapsed ? "opacity-0 h-0" : "opacity-100 h-auto mb-4",
          )}
        >
          Resume Sections
        </h2>

        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              className={cn(
                "flex items-center w-full p-2 rounded-md transition-colors",
                activeSection === section.id ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700",
                collapsed ? "justify-center" : "justify-start",
              )}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon className={cn("flex-shrink-0", collapsed ? "h-5 w-5" : "h-5 w-5 mr-3")} />
              <span
                className={cn(
                  "transition-opacity duration-200",
                  collapsed ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100",
                )}
              >
                {section.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
