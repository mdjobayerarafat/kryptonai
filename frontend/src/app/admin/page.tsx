"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Users, CreditCard, Trash2, Edit, Cpu, Plus, X } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

interface Document {
  id: string;
  content: string;
  metadata: string | Record<string, unknown>;
  filename?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  fullname?: string;
  role: string;
}

interface Voucher {
  id: string;
  code: string;
  max_uses: number;
  used_count: number;
  expires_at?: string;
  is_active: boolean;
}

interface VoucherRequest {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  username?: string;
}

interface AIModel {
  id: string;
  api_model_name: string;
  display_name: string;
  provider: string;
  is_active: boolean;
  system_prompt?: string;
}

interface ImportStatus {
    total_documents: number;
    processed_documents: number;
    errors: number;
    is_processing: boolean;
    current_file: string;
    message: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"knowledge" | "users" | "vouchers" | "models">("knowledge");
  const [role, setRole] = useState<string>("");
  
  // Knowledge Base State
  const [jsonInput, setJsonInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [kbStatus, setKbStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [kbLoading, setKbLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [docPage, setDocPage] = useState(1);
  const [docLimit] = useState(20);
  const [docTotal, setDocTotal] = useState(0);
  const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);

  // User Management State
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Voucher State
  const [voucherDuration, setVoucherDuration] = useState(30);
  const [voucherMaxUses, setVoucherMaxUses] = useState(1);
  const [generatedVoucher, setGeneratedVoucher] = useState<{ code: string; message: string; max_uses: number } | null>(null);
  const [voucherError, setVoucherError] = useState("");
  const [vouchersList, setVouchersList] = useState<Voucher[]>([]);
  const [assignUserId, setAssignUserId] = useState<string>("");
  const [assignCode, setAssignCode] = useState<string>("");
  const [assignMsg, setAssignMsg] = useState<string>("");
  const [voucherRequests, setVoucherRequests] = useState<VoucherRequest[]>([]);
  const [approveResult, setApproveResult] = useState<string>("");

  // AI Models State
  const [models, setModels] = useState<AIModel[]>([]);
  const [modelFormOpen, setModelFormOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [modelFormData, setModelFormData] = useState({
      api_model_name: "",
      display_name: "",
      provider: "openrouter",
      is_active: true,
      system_prompt: ""
  });

  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${getApiBaseUrl()}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchVouchers = useCallback(async () => {
      const token = localStorage.getItem("token");
      try {
          const res = await axios.get(`${getApiBaseUrl()}/api/vouchers`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setVouchersList(res.data);
      } catch (err) {
          console.error("Failed to fetch vouchers", err);
      }
  }, []);

  const fetchVoucherRequests = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${getApiBaseUrl()}/api/admin/vouchers/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVoucherRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch voucher requests", err);
    }
  }, []);

  const fetchModels = useCallback(async () => {
      const token = localStorage.getItem("token");
      try {
          const res = await axios.get(`${getApiBaseUrl()}/api/admin/models`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setModels(res.data);
      } catch (err) {
          console.error("Failed to fetch models", err);
      }
  }, []);

  const fetchDocuments = useCallback(async (page = docPage, limit = docLimit) => {
      const token = localStorage.getItem("token");
      try {
          const res = await axios.get(`${getApiBaseUrl()}/api/admin/documents?page=${page}&limit=${limit}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setDocuments(res.data.documents);
          setDocTotal(res.data.total);
          setDocPage(page); // Update current page if successful
      } catch (err) {
          console.error("Failed to fetch documents", err);
      }
  }, [docLimit, docPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);

    if (!token) {
        router.push("/login");
    } else if (userRole !== "admin" && userRole !== "editor") {
        router.push("/chat");
    } else {
      if (userRole === "admin") {
        fetchUsers();
      }
      if (activeTab === "vouchers") {
          fetchVouchers();
          if (userRole === "admin") {
              fetchUsers();
          }
          fetchVoucherRequests();
      }
      if (activeTab === "models") {
          fetchModels();
      }
      if (activeTab === "knowledge") {
          fetchDocuments();
      }
    }
  }, [router, activeTab, fetchUsers, fetchVouchers, fetchVoucherRequests, fetchModels, fetchDocuments]);

  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (kbLoading || importStatus?.is_processing) {
          interval = setInterval(async () => {
              const token = localStorage.getItem("token");
              try {
                  const res = await axios.get(`${getApiBaseUrl()}/api/admin/import-status`, {
                      headers: { Authorization: `Bearer ${token}` }
                  });
                  setImportStatus(res.data);
                  if (!res.data.is_processing && res.data.message.includes("Import complete")) {
                      setKbLoading(false);
                      setKbStatus({ type: "success", message: res.data.message });
                      fetchDocuments();
                  }
              } catch (e) {
                  console.error("Poll error", e);
              }
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [kbLoading, importStatus?.is_processing, fetchDocuments]);

  const handleDeleteDocument = async (id: string) => {
      if(!confirm("Are you sure?")) return;
      const token = localStorage.getItem("token");
      try {
          await axios.delete(`${getApiBaseUrl()}/api/admin/documents/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          fetchDocuments();
      } catch {
          alert("Failed to delete");
      }
  };

  const handleUpdateDocument = async () => {
      if (!editingDocument) return;
      const token = localStorage.getItem("token");
      try {
          let metadata = editingDocument.metadata;
          if (typeof metadata === 'string') {
             try {
                 metadata = JSON.parse(metadata);
             } catch {}
          }

          await axios.put(`${getApiBaseUrl()}/api/admin/documents/${editingDocument.id}`, {
              content: editingDocument.content,
              metadata: metadata
          }, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setEditingDocument(null);
          fetchDocuments();
      } catch {
          alert("Failed to update");
      }
  };

  const handleSaveModel = async () => {
      const token = localStorage.getItem("token");
      try {
          if (editingModel) {
              await axios.put(`${getApiBaseUrl()}/api/admin/models/${editingModel.id}`, modelFormData, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          } else {
              await axios.post(`${getApiBaseUrl()}/api/admin/models`, modelFormData, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          setModelFormOpen(false);
          setEditingModel(null);
          setModelFormData({ api_model_name: "", display_name: "", provider: "openrouter", is_active: true, system_prompt: "" });
          fetchModels();
      } catch (err) {
          console.error("Failed to save model", err);
          alert("Failed to save model");
      }
  };

  const handleDeleteModel = async (id: string) => {
      if (!confirm("Are you sure you want to delete this model?")) return;
      const token = localStorage.getItem("token");
      try {
          await axios.delete(`${getApiBaseUrl()}/api/admin/models/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          fetchModels();
      } catch (err) {
          console.error("Failed to delete model", err);
          alert("Failed to delete model");
      }
  };

  const openModelForm = (model: AIModel | null = null) => {
      if (model) {
          setEditingModel(model);
          setModelFormData({
              api_model_name: model.api_model_name,
              display_name: model.display_name,
              provider: model.provider,
              is_active: model.is_active,
              system_prompt: model.system_prompt || ""
          });
      } else {
          setEditingModel(null);
          setModelFormData({ api_model_name: "", display_name: "", provider: "openrouter", is_active: true, system_prompt: "" });
      }
      setModelFormOpen(true);
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${getApiBaseUrl()}/api/admin/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  const handleGenerateVoucher = async () => {
    setGeneratedVoucher(null);
    setVoucherError("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/vouchers/generate`, 
        { duration_days: Number(voucherDuration), max_uses: Number(voucherMaxUses) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGeneratedVoucher(res.data);
      fetchVouchers(); // Refresh list
    } catch (err) {
        if (isAxiosError(err)) {
            setVoucherError(err.response?.data?.error || "Failed to generate voucher");
        } else {
            setVoucherError("Failed to generate voucher");
        }
    }
  };

  const handleAssignVoucher = async () => {
    setAssignMsg("");
    setVoucherError("");
    const token = localStorage.getItem("token");
    if (!assignUserId || !assignCode) {
        setVoucherError("Select user and enter a code");
        return;
    }
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/admin/vouchers/redeem_for_user`, 
        { user_id: assignUserId, code: assignCode }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignMsg(res.data.message || "Voucher assigned");
      setAssignCode("");
    } catch (err) {
        if (isAxiosError(err)) {
            setVoucherError(err.response?.data?.error || "Failed to assign voucher");
        } else {
            setVoucherError("Failed to assign voucher");
        }
    }
  };
  
  const handleApproveRequest = async (id: string, code: string) => {
    setApproveResult("");
    setVoucherError("");
    const token = localStorage.getItem("token");
    if (!code) {
      setVoucherError("Enter a code to approve");
      return;
    }
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/admin/vouchers/requests/${id}/approve`, 
        { code }, { headers: { Authorization: `Bearer ${token}` } });
      setApproveResult(res.data.message || "Approved");
      fetchVoucherRequests();
      fetchVouchers();
    } catch (err) {
        if (isAxiosError(err)) {
            setVoucherError(err.response?.data?.error || "Approval failed");
        } else {
            setVoucherError("Approval failed");
        }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setKbStatus({ type: "success", message: `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` });

    if (file.size < 5 * 1024 * 1024) { // Preview only if < 5MB
        const reader = new FileReader();
        reader.onload = (event) => {
          setJsonInput(event.target?.result as string);
        };
        reader.readAsText(file);
    } else {
        setJsonInput(""); // Clear preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile && !jsonInput.trim()) return;

    setKbLoading(true);
    setUploadProgress(0);
    setKbStatus({ type: null, message: "" });
    const token = localStorage.getItem("token");

    try {
        const formData = new FormData();
        
        if (selectedFile) {
            formData.append("file", selectedFile);
        } else {
            // Convert jsonInput to blob
            const blob = new Blob([jsonInput], { type: "application/json" });
            formData.append("file", blob, "manual_upload.json");
        }

        const response = await axios.post(`${getApiBaseUrl()}/api/admin/upload/file`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                setUploadProgress(percentCompleted);
            }
        });
        
        setKbStatus({ type: "success", message: response.data.message });
        setJsonInput("");
        setSelectedFile(null);
    } catch (error) {
        console.error("Upload error:", error);
        if (isAxiosError(error)) {
            setKbStatus({ type: "error", message: error.response?.data?.error || "Failed to upload data." });
        } else {
            setKbStatus({ type: "error", message: "Failed to upload data." });
        }
        setKbLoading(false); // Only stop loading on error
    } 
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-8 animate-fade-in relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <Link href="/chat" className="inline-flex items-center text-gray-500 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Chat
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6 tracking-tight animate-slide-up">
            Admin <span className="text-gray-500">Dashboard</span>
        </h1>

        <div className="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto pb-1 animate-slide-up delay-100">
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`pb-3 px-6 text-sm font-medium transition-all duration-300 ${
                activeTab === "knowledge" 
                ? "border-b-2 border-white text-white" 
                : "text-gray-500 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2"><Upload size={18} /> Knowledge Base</div>
          </button>
          {role === "admin" && (
            <>
              <button
                onClick={() => setActiveTab("users")}
                className={`pb-3 px-6 text-sm font-medium transition-all duration-300 ${
                  activeTab === "users" 
                  ? "border-b-2 border-white text-white" 
                  : "text-gray-500 hover:text-white"
              }`}
              >
                <div className="flex items-center gap-2"><Users size={18} /> User Management</div>
              </button>

              <button
                onClick={() => setActiveTab("vouchers")}
                className={`pb-3 px-6 text-sm font-medium transition-all duration-300 ${
                    activeTab === "vouchers" 
                    ? "border-b-2 border-white text-white" 
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2"><CreditCard size={18} /> Vouchers</div>
              </button>

              <button
                onClick={() => setActiveTab("models")}
                className={`pb-3 px-6 text-sm font-medium transition-all duration-300 ${
                    activeTab === "models" 
                    ? "border-b-2 border-white text-white" 
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2"><Cpu size={18} /> AI Models</div>
              </button>
            </>
          )}
        </div>

        <div className="animate-slide-up delay-200">
            {activeTab === "knowledge" && (
            <div className="space-y-8">
                <div className="bg-black border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Upload Knowledge Base</h2>
                        <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20 text-white text-xs font-mono">
                            RAG SYSTEM READY
                        </div>
                    </div>
                    <p className="text-gray-400 mb-6">
                    Paste a JSON array of documents to index into the vector database.
                    <br />
                    <span className="text-xs mt-2 block opacity-70">
                        Expected format: <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-mono">[{`{ "content": "...", "metadata": {...} }`}]</code>
                    </span>
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors group">
                            <Upload size={16} className="text-white group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">Import JSON File</span>
                            <input 
                                type="file" 
                                accept=".json"
                                onChange={handleFileUpload}
                                className="hidden" 
                            />
                        </label>
                        <span className="text-xs text-gray-500">or paste content below</span>
                    </div>

                    <div className="relative group">
                        <textarea
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder={`[\n  {\n    "content": "SQL Injection is a code injection technique...",\n    "metadata": { "category": "web", "difficulty": "easy" }\n  }\n]`}
                            className="relative w-full h-96 bg-black border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-300 focus:outline-none focus:border-white transition-colors mb-6 resize-none"
                        />
                    </div>

                    {kbStatus.message && (
                        <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${kbStatus.type === 'success' ? 'bg-white/10 text-white border border-white/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {kbStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            {kbStatus.message}
                        </div>
                    )}
                    
                    {kbLoading && (
                        <div className="mb-6">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>{importStatus?.is_processing ? importStatus.message : "Uploading..."}</span>
                                <span>
                                    {importStatus?.is_processing 
                                        ? `${importStatus.processed_documents} processed${importStatus.errors > 0 ? ` (${importStatus.errors} errors)` : ''}` 
                                        : `${uploadProgress}%`
                                    }
                                </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                    className="bg-white h-2 rounded-full transition-all duration-300 ease-out relative overflow-hidden" 
                                    style={{ width: importStatus?.is_processing ? '100%' : `${uploadProgress}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button 
                            onClick={handleUpload} 
                            disabled={kbLoading}
                            className="bg-white hover:bg-gray-200 text-black font-bold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
                        >
                            {kbLoading ? "Uploading..." : "Upload Data"}
                        </button>
                    </div>
                </div>

                <div className="bg-black border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Existing Knowledge ({docTotal})</h2>
                        <div className="flex gap-2 items-center">
                             <button 
                                 onClick={() => fetchDocuments(docPage - 1)}
                                 disabled={docPage <= 1}
                                 className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm disabled:opacity-50 transition-colors"
                             >
                                 Prev
                             </button>
                             <span className="px-2 text-sm text-gray-400">Page {docPage}</span>
                             <button 
                                 onClick={() => fetchDocuments(docPage + 1)}
                                 disabled={docPage * docLimit >= docTotal}
                                 className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm disabled:opacity-50 transition-colors"
                             >
                                 Next
                             </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {documents.map((doc) => (
                            <div key={doc.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                {editingDocument?.id === doc.id ? (
                                    <div className="space-y-4">
                                        <textarea
                                            value={editingDocument.content}
                                            onChange={(e) => setEditingDocument({...editingDocument, content: e.target.value})}
                                            className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-gray-300 font-mono focus:border-white outline-none"
                                            rows={5}
                                        />
                                        <input
                                            value={typeof editingDocument.metadata === 'string' ? editingDocument.metadata : JSON.stringify(editingDocument.metadata)}
                                            onChange={(e) => setEditingDocument({...editingDocument, metadata: e.target.value})}
                                            className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-gray-300 font-mono focus:border-white outline-none"
                                            placeholder="Metadata JSON"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => setEditingDocument(null)}
                                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleUpdateDocument}
                                                className="px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-mono text-xs text-gray-500 mb-1">{doc.id}</div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => setEditingDocument(doc)}
                                                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-300 line-clamp-3 font-mono bg-black/50 p-2 rounded border border-white/5 mb-2">
                                            {doc.content}
                                        </div>
                                        {doc.metadata && (
                                            <div className="text-xs text-gray-500 font-mono">
                                                {typeof doc.metadata === 'string' ? doc.metadata : JSON.stringify(doc.metadata)}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        {documents.length === 0 && (
                            <div className="text-center text-gray-500 py-8">No documents indexed yet.</div>
                        )}
                    </div>
                </div>
            </div>
            )}

            {activeTab === "users" && role === "admin" && (
                <div className="bg-black border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
                    {usersLoading ? (
                        <div className="text-center py-12 text-gray-500 animate-pulse">Loading users...</div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-white/5">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5">
                                    <tr className="text-gray-400 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-medium">Username</th>
                                        <th className="p-4 font-medium">Full Name</th>
                                        <th className="p-4 font-medium">Email</th>
                                        <th className="p-4 font-medium">Role</th>
                                        <th className="p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map(u => (
                                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-mono text-white">{u.username}</td>
                                            <td className="p-4 text-gray-300">{u.fullname || "-"}</td>
                                            <td className="p-4 text-gray-500">{u.email || "-"}</td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                    u.role === 'admin' 
                                                    ? 'bg-white text-black border-white' 
                                                    : u.role === 'editor' 
                                                    ? 'bg-gray-800 text-gray-300 border-gray-700' 
                                                    : 'bg-black text-gray-500 border-gray-800'
                                                }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <select 
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                                    className="bg-black border border-white/20 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:border-white outline-none cursor-pointer hover:border-white/40 transition-colors"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="editor">Editor</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "vouchers" && (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-8">Generate Voucher</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Duration (Days)</label>
                            <input 
                                type="number" 
                                value={voucherDuration}
                                onChange={(e) => setVoucherDuration(Number(e.target.value))}
                                className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Max Uses</label>
                            <input 
                                type="number" 
                                value={voucherMaxUses}
                                onChange={(e) => setVoucherMaxUses(Number(e.target.value))}
                                className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                                min="1"
                            />
                        </div>
                        <button 
                            onClick={handleGenerateVoucher}
                            className="bg-white hover:bg-gray-200 text-black font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02]"
                        >
                            Generate Code
                        </button>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                            <Users size={20} className="text-white" />
                            Assign Voucher To User
                        </h3>
                        {assignMsg && (
                          <div className="bg-white/10 text-white border border-white/20 p-4 rounded-xl mb-6 flex items-center gap-3">
                            <CheckCircle size={18} />
                            {assignMsg}
                          </div>
                        )}
                        {voucherError && (
                          <div className="bg-white/5 text-gray-300 border border-white/10 p-4 rounded-xl mb-6 flex items-center gap-3">
                            <AlertCircle size={18} />
                            {voucherError}
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Select User</label>
                                <select 
                                    value={assignUserId}
                                    onChange={(e) => setAssignUserId(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                                >
                                    <option value="">Choose a user</option>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>{u.username} ({u.email || "no-email"})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Voucher Code</label>
                                <input 
                                    type="text" 
                                    value={assignCode}
                                    onChange={(e) => setAssignCode(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all font-mono"
                                    placeholder="CODE"
                                />
                            </div>
                            <button 
                                onClick={handleAssignVoucher}
                                className="bg-white hover:bg-gray-200 text-black font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02]"
                            >
                                Assign Voucher
                            </button>
                        </div>
                    </div>

                    {generatedVoucher && (
                        <div className="bg-white/10 border border-white/20 p-8 rounded-xl text-center mb-8 animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-[50px] rounded-full"></div>
                            <p className="text-gray-300 mb-4 font-medium uppercase tracking-widest text-sm">Voucher Generated</p>
                            <div className="text-5xl md:text-6xl font-mono font-bold text-white tracking-widest my-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                {generatedVoucher.code}
                            </div>
                            <div className="flex justify-center gap-6 text-sm text-gray-400">
                                <span>Valid: <span className="text-white">{voucherDuration} Days</span></span>
                                <span>Max Uses: <span className="text-white">{generatedVoucher.max_uses}</span></span>
                            </div>
                        </div>
                    )}
                    
                    {voucherError && (
                        <div className="bg-white/5 text-gray-300 border border-white/10 p-4 rounded-xl mb-8 flex items-center gap-3">
                            <AlertCircle size={20} />
                            {voucherError}
                        </div>
                    )}

                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                            <CreditCard size={20} className="text-white" />
                            Active Vouchers
                        </h3>
                        <div className="grid gap-4">
                            {vouchersList.map(v => (
                                <div key={v.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                                    <div>
                                        <div className="font-mono text-white font-bold">{v.code}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Max Uses: {v.max_uses} | Used: {v.used_count} | Expires: {v.expires_at ? new Date(v.expires_at).toLocaleDateString() : "Never"}
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 rounded text-xs border ${v.is_active ? "bg-white text-black border-white" : "bg-black text-gray-500 border-gray-800"}`}>
                                        {v.is_active ? "Active" : "Inactive"}
                                    </div>
                                </div>
                            ))}
                            {vouchersList.length === 0 && (
                                <div className="text-gray-500 text-center py-4">No active vouchers</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                             <Users size={20} className="text-white" />
                             Voucher Requests
                        </h3>
                        <div className="grid gap-4">
                             {voucherRequests.map(req => (
                                 <div key={req.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                                     <div>
                                         <div className="font-bold text-white">{req.username || "Unknown User"}</div>
                                         <div className="text-xs text-gray-500">Requested: {new Date(req.created_at).toLocaleDateString()}</div>
                                         <div className={`text-xs mt-1 ${req.status === 'pending' ? 'text-white' : req.status === 'approved' ? 'text-gray-400' : 'text-gray-600'}`}>
                                             Status: {req.status}
                                         </div>
                                     </div>
                                     {req.status === 'pending' && (
                                         <div className="flex gap-2 w-full md:w-auto">
                                             <input 
                                                 type="text" 
                                                 placeholder="Voucher Code"
                                                 className="bg-black border border-white/20 rounded px-3 py-1 text-sm text-white focus:border-white outline-none w-full md:w-32"
                                                 id={`code-${req.id}`}
                                             />
                                             <button 
                                                 onClick={() => {
                                                     const input = document.getElementById(`code-${req.id}`) as HTMLInputElement;
                                                     handleApproveRequest(req.id, input.value);
                                                 }}
                                                 className="bg-white hover:bg-gray-200 text-black text-sm font-bold px-3 py-1 rounded transition-colors"
                                             >
                                                 Approve
                                             </button>
                                         </div>
                                     )}
                                     {approveResult && req.status === 'pending' && (
                                         <div className="text-xs text-gray-300">{approveResult}</div>
                                     )}
                                 </div>
                             ))}
                             {voucherRequests.length === 0 && (
                                 <div className="text-gray-500 text-center py-4">No pending requests</div>
                             )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "models" && (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">AI Models Management</h2>
                        <button 
                            onClick={() => openModelForm()}
                            className="bg-white hover:bg-gray-200 text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Plus size={18} /> Add Model
                        </button>
                    </div>

                    {modelFormOpen && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full relative animate-scale-in">
                                <button 
                                    onClick={() => setModelFormOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                                <h3 className="text-xl font-bold text-white mb-6">
                                    {editingModel ? "Edit Model" : "Add New Model"}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">API Model Name (ID)</label>
                                        <input 
                                            value={modelFormData.api_model_name}
                                            onChange={(e) => setModelFormData({...modelFormData, api_model_name: e.target.value})}
                                            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-white outline-none"
                                            placeholder="e.g. google/gemini-pro"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                                        <input 
                                            value={modelFormData.display_name}
                                            onChange={(e) => setModelFormData({...modelFormData, display_name: e.target.value})}
                                            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-white outline-none"
                                            placeholder="e.g. Gemini Pro"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Provider</label>
                                        <select 
                                            value={modelFormData.provider}
                                            onChange={(e) => setModelFormData({...modelFormData, provider: e.target.value})}
                                            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-white outline-none"
                                        >
                                            <option value="openrouter">OpenRouter</option>
                                            <option value="openai">OpenAI</option>
                                            <option value="anthropic">Anthropic</option>
                                            <option value="google">Google</option>
                                            <option value="local">Local (Ollama)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">System Prompt</label>
                                        <textarea
                                            value={modelFormData.system_prompt}
                                            onChange={(e) => setModelFormData({...modelFormData, system_prompt: e.target.value})}
                                            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-white outline-none h-32 resize-none"
                                            placeholder="Optional custom system prompt..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox"
                                            checked={modelFormData.is_active}
                                            onChange={(e) => setModelFormData({...modelFormData, is_active: e.target.checked})}
                                            className="w-4 h-4 rounded border-gray-600 text-white focus:ring-white bg-gray-700"
                                            id="is_active"
                                        />
                                        <label htmlFor="is_active" className="text-sm text-gray-300">Active</label>
                                    </div>
                                    <button 
                                        onClick={handleSaveModel}
                                        className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-lg mt-4 transition-colors"
                                    >
                                        Save Model
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-4">
                        {models.map(model => (
                            <div key={model.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex justify-between items-center group hover:border-white/30 transition-colors">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-white text-lg">{model.display_name}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs border ${model.is_active ? 'bg-white text-black border-white' : 'bg-black text-gray-500 border-gray-800'}`}>
                                            {model.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 font-mono">{model.api_model_name}</div>
                                    <div className="text-xs text-gray-600 mt-1 uppercase tracking-wider">{model.provider}</div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => openModelForm(model)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteModel(model.id)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {models.length === 0 && (
                            <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-white/10 border-dashed">
                                No models configured. Add one to get started.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}