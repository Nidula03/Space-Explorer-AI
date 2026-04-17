"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { fetchAPOD, APODData, fetchAsteroids, AsteroidData } from "@/lib/nasa";

export default function Dashboard() {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log("Fetching APOD data...");
        const apod = await fetchAPOD();
        if (apod) {
          console.log("APOD data fetched:", apod.title);
          setApodData(apod);
        } else {
          console.warn("APOD fetch returned null");
          setApodData(null);
        }

        console.log("Fetching Asteroids data...");
        const asteroidsData = await fetchAsteroids();
        setAsteroids(asteroidsData.slice(0, 3)); // Show first 3 asteroids
      } catch (err) {
        console.error("Failed to load data:", err);
        setApodData(null);
        setAsteroids([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

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

        {/* APOD Section - Full Width with Side-by-Side Layout */}
        <div className="p-8 bg-surface-high rounded-xl ghost-border hover:bg-surface-high/80 transition-all mb-12">
          <h2 className="headline-md font-display font-semibold mb-6 text-primary-container">
            Astronomy Picture of the Day
          </h2>
          {loading ? (
            <div className="h-80 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted animate-pulse">
              Loading today's cosmic imagery...
            </div>
          ) : apodData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Description on Left */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-primary mb-4">{apodData.title}</h3>
                <p className="text-on-surface-dim leading-relaxed mb-4">
                  {apodData.explanation}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary-fixed px-3 py-1 rounded-full">
                    {apodData.date}
                  </span>
                  <span className="text-xs text-on-surface-muted">
                    {apodData.media_type === 'image' ? '📷 Image' : '🎥 Video'}
                  </span>
                </div>
              </div>

              {/* Image on Right */}
              <div className="h-80 rounded-xl overflow-hidden shadow-xl">
                {apodData.media_type === 'image' ? (
                  <img 
                    src={apodData.url} 
                    alt={apodData.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23282934' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23999' font-size='18'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-container/20 flex items-center justify-center">
                    <iframe 
                      src={apodData.url}
                      title={apodData.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-80 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted">
              Unable to load APOD data
            </div>
          )}
        </div>

        {/* Asteroids Section */}
        <div className="p-8 bg-surface-high rounded-xl ghost-border">
          <h2 className="headline-md font-display font-semibold mb-6 text-primary-container">
            Near-Earth Asteroids
          </h2>
          <div className="space-y-4">
            {loading ? (
              <div className="h-32 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted animate-pulse">
                Loading asteroids...
              </div>
            ) : asteroids.length > 0 ? (
              asteroids.map((asteroid) => {
                const diameter = asteroid.estimated_diameter?.km?.estimated_diameter_max || 0;
                const closeApproach = asteroid.close_approach_data?.[0];
                const distance = closeApproach ? parseFloat(closeApproach.miss_distance.kilometers) : 0;
                const velocity = closeApproach ? parseFloat(closeApproach.relative_velocity.kilometers_per_second) : 0;
                const hazardous = asteroid.is_potentially_hazardous_asteroid || false;
                
                return (
                  <div key={asteroid.id} className="p-4 bg-surface-lowest rounded-lg border-l-4 border-primary-container hover:border-primary hover:bg-surface-container transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="label-md font-bold text-primary-fixed uppercase mb-1">
                          {asteroid.name}
                        </p>
                        <p className="body-sm text-on-surface-dim">
                          Diameter: {diameter.toFixed(2)} km • Distance: {(distance / 1000000).toFixed(1)}M km • Velocity: {(velocity * 3600).toFixed(0)} km/h
                        </p>
                      </div>
                      <span className={`label-sm px-4 py-2 rounded-full font-semibold ${hazardous ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {hazardous ? 'Hazardous' : 'Safe'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-32 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted">
                No asteroids data available
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
