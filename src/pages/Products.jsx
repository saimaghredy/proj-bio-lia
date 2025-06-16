import React from 'react';

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      {/* Header Section */}
      <section className="w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2f3a29] font-light mb-6 animate-fade-in">
          Our Products
        </h1>
        <p className="text-xl text-[#2f3a29] max-w-3xl mx-auto mb-8 font-jakarta">
          Innovative solutions derived from rare plant molecules for agriculture and human wellness.
        </p>
      </section>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agricultural Products */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-[#2f3a29] mb-4">Agricultural Solutions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-[#f4f1ee] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">Soil Regenerator</h3>
                <p className="text-gray-600 mb-3">
                  Advanced plant-based formula that restores soil microbiome and enhances nutrient availability.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Increases soil organic matter by 30%
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Improves water retention capacity
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Enhances beneficial microbial activity
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#f4f1ee] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">Crop Enhancer</h3>
                <p className="text-gray-600 mb-3">
                  Natural bioactive compounds that boost crop resilience and yield.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Increases crop yield by 25-40%
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Enhances disease resistance
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Improves nutritional content
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#f4f1ee] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">Plant Defense System</h3>
                <p className="text-gray-600 mb-3">
                  Natural plant protection against pests and diseases without harmful chemicals.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    100% organic and biodegradable
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Safe for beneficial insects
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Long-lasting protection
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pharmaceutical Products */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-[#2f3a29] mb-4">Wellness Solutions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-[#f4f1ee] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">Natural APIs</h3>
                <p className="text-gray-600 mb-3">
                  High-purity active pharmaceutical ingredients derived from rare medicinal plants.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Anti-inflammatory compounds
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Antioxidant molecules
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Immunomodulatory agents
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#f4f1ee] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">Nutraceuticals</h3>
                <p className="text-gray-600 mb-3">
                  Functional food ingredients that provide health benefits beyond basic nutrition.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Digestive health support
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Cognitive enhancement
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Stress management
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#f4f1ee] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">Cosmeceuticals</h3>
                <p className="text-gray-600 mb-3">
                  Plant-based active ingredients for advanced skincare and cosmetic applications.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Anti-aging compounds
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Skin brightening agents
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Natural preservatives
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#a4be88] to-[#d7e7c4] rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-serif text-[#2f3a29] mb-4">
            Interested in Our Products?
          </h2>
          <p className="text-lg text-[#2f3a29] mb-6">
            Contact us to learn more about our innovative solutions and how they can benefit your business.
          </p>
          <button className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all hover:scale-105">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;