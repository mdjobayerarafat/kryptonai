"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Shield, Users, Zap, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Cyber Grid Background Component
const CyberGrid = () => {
  return <div className="cyber-grid" />;
};

// Network Lines Component
const NetworkLines = () => {
  const [lines, setLines] = useState<Array<{id: number, top: string, left: string, width: string, delay: number}>>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${150 + Math.random() * 300}px`,
      delay: Math.random() * 4
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="network-lines">
      {lines.map((line) => (
        <div
          key={line.id}
          className="network-line"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            animationDelay: `${line.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Floating Particle Field Component
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{id: number, left: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-field">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="cyber-particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <CyberGrid />
      <NetworkLines />
      <ParticleField />
      
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 relative z-20">
        {/* Enhanced Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-green-500/20 via-cyan-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-20 relative z-10">
          <div className="scanlines relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse pointer-events-none" />
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="cyber-heading">Voucher-Based</span><br />
              <span className="neon-text neon-glow">Access</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            KryptonSecAI uses vouchers only. Redeem a voucher to activate access for a 
            <span className="neon-text"> fixed duration</span>.
          </p>
        </div>

        {/* Voucher Cards Section */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10">
          {/* How Voucher Access Works Card */}
          <div className="glass-card p-10 group relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card Header */}
            <div className="relative z-10 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <Shield size={24} className="neon-text bloom" />
                </div>
                <h2 className="text-3xl font-bold text-white">How voucher access works</h2>
              </div>
            </div>

            {/* Checklist */}
            <div className="relative z-10 mb-10">
              <ol className="space-y-6 text-gray-300">
                {[
                  "Get a voucher from your admin or sales contact.",
                  "Redeem it in your profile to activate access.",
                  "Use KryptonSecAI until the voucher duration ends.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group/item">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform duration-300">
                      <Check size={16} className="text-green-400" />
                    </div>
                    <span className="text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/profile"
                className="cyber-button bloom text-lg px-8 py-4 inline-flex items-center gap-3 relative group flex-1 justify-center"
              >
              
                <span className="relative z-10">Redeem Voucher</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/register"
                className="glass-panel px-8 py-4 rounded-xl text-lg font-semibold text-gray-300 hover:text-white border border-green-500/30 hover:border-green-500/50 transition-all duration-300 inline-flex items-center gap-3 flex-1 justify-center"
              >
                <Users size={20} />
                <span>Create Account</span>
              </Link>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
          </div>

          {/* Voucher Types Card */}
          <div className="glass-card p-10 group relative overflow-hidden border-green-500/40">
            {/* Enhanced Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-transparent to-emerald-500/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card Header */}
            <div className="relative z-10 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-xl flex items-center justify-center border border-green-500/40">
                  <Users size={24} className="neon-text bloom" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Voucher Types</h3>
                  <p className="text-gray-400 text-sm mt-1">Admins can issue vouchers with custom durations.</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="relative z-10">
              <ul className="space-y-5 text-gray-300">
                {[
                  "Short-term access for pilots and demos",
                  "Team access for security operations", 
                  "Academic cohorts with fixed windows",
                  "Enterprise rollouts with staged activation",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group/item">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500/30 to-green-500/20 rounded-full flex items-center justify-center border border-green-500/40 flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform duration-300">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span className="text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Glow Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-green-500/30 group-hover:border-green-500/60 transition-colors duration-300 shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_50px_-10px_rgba(34,197,94,0.5)]" />
            
            {/* Corner Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-green-500/60 group-hover:border-green-500/90 transition-colors duration-300" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-green-500/60 group-hover:border-green-500/90 transition-colors duration-300" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-green-500/60 group-hover:border-green-500/90 transition-colors duration-300" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-green-500/60 group-hover:border-green-500/90 transition-colors duration-300" />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center relative z-10">
          <div className="glass-panel p-8 rounded-2xl border border-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help Getting Started?</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Contact your administrator or sales representative to obtain a voucher and begin using KryptonSecAI's 
              advanced cybersecurity features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="glass-panel px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white border border-green-500/30 hover:border-green-500/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Shield size={18} />
                <span>Contact Sales</span>
              </Link>
              <Link 
                href="/resources"
                className="glass-panel px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white border border-green-500/30 hover:border-green-500/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Users size={18} />
                <span>View Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
