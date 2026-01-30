"use client";
import Link from "next/link";
import { Terminal, Shield, Brain, ArrowRight, Check, Code, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CyberCube from "@/components/cube";
import Card from "@/components/cards";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        {/* Hero Section */}
        <section className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-white"></span>
              <span className="text-sm text-gray-400">KryptonSec AI 2.0 is now live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in delay-100">
              Cybersecurity for <br />
              <span className="text-gray-500">developers.</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mb-10 animate-fade-in delay-200">
              The best way to secure your applications. 
              Automated vulnerability scanning, CTF challenges, and AI-driven security insights.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in delay-300">
              <Link href="/register" className="button-primary h-12 px-8 text-base">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/docs" className="button-secondary h-12 px-8 text-base">
                Documentation
              </Link>
            </div>

            {/* Visual Representation (Cyber Cube) */}
            <div className="mt-20 relative w-full max-w-5xl animate-fade-in delay-300 perspective-1000 flex justify-center items-center h-[400px]">
               <div className="relative z-10 scale-110 hover:scale-125 transition-transform duration-700 ease-in-out cursor-pointer">
                  <CyberCube />
               </div>
               {/* Ambient Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-white/10 blur-[50px] rounded-full pointer-events-none animate-pulse" />
            </div>
          </div>
        </section>

        {/* Chat Demo Section */}
        <section className="container-custom mt-32 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm text-gray-400">Interactive AI Assistant</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Solve CTFs with <span className="text-gray-500">AI Guidance</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get real-time assistance, vulnerability analysis, and step-by-step explanations for your security challenges.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl">
              {/* Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-mono">krypton_ai_session.log</div>
                <div className="w-12" /> {/* Spacer for centering */}
              </div>

              {/* Chat Interface */}
              <div className="p-6 space-y-6 font-mono text-sm">
                {/* User Message */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs text-gray-500">User</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200 inline-block border border-white/5">
                      I found a binary file in the /tmp directory. How do I analyze it?
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-black" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs text-gray-500">KryptonSecAI</div>
                    <div className="p-4 rounded-lg bg-white/10 text-gray-200 border border-white/5">
                      <p className="mb-3">You can use several tools to analyze the binary. Here's a quick workflow:</p>
                      
                      <div className="relative group my-3 rounded-lg overflow-hidden border border-white/10 bg-black/50">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/5">
                          <span className="text-xs text-gray-500">Bash</span>
                        </div>
                        <div className="p-3 overflow-x-auto">
                          <code className="text-green-400">
                            <span className="text-gray-500"># Check file type</span><br/>
                            file /tmp/binary<br/><br/>
                            <span className="text-gray-500"># Extract strings</span><br/>
                            strings /tmp/binary | head -n 10<br/><br/>
                            <span className="text-gray-500"># Disassemble</span><br/>
                            objdump -d /tmp/binary
                          </code>
                        </div>
                      </div>
                      
                      <p>Would you like me to scan it for common buffer overflow vulnerabilities?</p>
                    </div>
                  </div>
                </div>

                {/* User Message 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs text-gray-500">User</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200 inline-block border border-white/5">
                      Yes, scan it.
                    </div>
                  </div>
                </div>

                 {/* AI Response 2 */}
                 <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-black" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs text-gray-500">KryptonSecAI</div>
                    <div className="p-4 rounded-lg bg-white/10 text-gray-200 border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-green-400">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Scanning complete.
                      </div>
                      <p className="mb-2">Found potential buffer overflow vulnerability:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-2 pl-2">
                         <li>Function: <code className="bg-white/10 px-1 py-0.5 rounded text-xs">vuln_func()</code></li>
                         <li>Address: <code className="bg-white/10 px-1 py-0.5 rounded text-xs">0x080484b6</code></li>
                         <li>Risk: <span className="text-red-400">High</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input Area Mockup */}
               <div className="p-4 border-t border-white/5 bg-white/5">
                  <div className="flex gap-2 items-center bg-black/50 border border-white/10 rounded-lg px-4 py-3">
                     <span className="text-gray-500">$</span>
                     <div className="h-4 w-1.5 bg-green-500 animate-pulse" />
                  </div>
               </div>
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          </div>
        </section>

        {/* Feature Grid */}
        <section className="container-custom mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to secure your stack</h2>
            <p className="text-gray-400 text-lg">Comprehensive tools for modern security teams.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group cursor-pointer">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Vulnerability Scanner</h3>
              <p className="text-gray-400">
                Automated scanning for your codebase and infrastructure. Detect SQLi, XSS, and misconfigurations in real-time.
              </p>
            </Card>
            
            <Card className="group cursor-pointer">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Driven Insights</h3>
              <p className="text-gray-400">
                Leverage our RAG-powered AI to understand security reports and get actionable remediation steps.
              </p>
            </Card>
            
            <Card className="group cursor-pointer">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Terminal className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CTF Platform</h3>
              <p className="text-gray-400">
                Sharpen your skills with our built-in Capture The Flag challenges. Learn by doing in a safe environment.
              </p>
            </Card>

            <Card className="group cursor-pointer">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Code className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">API Security</h3>
              <p className="text-gray-400">
                Secure your API endpoints with automated testing and rate limiting analysis.
              </p>
            </Card>

            <Card className="group cursor-pointer">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Performance</h3>
              <p className="text-gray-400">
                Powered by Rust and accelerated by Redis for lightning-fast scans and report generation.
              </p>
            </Card>

            <Card className="group cursor-pointer">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Compliance Ready</h3>
              <p className="text-gray-400">
                Generate reports compliant with SOC2, GDPR, and ISO standards with a single click.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-custom mt-32 mb-16">
          <div className="card relative overflow-hidden text-center py-20 px-6">
             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to secure your future?</h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Join thousands of developers using KryptonSec to build safer applications today.
                </p>
                <Link href="/register" className="button-primary h-12 px-8 text-base">
                  Get Started for Free
                </Link>
             </div>
             
             {/* Abstract background for CTA */}
             <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-gray-500/20 to-white/10 blur-[100px] rounded-full" />
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
