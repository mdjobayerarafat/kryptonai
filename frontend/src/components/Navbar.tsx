"use client";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex items-center justify-between px-8 py-6 glass-panel sticky top-0 z-50 mx-4 mt-4 rounded-2xl">
      <Link href="/" className="flex items-center space-x-3 text-white hover:text-green-400 transition-colors cursor-pointer group">
        <div className="p-2 glass-panel rounded-xl group-hover:bg-green-500/20 transition-colors bloom">
          <Terminal size={24} className="neon-text" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          KryptonSec<span className="neon-text">AI</span>
        </span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
        <Link 
            href="/features" 
            className={`transition-colors px-4 py-2 rounded-lg ${isActive('/features') ? 'neon-text glass-panel' : 'text-gray-300 hover:text-green-400'}`}
        >
            Features
        </Link>
        <Link 
            href="/solutions" 
            className={`transition-colors px-4 py-2 rounded-lg ${isActive('/solutions') ? 'neon-text glass-panel' : 'text-gray-300 hover:text-green-400'}`}
        >
            Solutions
        </Link>
        <Link 
            href="/resources" 
            className={`transition-colors px-4 py-2 rounded-lg ${isActive('/resources') ? 'neon-text glass-panel' : 'text-gray-300 hover:text-green-400'}`}
        >
            Resources
        </Link>
        <Link 
            href="/pricing" 
            className={`transition-colors px-4 py-2 rounded-lg ${isActive('/pricing') ? 'neon-text glass-panel' : 'text-gray-300 hover:text-green-400'}`}
        >
            Pricing
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-green-400 transition-colors glass-panel px-4 py-2 rounded-lg">
          Log in
        </Link>
        <Link 
          href="/register" 
          className="cyber-button text-sm"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
