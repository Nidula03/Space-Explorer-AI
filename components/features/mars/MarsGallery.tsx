const sampleImages = [
  { id: 1, title: "Curiosity Rover", date: "2026-04-15" },
  { id: 2, title: "Perseverance Rover", date: "2026-04-14" },
  { id: 3, title: "Jezero Crater", date: "2026-04-13" },
  { id: 4, title: "Valles Marineris", date: "2026-04-12" },
];

export default function MarsGallery() {
  return (
    <section className="p-6 bg-surface-high rounded-xl ghost-border">
      <h2 className="headline-md font-display font-semibold text-primary-container mb-6">
        🔍 Mars Rover Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sampleImages.map((image) => (
          <div 
            key={image.id}
            className="group relative rounded-lg overflow-hidden bg-surface-variant cursor-pointer min-h-32"
          >
            {/* Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dim/10 to-transparent flex items-center justify-center text-on-surface-muted">
              👀
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-surface-lowest/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 rounded-lg">
              <h3 className="label-md font-semibold text-on-secondary-container">
                {image.title}
              </h3>
              <p className="label-sm text-on-surface-muted">
                {image.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
