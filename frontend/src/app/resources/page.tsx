"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, FileText, MessageSquare, Video } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      icon: <Book size={24} />,
      title: "Documentation",
      description: "Detailed guides on how to use KryptonSecAI, from installation to advanced configuration.",
      link: "/docs"
    },
    {
      icon: <FileText size={24} />,
      title: "Blog",
      description: "Latest insights on cybersecurity trends, vulnerability research, and product updates.",
      link: "/blog"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Community Forum",
      description: "Join the discussion, ask questions, and share your CTF write-ups with other users.",
      link: "/community"
    },
    {
      icon: <Video size={24} />,
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials on vulnerability scanning and remediation workflows.",
      link: "/tutorials"
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <section className="container-custom mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Resources</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn, grow, and secure your applications with our comprehensive resources.
          </p>
        </section>

        <section className="container-custom grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <Link href={resource.link} key={index} className="card group block hover:bg-white/5 transition-colors">
              <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors text-white">
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{resource.title}</h3>
              <p className="text-gray-400">
                {resource.description}
              </p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
