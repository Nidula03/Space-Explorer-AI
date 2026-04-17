export default function FeatureGrid() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Large Feature - 8 columns */}
        <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/10 aspect-video md:aspect-auto md:h-[500px]">
          <img 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
            src="https://archive-share.america.gov/wp-content/uploads/2019/12/iss042e215971.jpg"
            alt="Earth from space"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <div className="mb-4 flex gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary-fixed-dim text-[10px] font-bold rounded uppercase tracking-widest border border-primary/20">Orbital Data</span>
            </div>
            <h3 className="text-3xl font-display font-bold text-on-surface mb-2">Global Telemetry Hub</h3>
            <p className="text-on-surface-variant max-w-md">Real-time planetary monitoring processed through neural networks to predict atmospheric shifts and orbital debris paths.</p>
          </div>
        </div>

        {/* Secondary Feature - 4 columns */}
        <div className="md:col-span-4 group flex flex-col justify-between p-8 rounded-xl bg-surface-container-high border-t border-l border-outline-variant/20 shadow-2xl">
          <div>
            <div className="bg-primary/5 p-4 rounded-lg mb-4 w-fit">
              <span className="material-symbols-outlined" style={{fontSize: '32px', color: 'var(--primary-container)'}}>rocket_launch</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-on-surface mb-4">Launch Intelligence</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">AI-optimized mission parameters for the next generation of deep-space exploration. Analyzing 40+ years of NASA flight logs.</p>
          </div>
          <div className="mt-12 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-primary-fixed-dim/60">
              <span>NEURAL LOAD</span>
              <span>88.4%</span>
            </div>
            <div className="h-1 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full w-[88%] bg-primary-container"></div>
            </div>
          </div>
        </div>

        {/* Small Grid Items - 4 columns each */}
        <div className="md:col-span-4 p-6 rounded-xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
          <div className="bg-primary/5 p-3 rounded-lg">
            <span className="material-symbols-outlined text-primary-container">query_stats</span>
          </div>
          <div>
            <h4 className="text-on-surface font-display font-bold">Deep Space Analysis</h4>
            <p className="text-xs text-on-surface-variant mt-1">Spectroscopy decoding across light-years.</p>
          </div>
        </div>

        <div className="md:col-span-4 p-6 rounded-xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
          <div className="bg-primary/5 p-3 rounded-lg">
            <span className="material-symbols-outlined text-primary-container">explore</span>
          </div>
          <div>
            <h4 className="text-on-surface font-display font-bold">Asteroid Shield</h4>
            <p className="text-xs text-on-surface-variant mt-1">Autonomous tracking of NEO-class entities.</p>
          </div>
        </div>

        <div className="md:col-span-4 p-6 rounded-xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
          <div className="bg-primary/5 p-3 rounded-lg">
            <span className="material-symbols-outlined text-primary-container">auto_awesome_motion</span>
          </div>
          <div>
            <h4 className="text-on-surface font-display font-bold">Visual Archives</h4>
            <p className="text-xs text-on-surface-variant mt-1">Enhanced historical NASA data visualization.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
