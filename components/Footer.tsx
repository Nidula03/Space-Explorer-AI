export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-[#0c0e18] border-t border-[#3a494a]/15">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-[#e9feff] font-bold text-lg font-display tracking-tight">⟡ CELESTIAL NAVIGATOR</span>
          <p className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#e9feff]/40">© 2024 Celestial Navigator AI. Powered by Orbital Intelligence.</p>
        </div>
        
        <div className="flex items-center gap-8 font-['Inter'] text-xs uppercase tracking-widest">
          <a className="text-[#e9feff]/40 hover:text-[#00F5FF] transition-colors" href="#">Galactic Terms</a>
          <a className="text-[#e9feff]/40 hover:text-[#00F5FF] transition-colors" href="#">Privacy Protocol</a>
          <a className="text-[#e9feff]/40 hover:text-[#00F5FF] transition-colors" href="#">Data Telemetry</a>
        </div>

        <div className="flex gap-4">
          <span className="material-symbols-outlined text-[#00F5FF] cursor-pointer hover:scale-110 transition-transform">public</span>
          <span className="material-symbols-outlined text-[#00F5FF] cursor-pointer hover:scale-110 transition-transform">language</span>
          <span className="material-symbols-outlined text-[#00F5FF] cursor-pointer hover:scale-110 transition-transform">terminal</span>
        </div>
      </div>
    </footer>
  );
}
