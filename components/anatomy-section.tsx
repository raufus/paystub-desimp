import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export function AnatomySection() {
  const items = [
    { title: "Employment Details", desc: "Name of employer and address, payment date, etc." },
    { title: "Local Taxes", desc: "Some local governments impose income taxes, shown as deductions." },
    { title: "Back Pay", desc: "In case of overpayment in taxes, back pay will appear on your stub." },
    { title: "Sick/Holiday Pay", desc: "Paid sick leave and paid vacation are noted in this section." },
    { title: "Federal Taxes", desc: "Federal withholding taxes based on your W‑4 form." },
    { title: "Net Salary", desc: "Take home pay — the amount paid to you after deductions." },
    { title: "Gross Salary", desc: "Your total salary before mandatory deductions." },
    { title: "State Taxes", desc: "State income taxes, depending on where you live and work." },
  ]

  return (
    <section id="anatomy" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            The Anatomy of a 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Paystub
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            42% of U.S. employees say taxes and deductions on their paystubs are confusing. We're breaking down the key elements below so you can better understand your paystub.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          
          {/* Paystub Anatomy Visual */}
          <div className="relative max-w-5xl mx-auto mt-12 mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <Image
                src="/downimage.jpg"
                alt="The Anatomy of a Paystub - Visual breakdown showing Employment Details, Gross Salary, Taxes, Net Salary, and other key components"
                width={800}
                height={600}
                className="w-full h-auto object-contain bg-white"
                priority
              />
            </div>
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, index) => (
            <div key={it.title} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-2">
              {/* Number badge */}
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                {index + 1}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-3">
                {it.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {it.desc}
              </p>
              
              {/* Decorative element */}
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
