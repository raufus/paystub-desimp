import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SupportSection() {
  return (
    <section id="support" className="relative py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Support Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Get 
              <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Support
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Need help? Message us anytime or start a chat. We respond fast and are here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Send us a message
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full sm:w-auto bg-white text-primary border-2 border-primary font-semibold px-8 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
                  Start Chat
                </button>
              </Link>
            </div>
          </div>
          
          {/* Contact Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">📍</span>
                </div>
                <span className="text-gray-700">Florida, USA</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">📞</span>
                </div>
                <a href="tel:+12067045757" className="text-primary font-semibold hover:underline">
                  +1 (206) 704-5757
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">✉️</span>
                </div>
                <a href="mailto:srssolutionltd@gmail.com" className="text-primary font-semibold hover:underline">
                  srssolutionltd@gmail.com
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm border-t border-gray-100 pt-6">
              <div>
                <div className="font-bold text-gray-900 mb-3">Services</div>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="/create-paystub" className="hover:text-primary transition-colors">Paystubs</a></li>
                  <li><a href="/contact" className="hover:text-primary transition-colors">W‑2 Forms</a></li>
                  <li><a href="/contact" className="hover:text-primary transition-colors">1099‑MISC</a></li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-3">Company</div>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-3">Support</div>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#support" className="hover:text-primary transition-colors">Contact Us</a></li>
                  <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} SRS Financials. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
