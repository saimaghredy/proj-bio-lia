import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    {
      name: "Foundation Mix",
      tagline: "Build your soil from the roots up",
      icon: "🌱",
      category: "Soil Conditioner",
      use: "Improves soil structure, porosity, microbial activity, water retention",
      packaging: "30kg / 50kg",
      dosage: "30-50kg per acre",
      stage: "Land preparation stage"
    },
    {
      name: "AF-NPK",
      tagline: "Nutrients that go beyond NPK",
      icon: "⚡",
      category: "Bio-Fertilizer",
      use: "Balanced macro & micronutrients, improves uptake & efficiency",
      packaging: "1L",
      dosage: "1L per acre",
      stage: "Vegetative stage"
    },
    {
      name: "Rhizobium",
      tagline: "Seed coating that powers pulses",
      icon: "🫘",
      category: "Bio-Inoculant",
      use: "Nitrogen-fixing bacteria for legumes. Enhances germination & nodulation",
      packaging: "100mL / 250mL",
      dosage: "100-200mL per acre",
      stage: "Seed coating before sowing"
    },
    {
      name: "LEO",
      tagline: "Tonic for flowering and fruiting",
      icon: "🌸",
      category: "Growth Enhancer",
      use: "Boosts flower initiation, fruit size, setting, flowering duration",
      packaging: "250mL / 500mL / 1L",
      dosage: "250-500mL per acre",
      stage: "Flowering stage"
    },
    {
      name: "NORA",
      tagline: "Support for stressed crops",
      icon: "💪",
      category: "Stress Reliever",
      use: "Heat/drought tolerance, faster recovery, immunity boost",
      packaging: "250mL / 500mL",
      dosage: "250-500mL per acre",
      stage: "Abiotic stress / mid-season recovery"
    },
    {
      name: "Soil Sterilizer",
      tagline: "Cleaner soil, stronger starts",
      icon: "🛡️",
      category: "Soil Treatment",
      use: "Kills harmful pathogens while preserving good microbes",
      packaging: "10kg / 25kg",
      dosage: "10-20kg per acre",
      stage: "Before sowing or transplanting"
    }
  ];

  const packageKits = [
    {
      name: "Paddy Grower Kit",
      icon: "🌾",
      contents: "Foundation Mix, AF-NPK, NORA, LEO",
      bestFor: "Kharif & Rabi Paddy, wet & dryland",
      coverage: "1 acre",
      popular: true
    },
    {
      name: "Pulses Starter Kit",
      icon: "🫘",
      contents: "Soil Sterilizer, Rhizobium, Foundation Mix, LEO",
      bestFor: "Toor, Green Gram, Black Gram, Cowpea",
      coverage: "1 acre"
    },
    {
      name: "Dryland Vegetable Bundle",
      icon: "🍅",
      contents: "Foundation Mix, AF-NPK, NORA, LEO",
      bestFor: "Tomato, Brinjal, Chilli, Okra, Cucumber",
      coverage: "1 acre"
    },
    {
      name: "Orchard Care Kit",
      icon: "🌳",
      contents: "Foundation Mix, AF-NPK, LEO, NORA, Drone Option",
      bestFor: "Mango, Guava, Citrus, Pomegranate",
      coverage: "1 acre",
      premium: true
    }
  ];

  const cropRecommendations = [
    { crop: "Paddy", kit: "Paddy Grower Kit", icon: "🌾" },
    { crop: "Red Gram", kit: "Pulses Starter Kit", icon: "🫘" },
    { crop: "Chilli", kit: "Dryland Vegetable Bundle", icon: "🌶️" },
    { crop: "Mango", kit: "Orchard Care Kit", icon: "🥭" }
  ];

  const stageWiseInputs = [
    { stage: "Soil Prep", input: "Foundation Mix + Soil Sterilizer", icon: "🌱" },
    { stage: "Sowing/Seeding", input: "Rhizobium (Pulses only)", icon: "🌰" },
    { stage: "Early Growth", input: "AF-NPK", icon: "⚡" },
    { stage: "Flowering", input: "LEO", icon: "🌸" },
    { stage: "Stress Period", input: "NORA", icon: "💪" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100">
      {/* Header Section */}
      <section className="w-full py-20 px-4 text-center bg-gradient-to-br from-forest-900 via-olive-800 to-forest-800">
        <h1 className="text-5xl md:text-6xl font-serif text-white font-light mb-6 animate-fade-in">
          Bio-Organic <span className="text-sage-300">Product Range</span>
        </h1>
        <p className="text-xl text-earth-200 max-w-4xl mx-auto mb-8 font-jakarta">
          Scientifically formulated, field-tested solutions for sustainable farming and higher yields across South India
        </p>
        <Link 
          to="/farmer-support"
          className="bg-gradient-to-r from-sage-400 to-sage-300 hover:from-sage-300 hover:to-sage-200 text-forest-800 font-bold px-10 py-4 rounded-xl shadow-2xl transition-all text-lg hover:scale-110 focus:ring-4 focus:ring-sage-400 focus:outline-none"
        >
          Get Product Recommendations
        </Link>
      </section>

      {/* Individual Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-forest-800 mb-6">
              Individual Products
            </h2>
            <p className="text-xl text-forest-700 max-w-3xl mx-auto">
              Each product is designed to address specific agricultural needs and growth stages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-sage-400 to-earth-300 flex items-center justify-center">
                  <div className="text-5xl">{product.icon}</div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-forest-800">{product.name}</h3>
                    <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full font-semibold">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-sage-600 font-semibold mb-3 italic text-sm">"{product.tagline}"</p>
                  <p className="text-forest-600 mb-4 text-sm leading-relaxed">{product.use}</p>
                  
                  <div className="space-y-2 mb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold text-forest-800">Packaging:</span>
                      <span className="text-forest-600">{product.packaging}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-forest-800">Dosage:</span>
                      <span className="text-forest-600">{product.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-forest-800">Best Stage:</span>
                      <span className="text-sage-600 font-medium">{product.stage}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/farmer-support"
                    className="w-full bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm text-center block"
                  >
                    Get This Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stage-Wise Application Guide */}
      <section className="py-20 px-4 bg-gradient-to-br from-earth-50 to-sage-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-forest-800 mb-6">
              Stage-Wise Application Guide
            </h2>
            <p className="text-xl text-forest-700 max-w-3xl mx-auto">
              Apply the right product at the right time for maximum effectiveness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {stageWiseInputs.map((stage, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-earth-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-3xl">{stage.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-forest-800 mb-2">{stage.stage}</h3>
                <p className="text-forest-600 text-sm leading-relaxed">{stage.input}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Kits Section */}
      <section id="bundles" className="py-20 px-4 bg-gradient-to-br from-forest-900 via-olive-800 to-forest-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-white mb-6">
              Ready-to-Use <span className="text-sage-300">Package Kits</span>
            </h2>
            <p className="text-xl text-earth-200 max-w-3xl mx-auto">
              Pre-packaged combinations for specific crops - everything you need in one kit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packageKits.map((kit, index) => (
              <div key={index} className={`bg-white rounded-3xl shadow-2xl hover:shadow-sage-400/20 transition-all duration-500 hover:scale-105 overflow-hidden ${kit.popular ? 'ring-4 ring-sage-400' : ''} ${kit.premium ? 'ring-4 ring-earth-300' : ''} relative`}>
                {kit.popular && (
                  <div className="absolute top-4 right-4 bg-sage-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}
                {kit.premium && (
                  <div className="absolute top-4 right-4 bg-earth-300 text-forest-800 px-3 py-1 rounded-full text-sm font-bold z-10">
                    Premium
                  </div>
                )}
                
                <div className="h-32 bg-gradient-to-br from-sage-400 to-earth-300 flex items-center justify-center">
                  <div className="text-5xl">{kit.icon}</div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-forest-800 mb-3">{kit.name}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-forest-800 text-sm mb-2">Contents:</h4>
                    <p className="text-forest-600 text-sm">{kit.contents}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-forest-800 text-sm mb-2">Best For:</h4>
                    <p className="text-forest-600 text-sm">{kit.bestFor}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center bg-sage-100 rounded-lg p-3">
                      <span className="font-semibold text-forest-800">Coverage:</span>
                      <span className="text-sage-600 font-bold">{kit.coverage}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/farmer-support"
                    className="w-full bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-bold py-3 px-4 rounded-xl transition-all text-center block"
                  >
                    Get This Kit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crop-Specific Recommendations */}
      <section className="py-20 px-4 bg-gradient-to-br from-sage-50 to-earth-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-forest-800 mb-6">
              Crop-Specific Recommendations
            </h2>
            <p className="text-xl text-forest-700 max-w-3xl mx-auto">
              Quick recommendations for popular South Indian crops
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cropRecommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 text-center">
                <div className="text-4xl mb-4">{rec.icon}</div>
                <h3 className="text-xl font-bold text-forest-800 mb-2">{rec.crop}</h3>
                <p className="text-sage-600 font-semibold mb-4">→ {rec.kit}</p>
                <Link
                  to="/farmer-support"
                  className="bg-sage-500 hover:bg-sage-400 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm"
                >
                  Get Kit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className="py-20 px-4 bg-gradient-to-br from-earth-100 to-sage-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-forest-800 mb-6">
              Why Choose Biolia Products?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🇮🇳",
                title: "Designed for Indian Conditions",
                description: "Biolia products are curated with Indian farmers in mind—formulated for local crops like paddy, pulses, vegetables, and fruit trees, and optimized for dryland and red soils."
              },
              {
                icon: "📦",
                title: "Ready-to-Use Kits for Every Crop",
                description: "Choose from pre-designed kits like the Paddy Grower Kit, Dryland Vegetable Bundle, or Orchard Care Kit—each with specific inputs needed for 1 acre."
              },
              {
                icon: "🌱",
                title: "Simplified Natural Inputs",
                description: "Using bio-formulations like Foundation Mix, AF-NPK, and LEO, farmers get a combination of soil conditioners, growth stimulants, and microbial inoculants—all from one place."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-sage-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-forest-800 mb-3">{feature.title}</h3>
                <p className="text-forest-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-sage-400 via-earth-300 to-sage-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-forest-800 mb-6">
            Ready to Boost Your Farm's Productivity?
          </h2>
          <p className="text-xl text-forest-800 mb-8 max-w-2xl mx-auto">
            Get personalized product recommendations based on your crops, soil type, and farming conditions. 
            Our experts will help you choose the right products and application methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farmer-support"
              className="bg-forest-800 hover:bg-forest-900 text-white font-bold px-10 py-4 rounded-xl transition-all text-lg hover:scale-110"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-earth-50 text-forest-800 font-bold px-10 py-4 rounded-xl transition-all text-lg hover:scale-110"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;