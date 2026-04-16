export default function Favorites() {
  return (
    <div className="min-h-screen bg-surface-lowest pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="display-md font-display font-bold mb-2 text-on-surface">
            Your Favorites
          </h1>
          <p className="body-lg text-on-surface-dim">
            Curated collection of your favorite NASA discoveries
          </p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-96 rounded-xl ghost-border bg-surface-high/30 p-12 text-center">
          <div className="text-6xl mb-6">⭐</div>
          <h2 className="headline-md font-display font-semibold mb-3 text-on-surface">
            No favorites yet
          </h2>
          <p className="body-md text-on-surface-dim mb-8 max-w-xs">
            Start exploring and save your favorite cosmic moments to build your personal collection.
          </p>
          <a 
            href="/dashboard" 
            className="px-6 py-3 bg-gradient-primary text-on-primary rounded-xl font-semibold label-lg hover:glow-cyan-lg transition-all duration-fast hover:scale-105"
          >
            Explore Now →
          </a>
        </div>

        {/* Favorites Grid (when populated) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 hidden">
          {/* Sample favorite card */}
          <div className="p-6 bg-surface-high rounded-xl ghost-border hover:bg-surface-high/80 transition-all">
            <div className="h-32 bg-surface-variant rounded-lg mb-4"></div>
            <h3 className="headline-sm font-display font-semibold text-primary-container mb-2">Orion Nebula</h3>
            <p className="body-sm text-on-surface-dim mb-4">A stunning glimpse into stellar birth</p>
            <button className="label-md text-primary-fixed hover:text-primary-container transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
