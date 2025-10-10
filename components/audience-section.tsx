import { Users, Home, Building, Calculator, Briefcase, UserCheck } from "lucide-react"

export function AudienceSection() {
  const audiences = [
    {
      title: "Freelancers & Contractors",
      description: "Independent workers who need proof of income for loans, rentals, or financial applications",
      icon: Users,
    },
    {
      title: "Homebuyers & Renters",
      description: "Individuals seeking mortgage approval or rental applications requiring income verification",
      icon: Home,
    },
    {
      title: "Small Business Owners",
      description: "Entrepreneurs who need professional payroll documents for their employees",
      icon: Building,
    },
    {
      title: "Tax Professionals",
      description: "CPAs and tax preparers helping clients organize financial documents for tax season",
      icon: Calculator,
    },
    {
      title: "Self-Employed Workers",
      description: "Business owners and consultants who need legitimate income documentation",
      icon: Briefcase,
    },
    {
      title: "HR Professionals",
      description: "Human resources teams managing payroll documentation and employee records",
      icon: UserCheck,
    },
  ]

  return (
    <section id="audiences" className="relative py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Who can use 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              SRS Financials?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our professional document services are designed for anyone who needs reliable, accurate financial documentation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div key={audience.title} className="group bg-gray-50 hover:bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-2">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <audience.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {audience.description}
              </p>
              
              {/* Decorative element */}
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-6 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
