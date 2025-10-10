import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Sparkles, Timer, BadgeCheck } from "lucide-react"

export function WhyChoose() {
  const items = [
    {
      title: "Trust a Seamless Process",
      desc:
        "You need paystubs fast. In a few steps, you’ll have legitimate Paystubs that show employment details, gross and net salary, payroll tax deductions and more.",
      icon: Timer,
    },
    {
      title: "Select from Professional Templates",
      desc:
        "Looks are important – especially for official documentation. Choose from clean, professional templates for paystubs and IRS‑compliant W‑2 and 1099 forms.",
      icon: Sparkles,
    },
    {
      title: "Avoid Issues with the IRS",
      desc:
        "Accurate calculations matter. Our auto‑calculation logic follows the latest federal, state and local guidance to help you stay compliant.",
      icon: ShieldCheck,
    },
    {
      title: "Access Support, 24/7",
      desc:
        "Made a mistake or have a question? Our friendly support team is here for you by email or chat – day or night.",
      icon: BadgeCheck,
    },
  ]

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Why Choose 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              SRS Financials?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing legitimate, accurate payroll documents you can trust.
            Whether you're an independent contractor, entrepreneur, or small business owner.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-primary/30 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                {/* Icon and Title */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500 transform group-hover:scale-110">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-500 mb-2">
                      {item.title}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
