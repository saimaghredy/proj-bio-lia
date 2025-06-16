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
        )}&limit=5`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
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
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-bio-green focus:ring-2 focus:ring-bio-green/20 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
        placeholder="Search for a location..."
      />
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
        <div className="absolute left-0 right-0 mt-1 p-2 bg-red-50 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-bio-green/10 cursor-pointer text-sm"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.formattedAddress}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch; 