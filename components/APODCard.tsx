interface APODCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function APODCard({ 
  title = "Astronomy Picture of the Day",
  description = "Daily cosmic imagery from NASA",
  imageUrl
}: APODCardProps) {
  return (
    <article className="group p-6 bg-surface-high rounded-xl ghost-border hover:bg-surface-high/80 transition-all duration-fast hover:glow-cyan">
      {/* Image Container */}
      <div className="relative mb-4 rounded-lg overflow-hidden bg-surface-variant h-48">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-fast"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-on-surface-muted">
            🔕 Image Loading...
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="headline-sm font-display font-semibold text-primary-container mb-2">
        {title}
      </h3>
      
      <p className="body-sm text-on-surface-dim mb-4 line-clamp-3">
        {description}
      </p>

      <a 
        href="#" 
        className="label-md text-primary-fixed hover:text-primary-container transition-colors inline-flex items-center gap-1"
      >
        Learn More →
      </a>
    </article>
  );
}
