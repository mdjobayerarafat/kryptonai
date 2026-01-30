"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Terminal, ArrowRight, Mail, X } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${getApiBaseUrl()}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      router.push("/chat");
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Invalid username or password";
      if (errorMsg === "Email verification required") {
         setShowVerifyModal(true);
      } else {
         setError(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-white hover:opacity-80 transition-opacity mb-8">
            <Terminal size={24} />
            <span className="font-semibold text-xl tracking-tight">KryptonSecAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <div className="card border-gray-800 bg-black">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="button-primary w-full h-10">
              Sign In <ArrowRight className="ml-2" size={16} />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-white hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Verification Required Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-scale-up">
            <button 
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
                <Mail size={32} className="text-blue-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                We've sent a verification link to your email address. Please verify your account to log in.
              </p>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 w-full text-left">
                <p className="text-yellow-400 text-sm font-medium mb-1">⚠️ Can't find the email?</p>
                <p className="text-gray-400 text-xs">
                  Please check your <strong>Spam</strong> or <strong>Junk</strong> folder. Sometimes automated emails can end up there.
                </p>
              </div>
              
              <button 
                onClick={() => setShowVerifyModal(false)}
                className="button-primary w-full"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
