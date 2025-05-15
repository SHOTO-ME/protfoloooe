import type { ReactNode } from "react"
import DashboardHeader from "./dashboard-header"

interface DashboardShellProps {
  children: ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <DashboardHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
