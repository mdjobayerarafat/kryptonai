"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, Terminal, Database, LogOut, 
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

interface Model {
  id: string;
  api_model_name: string;
  display_name: string;
}

interface HistoryItem {
  id: string;
  title: string;
}

interface ChatHistoryMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

// Matrix Digital Rain Component - Removed for clean aesthetic
// Cyber Grid Background Component - Removed for clean aesthetic
// Network Connections Component - Removed for clean aesthetic
// Floating Data Particles Component - Removed for clean aesthetic
// Scanning Lines Component - Removed for clean aesthetic


// Type for Markdown components to avoid explicit any
type MarkdownProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & { node?: any };

// Code Block Component with Copy Feature
const CodeBlock = ({ node: _node, inline, className, children, ...props }: MarkdownProps<'code'> & { inline?: boolean }) => {
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
              <span className="text-xs text-gray-500 font-mono">Code</span>
              <button 
                  onClick={handleCopy}
                  className="text-xs flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
              >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
              </button>
          </div>
          <div className="p-4 overflow-x-auto">
              <code className={`text-sm font-mono text-gray-300 ${className || ''}`} {...props}>
                  {children}
              </code>
          </div>
      </div>
  ) : (
      <code className={`bg-white/10 text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono border border-white/5 ${className || ''}`} {...props}>
          {children}
      </code>
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "# System Ready\nHello! I am your **KryptonSecAI**. \n\nI can help you with:\n- 🚩 CTF Challenges\n- 🛡️ Vulnerability Analysis\n- 💻 Ethical Hacking Concepts\n\nHow can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [role, setRole] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile

  useEffect(() => {
    // Check screen size on mount and set sidebar
    if (window.innerWidth >= 768) {
        setSidebarOpen(true);
    }
  }, []);
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.0-flash-exp:free");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const res = await axios.get<HistoryItem[]>(`${getApiBaseUrl()}/api/chat/history`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (Array.isArray(res.data)) {
            setHistory(res.data);
        } else {
            console.error("Invalid history data received:", res.data);
            setHistory([]);
        }
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
    axios.get<Model[]>(`${getApiBaseUrl()}/api/models`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
            if (Array.isArray(res.data)) {
                setModels(res.data);
                if (res.data.length > 0 && !res.data.find(m => m.api_model_name === selectedModel)) {
                    setSelectedModel(res.data[0].api_model_name);
                }
            } else {
                console.error("Invalid models data received:", res.data);
                setModels([]);
            }
        })
        .catch(err => {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                router.push("/login");
            } else {
                console.error("Failed to fetch models", err);
            }
        });

    fetchHistory();
  }, [router, selectedModel]); // Added selectedModel to dependencies because it's used in the effect

  const loadSession = async (id: string) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      setLoading(true);
      try {
          const res = await axios.get<ChatHistoryMessage[]>(`${getApiBaseUrl()}/api/chat/history/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          // Convert db messages to UI messages
          const uiMessages: Message[] = Array.isArray(res.data) ? res.data.map((m) => ({
              role: m.role,
              content: m.content
          })) : [];
          
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

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
    } catch (error) {
      console.error("Error sending message:", error);
      let errorMsg = "Sorry, I encountered an error connecting to the server.";
      
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
            errorMsg = error.response.data.error;
            if (error.response.data.details) {
                errorMsg += `: ${error.response.data.details}`;
            }
        }

        if (error.response?.status === 401) {
            router.push("/login");
            return;
        }
        if (error.response?.status === 402) {
            errorMsg = "Subscription required to use the chat. Please [redeem a voucher](/profile) to activate your subscription.";
        }
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
  const MarkdownComponents = useMemo(() => ({
    h1: ({ node: _node, ...props }: MarkdownProps<'h1'>) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 pb-2 border-b border-white/10" {...props} />,
    h2: ({ node: _node, ...props }: MarkdownProps<'h2'>) => <h2 className="text-xl font-bold text-white mb-3 mt-5" {...props} />,
    h3: ({ node: _node, ...props }: MarkdownProps<'h3'>) => <h3 className="text-lg font-bold text-white mb-2 mt-4" {...props} />,
    p: ({ node: _node, ...props }: MarkdownProps<'p'>) => <p className="text-gray-300 leading-7 mb-4" {...props} />,
    ul: ({ node: _node, ...props }: MarkdownProps<'ul'>) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1 text-gray-300" {...props} />,
    ol: ({ node: _node, ...props }: MarkdownProps<'ol'>) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 text-gray-300" {...props} />,
    a: ({ node: _node, ...props }: MarkdownProps<'a'>) => <a className="text-white hover:text-gray-300 underline underline-offset-2 decoration-white/30 hover:decoration-white/60 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
    blockquote: ({ node: _node, ...props }: MarkdownProps<'blockquote'>) => <blockquote className="border-l-4 border-white/20 pl-4 py-1 my-4 bg-white/5 rounded-r italic text-gray-400" {...props} />,
    table: ({ node: _node, ...props }: MarkdownProps<'table'>) => (
        <div className="overflow-x-auto my-4 border border-white/10 rounded-lg">
            <table className="w-full text-left border-collapse min-w-[500px]" {...props} />
        </div>
    ),
    thead: ({ node: _node, ...props }: MarkdownProps<'thead'>) => <thead className="bg-white/5" {...props} />,
    tbody: ({ node: _node, ...props }: MarkdownProps<'tbody'>) => <tbody className="divide-y divide-white/5" {...props} />,
    tr: ({ node: _node, ...props }: MarkdownProps<'tr'>) => <tr className="hover:bg-white/5 transition-colors" {...props} />,
    th: ({ node: _node, ...props }: MarkdownProps<'th'>) => <th className="px-4 py-3 text-sm font-semibold text-white border-r border-white/10 last:border-0 whitespace-nowrap" {...props} />,
    td: ({ node: _node, ...props }: MarkdownProps<'td'>) => <td className="px-4 py-3 text-sm text-gray-300 border-r border-white/10 last:border-0" {...props} />,
    img: ({ node: _node, ...props }: MarkdownProps<'img'>) => (
      <Image 
        src={(props.src as string) || ""} 
        alt={props.alt || "Content image"} 
        className="max-w-full h-auto rounded-lg border border-white/10 my-4"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    code: CodeBlock
  }), []);

  return (
    <div className="flex h-screen h-[100dvh] bg-black text-gray-100 font-sans overflow-hidden relative">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 transform md:relative md:translate-x-0 overflow-hidden border-r border-white/10 bg-black ${sidebarOpen ? 'translate-x-0 w-[300px] md:w-80' : '-translate-x-full w-[300px] md:w-0'}`}>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-white/10 h-20 shrink-0">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-black">
                <Terminal size={18} />
              </div>
              <span className="font-bold text-white tracking-tight whitespace-nowrap truncate text-lg">
                KryptonSec AI
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* New Scan Button */}
          <div className="p-6">
            <button 
              onClick={startNewSession}
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 transition-colors h-10 rounded-full font-medium text-sm"
            >
              <Plus size={16} />
              <span>New Scan</span>
            </button>
            
            {/* Admin Link - Only visible to admins */}
            {role === 'admin' && (
                <Link href="/admin" className="w-full flex items-center justify-center gap-2 mt-3 bg-white/10 text-white hover:bg-white/20 transition-colors h-10 rounded-full font-medium text-sm border border-white/10">
                    <Settings size={16} />
                    <span>Admin Console</span>
                </Link>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-6 space-y-2">
            <div className="text-xs font-medium text-gray-500 px-3 uppercase tracking-wider mb-4">System Menu</div>
            
            <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <User size={18} />
              <span>Profile</span>
            </Link>
            
            {role === "admin" && (
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Database size={18} />
                <span>Admin Panel</span>
              </Link>
            )}

            {role === "editor" && (
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Upload size={18} />
                <span>Upload Knowledge</span>
              </Link>
            )}

            <div className="text-xs font-medium text-gray-500 px-3 uppercase tracking-wider mt-8 mb-4">Session History</div>
            <div className="space-y-2">
              {history.map((session) => (
                <button 
                  key={session.id}
                  onClick={() => loadSession(session.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left ${
                  sessionId === session.id ? "bg-white/10 text-white" : ""
                }`}
              >
                <MessageSquare size={16} />
                <span className="truncate">{session.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-black">
        {/* Top Navigation */}
        <header className="h-14 flex items-center justify-between px-4 md:px-6 absolute top-0 w-full z-20 bg-black/50 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={20} className="md:hidden" />
              <Settings size={20} className="hidden md:block" />
            </button>
            
            {/* Model Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors"
              >
                <span className="truncate max-w-[150px]">
                  {models.find(m => m.api_model_name === selectedModel)?.display_name || "Select Model"}
                </span>
                <ChevronRight size={14} className={`text-gray-500 transform transition-transform ${showModelDropdown ? 'rotate-90' : ''}`} />
              </button>
              
              {showModelDropdown && (
                <div className="absolute top-full mt-2 left-0 w-64 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  {models.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.api_model_name);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                        selectedModel === model.api_model_name ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
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
          
          {/* System Status - Minimal */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto pt-20 pb-32 px-4 md:px-0 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                  <Terminal size={24} className="text-gray-400" />
                </div>
                <p>How can I help you today?</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar */}
                {msg.role !== "user" && (
                  <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shrink-0 mt-1">
                    <Terminal size={16} />
                  </div>
                )}

                {/* Content */}
                <div className={`max-w-[85%] ${msg.role === "user" ? "text-right" : "min-w-0"}`}>
                  <div className={`inline-block text-left ${
                    msg.role === "user" 
                      ? "bg-[#222] text-white px-4 py-3 rounded-2xl rounded-tr-sm" 
                      : "text-gray-200 py-2"
                  }`}>
                    {msg.role === "user" ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl">
                        <ReactMarkdown 
                          components={MarkdownComponents}
                          remarkPlugins={[remarkGfm]}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shrink-0 mt-1">
                  <Terminal size={16} />
                </div>
                <div className="py-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full p-4 md:p-6 bg-gradient-to-t from-black via-black to-transparent z-30">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/20 transition-colors shadow-lg shadow-black/50">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Message KryptonSec AI..."
                className="w-full bg-transparent border-0 text-white placeholder-gray-500 px-4 py-4 focus:ring-0 resize-none max-h-48 min-h-[60px]"
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="absolute right-3 bottom-3 p-2 rounded-lg bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-gray-600">
                KryptonSec AI can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
