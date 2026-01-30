"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <section className="container-custom mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start for free, upgrade as you grow.
          </p>
        </section>

        <section className="container-custom grid md:grid-cols-3 gap-8">
          {/* Free - Coming Soon */}
          <div className="card border-gray-800 opacity-50">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white mb-2">Hobby</h3>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full border border-gray-700">Coming Soon</span>
            </div>
            <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <p className="text-gray-400 mb-6">For individual developers and students.</p>
            <button disabled className="button-secondary w-full mb-8 cursor-not-allowed">Get Started</button>
            
            <ul className="space-y-3 text-sm opacity-50">
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> 5 Scans per month
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Basic CTF Challenges
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Community Support
              </li>
            </ul>
          </div>

          {/* Voucher Access - Active */}
          <div className="card border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h3 className="text-xl font-bold text-white mb-2">Voucher Access</h3>
            <div className="text-4xl font-bold text-white mb-6">Pre-paid<span className="text-lg text-gray-500 font-normal">/access</span></div>
            <p className="text-gray-400 mb-6">Redeem your voucher code for full platform access.</p>
            <Link href="/register" className="button-primary w-full mb-8">Redeem Voucher</Link>
            
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Unlimited Scans
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Advanced AI Insights
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Full CTF Access
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Priority Support
              </li>
            </ul>
          </div>

          {/* Enterprise - Coming Soon */}
          <div className="card border-gray-800 opacity-50">
             <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full border border-gray-700">Coming Soon</span>
            </div>
            <div className="text-4xl font-bold text-white mb-6">Custom</div>
            <p className="text-gray-400 mb-6">For large organizations with custom needs.</p>
            <button disabled className="button-secondary w-full mb-8 cursor-not-allowed">Contact Sales</button>
            
            <ul className="space-y-3 text-sm opacity-50">
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> SSO & SAML
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> On-premise Deployment
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> Dedicated Account Manager
              </li>
              <li className="flex items-center text-gray-300">
                <Check size={16} className="text-white mr-2" /> 24/7 Priority Support
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
