// NASA API integration
// This file handles all calls to the NASA API endpoints

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov";

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hour

function getCached(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
}

export interface MarsRoverPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
  };
}

export interface AsteroidData {
  id: string;
  name: string;
  estimated_diameter: {
    km: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: Array<{
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_second: string;
    };
  }>;
  is_potentially_hazardous_asteroid: boolean;
}

export async function fetchAPOD(date?: string): Promise<APODData | null> {
  try {
    const cacheKey = `apod-${date || 'today'}`;
    
    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams({
      api_key: NASA_API_KEY,
      ...(date && { date }),
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `${BASE_URL}/planetary/apod?${params}`,
        { 
          signal: controller.signal,
          next: { revalidate: 86400 }
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error("APOD fetch failed:", response.status, response.statusText);
        return null;
      }

      const data: APODData = await response.json();
      setCache(cacheKey, data);
      return data;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error("APOD fetch timed out after 10 seconds");
      } else {
        console.error("Error fetching APOD:", fetchError.message);
      }
      return null;
    }
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return null;
  }
}

export async function fetchMarsRoverPhotos(rover: string): Promise<MarsRoverPhoto[]> {
  try {
    const cacheKey = `mars-${rover}-1000-1`;
    
    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams({
      api_key: NASA_API_KEY,
      sol: "1000",
      page: "1",
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // Increased to 15 seconds

    try {
      const response = await fetch(
        `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?${params}`,
        { 
          signal: controller.signal,
          next: { revalidate: 86400 }
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error("Mars photos fetch failed:", response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      const photos = data.photos || [];
      setCache(cacheKey, photos);
      return photos;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error("Mars photos fetch timed out after 15 seconds");
      } else {
        console.error("Error fetching Mars photos:", fetchError.message);
      }
      return [];
    }
  } catch (error) {
    console.error("Error fetching Mars photos:", error);
    return [];
  }
}

export async function fetchAsteroids(): Promise<AsteroidData[]> {
  try {
    const cacheKey = "asteroids-browse";
    
    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams({
      api_key: NASA_API_KEY,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        `${BASE_URL}/neo/rest/v1/neo/browse?${params}`,
        { 
          signal: controller.signal,
          next: { revalidate: 86400 }
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error("Asteroids fetch failed:", response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      const asteroids = data.near_earth_objects || [];
      setCache(cacheKey, asteroids);
      return asteroids;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error("Asteroids fetch timed out after 15 seconds");
      } else {
        console.error("Error fetching asteroids:", fetchError.message);
      }
      return [];
    }
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    return [];
  }
}
