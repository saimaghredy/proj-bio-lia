import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-serif text-[#2f3a29] font-light mb-6 text-center leading-tight opacity-0 animate-fade-in-slow">
          Plant Molecules<br />engineered for impact.
        </h1>
        <p className="text-xl md:text-2xl text-[#2f3a29] max-w-2xl text-center mb-8 font-jakarta">
          Bio Lia bridges traditional farming wisdom and modern biotech with rare plant-based molecules that regenerate soil, enhance crop health, and deliver natural APIs for both agriculture and human healing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/about" 
            className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#a4be88] focus:outline-none text-center"
          >
            Learn More
          </Link>
          <Link 
            to="/weather-insights" 
            className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#2f3a29] focus:outline-none text-center"
          >
            Weather Insights
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#f4f1ee]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-[#2f3a29] text-center mb-12">
            Our Impact Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">Soil Regeneration</h3>
              <p className="text-gray-600 text-center">
                Advanced plant molecules that restore soil health and enhance nutrient availability for sustainable farming.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">Crop Enhancement</h3>
              <p className="text-gray-600 text-center">
                Bioactive compounds that boost crop resilience, yield, and nutritional value through natural processes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">Human Wellness</h3>
              <p className="text-gray-600 text-center">
                Natural APIs derived from rare plants for pharmaceutical and nutraceutical applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#a4be88] to-[#d7e7c4]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#2f3a29] mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-[#2f3a29] mb-8">
            Get personalized weather insights and farming recommendations powered by AI.
          </p>
          <Link 
            to="/weather-insights" 
            className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-10 py-4 rounded-lg shadow-lg transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#2f3a29] focus:outline-none inline-block"
          >
            Get Weather Insights
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;