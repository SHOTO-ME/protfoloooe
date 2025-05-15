"use client"

import { create } from "zustand"

interface PersonalInfo {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  profileImage?: string
}

interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  companyLogo?: string
}

interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  institutionLogo?: string
}

interface Skill {
  name: string
  level: string
}

interface Project {
  name: string
  url: string
  description: string
  images: string[]
}

interface SocialLink {
  platform: string
  url: string
}

interface Theme {
  id: string
  name: string
  color: string
}

interface ResumeState {
  resume: {
    personalInfo: PersonalInfo
    experience: Experience[]
    education: Education[]
    skills: Skill[]
    projects: Project[]
    socialLinks: SocialLink[]
    theme: Theme
  }
  updatePersonalInfo: (info: PersonalInfo) => void
  addExperience: (exp: Experience) => void
  updateExperience: (index: number, exp: Experience) => void
  removeExperience: (index: number) => void
  addEducation: (edu: Education) => void
  updateEducation: (index: number, edu: Education) => void
  removeEducation: (index: number) => void
  addSkill: (skill: Skill) => void
  updateSkill: (index: number, skill: Skill) => void
  removeSkill: (index: number) => void
  addProject: (project: Project) => void
  updateProject: (index: number, project: Project) => void
  removeProject: (index: number) => void
  addSocialLink: (link: SocialLink) => void
  updateSocialLink: (index: number, link: SocialLink) => void
  removeSocialLink: (index: number) => void
  updateTheme: (theme: Theme) => void
}

export const useResumeStore = create<ResumeState>((set) => {
  // Try to load from localStorage on initialization
  let initialState = {
    personalInfo: {
      firstName: "Diya",
      lastName: "Adhikari",
      title: "Senior Software Engineer",
      email: "diya.adhikari@example.com",
      phone: "+977 9841234567",
      location: "Kathmandu, Nepal",
      summary:
        "Experienced software engineer with a passion for creating innovative solutions to complex problems. Skilled in full-stack development with expertise in React, Node.js, and cloud technologies. Committed to delivering high-quality applications that meet client needs and business objectives.",
      profileImage: "",
    },
    experience: [
      {
        company: "Leapfrog Technology",
        position: "Senior Software Engineer",
        startDate: "01/2020",
        endDate: "Present",
        description:
          "Lead development of enterprise web applications using React and Node.js. Collaborate with international clients to deliver scalable solutions. Mentor junior developers and conduct code reviews to ensure code quality and best practices.",
        companyLogo: "",
      },
      {
        company: "Fusemachines Nepal",
        position: "Software Developer",
        startDate: "03/2017",
        endDate: "12/2019",
        description:
          "Developed AI-powered web applications using React, Python, and TensorFlow. Worked in an agile environment to deliver features on time. Improved application performance by 35% through code optimization and efficient database queries.",
        companyLogo: "",
      },
    ],
    education: [
      {
        institution: "Tribhuvan University",
        degree: "Master of Science",
        field: "Computer Engineering",
        startDate: "09/2015",
        endDate: "05/2017",
        institutionLogo: "",
      },
      {
        institution: "Kathmandu University",
        degree: "Bachelor of Engineering",
        field: "Computer Science",
        startDate: "09/2011",
        endDate: "05/2015",
        institutionLogo: "",
      },
    ],
    skills: [
      { name: "JavaScript", level: "Expert" },
      { name: "React", level: "Expert" },
      { name: "Node.js", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "TensorFlow", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
    ],
    projects: [
      {
        name: "Nepal Tourism Portal",
        url: "https://github.com/diyaadhikari/tourism-portal",
        description:
          "Built a comprehensive tourism portal for Nepal using React, Node.js, and MongoDB. Implemented features like virtual tours, booking system, and local guide connections to promote tourism in Nepal.",
        images: [],
      },
      {
        name: "Nepali Language NLP Tool",
        url: "https://github.com/diyaadhikari/nepali-nlp",
        description:
          "Developed a natural language processing tool for Nepali language using Python and TensorFlow. Created modules for text classification, sentiment analysis, and machine translation to bridge the technology gap for Nepali language.",
        images: [],
      },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/diyaadhikari" },
      { platform: "GitHub", url: "https://github.com/diyaadhikari" },
      { platform: "Portfolio", url: "https://diyaadhikari.com.np" },
    ],
    theme: {
      id: "modern",
      name: "Modern",
      color: "#10b981",
    },
  }

  // Try to load saved state from localStorage if available
  if (typeof window !== "undefined") {
    try {
      const savedState = localStorage.getItem("portfolioX-resume")
      if (savedState) {
        initialState = JSON.parse(savedState)
      }
    } catch (error) {
      console.error("Failed to load state from localStorage:", error)
    }
  }

  return {
    resume: initialState,
    updatePersonalInfo: (info) =>
      set((state) => ({
        resume: { ...state.resume, personalInfo: info },
      })),
    addExperience: (exp) =>
      set((state) => ({
        resume: { ...state.resume, experience: [...state.resume.experience, exp] },
      })),
    updateExperience: (index, exp) =>
      set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.map((e, i) => (i === index ? exp : e)),
        },
      })),
    removeExperience: (index) =>
      set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.filter((_, i) => i !== index),
        },
      })),
    addEducation: (edu) =>
      set((state) => ({
        resume: { ...state.resume, education: [...state.resume.education, edu] },
      })),
    updateEducation: (index, edu) =>
      set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.map((e, i) => (i === index ? edu : e)),
        },
      })),
    removeEducation: (index) =>
      set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.filter((_, i) => i !== index),
        },
      })),
    addSkill: (skill) =>
      set((state) => ({
        resume: { ...state.resume, skills: [...state.resume.skills, skill] },
      })),
    updateSkill: (index, skill) =>
      set((state) => ({
        resume: {
          ...state.resume,
          skills: state.resume.skills.map((s, i) => (i === index ? skill : s)),
        },
      })),
    removeSkill: (index) =>
      set((state) => ({
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter((_, i) => i !== index),
        },
      })),
    addProject: (project) =>
      set((state) => ({
        resume: { ...state.resume, projects: [...state.resume.projects, project] },
      })),
    updateProject: (index, project) =>
      set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.map((p, i) => (i === index ? project : p)),
        },
      })),
    removeProject: (index) =>
      set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter((_, i) => i !== index),
        },
      })),
    addSocialLink: (link) =>
      set((state) => ({
        resume: { ...state.resume, socialLinks: [...state.resume.socialLinks, link] },
      })),
    updateSocialLink: (index, link) =>
      set((state) => ({
        resume: {
          ...state.resume,
          socialLinks: state.resume.socialLinks.map((l, i) => (i === index ? link : l)),
        },
      })),
    removeSocialLink: (index) =>
      set((state) => ({
        resume: {
          ...state.resume,
          socialLinks: state.resume.socialLinks.filter((_, i) => i !== index),
        },
      })),
    updateTheme: (theme) =>
      set((state) => ({
        resume: { ...state.resume, theme },
      })),
  }
})

export type { ResumeState }
