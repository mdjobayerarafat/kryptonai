"use client";
import Link from "next/link";
import Image from "next/image";
import { Terminal, Shield, Cpu, Fingerprint, Sparkles, ArrowRight, Zap, Code, Database, User, Brain, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8
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

// Waveform Component
const Waveform = () => {
  return (
    <div className="waveform">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
};

// Timestamp Component
const Timestamp = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')} ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <div className="timestamp bloom">
      {formatTime(time)}
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <CyberGrid />
      <NetworkLines />
      <ParticleField />
      <Timestamp />
      
      <Navbar />

      {/* Hero Section - Compact Layout */}
      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-16 px-4 relative z-20">
        {/* Reduced Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-green-500/15 via-cyan-500/8 to-transparent blur-[80px] rounded-full pointer-events-none" />
        
        {/* Reduced Background Glow for Cybersecurity Text */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-radial from-green-500/20 via-green-500/10 to-transparent blur-[60px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
          <div className="scanlines relative">
            {/* Enhanced Glitch Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse pointer-events-none" />
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] relative">
              <div className="mb-2">
                <span className="cyber-heading">The future of</span>
              </div>
              
              {/* Cybersecurity Text with Better Spacing */}
              <div className="mb-6">
                <span className="neon-text neon-glow">
                  cybersecurity
                </span> 
                <span className="cyber-heading"> is</span>
              </div>
              
              {/* Compact Human + AI Section */}
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-3 glass-panel px-6 py-4 rounded-xl relative group">
                  <User size={40} className="neon-text bloom relative z-10" strokeWidth={1.5} />
                  <span className="text-2xl md:text-3xl font-bold cyber-heading relative z-10">
                    human
                  </span>
                </div>
                
                <span className="text-3xl text-gray-400 neon-text">+</span>
                
                <div className="flex items-center gap-3 glass-panel px-6 py-4 rounded-xl relative group">
                  <Bot size={40} className="neon-text bloom relative z-10" strokeWidth={1.5} />
                  <span className="text-2xl md:text-3xl font-bold cyber-heading relative z-10">
                    AI
                  </span>
                </div>
              </div>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed px-4">
            We help you map the vulnerabilities you need to find, track the skills you have, 
            and close your security gaps to thrive in a <span className="neon-text">GenAI world</span>.
          </p>

          {/* Compact CTA Button */}
          <div className="pt-6 mb-12">
            <Link 
              href="/register"
              className="cyber-button bloom text-lg px-10 py-4 inline-flex items-center gap-3 relative group"
            >
              
              <span className="relative z-10">Join The Community</span>
              <ArrowRight size={20} className="relative z-10" />
            </Link>
          </div>

          {/* Enhanced Holographic Terminal Interface */}
          <div className="holo-card p-6 max-w-4xl mx-auto relative group">
            {/* Enhanced holographic glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-cyan-500/8 to-green-500/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700" />
            
            <div className="relative bg-black/80 backdrop-blur-xl border-2 border-green-500/40 rounded-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-3 border-b border-green-500/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="neon-text font-mono text-sm">KryptonSecAI Terminal v2.1.0</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-green-400 space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="neon-text text-base">SYSTEM READY</span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex">
                    <span className="text-green-300">krypton@ai:~$</span>
                    <span className="ml-2">&gt; Initializing neural network...</span>
                  </div>
                  <div className="text-green-300 ml-16">[✓] Neural pathways: ACTIVE</div>
                  <div className="text-green-300 ml-16">[✓] Threat intelligence: LOADED</div>
                  
                  <div className="flex">
                    <span className="text-green-300">krypton@ai:~$</span>
                    <span className="ml-2">&gt; Loading vulnerability database...</span>
                  </div>
                  <div className="text-green-300 ml-16">[✓] CVE Database: 247,891 entries</div>
                  <div className="text-green-300 ml-16">[✓] Zero-day signatures: UPDATED</div>
                  
                  <div className="flex">
                    <span className="text-green-300">krypton@ai:~$</span>
                    <span className="ml-2">&gt; AI vulnerability scanner: <span className="neon-text">ONLINE</span></span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-green-300">Status:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="w-1 h-3 bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <span className="neon-text">Ready for engagement</span>
                  </div>
                </div>
              </div>
              
              {/* Scanning line effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Feature Showcase Section */}
        <div className="w-full max-w-7xl mx-auto px-4 py-32 space-y-32">
          {/* Advanced Profile Tracking */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold">
                <span className="neon-text">Advanced</span><br />
                <span className="cyber-heading">Profile Tracking</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Keep track of your security clearance, valid licenses, and role status. 
                Redeem vouchers seamlessly to extend your access to advanced AI tools.
              </p>
              
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <Shield className="neon-text bloom" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Real-time License Status</h3>
                    <p className="text-gray-400">Continuous monitoring and validation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Database className="neon-text bloom" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Role-based Access Control</h3>
                    <p className="text-gray-400">Granular permission management</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hex-container">
              <div className="holo-card p-6">
                <Image 
                  src="/profile-showcase.png" 
                  alt="Profile Dashboard" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto rounded-xl"
                  unoptimized
                />
                <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="neon-text font-mono text-sm">AUTHENTICATED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Powered Vulnerability Analysis */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 hex-container">
              <div className="holo-card p-6">
                <Image 
                  src="/chat-analysis.png" 
                  alt="AI Analysis" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto rounded-xl"
                  unoptimized
                />
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-lg">
                  <div className="font-mono text-green-400 text-sm">
                    <div>&gt; Analyzing binary: exploit.exe</div>
                    <div>&gt; Vulnerability detected: <span className="neon-text">CVE-2024-1337</span></div>
                    <div>&gt; Generating countermeasures...</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold">
                <span className="neon-text">AI-Powered</span><br />
                <span className="cyber-heading">Vulnerability Analysis</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Interact with Krypton AI to analyze CTF challenges, understand complex vulnerabilities, 
                and learn ethical hacking concepts in real-time.
              </p>
              
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <Terminal className="neon-text bloom" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Context-aware Responses</h3>
                    <p className="text-gray-400">Intelligent threat analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Code className="neon-text bloom" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Specialized Knowledge</h3>
                    <p className="text-gray-400">Cybersecurity domain expertise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Choose Your Adventure Section */}
        <div className="w-full max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="cyber-heading">Choose Your</span> <span className="neon-text neon-glow">Adventure</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We build elite tech teams for companies and enhance candidates' tech skills and job prospects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Hackers Card */}
            <div className="glass-card p-12 group relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full group-hover:bg-green-500/20 transition-colors duration-500" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <Terminal className="neon-text bloom" size={48} />
                  <h3 className="text-4xl font-bold cyber-heading">For Hackers</h3>
                </div>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  Hone your ethical hacking skills and become GenAI-ready.
                </p>
                
                <div className="glass-panel p-6 rounded-xl font-mono text-green-400 text-sm space-y-2">
                  <div>&gt; nmap -sS -O target.com</div>
                  <div className="text-green-300 ml-4">22/tcp   open  ssh</div>
                  <div className="text-green-300 ml-4">80/tcp   open  http</div>
                  <div className="text-green-300 ml-4">443/tcp  open  https</div>
                  <div>&gt; metasploit -x "use exploit/multi/handler"</div>
                  <div className="text-green-300 ml-4">payload =&gt; windows/meterpreter/reverse_tcp</div>
                  <div>&gt; john --wordlist=rockyou.txt hashes.txt</div>
                  <div className="neon-text">[SUCCESS] Password cracked: admin123</div>
                </div>

                <Link href="/register" className="cyber-button w-full text-center block">
                  Explore Hacker Community
                </Link>
              </div>
            </div>

            {/* For Researchers Card */}
            <div className="glass-card p-12 group relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <Cpu className="neon-text bloom" size={48} />
                  <h3 className="text-4xl font-bold cyber-heading">For Researchers</h3>
                </div>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  Get your security research GenAI ready.
                </p>
                
                <div className="glass-panel p-6 rounded-xl space-y-4">
                  <div className="font-mono text-green-400 text-sm space-y-2">
                    <div>&gt; python3 ai_defense.py --model=gpt4</div>
                    <div className="text-green-300 ml-4">Loading threat intelligence...</div>
                    <div className="text-green-300 ml-4">ML Model: 99.7% accuracy</div>
                    <div>&gt; docker run --gpus all threat-hunter</div>
                    <div className="neon-text ml-4">Zero-day detection: ENABLED</div>
                  </div>
                  <Waveform />
                </div>

                <Link href="/register" className="cyber-button w-full text-center block">
                  Explore Research Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}