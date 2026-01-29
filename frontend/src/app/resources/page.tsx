"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ChevronDown, ChevronRight, FileText, Book, Settings, Code, 
  Database, Shield, Users, Zap, MessageSquare, Cpu, Sparkles, 
  Lightbulb, Command, Terminal, Key, Search
} from "lucide-react";

// Sidebar Navigation Data
const navigationSections = [
  {
    title: "Platform Overview",
    icon: <Book size={16} />,
    items: [
      { title: "Welcome", href: "#welcome", active: true },
      { title: "Dashboard Tour", href: "#dashboard-tour" },
    ]
  },
  {
    title: "Chat & Models",
    icon: <MessageSquare size={16} />,
    items: [
      { title: "Starting a Chat", href: "#starting-chat" },
      { title: "Selecting Models", href: "#selecting-models" },
      { title: "Session History", href: "#session-history" },
    ]
  },
  {
    title: "Prompt Engineering",
    icon: <Sparkles size={16} />,
    items: [
      { title: "Prompting Basics", href: "#prompting-basics" },
      { title: "Cybersecurity Prompts", href: "#cyber-prompts" },
      { title: "Advanced Techniques", href: "#advanced-techniques" },
    ]
  },
  {
    title: "Features",
    icon: <Zap size={16} />,
    items: [
      { title: "RAG Knowledge Base", href: "#rag-knowledge" },
      { title: "Voucher System", href: "#voucher-system" },
    ]
  }
];

// Table of Contents Data
const tableOfContents = [
  { title: "Welcome", href: "#welcome" },
  { title: "Chat Interface", href: "#starting-chat" },
  { title: "Model Selection", href: "#selecting-models" },
  { title: "Prompting Guide", href: "#prompting-basics" },
  { title: "Advanced Tips", href: "#advanced-techniques" },
];

// Sidebar Component
const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Platform Overview", "Chat & Models", "Prompt Engineering"]);

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

