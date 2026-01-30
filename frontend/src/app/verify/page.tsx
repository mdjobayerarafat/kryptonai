 "use client";
 import { Suspense, useEffect, useState } from "react";
 import { useSearchParams, useRouter } from "next/navigation";
 import axios from "axios";
 import Link from "next/link";
 import { CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
 import { getApiBaseUrl } from "@/lib/api";
 
 function VerifyContent() {
   const search = useSearchParams();
   const router = useRouter();
   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
   const [message, setMessage] = useState("");
   const token = search.get("token") || "";
 
   useEffect(() => {
     const run = async () => {
       if (!token) return;
       try {
         const res = await axios.post(`${getApiBaseUrl()}/api/auth/verify`, { token });
         setStatus("success");
         setMessage(res.data?.message || "Email verified successfully");
       } catch (err) {
        setStatus("error");
        if (axios.isAxiosError(err)) {
          setMessage(err.response?.data?.error || "Verification failed");
        } else {
          setMessage("Verification failed");
        }
      }
     };
     run();
   }, [token]);
 
   return (
     <div className="min-h-screen bg-black text-gray-300 font-sans p-8 animate-fade-in relative overflow-hidden">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
       <div className="max-w-xl mx-auto relative z-10">
         <Link href="/login" className="inline-flex items-center text-green-500 hover:text-green-400 mb-6 transition-colors">
           <ArrowLeft size={20} className="mr-2" />
           Back to Login
         </Link>
         <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 shadow-2xl">
           <h1 className="text-2xl font-bold text-white mb-4">Email Verification</h1>
           {!token && (
             <p className="text-gray-400">Missing token. Provide ?token=... in the URL or verify from your Profile page.</p>
           )}
           {status === "idle" && token && (
             <p className="text-gray-400">Verifying token...</p>
           )}
           {status === "success" && (
             <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex items-start gap-4">
               <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
               <div>
                 <p className="text-green-400 font-bold text-lg mb-1">Success</p>
                 <p className="text-gray-400 text-sm">{message}</p>
               </div>
             </div>
           )}
           {status === "error" && (
             <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-start gap-4">
               <AlertTriangle size={24} className="text-red-500 mt-1 flex-shrink-0" />
               <div>
                 <p className="text-red-400 font-bold text-lg mb-1">Verification Failed</p>
                 <p className="text-gray-400 text-sm">{message}</p>
               </div>
             </div>
           )}
           <div className="mt-6">
             <button
               onClick={() => router.push("/profile")}
               className="bg-green-600 hover:bg-green-500 text-black font-bold px-6 py-3 rounded-xl transition-all"
             >
               Go to Profile
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default function VerifyPage() {
   return (
     <Suspense>
       <VerifyContent />
     </Suspense>
   );
 }
