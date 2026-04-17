"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { fetchAPOD, APODData, searchImages, SearchResult, fetchPlanets, Planet, explainSpace, AIExplanation } from "@/lib/nasa";

export default function Dashboard() {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<AIExplanation | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Fetch APOD
        console.log("Fetching APOD data...");
        const apod = await fetchAPOD();
        if (apod) {
          console.log("APOD data fetched:", apod.title);
          setApodData(apod);
        } else {
          console.warn("APOD fetch returned null");
          setApodData(null);
        }

        // Fetch Planets
        console.log("Fetching Planets data...");
        const planetsData = await fetchPlanets();
        setPlanets(planetsData);
      } catch (err) {
        console.error("Failed to load data:", err);
        setApodData(null);
        setPlanets([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setSearching(true);
      console.log("Searching for:", searchQuery);
      const results = await searchImages(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleAIExplain = async () => {
    if (!aiQuestion.trim()) return;
    
    try {
      setAiLoading(true);
      console.log("Getting AI explanation for:", aiQuestion);
      const response = await explainSpace(aiQuestion);
      setAiResponse(response);
      setAiQuestion("");
    } catch (err) {
      console.error("AI explanation failed:", err);
      setAiResponse(null);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-surface-lowest pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="display-md font-display font-bold mb-2 text-on-surface">
            Space Explorer AI
          </h1>
          <p className="body-lg text-on-surface-dim">
            Explore the cosmos with AI-powered insights
          </p>
        </div>

        {/* APOD Section */}
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
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-primary mb-4">{apodData.title}</h3>
                <p className="text-on-surface-dim leading-relaxed mb-4">
                  {apodData.explanation}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary-fixed px-3 py-1 rounded-full">
                    {apodData.date}
                  </span>
                </div>
              </div>

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
                    <span className="text-on-surface-muted">Video content</span>
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

        {/* Planets Section */}
        {planets.length > 0 && (
          <div className="mb-12">
            <h2 className="headline-md font-display font-semibold mb-6 text-primary-container">
              Planets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planets.map((planet, idx) => (
                <div key={planet.id || `planet-${idx}`} className="p-6 bg-surface-high rounded-xl ghost-border hover:bg-surface-high/80 transition-all overflow-hidden group">
                  <div className="h-48 rounded-lg overflow-hidden mb-4 bg-surface-variant">
                    <img 
                      src={planet.image_url}
                      alt={planet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Ccircle cx='150' cy='150' r='140' fill='%231a237e'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{planet.name}</h3>
                  <p className="text-on-surface-dim text-sm leading-relaxed mb-4">{planet.description}</p>
                  <div className="space-y-1 text-xs text-on-surface-muted">
                    {planet.diameter && <p>📏 Diameter: {planet.diameter}</p>}
                    {planet.distance_from_sun && <p>☀️ Distance: {planet.distance_from_sun}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="p-8 bg-surface-high rounded-xl ghost-border mb-12">
          <h2 className="headline-md font-display font-semibold mb-6 text-primary-container">
            Image Search
          </h2>
          <div className="flex gap-3 mb-8">
            <input
              type="text"
              placeholder="Search for images (e.g. mars, moon, galaxy)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-3 bg-surface-lowest rounded-lg border border-primary/30 text-on-surface placeholder-on-surface-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((result, idx) => (
                <div key={result.id || `search-${idx}`} className="bg-surface-lowest rounded-lg overflow-hidden group hover:shadow-lg transition-all">
                  <div className="h-40 bg-surface-variant overflow-hidden">
                    <img 
                      src={result.image_url}
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23282934' width='300' height='300'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary mb-2 truncate">{result.title}</h3>
                    <p className="text-on-surface-dim text-sm line-clamp-2">{result.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Explainer Section */}
        <div className="p-8 bg-surface-high rounded-xl ghost-border">
          <h2 className="headline-md font-display font-semibold mb-6 text-primary-container">
            Ask Space AI
          </h2>
          <div className="mb-8">
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Ask about space (e.g. What is a black hole?)"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAIExplain()}
                className="flex-1 px-4 py-3 bg-surface-lowest rounded-lg border border-primary/30 text-on-surface placeholder-on-surface-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={handleAIExplain}
                disabled={aiLoading || !aiQuestion.trim()}
                className="px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? "Explaining..." : "Explain"}
              </button>
            </div>

            {aiResponse && (
              <div className="p-6 bg-surface-lowest rounded-lg border-l-4 border-primary-container">
                <h3 className="text-lg font-semibold text-primary mb-3">{aiResponse.question}</h3>
                <p className="text-on-surface-dim leading-relaxed mb-4">{aiResponse.explanation}</p>
                {aiResponse.sources && aiResponse.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-xs text-on-surface-muted font-semibold mb-2">SOURCES:</p>
                    <ul className="text-xs text-on-surface-muted space-y-1">
                      {aiResponse.sources.map((source, idx) => (
                        <li key={idx}>• {source}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
