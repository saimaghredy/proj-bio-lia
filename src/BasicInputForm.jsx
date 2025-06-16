import React, { useState } from 'react';
import LocationSearch from './components/LocationSearch';
import aiWeatherService from './services/aiWeatherService';

const BasicInputForm = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    contact: '',
    location: '',
    coordinates: { lat: null, lng: null },
    cropType: '',
    landArea: '',
    landAreaUnit: 'yards',
    soilType: '',
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationSelect = (locationData) => {
    setFormData(prev => ({
      ...prev,
      location: locationData.formattedAddress,
      coordinates: locationData.location
    }));
  };

  const calculateInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      // Validate mandatory fields
      if (!formData.farmerName) {
        throw new Error('Please enter farmer name');
      }
      if (!formData.contact) {
        throw new Error('Please enter contact number');
      }
      if (!formData.coordinates.lat || !formData.coordinates.lng) {
        throw new Error('Please select a valid location');
      }
      if (!formData.cropType) {
        throw new Error('Please select a crop type');
      }
      if (!formData.landArea) {
        throw new Error('Please enter land area');
      }
      if (!formData.soilType) {
        throw new Error('Please select soil type');
      }

      // Get AI weather predictions
      const weatherData = await aiWeatherService.predictWeather(
        formData.coordinates,
        formData.cropType
      );
      setWeatherData(weatherData);

    } catch (error) {
      console.error('Error calculating insights:', error);
      setError(error.message || 'Failed to calculate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await calculateInsights();
  };

  const isBasicInfoComplete = () => {
    return formData.farmerName && 
           formData.contact && 
           formData.coordinates.lat && 
           formData.coordinates.lng && 
           formData.cropType && 
           formData.landArea &&
           formData.soilType;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-fade-in"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-green-800 mb-2 animate-fade-in">
              Basic Weather Insights
            </h2>
            <p className="text-gray-600 text-lg">Get weather-based farming recommendations</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-600 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Farmer Name */}
              <div className="group">
                <label htmlFor="farmerName" className="block text-gray-700 text-sm font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  Farmer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="farmerName"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
                  placeholder="E.g., Rajesh Kumar"
                  required
                />
              </div>

              {/* Contact */}
              <div className="group">
                <label htmlFor="contact" className="block text-gray-700 text-sm font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
                  placeholder="E.g., 9876543210"
                  required
                />
              </div>

              {/* Location Search */}
              <div className="group md:col-span-2">
                <label htmlFor="location" className="block text-gray-700 text-sm font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  Farm Location <span className="text-red-500">*</span>
                </label>
                <LocationSearch onLocationSelect={handleLocationSelect} />
              </div>

              {/* Crop Type */}
              <div className="group">
                <label htmlFor="cropType" className="block text-gray-700 text-sm font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  Crop Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="cropType"
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none appearance-none bg-white text-gray-900"
                  required
                >
                  <option value="">Select Crop</option>
                  <option value="Chilli">Chilli</option>
                  <option value="Paddy">Paddy</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Tomato">Tomato</option>
                </select>
              </div>

              {/* Land Area */}
              <div className="group">
                <label htmlFor="landArea" className="block text-gray-700 text-sm font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  Land Area <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="landArea"
                    name="landArea"
                    value={formData.landArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
                    placeholder="E.g., 100"
                    required
                  />
                  <div className="relative w-40">
                    <select
                      name="landAreaUnit"
                      value={formData.landAreaUnit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none appearance-none bg-white text-gray-900 pr-10"
                    >
                      <option value="yards">Yards</option>
                      <option value="acres">Acres</option>
                      <option value="hectares">Hectares</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M7 7l3 3 3-3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Type */}
              <div className="group">
                <label htmlFor="soilType" className="block text-gray-700 text-sm font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  Soil Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="soilType"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none appearance-none bg-white text-gray-900"
                  required
                >
                  <option value="">Select Soil Type</option>
                  <option value="Red">Red Soil</option>
                  <option value="Black">Black Soil</option>
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Sandy">Sandy Soil</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className={`w-full mt-8 bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 mr-2 text-[#2f3a29]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Get Weather Insights
              </button>
            </div>

            {/* Weather Insights Display */}
            {weatherData && (
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Weather Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-green-700">Current Weather</p>
                    <p className="text-gray-600">
                      Temperature: {weatherData.current.temperature}°C<br />
                      Humidity: {weatherData.current.humidity}%<br />
                      Rainfall: {weatherData.current.rainfall}mm
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-green-700">Weather Alerts</p>
                    <p className="text-gray-600">{weatherData.alerts}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInputForm; 