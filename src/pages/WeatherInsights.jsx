import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LocationSearch from '../components/LocationSearch';
import aiWeatherService from '../services/aiWeatherService';
import optimizedDatabase from '../services/optimizedSupabaseDatabase';

const WeatherInsights = () => {
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

  // Load form draft on component mount
  React.useEffect(() => {
    const draft = optimizedDatabase.getFormDraft('weatherInsights');
    if (draft) {
      setFormData(prev => ({ ...prev, ...draft }));
    }
  }, []);

  // Save form draft on changes
  React.useEffect(() => {
    if (formData.farmerName || formData.contact || formData.location) {
      optimizedDatabase.saveFormDraft('weatherInsights', formData);
    }
  }, [formData]);

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
    
    // Clear form draft on successful submission
    optimizedDatabase.clearFormDraft('weatherInsights');
    
    await calculateInsights();
  };

  return (
    <div>
      {/* Hero Section - Similar to Home */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-serif text-[#2f3a29] font-light mb-6 text-center leading-tight opacity-0 animate-fade-in-slow">
          Smart Weather<br />Insights for Farmers
        </h1>
        <p className="text-xl md:text-2xl text-[#2f3a29] max-w-3xl text-center mb-8 font-jakarta">
          Get personalized weather-based farming recommendations powered by AI and real-time data to optimize your crop management and maximize yields.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => document.getElementById('insights-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#a4be88] focus:outline-none text-center"
          >
            Get Started
          </button>
          <Link 
            to="/about" 
            className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#2f3a29] focus:outline-none text-center"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#f4f1ee]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-[#2f3a29] text-center mb-12">
            Why Choose Our Weather Insights?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">Real-Time Data</h3>
              <p className="text-gray-600 text-center">
                Access live weather data and forecasts specific to your farm location for accurate decision making.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">Crop-Specific Advice</h3>
              <p className="text-gray-600 text-center">
                Get tailored recommendations based on your specific crop type, soil conditions, and local weather patterns.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">AI-Powered Insights</h3>
              <p className="text-gray-600 text-center">
                Leverage artificial intelligence to predict optimal farming activities and prevent weather-related crop damage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="insights-form" className="py-20 px-4 bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-[#2f3a29] mb-4">
              Get Your Personalized Weather Insights
            </h2>
            <p className="text-xl text-[#2f3a29] max-w-2xl mx-auto">
              Fill in your farm details below to receive customized weather recommendations
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl animate-fade-in"
          >
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
                  <label htmlFor="farmerName" className="block text-[#2f3a29] text-sm font-semibold mb-2 group-hover:text-[#a4be88] transition-colors">
                    Farmer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="farmerName"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
                    placeholder="E.g., Rajesh Kumar"
                    required
                  />
                </div>

                {/* Contact */}
                <div className="group">
                  <label htmlFor="contact" className="block text-[#2f3a29] text-sm font-semibold mb-2 group-hover:text-[#a4be88] transition-colors">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
                    placeholder="E.g., 9876543210"
                    required
                  />
                </div>

                {/* Location Search */}
                <div className="group md:col-span-2">
                  <label htmlFor="location" className="block text-[#2f3a29] text-sm font-semibold mb-2 group-hover:text-[#a4be88] transition-colors">
                    Farm Location <span className="text-red-500">*</span>
                  </label>
                  <LocationSearch onLocationSelect={handleLocationSelect} />
                </div>

                {/* Crop Type */}
                <div className="group">
                  <label htmlFor="cropType" className="block text-[#2f3a29] text-sm font-semibold mb-2 group-hover:text-[#a4be88] transition-colors">
                    Crop Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="cropType"
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Crop</option>
                    <option value="Chilli">Chilli</option>
                    <option value="Paddy">Paddy</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Maize">Maize</option>
                    <option value="Soybean">Soybean</option>
                  </select>
                </div>

                {/* Land Area */}
                <div className="group">
                  <label htmlFor="landArea" className="block text-[#2f3a29] text-sm font-semibold mb-2 group-hover:text-[#a4be88] transition-colors">
                    Land Area <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      id="landArea"
                      name="landArea"
                      value={formData.landArea}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
                      placeholder="E.g., 100"
                      required
                    />
                    <div className="relative w-40">
                      <select
                        name="landAreaUnit"
                        value={formData.landAreaUnit}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white text-gray-900 pr-10"
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
                  <label htmlFor="soilType" className="block text-[#2f3a29] text-sm font-semibold mb-2 group-hover:text-[#a4be88] transition-colors">
                    Soil Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="soilType"
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Soil Type</option>
                    <option value="Red">Red Soil</option>
                    <option value="Black">Black Soil</option>
                    <option value="Alluvial">Alluvial Soil</option>
                    <option value="Sandy">Sandy Soil</option>
                    <option value="Clay">Clay Soil</option>
                    <option value="Loamy">Loamy Soil</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className={`w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                  disabled={loading}
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5 mr-2 text-[#2f3a29]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {loading ? 'Analyzing Weather Data...' : 'Get Weather Insights'}
                </button>
              </div>

              {/* Weather Insights Display */}
              {weatherData && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-[#2f3a29] mb-2">
                      Weather Insights for {formData.farmerName}
                    </h3>
                    <p className="text-gray-600">Based on your location: {formData.location}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200">
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <h4 className="font-semibold text-blue-800">Current Weather</h4>
                      </div>
                      <div className="space-y-2 text-blue-700">
                        <p><span className="font-medium">Temperature:</span> {weatherData.current.temperature}°C</p>
                        <p><span className="font-medium">Humidity:</span> {weatherData.current.humidity}%</p>
                        <p><span className="font-medium">Rainfall:</span> {weatherData.current.rainfall}mm</p>
                        <p><span className="font-medium">Condition:</span> {weatherData.current.description}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-sm border border-amber-200">
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h4 className="font-semibold text-amber-800">Weather Alerts</h4>
                      </div>
                      <p className="text-amber-700">{weatherData.alerts}</p>
                    </div>
                  </div>

                  {weatherData.recommendations && weatherData.recommendations.length > 0 && (
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200">
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h4 className="font-semibold text-green-800">Personalized Recommendations</h4>
                      </div>
                      <ul className="text-green-700 space-y-2">
                        {weatherData.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {weatherData.forecast && weatherData.forecast.length > 0 && (
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200">
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <h4 className="font-semibold text-purple-800">5-Day Forecast</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {weatherData.forecast.map((day, index) => (
                          <div key={index} className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm font-medium text-purple-800 mb-1">
                              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                            <p className="text-lg font-bold text-purple-700">{day.temperature}°C</p>
                            <p className="text-xs text-purple-600 capitalize">{day.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#a4be88] to-[#d7e7c4]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#2f3a29] mb-6">
            Ready to Optimize Your Farming?
          </h2>
          <p className="text-xl text-[#2f3a29] mb-8">
            Join thousands of farmers who are already using our weather insights to improve their crop yields and reduce risks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-10 py-4 rounded-lg shadow-lg transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#2f3a29] focus:outline-none inline-block"
            >
              Explore Our Products
            </Link>
            <Link 
              to="/contact" 
              className="bg-white hover:bg-gray-50 text-[#2f3a29] font-semibold px-10 py-4 rounded-lg shadow-lg transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-white focus:outline-none inline-block border-2 border-[#2f3a29]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherInsights;