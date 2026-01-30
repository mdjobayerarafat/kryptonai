"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Terminal, ArrowRight, Mail } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${getApiBaseUrl()}/api/auth/register`, {
        username,
        fullname,
        email,
        password,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Username or email may be taken.");
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
          <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-gray-400">Join thousands of developers securing their apps</p>
        </div>

        <div className="card border-gray-800 bg-black">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-white/5 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="button-primary w-full h-10">
              Create Account <ArrowRight className="ml-2" size={16} />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
