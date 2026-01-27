export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-black mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-4">
           <h4 className="font-bold text-white">Products</h4>
           <ul className="space-y-2 text-gray-500">
              <li className="hover:text-green-400 cursor-pointer transition-colors">AI Vulnerability Scanner</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">CTF Platform</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Interview Prep</li>
           </ul>
        </div>
        <div className="space-y-4">
           <h4 className="font-bold text-white">Resources</h4>
           <ul className="space-y-2 text-gray-500">
              <li className="hover:text-green-400 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Support</li>
           </ul>
        </div>
        <div className="space-y-4">
           <h4 className="font-bold text-white">Legal</h4>
           <ul className="space-y-2 text-gray-500">
              <li className="hover:text-green-400 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Terms of Service</li>
           </ul>
        </div>
         <div className="col-span-2 md:col-span-1 text-right text-gray-600 flex flex-col justify-end">
           <p>&copy; {new Date().getFullYear()} KryptonSec AI.</p>
           <p className="text-xs mt-1">All rights reserved.</p>
         </div>
      </div>
    </footer>
  );
}
