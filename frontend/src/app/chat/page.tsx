"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, Shield, Terminal, Database, LogOut, 
  Plus, MessageSquare, User, Settings, ChevronRight,
  Copy, Check, Upload, X, Menu
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

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
    axios.get(`${getApiBaseUrl()}/api/models`)
        .then(res => {
            setModels(res.data);
            // If currently selected model is not in the list (and list is not empty), select the first one
            if (res.data.length > 0 && !res.data.find((m: any) => m.api_model_name === selectedModel)) {
                setSelectedModel(res.data[0].api_model_name);
            }
        })
        .catch(err => console.error("Failed to fetch models", err));

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
    <div className="flex h-screen bg-black text-gray-300 font-sans overflow-hidden relative">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 transform md:relative md:translate-x-0 overflow-hidden ${sidebarOpen ? 'translate-x-0 w-[280px] md:w-64' : '-translate-x-full w-[280px] md:w-0'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/5 h-16 shrink-0">
            <div className="flex items-center space-x-3 overflow-hidden">
                <div className="bg-green-500/10 p-1.5 rounded border border-green-500/20 shrink-0">
                    <Terminal size={20} className="text-green-500" />
                </div>
                <span className="font-bold text-white tracking-tight whitespace-nowrap truncate">KryptonSec<span className="text-green-500">AI</span></span>
            </div>
            {/* Mobile Close Button */}
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white shrink-0 ml-2">
                <X size={20} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <button 
                onClick={startNewSession}
                className="w-full flex items-center space-x-3 p-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all mb-6"
            >
                <Plus size={18} />
                <span>New Scan</span>
            </button>

            <div className="text-xs font-medium text-gray-600 px-3 uppercase tracking-wider mb-2">Menu</div>
            
            <Link href="/profile" className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                <User size={18} />
                <span>Profile</span>
            </Link>
            
            {role === "admin" && (
                <Link href="/admin" className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Database size={18} />
                    <span>Admin Panel</span>
                </Link>
            )}

            {role === "editor" && (
                <Link href="/admin" className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Upload size={18} />
                    <span>Upload Knowledge</span>
                </Link>
            )}

            <div className="text-xs font-medium text-gray-600 px-3 uppercase tracking-wider mt-6 mb-2">History</div>
            <div className="space-y-1">
                {history.map((session) => (
                    <button 
                        key={session.id}
                        onClick={() => loadSession(session.id)}
                        className={`w-full flex items-center space-x-3 p-2.5 rounded-lg text-sm text-left transition-colors group ${
                            sessionId === session.id 
                                ? "bg-white/10 text-white" 
                                : "hover:bg-white/5 text-gray-400 hover:text-white"
                        }`}
                    >
                        <MessageSquare size={16} className={`transition-colors ${
                            sessionId === session.id ? "text-green-500" : "text-gray-600 group-hover:text-green-500"
                        }`} />
                        <span className="truncate">{session.title}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="p-4 border-t border-white/5">
            <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-500 hover:text-red-400 transition-colors w-full p-2">
                <LogOut size={18} />
                <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full">
        {/* Top Navigation */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-black/50 backdrop-blur-md absolute top-0 w-full z-10">
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    <Menu size={20} className="md:hidden" />
                    <Settings size={20} className="hidden md:block" />
                </button>
                
                <div className="relative max-w-[180px] md:max-w-xs">
                    <button 
                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                        className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:bg-white/10 transition-colors w-full"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse shrink-0" />
                        <span className="text-sm font-medium text-gray-300 truncate">
                            {models.find(m => m.api_model_name === selectedModel)?.display_name || "Select Model"}
                        </span>
                        <ChevronRight size={14} className={`text-gray-500 transform transition-transform shrink-0 ${showModelDropdown ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {showModelDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                            {models.map(model => (
                                <button
                                    key={model.id}
                                    onClick={() => {
                                        setSelectedModel(model.api_model_name);
                                        setShowModelDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${
                                        selectedModel === model.api_model_name ? 'text-green-500 bg-green-500/5' : 'text-gray-400'
                                    }`}
                                >
                                    <span>{model.display_name}</span>
                                    {selectedModel === model.api_model_name && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {/* Right side actions if needed */}
            </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 scroll-smooth">
            <div className="max-w-3xl mx-auto space-y-8">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                            msg.role === "user" 
                                ? "bg-white/10 text-gray-300" 
                                : "bg-green-500/10 text-green-500 border border-green-500/20"
                        }`}>
                            {msg.role === "user" ? <User size={16} /> : <Terminal size={16} />}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 max-w-[95%] md:max-w-[85%] ${msg.role === "user" ? "text-right" : "min-w-0"}`}>
                            <div className={`inline-block text-left ${
                                msg.role === "user" 
                                    ? "bg-[#1a1a1a] text-gray-200 px-5 py-3 rounded-2xl rounded-tr-sm border border-white/5 max-w-full break-words" 
                                    : "text-gray-300 w-full break-words"
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
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Terminal size={16} />
                        </div>
                        <div className="flex items-center space-x-1.5 mt-2.5">
                            <div className="w-1.5 h-1.5 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black to-transparent pb-8 pt-10 px-4">
            <div className="max-w-3xl mx-auto relative group">
                <div className="absolute inset-0 bg-green-500/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 flex items-end shadow-2xl">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder="Analyze vulnerability..."
                        className="flex-1 bg-transparent border-none text-gray-200 placeholder-gray-600 focus:ring-0 resize-none p-3 min-h-[50px] max-h-[200px] outline-none font-sans"
                        rows={1}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="p-3 bg-green-600 hover:bg-green-500 text-black rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed m-1"
                    >
                        <Send size={18} className="font-bold" />
                    </button>
                </div>
                <div className="text-center mt-3">
                    <p className="text-xs text-gray-600">
                        Krypton AI can make mistakes. Verify critical vulnerabilities manually.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}