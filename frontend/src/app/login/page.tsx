"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Terminal } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

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
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200 relative overflow-hidden animate-fade-in">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 w-full max-w-md relative z-10 shadow-2xl shadow-black/50">
        <div className="flex justify-center mb-6 text-green-500">
           <Terminal size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white text-center tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Enter your credentials to access the system.</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Username</label>
            <div className="relative group">
              <User size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-green-500 transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-2.5 pl-10 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-green-500 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-2.5 pl-10 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-black font-bold p-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_15px_-3px_rgba(22,163,74,0.4)]">
            Access System
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          New user? <Link href="/register" className="text-green-500 hover:text-green-400 font-medium hover:underline transition-colors">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
