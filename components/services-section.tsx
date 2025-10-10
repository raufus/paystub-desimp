import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calculator, CreditCard, Receipt, Building, Users } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Paystubs Made Easy",
      description: "Custom paystubs that look professional. Perfect for rent, loans, or job verification.",
      icon: FileText,
    },
    {
      title: "Tax Return Assistance",
      description: "Complete tax document services for self-employed, freelancers, and employees.",
      icon: Calculator,
    },
    {
      title: "W2 Form Services",
      description: "Official-looking W2 forms for proof of income and tax purposes.",
      icon: CreditCard,
    },
    {
      title: "1099 For Contractors",
      description: "Detailed 1099-MISC and 1099-NEC forms for independent contractors.",
      icon: Receipt,
    },
    {
      title: "Bank Statements",
      description: "Professional bank statements for income verification and applications.",
      icon: Building,
    },
    {
      title: "Monthly Payroll",
      description: "Complete payroll management services for businesses of all sizes.",
      icon: Users,
    },
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            What We 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Do Best
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional document services that deliver results
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-2">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
