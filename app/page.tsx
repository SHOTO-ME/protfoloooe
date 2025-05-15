import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Sparkles, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/hero-animation"
import FeatureCard from "@/components/feature-card"
import { Testimonials } from "@/components/testimonials"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Create Your Professional <span className="text-emerald-400">Portfolio</span> in Minutes
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              PortfolioX helps you build stunning CVs and professional portfolios that stand out. Powered by AI to make
              your career shine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                <Link href="/features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <Suspense fallback={<div className="h-[400px] w-full bg-slate-800 animate-pulse rounded-lg"></div>}>
              <HeroAnimation />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PortfolioX?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform combines powerful features with an intuitive interface to help you create professional
              portfolios in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-emerald-500" />}
              title="AI-Powered Content"
              description="Let our AI help you craft professional descriptions and optimize your content for maximum impact."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-emerald-500" />}
              title="Multiple Export Formats"
              description="Download your portfolio as PDF or DOCX to share with potential employers or clients."
            />
            <FeatureCard
              icon={<Palette className="h-10 w-10 text-emerald-500" />}
              title="Customizable Themes"
              description="Choose from various themes and customize colors to match your personal brand."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create your professional portfolio in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Enter Your Details</h3>
              <p className="text-slate-600">
                Fill in your professional information or let our AI help you get started.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Customize Your Portfolio</h3>
              <p className="text-slate-600">
                Choose themes, colors, and layouts that best represent your professional brand.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Export & Share</h3>
              <p className="text-slate-600">
                Download your portfolio as PDF or DOCX and share it with potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-emerald-500 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Professional Portfolio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have boosted their careers with PortfolioX.
          </p>
          <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-slate-100">
            <Link href="/dashboard">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
