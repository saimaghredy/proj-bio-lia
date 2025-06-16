import React, { useState, useEffect } from 'react';

const LocationSearch = ({ onLocationSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&countrycodes=in`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'Bio Lia Weather App'
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location suggestions');
      }

      const data = await response.json();
      const formattedSuggestions = data.map((item) => ({
        formattedAddress: item.display_name,
        location: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        },
      }));

      setSuggestions(formattedSuggestions);
    } catch (err) {
      setError('Failed to fetch location suggestions. Please try again.');
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.length >= 3) {
        fetchSuggestions(input);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion.formattedAddress);
    setSuggestions([]);
    onLocationSelect(suggestion);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
          placeholder="Search for your farm location..."
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {loading && (
        <div className="absolute right-3 top-3 text-gray-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      
      {error && (
        <div className="absolute left-0 right-0 mt-1 p-2 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="px-4 py-3 hover:bg-[#a4be88]/10 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 transition-colors"
              onClick={() => handleSelect(suggestion)}
            >
              <div className="flex items-start">
                <svg className="h-4 w-4 text-[#a4be88] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{suggestion.formattedAddress}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;