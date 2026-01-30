import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto py-16 bg-black">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        <div className="space-y-4">
           <h4 className="font-medium text-white">Products</h4>
           <ul className="space-y-3">
              <li><Link href="/features" className="nav-link">AI Vulnerability Scanner</Link></li>
              <li><Link href="/solutions" className="nav-link">CTF Platform</Link></li>
              <li><Link href="/resources" className="nav-link">Interview Prep</Link></li>
           </ul>
        </div>
        <div className="space-y-4">
           <h4 className="font-medium text-white">Resources</h4>
           <ul className="space-y-3">
              <li><Link href="/docs" className="nav-link">Documentation</Link></li>
              <li><Link href="#" className="nav-link">Careers</Link></li>
              <li><Link href="#" className="nav-link">Support</Link></li>
           </ul>
        </div>
        <div className="space-y-4">
           <h4 className="font-medium text-white">Legal</h4>
           <ul className="space-y-3">
              <li><Link href="/privacy" className="nav-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="nav-link">Terms of Service</Link></li>
           </ul>
        </div>
        <div className="col-span-2 md:col-span-1 md:text-right">
           <div className="flex flex-col md:items-end justify-between h-full">
             <div className="mb-4">
                <span className="font-bold text-white text-lg">KryptonSecAI</span>
             </div>
             <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} KryptonSecAI. All rights reserved.</p>
           </div>
        </div>
      </div>
    </footer>
  );
}
