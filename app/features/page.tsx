import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Zap, Clock, Shield, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Your Professional Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover all the tools and features that make PortfolioX the best choice for creating your professional
            portfolio.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">AI-Powered Content Generation</h2>
              <p className="text-lg text-slate-600 mb-6">
                Our advanced AI helps you create professional content with minimal input. Get suggestions for job
                descriptions, skill highlights, and achievement statements.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Smart content suggestions based on your industry and role</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Grammar and style optimization for professional polish</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Keyword enrichment to help your resume pass ATS systems</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI Content Generation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Export Options */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Export Options" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Multiple Export Formats</h2>
              <p className="text-lg text-slate-600 mb-6">
                Export your portfolio in multiple formats to suit your needs. Whether you need a PDF for email
                attachments or a DOCX for further editing, we've got you covered.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>High-quality PDF exports with perfect formatting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Editable DOCX files for Microsoft Word compatibility</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Shareable online portfolio with a custom URL</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Customization */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Customizable Themes</h2>
              <p className="text-lg text-slate-600 mb-6">
                Make your portfolio uniquely yours with our customizable themes. Choose colors, layouts, and styles that
                match your personal brand.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Multiple professional templates to choose from</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom color picker to match your personal brand</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Font and layout options for the perfect presentation</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Theme Customization"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">More Powerful Features</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="h-10 w-10 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Version History</h3>
              <p className="text-slate-600">
                Keep track of all your portfolio versions and revert to previous designs if needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-10 w-10 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Auto-Save</h3>
              <p className="text-slate-600">
                Never lose your work with our automatic saving feature that preserves your progress.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-10 w-10 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Privacy</h3>
              <p className="text-slate-600">
                Your data is secure with our encrypted storage and privacy-first approach.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Laptop className="h-10 w-10 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Responsive Design</h3>
              <p className="text-slate-600">
                Your portfolio looks great on all devices, from smartphones to desktop computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-500 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Professional Portfolio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start building your career-boosting portfolio today with PortfolioX.
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
