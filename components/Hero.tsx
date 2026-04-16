export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden nebula-bg px-6 pt-20 bg-surface">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-container/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center">
        {/* Badge */}
        

        {/* Main Heading */}
        <h1 className="font-display text-6xl md:text-8xl font-bold text-on-surface tracking-tight mb-8">
          Explore Space <br/>
          <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]">With AI</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Discover NASA data explained by artificial intelligence. Witness the cosmos through a lens of high-fidelity telemetry and orbital wisdom.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="group relative px-8 py-4 bg-gradient-to-br from-primary to-primary-container rounded-xl text-on-primary font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
            Explore Dashboard
          </button>
          <button className="px-8 py-4 glass-panel bg-surface-variant/40 border border-outline-variant/20 rounded-xl text-primary font-bold text-lg hover:bg-surface-variant/60 transition-all duration-300">
            View APOD Today
          </button>
        </div>
      </div>
    </section>
  );
}
