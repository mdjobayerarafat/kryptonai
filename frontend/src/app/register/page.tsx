"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, UserPlus, Mail, BadgeInfo, Terminal, Activity, Cpu, ChevronRight } from "lucide-react";

import { getApiBaseUrl } from "@/lib/api";

// Cyber Grid Background Component
const CyberGrid = () => {
  return <div className="cyber-grid" />;
};

// Network Lines Component
const NetworkLines = () => {
  const [lines, setLines] = useState<Array<{id: number, top: string, left: string, width: string, delay: number}>>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 20 }, (_, i) => ({
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
      return Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0').join('');
    };

    const newBinaryStrings = Array.from({ length: 30 }, (_, i) => ({
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

// Hexagonal Grid Component
const HexagonalGrid = () => {
  const [hexagons, setHexagons] = useState<Array<{id: number, x: number, y: number, delay: number, size: number}>>([]);

  useEffect(() => {
    const newHexagons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      size: 40 + Math.random() * 60
    }));
    setHexagons(newHexagons);
  }, []);

  return (
    <div className="hexagonal-grid">
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="hex-shape"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: `${hex.size}px`,
            height: `${hex.size}px`,
            animationDelay: `${hex.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Data Stream Component
const DataStreams = () => {
  const [streams, setStreams] = useState<Array<{id: number, data: string, left: string, delay: number, speed: number}>>([]);

  useEffect(() => {
    const dataTypes = [
      "ENCRYPT", "DECRYPT", "HASH", "TOKEN", "AUTH", "SECURE", "VERIFY", "ACCESS",
      "0x4A2F", "0x8B1C", "0x9E3D", "0x7F2A", "SHA256", "AES128", "RSA2048"
    ];

    const newStreams = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      data: dataTypes[Math.floor(Math.random() * dataTypes.length)],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 6,
      speed: 8 + Math.random() * 4
    }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="data-streams">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="data-stream"
          style={{
            left: stream.left,
            animationDelay: `${stream.delay}s`,
            animationDuration: `${stream.speed}s`
          }}
        >
          {stream.data}
        </div>
      ))}
    </div>
  );
};

// Neural Network Component
const NeuralNetwork = () => {
  const [nodes, setNodes] = useState<Array<{id: number, x: number, y: number, connections: number[]}>>([]);

  useEffect(() => {
    const newNodes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        Math.floor(Math.random() * 15)
      ).filter(conn => conn !== i)
    }));
    setNodes(newNodes);
  }, []);

  return (
    <div className="neural-network">
      <svg className="neural-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connections */}
        {nodes.map((node) =>
          node.connections.map((connId, idx) => {
            const connNode = nodes[connId];
            if (!connNode) return null;
            return (
              <line
                key={`${node.id}-${connId}-${idx}`}
                x1={node.x}
                y1={node.y}
                x2={connNode.x}
                y2={connNode.y}
                className="neural-connection"
                style={{ animationDelay: `${Math.random() * 4}s` }}
              />
            );
          })
        )}
        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.3"
            className="neural-node"
            style={{ animationDelay: `${Math.random() * 3}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// Quantum Particles Component
const QuantumParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="quantum-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="quantum-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// Holographic Scanlines Component
const HolographicScanlines = () => {
  return (
    <div className="holographic-scanlines">
      <div className="scan-line scan-line-1" />
      <div className="scan-line scan-line-2" />
      <div className="scan-line scan-line-3" />
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
            <span className="text-green-400 font-mono text-sm">REGISTRATION</span>
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
            <span className="text-green-400 font-mono text-sm">USER MODULE</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [verifyLink, setVerifyLink] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [verifyMsg, setVerifyMsg] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setVerifyMsg("");
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/auth/register`, {
        username,
        fullname,
        email,
        password,
      });
      setSuccessMsg(res.data?.message || "Registration successful. Please verify your email.");
      const link = res.data?.verify_link || "";
      setVerifyLink(link);
      const tokenMatch = link.match(/token=([^&]+)/);
      if (tokenMatch?.[1]) {
        setVerifyToken(tokenMatch[1]);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyMsg("");
    setError("");
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/auth/verify`, { token: verifyToken });
      setVerifyMsg(res.data?.message || "Email verified successfully");
    } catch (err: any) {
      setError(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-gray-100 font-sans selection:bg-green-500/30 selection:text-green-200 relative overflow-hidden">
      {/* Advanced Cyberpunk Background Effects */}
      <CyberGrid />
      <NetworkLines />
      <BinaryRain />
      <HexagonalGrid />
      <DataStreams />
      <NeuralNetwork />
      <QuantumParticles />
      <HolographicScanlines />
      
      {/* HUD Elements */}
      <HUDElements />

      {/* Enhanced Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Register Card with Neon Glow Border */}
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
            Create Account
          </h1>
          <p className="text-gray-400 text-center mb-10 text-lg">
            Join the elite cybersecurity community.
          </p>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm text-center backdrop-blur-sm">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 text-sm text-center backdrop-blur-sm">
              {successMsg}
            </div>
          )}
          {verifyMsg && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 text-sm text-center backdrop-blur-sm">
              {verifyMsg}
            </div>
          )}
          
          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
              <div className="relative group">
                <BadgeInfo size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors z-10" />
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-black/80 border border-gray-700 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all backdrop-blur-sm"
                  placeholder="John Doe"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <div className="relative group">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/80 border border-gray-700 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all backdrop-blur-sm"
                  placeholder="john@example.com"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

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
                  placeholder="johndoe123"
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

            {/* Register Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold p-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.7)] relative overflow-hidden group"
            >
              <span className="relative z-10 text-lg">Register</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          {/* Email Verification Section */}
          {verifyLink && (
            <div className="mt-8 glass-panel p-6 rounded-xl border border-green-500/20">
              <p className="text-sm text-gray-400 mb-4 text-center">
                Use this token to verify your email or open the link in a new tab.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={verifyToken}
                  onChange={(e) => setVerifyToken(e.target.value)}
                  className="w-full bg-black/80 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all font-mono text-sm backdrop-blur-sm"
                  placeholder="Verification token"
                />
                <button
                  onClick={handleVerify}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold p-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)]"
                >
                  Verify Email
                </button>
                <a
                  href={`${getApiBaseUrl()}${verifyLink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-xs text-green-400 hover:text-green-300 underline text-center break-all"
                >
                  {getApiBaseUrl()}{verifyLink}
                </a>
              </div>
            </div>
          )}

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-green-400 hover:text-green-300 font-medium hover:underline transition-colors"
            >
              Login here
            </Link>
          </p>

          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse opacity-50" />
        </div>
      </div>
    </div>
  );
}
