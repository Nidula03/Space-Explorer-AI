export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 bg-surface">
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-lowest via-surface to-surface-lowest opacity-100"></div>
        
        {/* Stars */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 0.5 + 'px',
                height: Math.random() * 2 + 0.5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.3,
              }}
            ></div>
          ))}
        </div>

        {/* Nebula Clouds */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-l from-cyan-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/5 to-transparent rounded-full blur-3xl"></div>

        {/* Floating Space Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute bg-cyan-300/20 rounded-full float-particle"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Glowing Orbs/Distant Stars */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm shadow-[0_0_20px_rgba(96,165,250,0.6)] animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full blur-sm shadow-[0_0_20px_rgba(192,132,250,0.6)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full blur-sm shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse" style={{animationDelay: '2s'}}></div>

        {/* Slow Moving Bright Shooting Stars - Diagonal paths */}
        {[
          { top: '85%', left: '5%', delay: 0, animClass: 'shooting-star-up-diagonal-right' },
          { top: '5%', left: '85%', delay: 20, animClass: 'shooting-star-down-diagonal-right' },
        ].map((pos, i) => (
          <div
            key={`slow-star-${i}`}
            className={`absolute ${pos.animClass} pointer-events-none`}
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${pos.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center">
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
