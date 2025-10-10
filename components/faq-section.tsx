"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    { q: "What is paystub?", a: "A paystub is a document provided with a paycheck that lists earnings and deductions for a pay period and year‑to‑date." },
    { q: "What information is included on a paystub?", a: "Employee info, employer info, pay period, gross pay, taxes and deductions, and net pay." },
    { q: "What is Net Pay?", a: "The amount you receive after all deductions and taxes are subtracted from your gross pay." },
    { q: "What does YTD mean on the paystub?", a: "Year‑to‑date totals of your earnings and deductions from the start of the year to the current pay period." },
    { q: "What does gross pay mean on a paystub?", a: "Your total earnings before deductions for a specific pay period." },
    { q: "Is paystub the same as paycheck?", a: "A paycheck is the payment; a paystub is the record showing how that payment was calculated." },
    { q: "Difference between gross and net pay?", a: "Gross is before deductions; net is after." },
    { q: "Why do you need paystubs for?", a: "Income verification for rentals, loans, benefits, child support and more." },
    { q: "What is the difference between an employee and a contractor?", a: "Employees receive W‑2s; contractors typically receive 1099‑MISC/NEC forms." },
    { q: "What is Form W‑2?", a: "A tax form reporting annual wages and taxes withheld for employees." },
    { q: "Do I need to file both W‑2 & 1099‑MISC forms?", a: "Only if you had both employment (W‑2) and contractor (1099) income." },
    { q: "Are documents created with SRS Financials legal?", a: "They are designed for accurate record‑keeping. Always provide truthful information and follow applicable laws." },
    { q: "Can I download documents I created?", a: "Yes. Download instantly as secure PDFs." },
    { q: "Can I create paystubs from my mobile?", a: "Yes, our generator is responsive and mobile‑friendly." },
    { q: "How can I access previous documents?", a: "Sign in to your dashboard to view prior orders if you created an account." },
    { q: "Will my payment information be safe?", a: "We use secure processors and do not store full card details." },
    { q: "How can I edit my paystubs?", a: "Use preview to make changes before ordering. After purchase, contact support for corrections." },
    { q: "Will I be charged for using templates?", a: "You only pay when you place an order." },
    { q: "Do I have to calculate taxes and deductions?", a: "No. Our system auto‑calculates based on inputs and selected jurisdiction." },
    { q: "What payment options do you accept?", a: "Major credit/debit cards and other regionally supported methods." },
    { q: "How can I contact you?", a: "See the Support section below for phone and address, or message us via chat/email." },
  ]

  return (
    <section id="faq" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Frequently Asked 
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our document services
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <Accordion type="multiple" className="divide-y divide-gray-100">
            {faqs.map((f, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-0">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary transition-colors duration-300 px-8 py-6 text-lg hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-8 pb-6 text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
