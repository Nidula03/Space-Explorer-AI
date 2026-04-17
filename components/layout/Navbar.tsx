'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-[#32343f]/60 backdrop-blur-lg border-b border-[#3a494a]/20 z-50 shadow-[0_0_40px_rgba(0,245,255,0.08)]">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tighter text-[#e9feff] drop-shadow-[0_0_8px_rgba(0,245,255,0.4)] font-display">
          StellarAI 🪐
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <a 
          className={`transition-colors font-display text-sm tracking-tight ${
            isActive('/') 
              ? 'text-[#e9feff] font-semibold' 
              : 'text-[#e9feff]/70 hover:text-[#e9feff]'
          }`} 
          href="/"
        >
          Home
        </a>
        <a 
          className={`transition-colors font-display text-sm tracking-tight ${
            isActive('/dashboard') 
              ? 'text-[#e9feff] font-semibold' 
              : 'text-[#e9feff]/70 hover:text-[#e9feff]'
          }`} 
          href="/dashboard"
        >
          Dashboard
        </a>
        <a 
          className="text-[#e9feff]/70 hover:text-[#e9feff] transition-colors font-display text-sm tracking-tight" 
          href="#"
        >
          Mars Gallery
        </a>
        <a 
          className="text-[#e9feff]/70 hover:text-[#e9feff] transition-colors font-display text-sm tracking-tight" 
          href="#"
        >
          Asteroid Tracker
        </a>
        <a 
          className={`transition-colors font-display text-sm tracking-tight ${
            isActive('/favorites') 
              ? 'text-[#e9feff] font-semibold' 
              : 'text-[#e9feff]/70 hover:text-[#e9feff]'
          }`} 
          href="/favorites"
        >
          Favorites
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-[#00F5FF] p-2 hover:bg-[#e9feff]/10 rounded-full transition-all">
          account_circle
        </button>
      </div>
    </nav>
  );
}
