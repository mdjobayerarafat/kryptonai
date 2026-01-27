"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Target, Zap, Lock, Globe, Code, Cpu, Activity } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap size={24} className="text-green-500" />,
      title: "Real-time Vulnerability Analysis",
      description: "Instant feedback on your code security posture using advanced static analysis and AI reasoning."
    },
    {
      icon: <Target size={24} className="text-green-500" />,
      title: "Automated CTF Solutions",
      description: "Stuck on a flag? Get intelligent hints and step-by-step breakdowns without giving away the answer."
    },
    {
      icon: <Code size={24} className="text-green-500" />,
      title: "Secure Code Generation",
      description: "Generate secure-by-default code snippets for common patterns in Python, Rust, Go, and JavaScript."
    },
    {
      icon: <Globe size={24} className="text-green-500" />,
      title: "Threat Intelligence Feeds",
      description: "Stay ahead of 0-days with integrated threat feeds that contextualize current vulnerabilities."
    },
    {
      icon: <Lock size={24} className="text-green-500" />,
      title: "Role-Based Access Control",
      description: "Granular permission management for teams, ensuring data privacy and operational security."
    },
    {
      icon: <Cpu size={24} className="text-green-500" />,
      title: "Custom AI Models",
      description: "Switch between Krypton-OSS and DeepSeek models to find the perfect balance of speed and reasoning."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Security at the <span className="text-green-500">Speed of AI</span>
          </h1>
          <p className="text-xl text-gray-400">
            Equip your team with the most advanced autonomous security assistant built for the modern threat landscape.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-green-500/30 transition-all group hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)]">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 max-w-5xl mx-auto bg-gradient-to-r from-green-900/20 to-black border border-green-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to secure your infrastructure?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10">
                Join thousands of security professionals using KryptonSec AI to stay ahead of threats.
            </p>
            <a href="/register" className="relative z-10 inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-colors shadow-lg shadow-green-900/20">
                Get Started for Free
            </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
