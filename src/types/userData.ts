export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  gpa: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  image: string;
  startDate: string;
  endDate: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 (Beginner to Expert)
  category: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // Basic, Conversational, Intermediate, Proficient, Fluent, Native
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry: string;
  url: string;
}

export interface Settings {
  theme: string;
  font: string;
  template: string;
  darkMode: boolean;
}

export interface UserData {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  settings: Settings;
}