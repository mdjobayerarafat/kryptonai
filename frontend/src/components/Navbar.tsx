"use client";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors cursor-pointer group">
        <div className="p-1 bg-green-500/10 rounded border border-green-500/20 group-hover:border-green-500/50 transition-colors">
          <Terminal size={20} className="text-green-500" />
        </div>
        <span className="text-lg font-bold tracking-tight">KryptonSec<span className="text-green-500">AI</span></span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
        <Link 
            href="/features" 
            className={`transition-colors ${isActive('/features') ? 'text-green-400' : 'hover:text-white'}`}
        >
            Features
        </Link>
        <Link 
            href="/solutions" 
            className={`transition-colors ${isActive('/solutions') ? 'text-green-400' : 'hover:text-white'}`}
        >
            Solutions
        </Link>
        <Link 
            href="/resources" 
            className={`transition-colors ${isActive('/resources') ? 'text-green-400' : 'hover:text-white'}`}
        >
            Resources
        </Link>
        <Link 
            href="/pricing" 
            className={`transition-colors ${isActive('/pricing') ? 'text-green-400' : 'hover:text-white'}`}
        >
            Pricing
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Log in
        </Link>
        <Link 
          href="/register" 
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black text-sm font-bold rounded transition-all shadow-[0_0_15px_-3px_rgba(22,163,74,0.4)] hover:shadow-[0_0_20px_-3px_rgba(22,163,74,0.6)]"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
