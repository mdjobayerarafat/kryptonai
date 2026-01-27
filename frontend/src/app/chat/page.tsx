"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, Shield, Terminal, Database, LogOut, 
  Plus, MessageSquare, User, Settings, ChevronRight,
  Copy, Check, Upload, X, Menu, Activity, Cpu, Zap
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// Matrix Digital Rain Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ background: 'transparent' }}
    />
  );
};

// Cyber Grid Background Component
const CyberGrid = () => {
  return <div className="cyber-grid-dashboard" />;
};

// Network Connections Component
const NetworkConnections = () => {
  const [connections, setConnections] = useState<Array<{id: number, x1: number, y1: number, x2: number, y2: number, delay: number}>>([]);

  useEffect(() => {
    const newConnections = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      delay: Math.random() * 4
    }));
    setConnections(newConnections);
  }, []);

  return (
    <div className="network-connections">
      <svg className="network-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map((conn) => (
          <line
            key={conn.id}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            className="network-connection-line"
            style={{ animationDelay: `${conn.delay}s` }}
          />
        ))}
        {connections.map((conn) => (
          <circle
            key={`node-${conn.id}`}
            cx={conn.x1}
            cy={conn.y1}
            r="0.2"
            className="network-node"
            style={{ animationDelay: `${conn.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// Floating Data Particles Component
const DataParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 6
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="data-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="data-particle"
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

// Scanning Lines Component
const ScanningLines = () => {
  return (
    <div className="scanning-lines">
      <div className="scan-line-horizontal scan-line-1" />
      <div className="scan-line-horizontal scan-line-2" />
      <div className="scan-line-vertical scan-line-3" />
    </div>
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "# System Ready\nHello! I am your **Krypton AI Assistant**. \n\nI can help you with:\n- 🚩 CTF Challenges\n- 🛡️ Vulnerability Analysis\n- 💻 Ethical Hacking Concepts\n\nHow can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [role, setRole] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile

  useEffect(() => {
    // Check screen size on mount and set sidebar
    if (window.innerWidth >= 768) {
        setSidebarOpen(true);
    }
  }, []);
  const [selectedModel, setSelectedModel] = useState("deepseek/deepseek-r1-0528:free");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [models, setModels] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const res = await axios.get(`${getApiBaseUrl()}/api/chat/history`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
    } catch (err) {
        console.error("Failed to fetch history", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);
    if (!token) {
        router.push("/login");
    }

    // Fetch models
    axios.get(`${getApiBaseUrl()}/api/models`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
            setModels(res.data);
            if (res.data.length > 0 && !res.data.find((m: any) => m.api_model_name === selectedModel)) {
                setSelectedModel(res.data[0].api_model_name);
            }
        })
        .catch(err => {
            if (err?.response?.status === 401) {
                router.push("/login");
            } else {
                console.error("Failed to fetch models", err);
            }
        });

    fetchHistory();
  }, [router]);

  const loadSession = async (id: string) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      setLoading(true);
      try {
          const res = await axios.get(`${getApiBaseUrl()}/api/chat/history/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          // Convert db messages to UI messages
          const uiMessages: Message[] = res.data.map((m: any) => ({
              role: m.role,
              content: m.content
          }));
          
          // Prepend system welcome if needed, or just rely on history
          // But usually we want the system greeting if history is empty? 
          // Actually if we load a session, we just show what's there.
          // Maybe prepend the greeting only if it's a new session.
          // For now, just set the messages.
          setMessages(uiMessages);
          setSessionId(id);
      } catch (err) {
          console.error("Failed to load session", err);
      } finally {
          setLoading(false);
      }
  };

  const startNewSession = () => {
      setMessages([
        {
          role: "assistant",
          content: "# System Ready\nHello! I am your **Krypton AI Assistant**. \n\nI can help you with:\n- 🚩 CTF Challenges\n- 🛡️ Vulnerability Analysis\n- 💻 Ethical Hacking Concepts\n\nHow can I assist you today?",
        },
      ]);
      setSessionId(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      router.push("/login");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/login");
        return;
    }

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${getApiBaseUrl()}/api/chat`, {
        message: userMsg.content,
        history: messages.filter(m => m.role !== "system"),
        model: selectedModel,
        session_id: sessionId,
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      const botMsg: Message = {
        role: "assistant",
        content: response.data.response,
      };
      setMessages((prev) => [...prev, botMsg]);

      if (response.data.session_id && response.data.session_id !== sessionId) {
          setSessionId(response.data.session_id);
          fetchHistory();
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      let errorMsg = "Sorry, I encountered an error connecting to the server.";
      
      if (error.response?.status === 401) {
          router.push("/login");
          return;
      }
      if (error.response?.status === 402) {
          errorMsg = "Subscription required to use the chat. Please [redeem a voucher](/profile) to activate your subscription.";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMsg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Custom Markdown Components
  const MarkdownComponents = {
    h1: ({node, ...props}: any) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 pb-2 border-b border-white/10" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-xl font-bold text-white mb-3 mt-5" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-lg font-bold text-green-400 mb-2 mt-4" {...props} />,
    p: ({node, ...props}: any) => <p className="text-gray-300 leading-7 mb-4" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1 text-gray-300" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 text-gray-300" {...props} />,
    a: ({node, ...props}: any) => <a className="text-green-400 hover:text-green-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-green-500/50 pl-4 py-1 my-4 bg-green-500/5 rounded-r italic text-gray-400" {...props} />,
    table: ({node, ...props}: any) => (
        <div className="overflow-x-auto my-4 border border-white/10 rounded-lg">
            <table className="w-full text-left border-collapse min-w-[500px]" {...props} />
        </div>
    ),
    thead: ({node, ...props}: any) => <thead className="bg-white/5" {...props} />,
    tbody: ({node, ...props}: any) => <tbody className="divide-y divide-white/5" {...props} />,
    tr: ({node, ...props}: any) => <tr className="hover:bg-white/5 transition-colors" {...props} />,
    th: ({node, ...props}: any) => <th className="px-4 py-3 text-sm font-semibold text-white border-r border-white/10 last:border-0 whitespace-nowrap" {...props} />,
    td: ({node, ...props}: any) => <td className="px-4 py-3 text-sm text-gray-300 border-r border-white/10 last:border-0" {...props} />,
    img: ({node, ...props}: any) => <img className="max-w-full h-auto rounded-lg border border-white/10 my-4" {...props} />,
    code: ({node, inline, className, children, ...props}: any) => {
        const [copied, setCopied] = useState(false);
        const codeContent = String(children).replace(/\n$/, '');
        
        const handleCopy = () => {
            navigator.clipboard.writeText(codeContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return !inline ? (
            <div className="relative group my-4 rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="text-xs flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
                <div className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-gray-300" {...props}>
                        {children}
                    </code>
                </div>
            </div>
        ) : (
            <code className="bg-white/10 text-green-300 px-1.5 py-0.5 rounded text-sm font-mono border border-white/5" {...props}>
                {children}
            </code>
        )
    }
  };

  return (
    <div className="flex h-screen bg-black text-gray-100 font-sans overflow-hidden relative">
      {/* Advanced Cyberpunk Background Effects */}
      <MatrixRain />
      <CyberGrid />
      <NetworkConnections />
      <DataParticles />
      <ScanningLines />

      {/* Enhanced Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-green-500/8 blur-[150px] rounded-full pointer-events-none z-1" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none z-1" />

      {/* Enhanced Sidebar with Neon Glow */}
      <aside className={`fixed inset-y-0 left-0 z-40 cyber-sidebar flex flex-col transition-all duration-300 transform md:relative md:translate-x-0 overflow-hidden ${sidebarOpen ? 'translate-x-0 w-[300px] md:w-80' : '-translate-x-full w-[300px] md:w-0'}`}>
        {/* Sidebar Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent blur-xl pointer-events-none" />
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-green-500/20 h-20 shrink-0">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="cyber-icon-container">
                <Terminal size={24} className="text-green-400 bloom" />
              </div>
              <span className="font-bold text-white tracking-tight whitespace-nowrap truncate text-lg">
                KryptonSec<span className="text-green-400">AI</span>
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden cyber-button-small">
              <X size={20} />
            </button>
          </div>

          {/* New Scan Button */}
          <div className="p-6">
            <button 
              onClick={startNewSession}
              className="cyber-button-primary w-full"
            >
              <Plus size={20} />
              <span>New Scan</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-6 space-y-2">
            <div className="text-xs font-medium text-green-400/60 px-3 uppercase tracking-wider mb-4">System Menu</div>
            
            <Link href="/profile" className="cyber-nav-item">
              <User size={20} />
              <span>Profile</span>
            </Link>
            
            {role === "admin" && (
              <Link href="/admin" className="cyber-nav-item">
                <Database size={20} />
                <span>Admin Panel</span>
              </Link>
            )}

            {role === "editor" && (
              <Link href="/admin" className="cyber-nav-item">
                <Upload size={20} />
                <span>Upload Knowledge</span>
              </Link>
            )}

            <div className="text-xs font-medium text-green-400/60 px-3 uppercase tracking-wider mt-8 mb-4">Session History</div>
            <div className="space-y-2">
              {history.map((session) => (
                <button 
                  key={session.id}
                  onClick={() => loadSession(session.id)}
                  className={`cyber-history-item ${
                    sessionId === session.id ? "active" : ""
                  }`}
                >
                  <MessageSquare size={18} />
                  <span className="truncate">{session.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="p-6 border-t border-green-500/20">
            <button onClick={handleLogout} className="cyber-logout-button">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full">
        {/* Enhanced Top Navigation */}
        <header className="h-20 border-b border-green-500/20 flex items-center justify-between px-6 cyber-header absolute top-0 w-full z-20">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cyber-button-small"
            >
              <Menu size={20} className="md:hidden" />
              <Settings size={20} className="hidden md:block" />
            </button>
            
            {/* Enhanced Model Selector */}
            <div className="relative max-w-[200px] md:max-w-xs">
              <button 
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="cyber-model-selector"
              >
                <div className="status-indicator" />
                <span className="text-sm font-medium text-gray-200 truncate">
                  {models.find(m => m.api_model_name === selectedModel)?.display_name || "Select Model"}
                </span>
                <ChevronRight size={16} className={`text-green-400 transform transition-transform shrink-0 ${showModelDropdown ? 'rotate-90' : ''}`} />
              </button>
              
              {showModelDropdown && (
                <div className="cyber-dropdown">
                  {models.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.api_model_name);
                        setShowModelDropdown(false);
                      }}
                      className={`cyber-dropdown-item ${
                        selectedModel === model.api_model_name ? 'active' : ''
                      }`}
                    >
                      <span>{model.display_name}</span>
                      {selectedModel === model.api_model_name && <Check size={16} className="text-green-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* System Status */}
          <div className="flex items-center space-x-4">
            <div className="cyber-status-panel">
              <Activity size={16} className="text-green-400" />
              <span className="text-sm font-mono text-green-400">ONLINE</span>
            </div>
          </div>
        </header>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto pt-28 pb-40 px-6 scroll-smooth relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-6 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Enhanced Avatar */}
                <div className={`cyber-avatar ${msg.role === "user" ? "user" : "assistant"}`}>
                  {msg.role === "user" ? <User size={20} /> : <Terminal size={20} />}
                </div>

                {/* Enhanced Content */}
                <div className={`flex-1 max-w-[90%] md:max-w-[85%] ${msg.role === "user" ? "text-right" : "min-w-0"}`}>
                  <div className={`inline-block text-left ${
                    msg.role === "user" 
                      ? "cyber-message-user" 
                      : "cyber-message-assistant"
                  }`}>
                    {msg.role === "user" ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <ReactMarkdown 
                        components={MarkdownComponents}
                        remarkPlugins={[remarkGfm]}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-6">
                <div className="cyber-avatar assistant">
                  <Terminal size={20} />
                </div>
                <div className="cyber-loading">
                  <div className="loading-dots">
                    <div className="loading-dot" style={{ animationDelay: '0ms' }} />
                    <div className="loading-dot" style={{ animationDelay: '150ms' }} />
                    <div className="loading-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Enhanced Input Area */}
        <div className="absolute bottom-0 w-full cyber-input-area">
          <div className="max-w-4xl mx-auto relative">
            <div className="cyber-input-container">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Analyze vulnerability, scan for threats..."
                className="cyber-textarea"
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="cyber-send-button"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs text-green-400/60 font-mono">
                KRYPTON AI • SECURE CHANNEL • VERIFY CRITICAL VULNERABILITIES MANUALLY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
