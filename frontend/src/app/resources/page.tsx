"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowUpRight, Shield, Database } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Project Documents",
      icon: <FileText size={24} className="text-green-500" />,
      items: [
        { title: "System Architecture Overview", link: "#" },
        { title: "RAG Pipeline & Knowledge Base", link: "#" },
        { title: "Model Catalog & Selection Flow", link: "#" },
        { title: "Voucher Access & Subscription Logic", link: "#" },
        { title: "Admin Roles & Permissions", link: "#" },
        { title: "Docker Deployment Guide", link: "#" },
      ],
    },
    {
      category: "API & Data",
      icon: <Database size={24} className="text-blue-500" />,
      items: [
        { title: "Chat API Endpoints", link: "#" },
        { title: "Document Upload Format", link: "#" },
        { title: "Model Management Endpoints", link: "#" },
        { title: "Voucher Create & Redeem", link: "#" },
      ],
    },
    {
      category: "Security Playbooks",
      icon: <Shield size={24} className="text-purple-500" />,
      items: [
        { title: "CTF Guidance Standards", link: "#" },
        { title: "Ethical Guardrails & Refusal Policy", link: "#" },
        { title: "Incident Response Workflow", link: "#" },
        { title: "Knowledge Base Curation", link: "#" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            KryptonSecAI <span className="text-green-500">Resources</span>
          </h1>
          <p className="text-xl text-gray-400">
            Project documents, API references, and operational playbooks tailored to the platform.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {resources.map((section, idx) => (
            <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-lg">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{section.category}</h3>
              </div>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href={item.link} className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors">
                      <span>{item.title}</span>
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Need a custom document?</h2>
              <p className="text-gray-400 text-lg">
                Share your requirements and we can prepare a dedicated guide for your team’s workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/register" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-colors">
                Request Access
              </a>
              <a href="/chat" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-colors">
                Ask Krypton AI
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
