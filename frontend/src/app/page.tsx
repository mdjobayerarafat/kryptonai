"use client";
import Link from "next/link";
import Image from "next/image";
import { Terminal, Shield, Cpu, Fingerprint, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-tight">
            The future of <br />
            <span className="text-gray-500">cybersecurity</span> is
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white">
              <span className="flex items-center gap-2">
                <Fingerprint size={48} className="text-green-500 md:w-16 md:h-16" strokeWidth={1.5} />
                human
              </span>
              <span className="text-gray-600">+</span>
              <span className="flex items-center gap-2">
                <Sparkles size={48} className="text-green-500 md:w-16 md:h-16" strokeWidth={1.5} />
                AI
              </span>
            </div>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed pt-4">
            We help you map the vulnerabilities you need to find, track the skills you have, 
            and close your security gaps to thrive in a GenAI world.
          </p>

          <div className="pt-8 mb-16">
            <Link 
              href="/register"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-black border border-green-500/50 hover:border-green-400 text-white text-lg font-medium rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
            >
              <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/30 transition-colors" />
              <span className="relative z-10">Join The Community</span>
              <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Hero App Screenshot */}
          <div className="relative w-full max-w-5xl mx-auto rounded-xl border border-white/10 shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
             <div className="aspect-[16/9] bg-[#050505] relative flex items-center justify-center border-b border-white/5">
                <Image 
                    src="/hero-app.png" 
                    alt="KryptonSecAI Interface" 
                    width={1200} 
                    height={675} 
                    className="w-full h-full object-cover"
                    unoptimized
                />
             </div>
          </div>
        </div>

        {/* Feature Showcase Section */}
        <div className="w-full max-w-7xl mx-auto px-4 py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        <span className="text-green-500">Advanced</span> Profile Tracking
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Keep track of your security clearance, valid licenses, and role status. 
                        Redeem vouchers seamlessly to extend your access to advanced AI tools.
                    </p>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center gap-3">
                            <Shield className="text-green-500" size={20} />
                            <span>Real-time License Status</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Cpu className="text-green-500" size={20} />
                            <span>Role-based Access Control</span>
                        </li>
                    </ul>
                </div>
                <div className="relative rounded-xl border border-white/10 overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                     <Image 
                        src="/profile-showcase.png" 
                        alt="Profile Dashboard" 
                        width={800} 
                        height={600} 
                        className="w-full h-auto"
                        unoptimized
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
                <div className="order-2 md:order-1 relative rounded-xl border border-white/10 overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                     <Image 
                        src="/chat-analysis.png" 
                        alt="AI Analysis" 
                        width={800} 
                        height={600} 
                        className="w-full h-auto"
                        unoptimized
                    />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        <span className="text-green-500">AI-Powered</span> Vulnerability Analysis
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Interact with Krypton AI to analyze CTF challenges, understand complex vulnerabilities, 
                        and learn ethical hacking concepts in real-time.
                    </p>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center gap-3">
                            <Terminal className="text-green-500" size={20} />
                            <span>Context-aware responses</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Sparkles className="text-green-500" size={20} />
                            <span>Specialized Cybersecurity Knowledge</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Cards Section */}
        <div className="mt-32 w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Choose Your <span className="text-green-500">Adventure</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We build elite tech teams for companies and enhance candidates' tech skills and job prospects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: For Developers/Hackers */}
            <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-green-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full group-hover:bg-green-500/10 transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">For hackers</h3>
                  <p className="text-gray-400 mb-8">
                    Hone your ethical hacking skills and become GenAI-ready.
                  </p>
                  
                  <ul className="space-y-4 text-green-400/90 font-medium">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Track your CTF proficiency
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Prepare for red team interviews
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Learn the latest GenAI exploits
                    </li>
                  </ul>
                </div>

                <Link href="/register" className="inline-block w-full py-4 px-6 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-center transition-colors shadow-lg shadow-green-900/20">
                  Explore Hacker Community
                </Link>
              </div>

              {/* Decorative Code/UI Element */}
              <div className="absolute right-[-20px] bottom-20 w-48 opacity-20 group-hover:opacity-40 transition-opacity hidden md:block rotate-[-5deg]">
                 <div className="bg-gray-900 rounded-lg p-4 border border-green-500/30 font-mono text-xs text-green-400">
                    $ nmap -sC -sV<br/>
                    Starting Nmap...<br/>
                    Port 80/tcp open<br/>
                    Port 443/tcp open
                 </div>
              </div>
            </div>

            {/* Card 2: For Business/Researchers */}
            <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">For researchers</h3>
                  <p className="text-gray-400 mb-8">
                    Get your security research GenAI ready.
                  </p>
                  
                  <ul className="space-y-4 text-blue-400/90 font-medium">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Attract and hire the right talent
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Upskill your team with GenAI
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Build out your AI defense team
                    </li>
                  </ul>
                </div>

                <Link href="/register" className="inline-block w-full py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 font-bold rounded-lg text-center transition-colors">
                  Explore Research Hub
                </Link>
              </div>

               {/* Decorative Element */}
               <div className="absolute right-8 bottom-32 w-24 h-24 bg-gradient-to-tr from-blue-500 to-green-400 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
