export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto py-16 bg-black">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        <div className="space-y-4">
           <h4 className="font-medium text-white">Products</h4>
           <ul className="space-y-3">
              <li><a href="#" className="nav-link">AI Vulnerability Scanner</a></li>
              <li><a href="#" className="nav-link">CTF Platform</a></li>
              <li><a href="#" className="nav-link">Interview Prep</a></li>
           </ul>
        </div>
        <div className="space-y-4">
           <h4 className="font-medium text-white">Resources</h4>
           <ul className="space-y-3">
              <li><a href="#" className="nav-link">Blog</a></li>
              <li><a href="#" className="nav-link">Careers</a></li>
              <li><a href="#" className="nav-link">Support</a></li>
           </ul>
        </div>
        <div className="space-y-4">
           <h4 className="font-medium text-white">Legal</h4>
           <ul className="space-y-3">
              <li><a href="#" className="nav-link">Privacy Policy</a></li>
              <li><a href="#" className="nav-link">Terms of Service</a></li>
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
