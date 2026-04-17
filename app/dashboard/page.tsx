import Navbar from "@/components/layout/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-surface-lowest pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="display-md font-display font-bold mb-2 text-on-surface">
            Dashboard
          </h1>
          <p className="body-lg text-on-surface-dim">
            NASA data explained with AI insights
          </p>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* APOD Section */}
          <div className="p-8 bg-surface-high rounded-xl ghost-border">
            <h2 className="headline-md font-display font-semibold mb-4 text-primary-container">
              Astronomy Picture of the Day
            </h2>
            <div className="h-48 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted">
              [APOD Image Loading...]
            </div>
            <p className="body-sm text-on-surface-dim mt-4">
              Daily cosmic imagery curated by NASA
            </p>
          </div>

          {/* Mars Rover Section */}
          <div className="p-8 bg-surface-high rounded-xl ghost-border">
            <h2 className="headline-md font-display font-semibold mb-4 text-primary-container">
              Mars Rover Images
            </h2>
            <div className="h-48 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted">
              [Mars Gallery Loading...]
            </div>
            <p className="body-sm text-on-surface-dim mt-4">
              Live updates from Curiosity & Perseverance rovers
            </p>
          </div>
        </div>

        {/* Asteroids Section */}
        <div className="p-8 bg-surface-high rounded-xl ghost-border">
          <h2 className="headline-md font-display font-semibold mb-6 text-primary-container">
            Near-Earth Asteroids
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 bg-surface-low rounded-lg border-l-2 border-primary-fixed">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="label-md font-semibold text-primary-dim uppercase mb-1">
                      Asteroid {item}
                    </p>
                    <p className="body-sm text-on-surface-dim">
                      Distance: {100 * item} million km • Risk: Low
                    </p>
                  </div>
                  <span className="label-sm px-3 py-1 bg-secondary-container rounded-full text-on-secondary-container">
                    Safe
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
