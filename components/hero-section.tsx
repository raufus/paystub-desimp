import React from 'react';
import Link from "next/link";
import { Clock, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative bg-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-secondary/3"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Create Professional
              <span className="text-primary block">Paystubs Instantly</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Generate bank-approved paystubs in under 2 minutes. No downloads, no hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/create-paystub">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Create Paystub Now
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center justify-center gap-2 text-gray-700 font-semibold px-6 py-4 border border-gray-300 rounded-xl hover:border-primary hover:text-primary transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>2-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Bank approved</span>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <img
                src="/paystubheroimag.png"
                alt="Paystub preview"
                className="w-full h-auto"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}