"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronRight, FileText, Book, Settings, Code, Database, Shield, Users, Zap } from "lucide-react";

// Sidebar Navigation Data
const navigationSections = [
  {
    title: "Getting Started",
    icon: <Book size={16} />,
    items: [
      { title: "What is KryptonSecAI?", href: "#what-is-kryptonsecai", active: true },
      { title: "Quick Start Guide", href: "#quick-start" },
      { title: "Installation", href: "#installation" },
    ]
  },
  {
    title: "Project Structure",
    icon: <FileText size={16} />,
    items: [
      { title: "System Architecture", href: "#system-architecture" },
      { title: "RAG Pipeline", href: "#rag-pipeline" },
      { title: "Model Catalog", href: "#model-catalog" },
    ]
  },
  {
    title: "Configuration",
    icon: <Settings size={16} />,
    items: [
      { title: "Environment Setup", href: "#environment-setup" },
      { title: "Docker Deployment", href: "#docker-deployment" },
      { title: "Database Configuration", href: "#database-config" },
    ]
  },
  {
    title: "API Reference",
    icon: <Code size={16} />,
    items: [
      { title: "Authentication", href: "#authentication" },
      { title: "Chat Endpoints", href: "#chat-endpoints" },
      { title: "Document Management", href: "#document-management" },
    ]
  },
  {
    title: "User Management",
    icon: <Users size={16} />,
    items: [
      { title: "Admin Roles", href: "#admin-roles" },
      { title: "Voucher System", href: "#voucher-system" },
      { title: "Access Control", href: "#access-control" },
    ]
  }
];

// Table of Contents Data
const tableOfContents = [
  { title: "Overview", href: "#overview" },
  { title: "Key Features", href: "#key-features" },
  { title: "Architecture", href: "#architecture" },
  { title: "Getting Started", href: "#getting-started" },
  { title: "Configuration", href: "#configuration" },
  { title: "Deployment", href: "#deployment" },
];

// Sidebar Component
const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting Started"]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-gray-800 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <FileText size={20} className="text-green-500" />
          Documentation
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
  const [activeSection, setActiveSection] = useState("#overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
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
    <div className="w-64 bg-[#0a0a0a] border-l border-gray-800 h-screen sticky top-0 overflow-y-auto">
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

// Code Block Component
const CodeBlock = ({ children, language = "bash" }: { children: string, language?: string }) => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg p-4 my-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{language}</span>
      </div>
      <pre className="text-sm text-gray-300 overflow-x-auto">
        <code>{children}</code>
      </pre>
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
        <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
          <div className="prose prose-invert max-w-none">
            {/* Page Header */}
            <div className="mb-12">
              <h1 id="overview" className="text-5xl font-bold text-white mb-4 tracking-tight">
                What is KryptonSecAI?
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                A comprehensive AI-powered cybersecurity platform designed for security teams, 
                researchers, and educational institutions.
              </p>
            </div>

            {/* Key Features Section */}
            <section id="key-features" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap className="text-green-500" size={28} />
                Key Features
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="text-green-500" size={20} />
                    <h3 className="text-lg font-semibold text-white">Knowledge-Driven Answers</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    RAG-powered responses grounded in your internal documents and curated security context.
                  </p>
                </div>
                
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="text-blue-500" size={20} />
                    <h3 className="text-lg font-semibold text-white">Model Control</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Choose from OpenRouter models, activate what you need, and keep outputs consistent.
                  </p>
                </div>
              </div>
            </section>

            {/* Architecture Section */}
            <section id="architecture" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">System Architecture</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                KryptonSecAI follows a modern microservices architecture with the following components:
              </p>
              
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Frontend:</strong> Next.js application with Tailwind CSS</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Backend:</strong> Rust-based API server with Axum framework</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Database:</strong> PostgreSQL with pgvector for embeddings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">AI Models:</strong> Integration with OpenRouter API</span>
                </li>
              </ul>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Follow these steps to set up KryptonSecAI in your local development environment.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
              <ul className="space-y-2 mb-6 text-gray-300">
                <li>• Docker and Docker Compose</li>
                <li>• Node.js 18+ and npm</li>
                <li>• Rust 1.70+ (for backend development)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">Installation</h3>
              <CodeBlock language="bash">
{`# Clone the repository
git clone https://github.com/your-org/kryptonsecai.git
cd kryptonsecai

# Start the services
docker-compose up -d

# Install frontend dependencies
cd frontend
npm install
npm run dev`}
              </CodeBlock>
            </section>

            {/* Configuration Section */}
            <section id="configuration" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Configuration</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Configure your environment variables and settings for optimal performance.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Environment Variables</h3>
              <CodeBlock language="env">
{`# Backend Configuration
DATABASE_URL=postgres://krypton:password@localhost:5432/krypton_db
OPENROUTER_API_KEY=your_openrouter_api_key
RUST_LOG=info
PORT=8080

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080`}
              </CodeBlock>
            </section>

            {/* Deployment Section */}
            <section id="deployment" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Deployment</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Deploy KryptonSecAI to production using Docker containers.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white font-bold">i</span>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Production Deployment</h4>
                    <p className="text-gray-300 text-sm">
                      Make sure to update your environment variables and secure your database 
                      before deploying to production.
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock language="bash">
{`# Build and deploy with Docker
docker-compose -f docker-compose.prod.yml up -d

# Check service status
docker-compose ps`}
              </CodeBlock>
            </section>

            <hr className="border-gray-800 my-12" />

            {/* Footer Navigation */}
            <div className="flex justify-between items-center pt-8">
              <div>
                <p className="text-sm text-gray-500">
                  Last updated: January 2025
                </p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                  Edit this page →
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