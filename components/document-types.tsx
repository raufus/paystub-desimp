import Link from "next/link"

export function DocumentTypes() {
  const documents = [
    {
      title: "Paystub",
      image: "/paystub.jpg",
      href: "/create-paystub",
      cta: "Create your paystub",
    },
    {
      title: "W-2",
      image: "/w2.jpg",
      href: "/contact",
      cta: "Order your W-2",
    },
    {
      title: "Tax Return",
      image: "/1099.jpg",
      href: "/contact",
      cta: "Order your Tax Return",
    },
    {
      title: "1099-MISC",
      image: "/1099.jpg",
      href: "/contact",
      cta: "Order your 1099-MISC",
    },
  ]

  return (
    <section id="documents" className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-24 overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(35,155,160,0.05),transparent_70%)]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Professional
            <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Documents
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Create stunning, bank-ready financial documents in minutes with our premium templates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="group aspect-square bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-primary/50 p-4 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary text-center mb-3 transition-colors duration-300">{doc.title}</h3>
              <div className="flex-1 flex items-center justify-center mb-3">
                <img src={doc.image} alt={doc.title} className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-300" />
              </div>
              <Link href={doc.href} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-center py-2 rounded-lg font-semibold transition-all duration-300 block">
                {doc.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
