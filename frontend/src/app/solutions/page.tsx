"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionCard from "@/components/solusioncard";
import { Building2, User, GraduationCap, CheckCircle2 } from "lucide-react";

export default function Solutions() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <section className="container-custom mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Solutions for every team</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Whether you&apos;re a startup or an enterprise, KryptonSecAI scales with your security needs.
          </p>
        </section>

        <section className="container-custom grid md:grid-cols-3 gap-8">
          {/* Enterprise */}
          <SolutionCard>
            <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
              <Building2 className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
            <p className="text-gray-400 mb-6">
              Full-scale security orchestration for large organizations.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> SSO & SAML
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> Advanced Reporting
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> Dedicated Support
              </li>
            </ul>
            <Link href="/contact" className="button-secondary w-full">Contact Sales</Link>
          </SolutionCard>

          {/* Startups */}
          <SolutionCard>
            <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
              <User className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Startups</h3>
            <p className="text-gray-400 mb-6">
              Move fast and stay secure with automated scanning.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> CI/CD Integration
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> API Security
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> Slack Alerts
              </li>
            </ul>
            <Link href="/register" className="button-primary w-full">Start Free Trial</Link>
          </SolutionCard>

          {/* Education */}
          <SolutionCard>
            <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
            <p className="text-gray-400 mb-6">
              Learn cybersecurity with hands-on CTF challenges.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> Student Discounts
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> Custom Labs
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="text-green-500 mr-2" size={16} /> Progress Tracking
              </li>
            </ul>
            <Link href="/register" className="button-secondary w-full">Learn More</Link>
          </SolutionCard>
        </section>
      </main>
      <Footer />
    </div>
  );
}
