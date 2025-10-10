import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileEdit, Eye, DownloadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StepsSection() {
  const steps = [
    {
      title: "Add your info",
      desc: "Use our secure online forms to enter your personal details in the fields provided.",
      icon: FileEdit,
    },
    {
      title: "Preview your document",
      desc: "Make edits before you order. Get documents delivered to your inbox in minutes.",
      icon: Eye,
    },
    {
      title: "Download your Paystubs",
      desc: "Download and print the secure PDF. We’ll print and mail your Paystubs and W‑2s.",
      icon: DownloadCloud,
    },
  ]

  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-br from-white via-blue-50/30 to-slate-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Creating paystubs has never been 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              this simple.
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">Seriously!</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((s, index) => (
            <div key={s.title} className="group relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 transform -translate-x-1/2 z-0"></div>
              )}
              
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-primary/30 p-8 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500 transform group-hover:scale-110">
                    <s.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-500" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-500 mb-4">
                    {s.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/create-paystub">
            <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg px-12 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center gap-3">
                GET STARTED NOW
                <span className="transform hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
