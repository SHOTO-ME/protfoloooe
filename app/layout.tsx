import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "PortfolioX - Professional CV & Portfolio Generator",
  description:
    "Create stunning CVs and professional portfolios in minutes with AI-powered content generation and customizable templates.",
  keywords: "portfolio, resume, CV, professional, AI, generator, career",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfoliox.vercel.app",
    title: "PortfolioX - Professional CV & Portfolio Generator",
    description:
      "Create stunning CVs and professional portfolios in minutes with AI-powered content generation and customizable templates.",
    siteName: "PortfolioX",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioX - Professional CV & Portfolio Generator",
    description:
      "Create stunning CVs and professional portfolios in minutes with AI-powered content generation and customizable templates.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'