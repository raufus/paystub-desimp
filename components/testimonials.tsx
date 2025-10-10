import { Star } from "lucide-react"

export function Testimonials() {
  const quotes = [
    {
      name: "Georgia Austin",
      role: "Blog Writer",
      text: "SRS Financials created a paystub as proof of income for my bank in 2 minutes. Approved instantly!",
      rating: 5,
    },
    {
      name: "Jay Hinge",
      role: "Catering Business Owner",
      text: "With SRS, I created a check stub that got me approved for a mortgage. Game changer!",
      rating: 5,
    },
    {
      name: "Sarah Miles",
      role: "Yoga Instructor",
      text: "Their system is by far the easiest I've used. Thank you so much!",
      rating: 5,
    },
    {
      name: "Cindi Yung",
      role: "Cafe Owner",
      text: "I use SRS to create check stubs for my employees. A lifesaver and budget helper!",
      rating: 5,
    },
  ]

  return (
    <section id="reviews" className="relative py-24 bg-gradient-to-br from-white via-blue-50/30 to-slate-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Customers 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Trust Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust our professional document services
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {quotes.map((q, index) => (
            <div key={q.name} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                {[...Array(q.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                "{q.text}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {q.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {q.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {q.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        

      </div>
    </section>
  )
}