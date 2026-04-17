interface AsteroidCardProps {
  name?: string;
  distance?: string;
  size?: string;
  velocity?: string;
  hazardLevel?: "low" | "medium" | "high";
}

const hazardColors = {
  low: "bg-secondary-container text-on-secondary-container",
  medium: "bg-yellow-900/40 text-yellow-400",
  high: "bg-red-900/40 text-red-400",
};

export default function AsteroidCard({
  name = "Asteroid-2026-XX",
  distance = "0.05 AU",
  size = "850 m",
  velocity = "24.5 km/s",
  hazardLevel = "low",
}: AsteroidCardProps) {
  return (
    <div className="p-6 bg-surface-high rounded-xl ghost-border border-l-2 border-primary-fixed hover:bg-surface-high/80 transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="headline-sm font-display font-semibold text-on-surface">
            {name}
          </h3>
          <p className="label-sm text-on-surface-muted mt-1">
            ☄️ Near-Earth Object
          </p>
        </div>
        
        <span className={`label-md px-3 py-1 rounded-full font-semibold capitalize ${hazardColors[hazardLevel]}`}>
          {hazardLevel} Risk
        </span>
      </div>

      {/* Telemetry */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="label-sm text-on-surface-muted uppercase tracking-widest">
            Distance
          </p>
          <p className="body-md font-semibold text-primary-dim">
            {distance}
          </p>
        </div>
        
        <div>
          <p className="label-sm text-on-surface-muted uppercase tracking-widest">
            Size
          </p>
          <p className="body-md font-semibold text-primary-dim">
            {size}
          </p>
        </div>
        
        <div>
          <p className="label-sm text-on-surface-muted uppercase tracking-widest">
            Velocity
          </p>
          <p className="body-md font-semibold text-primary-dim">
            {velocity}
          </p>
        </div>
      </div>
    </div>
  );
}
