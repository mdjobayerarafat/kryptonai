import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Terms of Service
        </h1>
        <div className="space-y-8 text-gray-300">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the KryptonSecAI website and platform operated by KryptonSecAI ("us", "we", or "our").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Responsible Use & Ethical Guidelines</h2>
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <p className="font-bold text-red-400 mb-2">Warning: Ethical Use Policy</p>
              <p>
                KryptonSecAI is a tool designed for educational purposes, security research, and defensive cybersecurity. You agree NOT to use this platform for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Illegal hacking, unauthorized access, or cyberattacks against systems you do not own or have explicit permission to test.</li>
                <li>Generating malicious code, malware, or ransomware.</li>
                <li>Harassment, doxxing, or any form of digital abuse.</li>
              </ul>
              <p className="mt-2">
                Violation of this policy will result in immediate account termination and may be reported to relevant authorities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Accounts</h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of KryptonSecAI and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p className="mt-2">
              KryptonSecAI is not responsible for any damage or legal consequences caused by the use or misuse of the information or tools provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:{" "}
              <a href="mailto:legal@kryptonsecai.com" className="text-blue-400 hover:underline">
                legal@kryptonsecai.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
