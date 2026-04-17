"use client";

import { useEffect, useState } from "react";
import { fetchMarsRoverPhotos, MarsRoverPhoto } from "@/lib/nasa";

// Sample Mars rover data
const SAMPLE_MARS_IMAGES = [
  {
    id: 1,
    img_src: "https://images-assets.nasa.gov/image/PIA23436/PIA23436~thumb.jpg",
    earth_date: "2019-12-25",
    rover: { name: "Curiosity" },
  },
  {
    id: 2,
    img_src: "https://images-assets.nasa.gov/image/PIA23999/PIA23999~thumb.jpg",
    earth_date: "2020-10-18",
    rover: { name: "Perseverance" },
  },
  {
    id: 3,
    img_src: "https://images-assets.nasa.gov/image/PIA23772/PIA23772~thumb.jpg",
    earth_date: "2020-08-04",
    rover: { name: "Curiosity" },
  },
  {
    id: 4,
    img_src: "https://images-assets.nasa.gov/image/PIA03470/PIA03470~thumb.jpg",
    earth_date: "2001-04-15",
    rover: { name: "Rover" },
  },
];

export default function MarsGallery() {
  const [images, setImages] = useState<MarsRoverPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiSuccess, setApiSuccess] = useState(false);

  useEffect(() => {
    async function loadMarsPhotos() {
      try {
        setLoading(true);
        console.log("Fetching Mars rover photos...");
        
        const photos = await fetchMarsRoverPhotos("curiosity");
        
        if (photos && photos.length > 0) {
          console.log(`Fetched ${photos.length} Mars rover photos`);
          setImages(photos.slice(0, 4));
          setApiSuccess(true);
        } else {
          console.warn("No photos fetched, using sample images");
          setImages(SAMPLE_MARS_IMAGES);
          setApiSuccess(false);
        }
      } catch (err) {
        console.error("Failed to load Mars photos:", err);
        setImages(SAMPLE_MARS_IMAGES);
        setApiSuccess(false);
      } finally {
        setLoading(false);
      }
    }

    loadMarsPhotos();
  }, []);

  return (
    <section>
      {!apiSuccess && images.length > 0 && (
        <div className="mb-4 p-2 bg-secondary-container/20 border border-secondary-container rounded-lg text-on-secondary-container text-xs">
          Using sample images - API data coming soon
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div 
              key={`skeleton-${i}`}
              className="rounded-lg overflow-hidden bg-surface-variant min-h-48 animate-pulse"
            />
          ))
        ) : (
          images.map((image, idx) => (
            <div 
              key={image.id}
              className="group relative rounded-lg overflow-hidden bg-surface-variant cursor-pointer min-h-48"
            >
              {/* Image */}
              {image.img_src && (
                <img 
                  src={image.img_src}
                  alt={`Mars rover photo ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dim/10 to-transparent flex items-center justify-center text-on-surface-muted">
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-surface-lowest/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 rounded-lg">
                <h3 className="label-md font-semibold text-on-secondary-container">
                  {image.rover.name}
                </h3>
                <p className="label-sm text-on-surface-muted">
                  {image.earth_date}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
