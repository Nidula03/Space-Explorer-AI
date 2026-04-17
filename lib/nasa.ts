// Backend API integration
// This file handles all calls to the Space Explorer AI backend

const BACKEND_URL = "http://localhost:8080/api/space";

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

export interface SearchResult {
  id: string;
  title: string;
  image_url: string;
  description: string;
}

export interface Planet {
  id: string;
  name: string;
  description: string;
  image_url: string;
  diameter?: string;
  distance_from_sun?: string;
}

export interface AIExplanation {
  question: string;
  explanation: string;
  sources?: string[];
}

// APOD Endpoint
export async function fetchAPOD(): Promise<APODData | null> {
  try {
    const cacheKey = "apod-today";
    
    const cached = getCached(cacheKey);
    if (cached) {
      console.log("✅ APOD cache hit - instant load");
      return cached;
    }

    const startTime = Date.now();
    console.log("🔄 Fetching APOD from backend...", BACKEND_URL);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // Increased to 20 seconds for NASA API

    try {
      const response = await fetch(`${BACKEND_URL}/apod`, { 
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      if (!response.ok) {
        console.error(`❌ APOD fetch failed (${duration}ms):`, response.status, response.statusText);
        return null;
      }

      const jsonData = await response.json();
      const data = jsonData.data || jsonData;
      console.log(`✅ APOD loaded (${duration}ms):`, data?.title);
      setCache(cacheKey, data);
      return data;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      if (fetchError.name === 'AbortError') {
        console.error(`⏱️ APOD fetch timeout (${duration}ms)`);
      } else {
        console.error(`❌ APOD fetch error (${duration}ms):`, fetchError.message);
        console.error('⚠️  Is backend running at', BACKEND_URL, '?');
      }
      return null;
    }
  } catch (error) {
    console.error("❌ Error in fetchAPOD:", error);
    return null;
  }
}

// Search Endpoint
export async function searchImages(query: string): Promise<SearchResult[]> {
  try {
    const cacheKey = `search-${query}`;
    
    const cached = getCached(cacheKey);
    if (cached) {
      console.log("✅ Search cache hit");
      return cached;
    }

    const startTime = Date.now();
    console.log("🔄 Searching images...");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(`${BACKEND_URL}/search?query=${encodeURIComponent(query)}`, { 
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      if (!response.ok) {
        console.error(`❌ Search failed (${duration}ms):`, response.status, response.statusText);
        return [];
      }

      const jsonData = await response.json();
      const results = jsonData.data || [];
      console.log(`✅ Search completed (${duration}ms): ${results.length} results`);
      setCache(cacheKey, results);
      return results;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      if (fetchError.name === 'AbortError') {
        console.error(`⏱️ Search timeout (${duration}ms)`);
      } else {
        console.error(`❌ Search error (${duration}ms):`, fetchError.message);
        console.error('⚠️  Is backend running at', BACKEND_URL, '?');
      }
      return [];
    }
  } catch (error) {
    console.error("❌ Error in searchImages:", error);
    return [];
  }
}

// Planets Endpoint
export async function fetchPlanets(): Promise<Planet[]> {
  try {
    const cacheKey = "planets";
    
    const cached = getCached(cacheKey);
    if (cached) {
      console.log("✅ Planets cache hit");
      return cached;
    }

    const startTime = Date.now();
    console.log("🔄 Fetching planets...");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(`${BACKEND_URL}/planets`, { 
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      if (!response.ok) {
        console.error(`❌ Planets fetch failed (${duration}ms):`, response.status, response.statusText);
        return [];
      }

      const jsonData = await response.json();
      const planets = jsonData.data || [];
      console.log(`✅ Planets loaded (${duration}ms): ${planets.length} planets`);
      setCache(cacheKey, planets);
      return planets;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      if (fetchError.name === 'AbortError') {
        console.error(`⏱️ Planets fetch timeout (${duration}ms)`);
      } else {
        console.error(`❌ Planets fetch error (${duration}ms):`, fetchError.message);
        console.error('⚠️  Is backend running at', BACKEND_URL, '?');
      }
      return [];
    }
  } catch (error) {
    console.error("❌ Error in fetchPlanets:", error);
    return [];
  }
}

// AI Explainer Endpoint
export async function explainSpace(question: string): Promise<AIExplanation | null> {
  try {
    const startTime = Date.now();
    console.log("🔄 Getting AI explanation...");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${BACKEND_URL}/ai-explain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: question }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      if (!response.ok) {
        console.error(`❌ AI explanation failed (${duration}ms):`, response.status, response.statusText);
        return null;
      }

      const jsonData = await response.json();
      const explanation = jsonData.data;
      console.log(`✅ AI explanation loaded (${duration}ms)`);
      return explanation ? { question, explanation: explanation.explanation, sources: explanation.sources } : null;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      if (fetchError.name === 'AbortError') {
        console.error(`⏱️ AI explanation timeout (${duration}ms)`);
      } else {
        console.error(`❌ AI explanation error (${duration}ms):`, fetchError.message);
        console.error('⚠️  Is backend running at', BACKEND_URL, '?');
      }
      return null;
    }
  } catch (error) {
    console.error("❌ Error in explainSpace:", error);
    return null;
  }
}

// Asteroids Endpoint (keeping for backward compatibility)
export async function fetchAsteroids() {
  return [];
}
