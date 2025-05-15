"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"
import { cn } from "@/lib/utils"

const themes = [
  { id: "classic", name: "Classic", color: "#3b82f6" },
  { id: "modern", name: "Modern", color: "#10b981" },
  { id: "minimal", name: "Minimal", color: "#6b7280" },
  { id: "bold", name: "Bold", color: "#ef4444" },
  { id: "elegant", name: "Elegant", color: "#8b5cf6" },
  { id: "professional", name: "Professional", color: "#0f172a" },
]

const colorOptions = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Red", value: "#ef4444" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Orange", value: "#f97316" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Gray", value: "#6b7280" },
  { name: "Dark Blue", value: "#1e40af" },
]

export default function ThemeSelector() {
  const { resume, updateTheme } = useResumeStore()
  const [selectedColor, setSelectedColor] = useState(resume.theme.color)

  const handleThemeChange = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      updateTheme({ id: themeId, name: theme.name, color: theme.color })
      setSelectedColor(theme.color)
    }
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    updateTheme({ ...resume.theme, color })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all",
                resume.theme.id === theme.id
                  ? "border-2 border-emerald-500 shadow-md"
                  : "border-slate-200 hover:border-slate-300",
              )}
              onClick={() => handleThemeChange(theme.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{theme.name}</span>
                {resume.theme.id === theme.id && <Check className="h-4 w-4 text-emerald-500" />}
              </div>
              <div
                className="h-24 rounded border border-slate-200 bg-slate-50 flex items-center justify-center"
                style={{ borderTop: `4px solid ${theme.color}` }}
              >
                <div className="w-3/4 space-y-2">
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                  <div className="h-2 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Accent Color</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border-2",
                selectedColor === color.value ? "border-slate-900" : "border-transparent hover:border-slate-300",
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorChange(color.value)}
              title={color.name}
            >
              {selectedColor === color.value && <Check className="h-5 w-5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Custom Color</h3>
        <div className="flex items-center space-x-4">
          <div
            className="h-10 w-10 rounded-full border border-slate-300"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-10 w-32"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Layout Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 cursor-pointer hover:border-slate-300">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Single Column</span>
              <Check className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="h-24 rounded border border-slate-200 bg-slate-50 flex items-center justify-center">
              <div className="w-3/4 space-y-2">
                <div className="h-2 bg-slate-200 rounded w-full"></div>
                <div className="h-2 bg-slate-200 rounded w-full"></div>
                <div className="h-2 bg-slate-200 rounded w-full"></div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 cursor-pointer hover:border-slate-300">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Two Columns</span>
            </div>
            <div className="h-24 rounded border border-slate-200 bg-slate-50 flex">
              <div className="w-1/3 border-r border-slate-200 p-2">
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
              <div className="w-2/3 p-2">
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
