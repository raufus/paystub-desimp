"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function PricingSection() {
  const router = useRouter()

  const packages = [
    {
      name: "Basic",
      subtitle: "For individuals who need quick essentials",
      price: 20,
      features: ["1 Paystub", "Basic Formatting", "24-Hour Delivery"],
      buttonText: "Get Started",
      popular: false,
      type: "basic",
    },
    {
      name: "Standard",
      subtitle: "Our most popular package with added benefits",
      price: 30,
      features: ["1 W2 Form", "Professional Formatting", "24-Hour Delivery"],
      buttonText: "Choose Standard",
      popular: true,
      type: "standard",
    },
    {
      name: "Premium",
      subtitle: "For professionals who need comprehensive docs",
      price: 50,
      features: ["1 1040 Form", "Premium Formatting", "Priority Delivery"],
      buttonText: "Go Premium",
      popular: false,
      type: "premium",
    },
  ]

  const handleOrderClick = (packageType: string) => {
    router.push(`/checkout?package=${packageType}`)
  }

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Simple, 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that best fits your needs. No hidden fees, no hassle.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl border transition-all duration-300 transform hover:-translate-y-2 ${
                pkg.popular
                  ? "border-primary"
                  : "border-gray-200 hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 text-sm font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Name & Description */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700"
                      >
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleOrderClick(pkg.type)}
                  className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                    pkg.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium">Instant Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}