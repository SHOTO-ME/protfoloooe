import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "UX Designer",
    content:
      "PortfolioX helped me create a stunning portfolio that showcased my design skills perfectly. I received three job offers within a week of sharing it!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "The AI suggestions were incredibly helpful. It helped me highlight achievements I wouldn't have thought to include. My resume stands out now.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Priya Patel",
    role: "Marketing Manager",
    content:
      "I love how easy it was to customize my portfolio. The theme options are professional and the export feature saved me so much time.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with PortfolioX
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-700">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
