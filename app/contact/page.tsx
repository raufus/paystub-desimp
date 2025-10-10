"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, Clock, ShieldCheck, MapPin, Zap } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const whatsappNumber = "+12067045757"
  const whatsappLink = `https://wa.me/12067045757?text=Hi%20SRS%20Financials,%20I%20need%20help%20with%20my%20financial%20documents.`
  const signalLink = `https://signal.me/#eu/+12067045757`

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-6 py-3 text-sm font-semibold text-primary mb-8 shadow-sm">
            <Zap className="h-4 w-4" />
            Fast, secure, and compliant
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            Get Your Documents Now
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Contact Us Directly!
          </h2>
          
          <p className="text-2xl text-primary font-semibold mb-6">
            Need Paystubs or W2? Chat With Us
          </p>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Thank you for choosing SRS Financials. To place your order for Paystubs, Tax Returns, W2 Forms, or any other financial document, please contact us directly through any of the platforms below:
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6 mr-3" />
                WhatsApp Chat
              </a>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <a href={signalLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6 mr-3" />
                Signal Chat
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">15-30 min response</h3>
              <p className="text-muted-foreground">During business hours</p>
            </div>
            <div className="bg-card border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <ShieldCheck className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Manual preparation</h3>
              <p className="text-muted-foreground">Real-looking templates</p>
            </div>
            <div className="bg-card border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Message only</h3>
              <p className="text-muted-foreground">No website orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground mb-4">Contact Methods</h2>
            <p className="text-xl text-muted-foreground">Choose your preferred way to reach us</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* WhatsApp */}
            <div className="bg-card rounded-3xl p-10 shadow-2xl border hover:shadow-3xl transition-all hover:-translate-y-2">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">WhatsApp</h3>
                  <p className="text-lg text-muted-foreground">Instant messaging support</p>
                </div>
              </div>
              
              <div className="bg-muted rounded-2xl p-6 mb-8">
                <p className="text-lg text-foreground">Number: <span className="font-bold">{whatsappNumber}</span></p>
              </div>
              
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all mb-8">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Start WhatsApp Chat
                </a>
              </Button>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-4">Scan QR Code:</p>
                <div className="inline-block p-4 bg-muted rounded-2xl border shadow-lg">
                  <img
                    src="/whatsappqrcode.png"
                    alt="WhatsApp QR Code"
                    className="w-36 h-36 object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3">Scan with WhatsApp camera</p>
              </div>
            </div>

            {/* Signal */}
            <div className="bg-card rounded-3xl p-10 shadow-2xl border hover:shadow-3xl transition-all hover:-translate-y-2">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">Signal</h3>
                  <p className="text-lg text-muted-foreground">Secure messaging alternative</p>
                </div>
              </div>
              
              <div className="bg-muted rounded-2xl p-6 mb-8">
                <p className="text-lg text-foreground">Number: <span className="font-bold">{whatsappNumber}</span></p>
              </div>
              
              <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all mb-8">
                <a href={signalLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Start Signal Chat
                </a>
              </Button>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-4">Scan QR Code:</p>
                <div className="inline-block p-4 bg-muted rounded-2xl border shadow-lg">
                  <img
                    src="/signalqrcode.png"
                    alt="Signal QR Code"
                    className="w-36 h-36 object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3">Scan with Signal camera</p>
              </div>
            </div>
          </div>

          {/* Other Contact Info */}
          <div className="bg-card rounded-3xl p-10 shadow-2xl border mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Other Contact Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 p-6 bg-muted rounded-2xl">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium text-foreground">srssolutionltd@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 p-6 bg-muted rounded-2xl">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium text-foreground">{whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-4 p-6 bg-muted rounded-2xl">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium text-foreground">Florida, USA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-card rounded-3xl p-10 shadow-2xl border">
            <h3 className="text-3xl font-black text-foreground text-center mb-12">Our Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Paystubs", link: "/create-paystub", available: true },
                { name: "W2 Form", link: "/contact", available: false },
                { name: "Tax Return", link: "/contact", available: false },
                { name: "1099-MISC", link: "/contact", available: false }
              ].map((service, index) => (
                <Link
                  key={index}
                  href={service.link}
                  className={`text-center p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    service.available 
                      ? "border-primary/20 bg-primary/5 hover:border-primary hover:shadow-primary/20" 
                      : "border-border bg-muted/50 hover:border-primary/50"
                  }`}
                >
                  <div className={`text-lg font-bold mb-2 ${
                    service.available ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {service.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {service.available ? "Create Now" : "Contact Us"}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t text-center">
              <div className="inline-flex items-center gap-3 bg-muted px-6 py-4 rounded-2xl border">
                <span className="text-2xl">📢</span>
                <p className="text-lg font-semibold text-foreground">
                  Orders are only taken via WhatsApp or Signal messaging platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 text-center">
        <Button asChild size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
          <Link href="/">
            ← Back to Home
          </Link>
        </Button>
      </section>
    </div>
  )
}