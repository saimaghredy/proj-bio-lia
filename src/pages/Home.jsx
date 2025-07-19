import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-serif text-[#2f3a29] font-light mb-6 text-center leading-tight opacity-0 animate-fade-in-slow">
          Organic Farming<br />Solutions for Higher Yields
        </h1>
        <p className="text-xl md:text-2xl text-[#2f3a29] max-w-3xl text-center mb-8 font-jakarta">
          Transform your farm with our scientifically proven organic products. Increase yields by 30-40% while maintaining soil health and crop quality naturally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/farmer-support" 
            className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#a4be88] focus:outline-none text-center"
          >
            Get Free Farm Consultation
          </Link>
          <Link 
            to="/products" 
            className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#2f3a29] focus:outline-none text-center"
          >
            View Products
          </Link>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-[#2f3a29] text-center mb-12">
            Proven Results from Real Farmers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-[#f4f1ee] rounded-xl">
              <div className="text-4xl font-bold text-[#a4be88] mb-2">40%</div>
              <div className="text-lg font-semibold text-[#2f3a29] mb-2">Yield Increase</div>
              <p className="text-gray-600">Average yield improvement in tomato crops using our bio-stimulants</p>
            </div>
            <div className="text-center p-6 bg-[#f4f1ee] rounded-xl">
              <div className="text-4xl font-bold text-[#a4be88] mb-2">85%</div>
              <div className="text-lg font-semibold text-[#2f3a29] mb-2">Pest Reduction</div>
              <p className="text-gray-600">Natural pest control effectiveness with our botanical solutions</p>
            </div>
            <div className="text-center p-6 bg-[#f4f1ee] rounded-xl">
              <div className="text-4xl font-bold text-[#a4be88] mb-2">10,000+</div>
              <div className="text-lg font-semibold text-[#2f3a29] mb-2">Happy Farmers</div>
              <p className="text-gray-600">Farmers across India trust our organic solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4 bg-[#f4f1ee]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-[#2f3a29] text-center mb-12">
            Complete Organic Farm Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Plant Protectants", desc: "Natural pest and disease control", icon: "🛡️" },
              { title: "Bio-Stimulants", desc: "Growth enhancement and metabolism support", icon: "🌱" },
              { title: "Bio-Fertilizers", desc: "Nutrient mobilization and soil health", icon: "🌿" },
              { title: "Immunity Boosters", desc: "Stress resistance enhancement", icon: "💪" },
              { title: "Flowering Enhancers", desc: "Improve yield and fruit setting", icon: "🌸" },
              { title: "Soil Conditioners", desc: "Improve soil texture and microbial life", icon: "🌍" }
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.desc}</p>
                <Link to="/products" className="text-[#a4be88] hover:text-[#2f3a29] font-semibold">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#a4be88] to-[#d7e7c4]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#2f3a29] mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-[#2f3a29] mb-8">
            Get personalized recommendations for your crops and soil type. Our experts will guide you to the best organic solutions.
          </p>
          <Link 
            to="/farmer-support" 
            className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold px-10 py-4 rounded-lg shadow-lg transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#2f3a29] focus:outline-none inline-block"
          >
            Get Free Expert Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;