export default function Footer() {
  return (
    <footer className="glass-panel mx-4 mb-4 rounded-2xl py-16 mt-auto relative z-30">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        <div className="space-y-6">
           <h4 className="font-bold neon-text text-lg">Products</h4>
           <ul className="space-y-3 text-gray-400">
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                AI Vulnerability Scanner
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                CTF Platform
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Interview Prep
              </li>
           </ul>
        </div>
        <div className="space-y-6">
           <h4 className="font-bold neon-text text-lg">Resources</h4>
           <ul className="space-y-3 text-gray-400">
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Blog
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Careers
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Support
              </li>
           </ul>
        </div>
        <div className="space-y-6">
           <h4 className="font-bold neon-text text-lg">Legal</h4>
           <ul className="space-y-3 text-gray-400">
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Privacy Policy
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Terms of Service
              </li>
           </ul>
        </div>
         <div className="col-span-2 md:col-span-1 text-right flex flex-col justify-end space-y-4">
           <div className="glass-panel p-4 rounded-xl">
             <p className="neon-text font-bold">&copy; {new Date().getFullYear()} KryptonSec AI</p>
             <p className="text-xs mt-1 text-gray-400">All rights reserved.</p>
             <div className="flex items-center justify-end gap-2 mt-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <p className="text-xs neon-text">SYSTEM ONLINE</p>
             </div>
           </div>
         </div>
      </div>
      
      {/* Terminal-style bottom bar */}
      <div className="mt-12 border-t border-green-500/20 pt-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="glass-panel p-4 rounded-xl font-mono text-xs neon-text">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>root@krypton-ai:~$</span>
            </div>
            <div className="text-green-300 ml-4">
              uptime: 365 days, 12:34:56 | users: 1337 | load: 0.42 0.37 0.33
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
