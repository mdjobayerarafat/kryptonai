"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Target, Zap, Lock, Globe, Code, Cpu, Eye, ArrowRight, Search, Flag, Laptop, Satellite, BarChart, Settings } from "lucide-react";
import { useEffect, useState } from "react";

// Cyber Grid Background Component
const CyberGrid = () => {
  return <div className="cyber-grid" />;
};

// Network Lines Component
const NetworkLines = () => {
  const [lines, setLines] = useState<Array<{id: number, top: string, left: string, width: string, delay: number}>>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${200 + Math.random() * 300}px`,
      delay: Math.random() * 3
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

export default function FeaturesPage() {
  const features = [
    {
      icon: <Search size={32} className="neon-text bloom" />,
      title: "Real-time Vulnerability Analysis",
      description: "Instant feedback on your code security posture using advanced static analysis and AI reasoning.",
      highlight: "AI-Powered"
    },
    {
      icon: <Flag size={32} className="neon-text bloom" />,
      title: "Automated CTF Solutions",
      description: "Stuck on a flag? Get intelligent hints and step-by-step breakdowns without giving away the answer.",
      highlight: "Smart Hints"
    },
    {
      icon: <Laptop size={32} className="neon-text bloom" />,
      title: "Secure Code Generation",
      description: "Generate secure-by-default code snippets for common patterns in Python, Rust, Go, and JavaScript.",
      highlight: "Multi-Language"
    },
    {
      icon: <Satellite size={32} className="neon-text bloom" />,
      title: "Threat Intelligence Feeds",
      description: "Stay ahead of 0-days with integrated threat feeds that contextualize current vulnerabilities.",
      highlight: "Real-time"
    },
    {
      icon: <BarChart size={32} className="neon-text bloom" />,
      title: "System Monitoring Dashboard",
      description: "Comprehensive visibility into your security posture with real-time monitoring and alerting.",
      highlight: "24/7 Watch"
    },
    {
      icon: <Settings size={32} className="neon-text bloom" />,
      title: "Threat Intelligence Control",
      description: "Advanced threat detection and response capabilities with machine learning-powered analysis.",
      highlight: "ML-Powered"
    }
  ];

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
        <div className="text-center max-w-5xl mx-auto mb-24 relative z-10">
          <div className="scanlines relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse pointer-events-none" />
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="cyber-heading">Security at the</span><br />
              <span className="neon-text neon-glow">Speed of AI</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-12">
            Equip your team with the most advanced autonomous security assistant built for the modern 
            <span className="neon-text"> threat landscape</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/register"
              className="cyber-button bloom text-lg px-10 py-4 inline-flex items-center gap-3 relative group"
            >
              
              <span className="relative z-10">Get Started for Free</span>
              <ArrowRight size={20} className="relative z-10" />
            </Link>
            
            <Link 
              href="/contact"
              className="glass-panel px-10 py-4 rounded-xl text-lg font-semibold text-gray-300 hover:text-white border border-green-500/30 hover:border-green-500/50 transition-all duration-300 inline-flex items-center gap-3"
            >
              <Eye size={20} />
              <span>Request Demo</span>
            </Link>
          </div>
        </div>

        {/* Hexagonal Features Grid */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="cyber-heading">Advanced</span> <span className="neon-text">Security Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions powered by cutting-edge AI technology
            </p>
          </div>

          {/* Rectangular Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="rectangular-feature-card group relative">
                {/* Rectangular Background */}
                <div className="glass-card p-8 min-h-[280px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 border border-green-500/30 relative z-10 transition-colors duration-300 group-hover:border-green-500/50">
                    {feature.icon}
                  </div>

                  {/* Highlight Badge */}
                  <div className="glass-panel px-3 py-1 rounded-full text-xs font-semibold neon-text mb-4 border border-green-500/30 transition-colors duration-300 group-hover:border-green-500/50">
                    {feature.highlight}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-500/40 group-hover:border-green-500/70 transition-colors duration-300" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-500/40 group-hover:border-green-500/70 transition-colors duration-300" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-500/40 group-hover:border-green-500/70 transition-colors duration-300" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-500/40 group-hover:border-green-500/70 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-32 max-w-6xl mx-auto relative z-10">
          <div className="glass-panel p-12 md:p-16 text-center relative overflow-hidden rounded-3xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Animated Grid Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="cyber-heading">Ready to secure your</span><br />
                <span className="neon-text neon-glow">infrastructure?</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of security professionals using <span className="neon-text">KryptonSec AI</span> to stay ahead of threats 
                and protect their digital assets with cutting-edge technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/register"
                  className="cyber-button bloom text-xl px-12 py-5 inline-flex items-center gap-4 relative group"
                >
    
                  <span className="relative z-10">Get Started for Free</span>
                  <ArrowRight size={24} className="relative z-10" />
                </Link>
                
                <Link 
                  href="/contact"
                  className="glass-panel px-12 py-5 rounded-xl text-xl font-semibold text-gray-300 hover:text-white border border-green-500/30 hover:border-green-500/50 transition-all duration-300 inline-flex items-center gap-4"
                >
                  <Eye size={24} />
                  <span>Schedule Demo</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-green-500/20">
                <p className="text-sm text-gray-400 mb-4">Trusted by security teams worldwide</p>
                <div className="flex justify-center items-center gap-8 text-green-500/60">
                  <div className="flex items-center gap-2">
                    <Shield size={16} />
                    <span className="text-sm">SOC 2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={16} />
                    <span className="text-sm">End-to-End Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu size={16} />
                    <span className="text-sm">AI-Powered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
