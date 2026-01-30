"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ChevronDown, ChevronRight, FileText, Book, Settings, Code, 
  Database, Shield, Users, Zap, MessageSquare, Cpu, Sparkles, 
  Lightbulb, Command, Terminal, Key, Search, X, Check
} from "lucide-react";

// Sidebar Navigation Data
const navigationSections = [
  {
    title: "Platform Overview",
    icon: <Book size={16} />,
    items: [
      { title: "Welcome", href: "#welcome", active: true },
      { title: "KryptonSecAI Features", href: "#features" },
    ]
  },
  {
    title: "Chat & Models",
    icon: <MessageSquare size={16} />,
    items: [
      { title: "Model Selection", href: "#selecting-models" },
      { title: "Prompt Engineering", href: "#prompt-engineering" },
      { title: "Session Management", href: "#session-history" },
    ]
  },
  {
    title: "Voucher System",
    icon: <Key size={16} />,
    items: [
      { title: "Activating Vouchers", href: "#vouchers" },
    ]
  },
  {
    title: "Security & RAG",
    icon: <Shield size={16} />,
    items: [
      { title: "Knowledge Base", href: "#rag-knowledge" },
    ]
  }
];

// Table of Contents Data
const tableOfContents = [
  { title: "Welcome", href: "#welcome" },
  { title: "Features", href: "#features" },
  { title: "Model Selection", href: "#selecting-models" },
  { title: "Prompt Guide", href: "#prompt-engineering" },
  { title: "Voucher System", href: "#vouchers" },
  { title: "RAG Knowledge", href: "#rag-knowledge" },
];

