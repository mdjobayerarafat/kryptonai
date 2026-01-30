"use client";
import Link from "next/link";
import { Terminal, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 h-16">
      <div className="container-custom h-full flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
          <Terminal size={20} />
          <span className="font-semibold tracking-tight">KryptonSecAI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className={`nav-link ${isActive('/features') ? 'text-white' : ''}`}>Features</Link>
          <Link href="/solutions" className={`nav-link ${isActive('/solutions') ? 'text-white' : ''}`}>Solutions</Link>
          <Link href="/resources" className={`nav-link ${isActive('/resources') ? 'text-white' : ''}`}>Resources</Link>
          <Link href="/pricing" className={`nav-link ${isActive('/pricing') ? 'text-white' : ''}`}>Pricing</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Link href="/chat" className="button-primary h-8 px-4 text-sm flex items-center gap-2">
              <MessageSquare size={16} />
              Chat
            </Link>
          ) : (
            <>
              <Link href="/login" className="nav-link">Log in</Link>
              <Link href="/register" className="button-primary h-8 px-4 text-sm">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
