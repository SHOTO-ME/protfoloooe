"use client"

import { Suspense, useState, useEffect } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import ResumeForm from "@/components/dashboard/resume-form"
import ResumePreview from "@/components/dashboard/resume-preview"
import DashboardLoading from "@/components/dashboard/dashboard-loading"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Check if we're on a small screen and collapse sidebar by default
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <DashboardShell>
      <div className="flex flex-col lg:flex-row h-full">
        <DashboardSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          initialCollapsed={sidebarCollapsed}
        />
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/2 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-64px)]">
            <Suspense fallback={<DashboardLoading />}>
              <ResumeForm activeTab={activeSection} setActiveTab={setActiveSection} />
            </Suspense>
          </div>
          <div className="md:w-1/2 bg-slate-50 p-4 md:p-6 border-t md:border-t-0 md:border-l border-slate-200 overflow-y-auto max-h-[calc(100vh-64px)]">
            <Suspense fallback={<DashboardLoading />}>
              <ResumePreview />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
