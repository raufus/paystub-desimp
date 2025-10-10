import { ShieldCheck, CreditCard, ThumbsUp } from "lucide-react"

export function ConfidenceSection() {
  const items = [
    { title: "Money Back Guarantee", icon: ShieldCheck, desc: "If you’re not satisfied, we’ll make it right or refund you." },
    { title: "Secure Payment Processing", icon: CreditCard, desc: "Your transactions are protected with industry‑standard security." },
    { title: "High Customer Satisfaction Rating", icon: ThumbsUp, desc: "Thousands of happy customers trust our check stub maker." },
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Buy with 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Confidence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted platform, accurate documents, secure checkout
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((it, index) => (
            <div key={it.title} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-3 text-center">
              {/* Icon container */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <it.icon className="h-10 w-10 text-primary group-hover:text-secondary transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-4">
                {it.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {it.desc}
              </p>
              
              {/* Decorative element */}
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
