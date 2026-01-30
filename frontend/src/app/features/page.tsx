"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/cards";
import { Shield, Target, Zap, Lock, Globe, Code } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Shield size={24} />,
      title: "Vulnerability Scanning",
      description: "Automated deep scanning of your codebase and infrastructure for over 100+ types of vulnerabilities."
    },
    {
      icon: <Target size={24} />,
      title: "CTF Challenges",
      description: "Practice your skills with real-world scenarios in a safe, sandboxed environment."
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Remediation",
      description: "Get AI-generated fix suggestions for every vulnerability found, tailored to your tech stack."
    },
    {
      icon: <Lock size={24} />,
      title: "Compliance Mapping",
      description: "Automatically map findings to SOC2, HIPAA, and GDPR controls to streamline audits."
    },
    {
      icon: <Globe size={24} />,
      title: "API Security",
      description: "Discover shadow APIs and secure your endpoints against abuse and data leakage."
    },
    {
      icon: <Code size={24} />,
      title: "IDE Integration",
      description: "Fix security issues as you code with our VS Code and JetBrains plugins."
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <section className="container-custom mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Features</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Everything you need to secure your modern application stack.
          </p>
        </section>

        <section className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
