"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, User, GraduationCap, CheckCircle2, ArrowRight, Shield, Cpu } from "lucide-react";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            KryptonSecAI <span className="text-green-500">Solutions</span>
          </h1>
          <p className="text-xl text-gray-400">
            A practical AI security platform with role-based access, model control, and knowledge-driven guidance.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 border border-green-500/20">
                <Shield size={24} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Knowledge-Driven Answers</h3>
              <p className="text-gray-400">
                RAG-powered responses grounded in your internal documents and curated security context.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Cpu size={24} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Model Control</h3>
              <p className="text-gray-400">
                Choose from OpenRouter models, activate what you need, and keep outputs consistent.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
                <User size={24} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Access & History</h3>
              <p className="text-gray-400">
                Manage users, roles, vouchers, and chat sessions with a clean admin workflow.
              </p>
            </div>
          </div>

          <div className="space-y-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                  <Building2 size={32} className="text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">For Security Teams</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Centralize security knowledge, manage access, and keep investigations organized.
                </p>
                <ul className="space-y-4 mb-8">
                  {["Role-based access for admins and editors", "Model catalog with active controls", "Session history for audits and continuity", "Voucher-based access management"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 size={20} className="text-blue-500" />
                          {item}
                      </li>
                  ))}
                </ul>
                <a href="/register" className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2 group">
                  Get Team Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="order-1 md:order-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
                  <div className="relative z-10 text-center">
                      <span className="text-6xl font-bold text-white/10">TEAMS</span>
                  </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/5 blur-3xl" />
                  <div className="relative z-10 text-center">
                      <span className="text-6xl font-bold text-white/10">CTF</span>
                  </div>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 border border-green-500/20">
                  <User size={32} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">For Hackers & Researchers</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Train with an ethical assistant that explains vulnerabilities and guides solutions.
                </p>
                 <ul className="space-y-4 mb-8">
                  {["Structured CTF guidance and reasoning", "Model selection per session", "Knowledge-base context injection", "Upload JSON documents for fast indexing"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 size={20} className="text-green-500" />
                          {item}
                      </li>
                  ))}
                </ul>
                <a href="/register" className="text-green-400 hover:text-green-300 font-bold flex items-center gap-2 group">
                  Start a Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

             <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                  <GraduationCap size={32} className="text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">For Education</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Give learners a safe, consistent AI mentor with reproducible context and history.
                </p>
                 <ul className="space-y-4 mb-8">
                  {["Ethical guardrails baked into the system prompt", "Reusable knowledge sets for classes", "Session history for review and grading", "Multi-model comparison for learning"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 size={20} className="text-purple-500" />
                          {item}
                      </li>
                  ))}
                </ul>
                <a href="/register" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-2 group">
                  Launch a Cohort <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
               <div className="order-1 md:order-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500/5 blur-3xl" />
                  <div className="relative z-10 text-center">
                      <span className="text-6xl font-bold text-white/10">ACADEMY</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
