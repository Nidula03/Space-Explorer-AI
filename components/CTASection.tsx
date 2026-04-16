export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="relative rounded-3xl overflow-hidden bg-surface-container h-[400px] flex items-center">
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY_Rtqw7E1TY3hVSF21aLbkF8NqK-B151Oeqz2ekB-drKt_686DVFcgdjJR9FO8AghtTRI8F_bG7DSNDD7nqofl2qIvUsEoaL6l2kskWxtjnFMel_l0Rv5IJ5xIrDg0HUWAFaTs_G2D6VDyGf3wN8gwsjMyzy7cIVQ5cz1P7McX4ELb8YgLY0xIYhQZBsLuKaf6hpT7JofbMMnuVfdV16kY1nca1W1wOWq8l8m2=w1024" 
          alt="Nebula"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest to-transparent"></div>
        <div className="relative z-10 px-12 md:px-24 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Universe, <br/>Decoded for You.</h2>
          <p className="text-lg text-on-surface-variant mb-8 font-light">Join the elite network of celestial navigators using AI to pierce the veil of the unknown.</p>
          <button className="px-8 py-3 bg-on-surface text-surface-container-lowest font-bold rounded-xl hover:bg-primary transition-colors">Start Navigation</button>
        </div>
      </div>
    </section>
  );
}
