"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowUpRight, Shield, Database } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      category: "How KryptonSecAI Works",
      icon: <FileText size={24} className="text-green-500" />,
      description: "Private platform overview for end users. No installation or deployment details are shared.",
      bullets: [
        "KryptonSecAI combines a curated knowledge base with live model reasoning.",
        "Your chat is enriched with relevant context before the model responds.",
        "Access is managed by account verification and subscription status.",
        "Admin and editor roles manage models and knowledge curation.",
      ],
    },
    {
      category: "Chatting with Krypton AI",
      icon: <Database size={24} className="text-blue-500" />,
      description: "Best practices for getting fast, reliable answers in the chat.",
      bullets: [
        "Choose a model from the selector before starting a session.",
        "State the goal, constraints, and expected output format upfront.",
        "Provide relevant inputs like logs, payloads, or code snippets.",
        "Use follow-up questions to refine depth or scope.",
      ],
    },
    {
      category: "Models & When to Use",
      icon: <Shield size={24} className="text-purple-500" />,
      description: "Use these exact model names when selecting in chat.",
      bullets: [
        "Krypton (deepseek/deepseek-r1-0528:free) for deep reasoning and step-by-step analysis.",
        "KrytonX (nvidia/nemotron-3-nano-30b-a3b:free) for fast summaries and structured answers.",
        "KryptonY (arcee-ai/trinity-mini:free) for quick brainstorming and idea exploration.",
        "Krypton-OSS (z-ai/glm-4.5-air:free) for concise responses and lightweight tasks.",
      ],
    },
    {
      category: "Prompting for Best Output",
      icon: <Shield size={24} className="text-green-500" />,
      description: "Clear prompts lead to higher quality responses and faster iteration.",
      bullets: [
        "Use a role and objective: “Act as a pentester, assess this endpoint.”",
        "Specify the depth: “Give a high-level summary” or “Provide detailed steps.”",
        "Ask for formats: “Return a checklist” or “Provide a JSON schema.”",
        "Share constraints: time limits, tooling, or environment restrictions.",
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
            Private user documentation for how to chat with KryptonSecAI effectively.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resources.map((section, idx) => (
            <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-lg">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{section.category}</h3>
              </div>
              <p className="text-gray-500 mb-6">{section.description}</p>
              <ul className="space-y-4">
                {section.bullets.map((item, i) => (
                  <li key={i}>
                    <div className="flex items-start justify-between gap-3 text-gray-400">
                      <span>{item}</span>
                      <ArrowUpRight size={16} className="text-green-500 mt-1 shrink-0" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Need tailored guidance?</h2>
              <p className="text-gray-400 text-lg">
                Ask in chat for the best workflow and prompt style for your use case.
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
