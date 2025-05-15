import { NextResponse } from "next/server"

// In a real implementation, this would use Firebase SDK
// to retrieve the resume data from Firestore

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get("id")

    if (!documentId) {
      return NextResponse.json({ success: false, message: "Document ID is required" }, { status: 400 })
    }

    // Simulate Firebase retrieval delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return mock resume data
    return NextResponse.json({
      success: true,
      data: {
        personalInfo: {
          firstName: "John",
          lastName: "Doe",
          title: "Senior Software Engineer",
          email: "john.doe@example.com",
          phone: "(123) 456-7890",
          location: "San Francisco, CA",
          summary: "Experienced software engineer with a passion for creating elegant solutions to complex problems.",
        },
        experience: [
          {
            company: "Tech Innovations Inc.",
            position: "Senior Software Engineer",
            startDate: "01/2020",
            endDate: "Present",
            description: "Led development of a cloud-based SaaS platform.",
          },
        ],
        education: [
          {
            institution: "University of Technology",
            degree: "Master of Science",
            field: "Computer Science",
            startDate: "09/2015",
            endDate: "05/2017",
          },
        ],
        skills: [
          { name: "JavaScript", level: "Expert" },
          { name: "React", level: "Expert" },
          { name: "Node.js", level: "Advanced" },
        ],
        projects: [
          {
            name: "E-commerce Platform",
            url: "https://github.com/johndoe/ecommerce",
            description: "Built a full-stack e-commerce platform.",
          },
        ],
        socialLinks: [
          { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
          { platform: "GitHub", url: "https://github.com/johndoe" },
        ],
        theme: {
          id: "modern",
          name: "Modern",
          color: "#10b981",
        },
      },
      message: "Resume retrieved successfully",
    })
  } catch (error) {
    console.error("Error retrieving resume:", error)
    return NextResponse.json({ success: false, message: "Failed to retrieve resume" }, { status: 500 })
  }
}
