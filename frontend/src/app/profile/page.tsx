"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Shield, CreditCard, LogOut, ArrowLeft, CheckCircle, AlertTriangle, Calendar, Mail, Hash } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";
import Loader from "@/components/loading";

interface UserProfile {
  id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  email_verified: boolean;
  subscription_end: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState("");
  const [redeemMsg, setRedeemMsg] = useState("");
  const [error, setError] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [verifyMsg, setVerifyMsg] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const [applyMsg, setApplyMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(`${getApiBaseUrl()}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        router.push("/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemMsg("");
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${getApiBaseUrl()}/api/vouchers/redeem`,
        { code: voucherCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRedeemMsg(res.data.message);
      // Refresh profile
      const profileRes = await axios.get(`${getApiBaseUrl()}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(profileRes.data);
      setVoucherCode("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Redemption failed");
      } else {
        setError("Redemption failed");
      }
    }
  };

  const handleApplyVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyMsg("");
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${getApiBaseUrl()}/api/vouchers/apply`,
        { message: applyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplyMsg(res.data.message || "Voucher request submitted");
      setApplyMessage("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Request failed");
      } else {
        setError("Request failed");
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyMsg("");
    setError("");
    try {
      const res = await axios.post(`${getApiBaseUrl()}/api/auth/verify`, { token: verifyToken });
      setVerifyMsg(res.data.message || "Email verified successfully");
      // Refresh profile
      const token = localStorage.getItem("token");
      if (token) {
        const profileRes = await axios.get(`${getApiBaseUrl()}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data);
      }
      setVerifyToken("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Verification failed");
      } else {
        setError("Verification failed");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-8 animate-fade-in relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <Link href="/chat" className="flex items-center text-blue-500 hover:text-blue-400 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Chat
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Identity Card */}
            <div className="md:col-span-1 space-y-8 animate-slide-up">
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
                    
                    <div className="flex flex-col items-center text-center mb-6 relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <User size={40} className="text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">{profile?.fullname || "Anonymous"}</h1>
                        <p className="text-blue-500 text-sm font-mono">@{profile?.username}</p>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <Mail size={16} className="text-gray-500" />
                            <span className="text-gray-300 truncate">{profile?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <Shield size={16} className="text-yellow-500" />
                            <span className="text-gray-300 capitalize">{profile?.role} Role</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <Calendar size={16} className="text-blue-500" />
                            <span className="text-gray-300">Joined {new Date(profile?.created_at || "").toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Status & Actions */}
            <div className="md:col-span-2 space-y-8 animate-slide-up delay-100">
                {/* Email Verification */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Mail size={24} className="text-blue-500" /> 
                        Email Verification
                    </h2>
                    {profile?.email_verified ? (
                        <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex items-start gap-4">
                            <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-green-400 font-bold text-lg mb-1">Email Verified</p>
                                <p className="text-gray-400 text-sm">Your account email is verified. You can use all features.</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-start gap-4 mb-6">
                                <AlertTriangle size={24} className="text-red-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-red-400 font-bold text-lg mb-1">Email Not Verified</p>
                                    <p className="text-gray-400 text-sm">
                                        Please verify your email to access all features. If you received a token link, paste the token below or open the verification link.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        value={verifyToken}
                                        onChange={(e) => setVerifyToken(e.target.value)}
                                        placeholder="PASTE-VERIFICATION-TOKEN"
                                        className="w-full bg-black border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-400 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.05]"
                                >
                                    Verify Email
                                </button>
                            </form>
                            <p className="text-xs text-gray-500 mt-3">
                                If you have a link like <span className="font-mono text-gray-300">/api/auth/verify?token=...</span>, open <Link href={`/verify?token=${verifyToken || ""}`} className="text-blue-400 hover:text-blue-300 underline">this page</Link> on the same host and it will verify automatically.
                            </p>
                            {verifyMsg && (
                                <div className="bg-green-500/10 text-green-400 border border-green-500/20 p-4 rounded-xl mt-6 flex items-center gap-3 animate-fade-in">
                                    <CheckCircle size={18} />
                                    {verifyMsg}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Subscription Status */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Shield size={24} className="text-green-500" /> 
                        Security Clearance
                    </h2>
                    
                    {profile?.subscription_end ? (
                        <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex items-start gap-4">
                            <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-green-400 font-bold text-lg mb-1">Active License</p>
                                <p className="text-gray-400 text-sm">
                                    Your access to advanced AI tools is valid until <br/>
                                    <span className="text-white font-mono mt-1 inline-block">{new Date(profile.subscription_end).toLocaleString()}</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-start gap-4">
                            <AlertTriangle size={24} className="text-red-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-red-400 font-bold text-lg mb-1">Access Restricted</p>
                                <p className="text-gray-400 text-sm">
                                    You need an active subscription to access the AI Chat analysis tools.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Redeem Voucher */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <CreditCard size={24} className="text-yellow-500" /> 
                        Redeem Access Code
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm">Enter a voucher code to extend your subscription validity.</p>
                    
                    {redeemMsg && (
                        <div className="bg-green-500/10 text-green-400 border border-green-500/20 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in">
                            <CheckCircle size={18} />
                            {redeemMsg}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in">
                            <AlertTriangle size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRedeem} className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text" 
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="ENTER-CODE-HERE"
                                className="w-full bg-black border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none uppercase font-mono transition-all"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:scale-[1.05]"
                        >
                            Redeem
                        </button>
                    </form>
                </div>

                {/* Apply for Voucher */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <CreditCard size={24} className="text-green-500" /> 
                        Apply for Voucher
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm">Request a voucher from admin if you don&apos;t have a code.</p>
                    {applyMsg && (
                        <div className="bg-green-500/10 text-green-400 border border-green-500/20 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in">
                            <CheckCircle size={18} />
                            {applyMsg}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in">
                            <AlertTriangle size={18} />
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleApplyVoucher} className="flex flex-col gap-4">
                        <textarea
                            value={applyMessage}
                            onChange={(e) => setApplyMessage(e.target.value)}
                            placeholder="Tell us why you need access (optional)"
                            className="w-full bg-black border border-white/20 rounded-xl p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                            rows={3}
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-500 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:scale-[1.02]"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