// Prompt Block Component
const PromptBlock = ({ title, prompt, explanation }: { title?: string, prompt: string, explanation?: string }) => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg p-5 my-6">
      {title && <div className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">{title}</div>}
      <div className="bg-black/50 p-4 rounded border border-gray-800 font-mono text-sm text-gray-300 whitespace-pre-wrap mb-3">
        {prompt}
      </div>
      {explanation && <p className="text-sm text-gray-500 italic">{explanation}</p>}
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
                Master the art of AI-driven cybersecurity analysis with KryptonSecAI. 
                Learn how to effectively use our tools and craft high-impact prompts.
              </p>
            </div>

            {/* Dashboard Tour */}
            <section id="dashboard-tour" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Book className="text-green-500" size={28} />
                Dashboard Tour
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 hover:border-green-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="text-green-500" size={20} />
                    <h3 className="text-lg font-semibold text-white">Chat Interface</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    The central hub for your analysis. Interact with various AI models, upload files for context, and receive real-time security insights.
                  </p>
                </div>
                
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="text-blue-500" size={20} />
                    <h3 className="text-lg font-semibold text-white">Knowledge Base</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    KryptonSecAI has access to a curated database of cybersecurity knowledge, ensuring responses are grounded in verified security practices.
                  </p>
                </div>
              </div>
            </section>

            {/* Chat & Models */}
            <section id="starting-chat" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Using the Chat Interface</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The chat interface is designed for rapid security analysis. Here's how to get the most out of it:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Start a New Session</h3>
                    <p className="text-gray-400">Click the <span className="text-green-400 font-mono">+ New Scan</span> button to clear the context. Always start a new session when switching between unrelated tasks (e.g., moving from "Network Analysis" to "Code Review") to prevent the AI from getting confused by previous context.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold shrink-0">2</div>
                  <div id="selecting-models">
                    <h3 className="text-xl font-semibold text-white mb-2">Select the Right Model</h3>
                    <p className="text-gray-400 mb-4">Choose a model based on your specific task:</p>
                    <div className="grid gap-4">
                      <div className="border border-gray-800 rounded p-4 bg-gray-900/50">
                        <div className="font-bold text-white mb-1">DeepSeek-R1 (Recommended)</div>
                        <div className="text-sm text-gray-400">Best for: <span className="text-green-400">Logic, Code Analysis, Vulnerability Research</span>. This model excels at reasoning through complex security problems step-by-step.</div>
                      </div>
                      <div className="border border-gray-800 rounded p-4 bg-gray-900/50">
                        <div className="font-bold text-white mb-1">Llama 3 / Mistral</div>
                        <div className="text-sm text-gray-400">Best for: <span className="text-blue-400">General Explanations, Summaries, Reports</span>. Use these for faster, high-level overviews or writing executive summaries.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prompt Engineering Guide */}
            <section id="prompting-basics" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="text-purple-500" size={28} />
                Prompt Engineering for Security
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The quality of the AI's output depends heavily on how you phrase your request. In cybersecurity, precision is key.
              </p>

              <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-purple-400 mb-4">The Golden Rule: Context + Specificity + Role</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-2"><CheckCircle className="text-green-500 shrink-0" size={18} /> <strong>Context:</strong> Provide background (e.g., "I am analyzing a Python Flask app...").</li>
                  <li className="flex gap-2"><CheckCircle className="text-green-500 shrink-0" size={18} /> <strong>Specificity:</strong> Ask for exactly what you want (e.g., "Identify SQL injection vulnerabilities...").</li>
                  <li className="flex gap-2"><CheckCircle className="text-green-500 shrink-0" size={18} /> <strong>Role:</strong> Tell the AI who to be (e.g., "Act as a Senior Penetration Tester").</li>
                </ul>
              </div>

              <h3 id="cyber-prompts" className="text-xl font-semibold text-white mb-4 mt-8">Example Scenarios</h3>

              <div className="space-y-8">
                {/* Scenario 1 */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Scenario 1: Code Review</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="opacity-60">
                      <div className="text-xs uppercase text-red-400 font-bold mb-1">❌ Poor Prompt</div>
                      <div className="bg-red-950/20 border border-red-900/30 p-3 rounded text-sm">
                        "Is this code safe?"
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase text-green-400 font-bold mb-1">✅ Better Prompt</div>
                      <div className="bg-green-950/20 border border-green-900/30 p-3 rounded text-sm">
                        "Analyze the following Python snippet for OWASP Top 10 vulnerabilities, specifically focusing on Input Validation and SQL Injection. Explain how an attacker might exploit any findings."
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario 2 */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Scenario 2: Log Analysis</h4>
                  <PromptBlock 
                    title="Log Analysis Template"
                    prompt="Act as a SOC Analyst. Review the following Apache access logs. Identify any suspicious IP addresses attempting path traversal attacks (looking for '../' or '%2e%2e'). Summarize the timeline of the attack and recommend firewall rules to block them."
                    explanation="This prompt sets the role (SOC Analyst), defines the task (review logs), specifies the attack vector (path traversal), and requests specific outputs (timeline + rules)."
                  />
                </div>
              </div>
            </section>

            {/* Advanced Techniques */}
            <section id="advanced-techniques" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Advanced Techniques</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
                    <Terminal size={20} className="text-yellow-500" />
                    Chain-of-Thought Prompting
                  </h3>
                  <p className="text-gray-400 mb-3">
                    For complex logic, ask the AI to "think step-by-step". This forces the model to break down the problem, reducing hallucinations.
                  </p>
                  <PromptBlock 
                    prompt="I have a base64 encoded string that I suspect contains a hidden payload. Think step-by-step: 1) Decode the string, 2) Identify the file signature, 3) Analyze the metadata. Here is the string: ..."
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
                    <Shield size={20} className="text-blue-500" />
                    Adversarial Simulation
                  </h3>
                  <p className="text-gray-400 mb-3">
                    Use the AI to simulate an attacker's perspective to validate your defenses.
                  </p>
                  <PromptBlock 
                    prompt="You are a Red Team operator. I have implemented a rate-limiting mechanism on my login API (allows 5 attempts per minute per IP). Propose 3 distinct methods you would use to bypass this restriction."
                  />
                </div>
              </div>
            </section>

            <section id="rag-knowledge" className="mb-16">
               <h2 className="text-3xl font-bold text-white mb-6">RAG Knowledge Base</h2>
               <p className="text-gray-300 mb-4">
                 KryptonSecAI isn't just a chatbot; it's connected to a live knowledge base. When you ask questions, the system:
               </p>
               <ol className="list-decimal list-inside space-y-2 text-gray-400 ml-4">
                 <li>Semantically searches our internal vector database for relevant security documentation, CVEs, and threat reports.</li>
                 <li>Retrieves the most relevant "chunks" of information.</li>
                 <li>Feeds this context to the AI model alongside your question.</li>
               </ol>
               <p className="text-gray-300 mt-4">
                 <strong>Tip:</strong> You don't need to copy-paste public CVE details. Just ask "What are the mitigation steps for CVE-2023-xxxx?" and the system will likely retrieve the official data for you.
               </p>
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

function CheckCircle({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
