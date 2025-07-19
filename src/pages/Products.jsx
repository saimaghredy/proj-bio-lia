import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const productCategories = [
    {
      title: "Plant Protectants",
      purpose: "Pest and disease control",
      products: ["BOXER", "COMET"],
      icon: "🛡️",
      description: "Natural protection against pests and diseases while maintaining crop health"
    },
    {
      title: "Bio-Stimulants", 
      purpose: "Growth enhancement and plant metabolism support",
      products: ["LEO", "PANGEO", "SPRINT"],
      icon: "🌱",
      description: "Boost plant growth, metabolism and stress resistance naturally"
    },
    {
      title: "Bio-Fertilizers",
      purpose: "Nutrient mobilization and soil health",
      products: ["PSB", "Azospirillum", "Mycorrhiza"],
      icon: "🌿",
      description: "Enhance soil fertility and nutrient availability through beneficial microorganisms"
    },
    {
      title: "Immunity Boosters",
      purpose: "Stress resistance and immunity enhancement", 
      products: ["TRIMAX", "VIGORAX"],
      icon: "💪",
      description: "Strengthen plant immunity against environmental stress and diseases"
    },
    {
      title: "Flowering & Fruiting Enhancers",
      purpose: "Improve yield and fruit setting",
      products: ["BLOOMX", "FRUITSET PLUS"],
      icon: "🌸",
      description: "Maximize flowering, fruit setting and overall yield quality"
    },
    {
      title: "Soil Conditioners",
      purpose: "Improve soil texture, carbon, and microbial life",
      products: ["Biochar blends", "Humic/Fulvic Acid"],
      icon: "🌍",
      description: "Enhance soil structure, water retention and microbial activity"
    },
    {
      title: "Neem-based Botanicals",
      purpose: "Natural pest deterrents",
      products: ["NEEM SHIELD", "BIOGUARD"],
      icon: "🌳",
      description: "Eco-friendly pest control using traditional neem-based formulations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      {/* Header Section */}
      <section className="w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2f3a29] font-light mb-6 animate-fade-in">
          Organic Farm Solutions
        </h1>
        <p className="text-xl text-[#2f3a29] max-w-3xl mx-auto mb-8 font-jakarta">
          Complete range of scientifically proven organic products for sustainable farming and higher yields
        </p>
        <Link 
          to="/farmer-support"
          className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#a4be88] focus:outline-none"
        >
          Get Product Recommendations
        </Link>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              {/* Category Header */}
              <div className="h-32 bg-gradient-to-br from-[#a4be88] to-[#d7e7c4] flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="text-white font-semibold text-sm">{category.purpose}</p>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2f3a29] mb-3">{category.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{category.description}</p>
                
                {/* Example Products */}
                <div className="mb-4">
                  <h4 className="font-semibold text-[#2f3a29] text-sm mb-2">Example Products:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.products.map((product, idx) => (
                      <span key={idx} className="bg-[#f4f1ee] text-[#2f3a29] px-3 py-1 rounded-full text-xs font-medium">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/farmer-support"
                  className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-4 rounded-lg transition-all text-center block"
                >
                  Get Recommendations
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-serif text-[#2f3a29] mb-4">
            Need Help Choosing the Right Products?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our agricultural experts will analyze your farm conditions, crop type, and soil health to recommend the perfect combination of organic products for maximum yield.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farmer-support"
              className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg transition-all text-lg hover:scale-105"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/contact"
              className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-8 py-4 rounded-lg transition-all text-lg hover:scale-105"
            >
              Contact Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;