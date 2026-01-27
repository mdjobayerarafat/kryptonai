"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ChevronRight, Terminal, Activity, Cpu } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

// Cyber Grid Background Component
const CyberGrid = () => {
  return <div className="cyber-grid" />;
};

// Network Lines Component
const NetworkLines = () => {
  const [lines, setLines] = useState<Array<{id: number, top: string, left: string, width: string, delay: number}>>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${100 + Math.random() * 400}px`,
      delay: Math.random() * 5
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="network-lines">
      {lines.map((line) => (
        <div
          key={line.id}
          className="network-line"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            animationDelay: `${line.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Binary Rain Component
const BinaryRain = () => {
  const [binaryStrings, setBinaryStrings] = useState<Array<{id: number, left: string, delay: number, content: string}>>([]);

  useEffect(() => {
    const generateBinary = () => {
      return Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('');
    };

    const newBinaryStrings = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      content: generateBinary()
    }));
    setBinaryStrings(newBinaryStrings);
  }, []);

  return (
    <div className="binary-rain">
      {binaryStrings.map((binary) => (
        <div
          key={binary.id}
          className="binary-string"
          style={{
            left: binary.left,
            animationDelay: `${binary.delay}s`
          }}
        >
          {binary.content}
        </div>
      ))}
    </div>
  );
};

// HUD Elements Component
const HUDElements = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} AM +06`;
  };

  return (
    <>
      {/* Top Left HUD */}
      <div className="fixed top-6 left-6 z-10">
        <div className="glass-panel px-4 py-2 rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-green-400" />
            <span className="text-green-400 font-mono text-sm">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Top Right HUD */}
      <div className="fixed top-6 right-6 z-10">
        <div className="glass-panel px-4 py-2 rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-green-400" />
            <span className="text-green-400 font-mono text-sm">SECURE</span>
          </div>
        </div>
      </div>

      {/* Bottom Right Timestamp */}
      <div className="fixed bottom-6 right-6 z-10">
        <div className="glass-panel px-4 py-2 rounded-lg border border-green-500/30">
          <span className="text-green-400 font-mono text-sm">
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* Bottom Left System Info */}
      <div className="fixed bottom-6 left-6 z-10">
        <div className="glass-panel px-4 py-2 rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-green-400" />
            <span className="text-green-400 font-mono text-sm">AUTH MODULE</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);
      router.push("/chat");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-gray-100 font-sans selection:bg-green-500/30 selection:text-green-200 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <CyberGrid />
      <NetworkLines />
      <BinaryRain />
      
      {/* HUD Elements */}
      <HUDElements />

      {/* Enhanced Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Login Card with Neon Glow Border */}
      <div className="login-card relative z-20">
        {/* Card Content */}
        <div className="relative bg-black/90 backdrop-blur-xl p-10 rounded-3xl border border-green-500/30 w-full max-w-md">
          {/* Terminal Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-green-500/40">
                <ChevronRight size={32} className="text-green-400 bloom" />
              </div>
              <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-lg animate-pulse" />
            </div>
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-4xl font-bold mb-3 text-white text-center tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-center mb-10 text-lg">
            Enter your credentials to access the system.
          </p>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm text-center backdrop-blur-sm">
              {error}
            </div>
          )}
          
          {/* Email Verification Notice */}
          {error === "Email verification required" && (
            <div className="text-center text-sm text-gray-400 mb-6 glass-panel p-4 rounded-xl border border-green-500/20">
              Please verify your email. If you have a token link, open it on this host or paste the token on your Profile page.
              <br />
              <Link href="/verify" className="text-green-400 hover:text-green-300 underline mt-2 inline-block">
                Open verification page
              </Link>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Username</label>
              <div className="relative group">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors z-10" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/80 border border-gray-700 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all backdrop-blur-sm"
                  placeholder="Enter your username"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <div className="relative group">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors z-10" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/80 border border-gray-700 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Access System Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold p-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.7)] relative overflow-hidden group"
            >
              <span className="relative z-10 text-lg">Access System</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          {/* Create Account Link */}
          <p className="mt-8 text-center text-gray-400">
            New user?{" "}
            <Link 
              href="/register" 
              className="text-green-400 hover:text-green-300 font-medium hover:underline transition-colors"
            >
              Create an account
            </Link>
          </p>

          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse opacity-50" />
        </div>
      </div>
    </div>
  );
}
