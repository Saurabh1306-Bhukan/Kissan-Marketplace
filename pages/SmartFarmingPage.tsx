
import React, { useState, useCallback } from 'react';
import { getFarmingAdvice } from '../services/geminiService';
import type { FarmingAdvice } from '../types';
import Spinner from '../components/Spinner';

const WeatherIcon: React.FC<{ weather: string }> = ({ weather }) => {
    // A simple function to guess an icon from text
    const getIcon = () => {
        const w = weather.toLowerCase();
        if (w.includes('sun') || w.includes('clear')) return '☀️';
        if (w.includes('cloud')) return '☁️';
        if (w.includes('rain') || w.includes('monsoon')) return '🌧️';
        if (w.includes('storm')) return '⛈️';
        return '🌍';
    };
    return <span className="text-4xl">{getIcon()}</span>;
};

const SmartFarmingPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<FarmingAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = useCallback(async () => {
    if (!query.trim()) {
      setError("Please enter your query.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAdvice(null);
    try {
      const result = await getFarmingAdvice(query);
      setAdvice(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Farming Assistant</h1>
        <p className="text-gray-600">Get AI-powered crop and weather advice. Ask a question like:</p>
        <p className="text-sm text-brand-brown mt-1">"Suggest crops for monsoon season in Maharashtra with clay soil."</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your region, soil type, and season..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
            rows={3}
          />
          <button
            onClick={handleGetAdvice}
            disabled={isLoading}
            className="bg-brand-green text-white font-bold py-3 px-6 rounded-md hover:bg-brand-green-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : 'Get Advice'}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-8 rounded-md" role="alert">{error}</div>}
      
      {advice && (
        <div className="mt-8 space-y-8">
            {/* Weather Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                   <WeatherIcon weather={advice.weather_summary} />
                   Weather Outlook
                </h2>
                <p className="text-gray-700 leading-relaxed">{advice.weather_summary}</p>
            </div>

            {/* Crop Suggestions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Crop Suggestions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {advice.crop_suggestions.map((crop, index) => (
                        <div key={index} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-brand-green">
                            <h3 className="text-xl font-bold text-brand-green-dark mb-3">{crop.name}</h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li><strong>Sowing Season:</strong> {crop.sowing_season}</li>
                                <li><strong>Soil Suitability:</strong> {crop.soil_suitability}</li>
                                <li><strong>Water Needs:</strong> {crop.water_requirements}</li>
                                <li><strong>Potential Yield:</strong> {crop.potential_yield}</li>
                                <li><strong>Pests/Diseases:</strong> {crop.common_pests_diseases}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SmartFarmingPage;
