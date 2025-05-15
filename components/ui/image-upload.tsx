"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  className?: string
  label?: string
}

export function ImageUpload({ value, onChange, className, label = "Upload Image" }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, JPEG)",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target?.result) {
        // Resize the image if it's too large
        const img = new Image()
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          // Max dimensions
          const MAX_WIDTH = 1200
          const MAX_HEIGHT = 1200

          // Resize if needed
          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            if (width > height) {
              height = Math.round(height * (MAX_WIDTH / width))
              width = MAX_WIDTH
            } else {
              width = Math.round(width * (MAX_HEIGHT / height))
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height

          // Draw the resized image
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)

            // Convert to base64
            const resizedImage = canvas.toDataURL("image/jpeg", 0.85)
            onChange(resizedImage)
          } else {
            // Fallback if canvas context is not available
            onChange(e.target?.result as string)
          }
          setIsLoading(false)
        }

        img.onerror = () => {
          toast({
            title: "Error processing image",
            description: "The image could not be processed. Please try another image.",
            variant: "destructive",
          })
          setIsLoading(false)
        }

        img.src = e.target.result as string
      }
    }

    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "The file could not be read. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }

    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300 hover:border-slate-400",
          value ? "bg-slate-50" : "bg-white",
          isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={isLoading ? undefined : handleButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
          aria-label="Upload image"
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 rounded-full bg-slate-100 p-2">
              <svg
                className="animate-spin h-6 w-6 text-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <p className="mb-1 text-sm font-medium">Processing image...</p>
          </div>
        ) : value ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={value || "/placeholder.svg?height=200&width=200"}
              alt="Uploaded"
              className="max-h-[200px] max-w-full rounded-md object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=200&width=200"
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 rounded-full bg-slate-100 p-2">
              <Upload className="h-6 w-6 text-slate-500" />
            </div>
            <p className="mb-1 text-sm font-medium">{label}</p>
            <p className="text-xs text-slate-500">Drag & drop or click to upload</p>
            <p className="mt-1 text-xs text-slate-400">PNG, JPG or JPEG (max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function MultipleImageUpload({
  values = [],
  onChange,
  className,
  maxImages = 5,
}: {
  values?: string[]
  onChange: (values: string[]) => void
  className?: string
  maxImages?: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddImage = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (PNG, JPG, JPEG)",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)

      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target?.result) {
          // Resize the image if it's too large
          const img = new Image()
          img.onload = () => {
            // Create a canvas to resize the image
            const canvas = document.createElement("canvas")
            let width = img.width
            let height = img.height

            // Max dimensions
            const MAX_WIDTH = 800
            const MAX_HEIGHT = 600

            // Resize if needed
            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
              if (width > height) {
                height = Math.round(height * (MAX_WIDTH / width))
                width = MAX_WIDTH
              } else {
                width = Math.round(width * (MAX_HEIGHT / height))
                height = MAX_HEIGHT
              }
            }

            canvas.width = width
            canvas.height = height

            // Draw the resized image
            const ctx = canvas.getContext("2d")
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height)

              // Convert to base64
              const resizedImage = canvas.toDataURL("image/jpeg", 0.85)
              onChange([...values, resizedImage])
            } else {
              // Fallback if canvas context is not available
              onChange([...values, e.target?.result as string])
            }
            setIsLoading(false)
          }

          img.onerror = () => {
            toast({
              title: "Error processing image",
              description: "The image could not be processed. Please try another image.",
              variant: "destructive",
            })
            setIsLoading(false)
          }

          img.src = e.target.result as string
        }
      }

      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "The file could not be read. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleRemove = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    onChange(newValues)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-3">
        {values.map((image, index) => (
          <div key={index} className="relative h-24 w-24 rounded-md overflow-hidden border border-slate-200">
            <img
              src={image || "/placeholder.svg?height=96&width=96"}
              alt={`Project image ${index + 1}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=96&width=96"
              }}
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {values.length < maxImages && (
          <button
            type="button"
            onClick={handleAddImage}
            disabled={isLoading}
            className={cn(
              "flex items-center justify-center h-24 w-24 rounded-md border-2 border-dashed border-slate-300 hover:border-slate-400 bg-white transition-colors",
              isLoading && "opacity-70 cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <ImageIcon className="h-6 w-6 text-slate-400" />
            )}
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              disabled={isLoading}
              aria-label="Upload image"
            />
          </button>
        )}
      </div>
      {values.length >= maxImages && <p className="text-xs text-slate-500">Maximum of {maxImages} images allowed</p>}
    </div>
  )
}