// Sidebar Component
const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Platform Overview", "Chat & Models", "Voucher System"]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <div className="hidden lg:block w-64 bg-[#0a0a0a] border-r border-gray-800 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <FileText size={20} className="text-green-500" />
          User Guide
        </h2>
        
        <nav className="space-y-2">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                {expandedSections.includes(section.title) ? 
                  <ChevronDown size={16} /> : 
                  <ChevronRight size={16} />
                }
              </button>
              
              {expandedSections.includes(section.title) && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className={`block p-2 text-sm rounded-lg transition-colors ${
                        item.active 
                          ? 'text-green-400 bg-green-500/10 border-l-2 border-green-500' 
                          : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Table of Contents Component
const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("#welcome");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hidden xl:block w-64 bg-[#0a0a0a] border-l border-gray-800 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          On This Page
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block text-sm py-1 transition-colors ${
                activeSection === item.href
                  ? 'text-green-400 font-medium'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
      <Navbar />
      
      <div className="flex pt-16">
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-12">
          <div className="prose prose-invert max-w-none">
            {/* Page Header */}
            <div className="mb-12">
              <h1 id="welcome" className="text-5xl font-bold text-white mb-4 tracking-tight">
                Documentation & Resources
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Welcome to KryptonSecAI. This guide will help you understand the core features and how to use our platform for advanced cybersecurity analysis.
              </p>
            </div>

            {/* Core Features */}
            <section id="features" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap className="text-green-500" size={28} />
                KryptonSecAI Features
              </h2>
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Security Analysis</h3>
                  <p className="text-gray-400">Leverage state-of-the-art Large Language Models specialized for cybersecurity tasks, from code auditing to threat intelligence.</p>
                </div>
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">RAG Knowledge Base</h3>
                  <p className="text-gray-400">Our Retrieval-Augmented Generation (RAG) system ensures the AI has access to up-to-date vulnerability databases, security whitepapers, and CTF writeups.</p>
                </div>
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Real-time Scanning</h3>
                  <p className="text-gray-400">Integrated tools for scanning source code and web endpoints, with findings explained in natural language by our AI.</p>
                </div>
              </div>
            </section>

            {/* Model Selection */}
            <section id="selecting-models" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Model Selection</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Choose the best model for your specific security task:
              </p>
              <div className="grid gap-4">
                <div className="border border-gray-800 rounded p-4 bg-gray-900/50">
                  <div className="font-bold text-white mb-1">Krypton (Standard)</div>
                  <div className="text-sm text-gray-400">Optimized for general cybersecurity queries, educational concepts, and basic CTF challenges. Fast and reliable for everyday tasks.</div>
                </div>
                <div className="border border-gray-800 rounded p-4 bg-gray-900/50">
                  <div className="font-bold text-white mb-1">KryptonX (Advanced)</div>
                  <div className="text-sm text-gray-400">High-performance model designed for complex vulnerability analysis, reverse engineering, and deep-dive forensic investigations. Recommended for advanced users.</div>
                </div>
              </div>
            </section>

            {/* Prompt Engineering Guide */}
            <section id="prompt-engineering" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="text-purple-500" size={28} />
                Prompt Engineering Guide
              </h2>
              <p className="text-gray-300 mb-6">
                To get the best results from KryptonSecAI, structuring your prompts effectively is key. Here are some best practices:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <X size={20} /> Bad Prompt
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-black/30 p-3 rounded text-sm text-gray-400 font-mono">
                      "Help me hack this website."
                    </div>
                    <p className="text-sm text-gray-500">
                      ❌ Too vague and potentially unethical. The AI will likely refuse or give a generic refusal.
                    </p>
                    <div className="bg-black/30 p-3 rounded text-sm text-gray-400 font-mono">
                      "What is XSS?"
                    </div>
                    <p className="text-sm text-gray-500">
                      ❌ Too simple. You'll get a dictionary definition without practical context.
                    </p>
                  </div>
                </div>

                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                    <Check size={20} /> Good Prompt
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-black/30 p-3 rounded text-sm text-gray-300 font-mono">
                      "I'm analyzing a login form that reflects user input in the error message without sanitization. How can I test for Reflected XSS safely? Provide a payload example."
                    </div>
                    <p className="text-sm text-gray-500">
                      ✅ Specific context, technical details, and clear goal.
                    </p>
                    <div className="bg-black/30 p-3 rounded text-sm text-gray-300 font-mono">
                      "Explain the difference between RSA and AES encryption in the context of securing a REST API, and recommend which to use for payload encryption."
                    </div>
                    <p className="text-sm text-gray-500">
                      ✅ Clear comparison request with a specific use case.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Voucher System */}
            <section id="vouchers" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Key className="text-yellow-500" size={28} />
                Voucher System
              </h2>
              <p className="text-gray-300 mb-6">To access premium models and advanced scanning features, you can activate a voucher:</p>
              <ol className="list-decimal list-inside space-y-4 text-gray-400 ml-4">
                <li>Navigate to the <span className="text-white">Pricing</span> page.</li>
                <li>Enter your unique voucher code in the input field.</li>
                <li>Click <span className="text-white font-bold">Redeem</span> to activate your subscription.</li>
                <li>Once activated, you will have immediate access to all platform features.</li>
              </ol>
            </section>

            {/* RAG Knowledge */}
            <section id="rag-knowledge" className="mb-16">
               <h2 className="text-3xl font-bold text-white mb-6">Retrieval-Augmented Generation (RAG)</h2>
               <p className="text-gray-300 mb-4">
                 KryptonSecAI utilizes a vector database to provide context-aware responses. This allows the AI to:
               </p>
               <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                 <li>Reference specific CVE details without manual input.</li>
                 <li>Suggest remediation steps based on official security standards.</li>
                 <li>Stay updated with the latest threat intelligence.</li>
               </ul>
            </section>

            <hr className="border-gray-800 my-12" />

            {/* Footer Navigation */}
            <div className="flex justify-between items-center pt-8">
              <div>
                <p className="text-sm text-gray-500">
                  Last updated: January 2026
                </p>
              </div>
              <div className="flex gap-4">
                <a href="/chat" className="text-sm text-green-400 hover:text-green-300 transition-colors font-medium">
                  Go to Chat →
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  );
}
