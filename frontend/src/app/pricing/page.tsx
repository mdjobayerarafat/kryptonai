"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Voucher-Based <span className="text-green-500">Access</span>
          </h1>
          <p className="text-xl text-gray-400">
            KryptonSecAI uses vouchers only. Redeem a voucher to activate access for a fixed duration.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How voucher access works</h2>
            <ol className="space-y-4 text-gray-300">
              {[
                "Get a voucher from your admin or sales contact.",
                "Redeem it in your profile to activate access.",
                "Use KryptonSecAI until the voucher duration ends.",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={18} className="text-green-500" />
                  {item}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/profile" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-colors">
                Redeem Voucher
              </a>
              <a href="/register" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-colors">
                Create Account
              </a>
            </div>
          </div>

          <div className="bg-black border border-green-500/40 rounded-2xl p-8 shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]">
            <h3 className="text-xl font-bold text-white mb-2">Voucher Types</h3>
            <p className="text-gray-400 text-sm mb-6">Admins can issue vouchers with custom durations.</p>
            <ul className="space-y-4 text-sm text-gray-300">
              {[
                "Short-term access for pilots and demos",
                "Team access for security operations",
                "Academic cohorts with fixed windows",
                "Enterprise rollouts with staged activation",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={16} className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
