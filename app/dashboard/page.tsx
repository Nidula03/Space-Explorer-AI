"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MarsGallery from "@/components/features/mars/MarsGallery";
import { fetchAPOD, APODData } from "@/lib/nasa";

// Default sample APOD data
const DEFAULT_APOD: APODData = {
  title: "The Pillars of Creation",
  explanation: "The Pillars of Creation are a stellar nursery within the Eagle Nebula, approximately 7,000 light-years from Earth. They are a great example of how stars form from stellar dust and gas. The three dust pillars are surrounded by glowing gas clouds and populated with newly formed stars.",
  url: "https://apod.nasa.gov/apod/image/2301/pillars_jwst_1024.jpg",
  hdurl: "https://apod.nasa.gov/apod/image/2301/pillars_jwst.jpg",
  media_type: "image",
  date: "2023-01-01",
};

export default function Dashboard() {
  const [apodData, setApodData] = useState<APODData>(DEFAULT_APOD);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const apod = await fetchAPOD();
        if (apod) {
          setApodData(apod);
        } else {
          // Keep default if fetch fails
          setApodData(DEFAULT_APOD);
        }
      } catch (err) {
        console.error("Failed to load APOD:", err);
        setApodData(DEFAULT_APOD);
      } finally {
        setLoading(false);
      }
    }
    
    // Only load if not already loaded
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

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* APOD Section */}
          <div className="p-8 bg-surface-high rounded-xl ghost-border hover:bg-surface-high/80 transition-all">
            <h2 className="headline-md font-display font-semibold mb-4 text-primary-container">
              Astronomy Picture of the Day
            </h2>
            {loading ? (
              <div className="h-48 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted animate-pulse">
                Loading cosmic imagery...
              </div>
            ) : apodData && apodData.url ? (
              <>
                <div className="h-48 bg-surface-variant rounded-lg overflow-hidden flex items-center justify-center">
                  {apodData.media_type === 'image' ? (
                    <img 
                      src={apodData.url} 
                      alt={apodData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23282934' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23999' font-size='18'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <iframe 
                      src={apodData.url}
                      title={apodData.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-primary mb-2 font-semibold">{apodData.title}</h3>
                  <p className="body-sm text-on-surface-dim">
                    {apodData.explanation}
                  </p>
                  <p className="text-xs text-on-surface-muted mt-2">{apodData.date}</p>
                </div>
              </>
            ) : (
              <div className="h-48 bg-surface-variant rounded-lg flex items-center justify-center text-on-surface-muted">
                Using default APOD data
              </div>
            )}
          </div>

          {/* Mars Rover Section */}
          <div className="p-8 bg-surface-high rounded-xl ghost-border">
            <h2 className="headline-md font-display font-semibold mb-4 text-primary-container">
              Mars Rover Images
            </h2>
            <MarsGallery />
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
