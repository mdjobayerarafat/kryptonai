"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, User, GraduationCap, CheckCircle2, ArrowRight, Shield, Cpu, Database, Terminal, Eye, Zap, Activity, BarChart3, Search, Flag, Laptop, Satellite, BarChart, Settings, Brain } from "lucide-react";
import { useEffect, useState } from "react";

// Cyber Grid Background Component
const CyberGrid = () => {
  return <div className="cyber-grid" />;
};

// Network Lines Component
const NetworkLines = () => {
  const [lines, setLines] = useState<Array<{id: number, top: string, left: string, width: string, delay: number}>>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${150 + Math.random() * 400}px`,
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
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
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

// HUD Dashboard Component
const HUDDashboard = ({ type, className = "" }: { type: 'teams' | 'ctf' | 'academy', className?: string }) => {
  const dashboardContent = {
    teams: {
      title: "SECURITY OPERATIONS",
      metrics: [
        { label: "Active Threats", value: "247", color: "text-red-400" },
        { label: "Vulnerabilities", value: "1,432", color: "text-yellow-400" },
        { label: "Incidents", value: "89", color: "text-green-400" },
        { label: "Response Time", value: "2.3s", color: "text-cyan-400" }
      ]
    },
    ctf: {
      title: "CTF TRAINING HUB",
      metrics: [
        { label: "Challenges", value: "156", color: "text-green-400" },
        { label: "Solved", value: "89", color: "text-cyan-400" },
        { label: "Points", value: "12,450", color: "text-yellow-400" },
        { label: "Rank", value: "#23", color: "text-purple-400" }
      ]
    },
    academy: {
      title: "LEARNING ANALYTICS",
      metrics: [
        { label: "Students", value: "342", color: "text-purple-400" },
        { label: "Courses", value: "28", color: "text-cyan-400" },
        { label: "Completion", value: "87%", color: "text-green-400" },
        { label: "Avg Score", value: "94.2", color: "text-yellow-400" }
      ]
    }
  };

  const data = dashboardContent[type];

  return (
    <div className={`hud-dashboard glass-card p-6 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} className="border border-green-500/20" />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-mono neon-text tracking-wider">{data.title}</h3>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {data.metrics.map((metric, i) => (
            <div key={i} className="glass-panel p-3 rounded-lg border border-green-500/20">
              <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-xs text-gray-400 font-mono">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="relative z-10 h-20 flex items-end gap-1">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-green-500/60 to-cyan-500/40 rounded-sm animate-pulse"
            style={{
              height: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Scanning Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
    </div>
  );
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <CyberGrid />
      <NetworkLines />
      <ParticleField />
      
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 relative z-20">
        {/* Enhanced Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-gradient-radial from-green-500/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-24 relative z-10">
          <div className="scanlines relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse pointer-events-none" />
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="cyber-heading">KryptonSecAI</span><br />
              <span className="neon-text neon-glow">Solutions</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            A practical AI security platform with <span className="neon-text">role-based access</span>, 
            model control, and knowledge-driven guidance.
          </p>
        </div>

        {/* Feature Cards Section */}
        <div className="max-w-7xl mx-auto mb-32 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Knowledge-Driven Answers */}
            <div className="glass-card p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/30 relative z-10">
                <Search size={32} className="neon-text bloom" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Real-time Vulnerability Analysis</h3>
              <p className="text-gray-400 relative z-10 leading-relaxed">
                RAG-powered responses grounded in your internal documents and curated security context.
              </p>

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-500/40 group-hover:border-green-500/80 transition-colors duration-300" />
            </div>

            {/* Model Control */}
            <div className="glass-card p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/30 relative z-10">
                <Flag size={32} className="text-cyan-400 bloom" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Automated CTF Solutions</h3>
              <p className="text-gray-400 relative z-10 leading-relaxed">
                Choose from OpenRouter models, activate what you need, and keep outputs consistent.
              </p>

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/40 group-hover:border-cyan-500/80 transition-colors duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/40 group-hover:border-cyan-500/80 transition-colors duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/40 group-hover:border-cyan-500/80 transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/40 group-hover:border-cyan-500/80 transition-colors duration-300" />
            </div>

            {/* Access & History */}
            <div className="glass-card p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/30 relative z-10">
                <Laptop size={32} className="text-purple-400 bloom" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Secure Code Generation</h3>
              <p className="text-gray-400 relative z-10 leading-relaxed">
                Manage users, roles, vouchers, and chat sessions with a clean admin workflow.
              </p>

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-500/40 group-hover:border-purple-500/80 transition-colors duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-500/40 group-hover:border-purple-500/80 transition-colors duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-500/40 group-hover:border-purple-500/80 transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-500/40 group-hover:border-purple-500/80 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Solutions Sections */}
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          {/* For Security Teams */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <Building2 size={40} className="text-blue-400 bloom" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="cyber-heading">For Security</span><br />
                <span className="text-blue-400">Teams</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Centralize security knowledge, manage access, and keep investigations organized.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Role-based access for admins and editors",
                  "Model catalog with active controls", 
                  "Session history for audits and continuity",
                  "Voucher-based access management"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300">
                    <CheckCircle2 size={24} className="text-blue-400 bloom flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="/register"
                className="cyber-button text-lg px-8 py-4 inline-flex items-center gap-3 relative group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
              >
               
                <span className="relative z-10">Get Team Access</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="relative">
              <HUDDashboard type="teams" className="min-h-[400px]" />
            </div>
          </div>

          {/* For Hackers & Researchers */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <HUDDashboard type="ctf" className="min-h-[400px]" />
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-green-500/30">
                <Terminal size={40} className="neon-text bloom" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="cyber-heading">For Hackers &</span><br />
                <span className="neon-text">Researchers</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Train with an ethical assistant that explains vulnerabilities and guides solutions.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Structured CTF guidance and reasoning",
                  "Model selection per session",
                  "Knowledge-base context injection", 
                  "Upload JSON documents for fast indexing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300">
                    <CheckCircle2 size={24} className="neon-text bloom flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="/register"
                className="cyber-button bloom text-lg px-8 py-4 inline-flex items-center gap-3 relative group"
              >
              
                <span className="relative z-10">Start a Session</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* For Education */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                <GraduationCap size={40} className="text-purple-400 bloom" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="cyber-heading">For</span><br />
                <span className="text-purple-400">Education</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Give learners a safe, consistent AI mentor with reproducible context and history.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Ethical guardrails baked into the system prompt",
                  "Reusable knowledge sets for classes",
                  "Session history for review and grading",
                  "Multi-model comparison for learning"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300">
                    <CheckCircle2 size={24} className="text-purple-400 bloom flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="/register"
                className="cyber-button text-lg px-8 py-4 inline-flex items-center gap-3 relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              >
                
                <span className="relative z-10">Launch a Cohort</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="relative">
              <HUDDashboard type="academy" className="min-h-[400px]" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
