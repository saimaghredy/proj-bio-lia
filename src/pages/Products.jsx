import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    {
      name: "Foundation Mix",
      tagline: "Build your soil from the roots up",
      icon: "🌱",
      category: "Soil Conditioner",
      description: "Complete soil conditioning blend that transforms your soil structure and fertility for long-term agricultural success.",
      keyBenefits: [
        "Improves soil structure and porosity",
        "Enhances water retention capacity",
        "Boosts beneficial microbial activity",
        "Increases organic matter content",
        "Reduces soil compaction"
      ],
      applications: ["All crops", "Pre-planting soil preparation", "Annual soil conditioning"],
      dosage: "50-100 kg per acre",
      packaging: "50 kg bags"
    },
    {
      name: "AF-NPK",
      tagline: "Nutrients that go beyond NPK",
      icon: "⚡",
      category: "Bio-Fertilizer",
      description: "Advanced nutrient formula combining essential NPK with vital micronutrients for comprehensive plant nutrition.",
      keyBenefits: [
        "Balanced macro and micronutrients",
        "Quick absorption and utilization",
        "Sustained nutrient release",
        "Improves nutrient use efficiency",
        "Reduces fertilizer dependency"
      ],
      applications: ["Cereals", "Vegetables", "Cash crops", "Foliar and soil application"],
      dosage: "1-2 L per acre",
      packaging: "1L, 5L bottles"
    },
    {
      name: "Rhizobium",
      tagline: "Seed coating that powers pulses",
      icon: "🫘",
      category: "Bio-Inoculant",
      description: "Specialized nitrogen-fixing bacteria that forms symbiotic relationships with legume roots for natural nitrogen supply.",
      keyBenefits: [
        "Enhanced seed germination",
        "Natural nitrogen fixation",
        "Stronger root development",
        "Improved nodulation",
        "Reduced nitrogen fertilizer need"
      ],
      applications: ["Pulses", "Legumes", "Seed treatment", "Soil application"],
      dosage: "100-200 mL per acre",
      packaging: "100mL, 250mL bottles"
    },
    {
      name: "LEO",
      tagline: "Tonic for flowering and fruiting",
      icon: "🌸",
      category: "Growth Enhancer",
      description: "Specialized bio-stimulant formula designed to optimize reproductive growth phases for maximum yield potential.",
      keyBenefits: [
        "Enhanced flower initiation",
        "Better fruit setting percentage",
        "Improved fruit quality and size",
        "Extended flowering period",
        "Higher yield potential"
      ],
      applications: ["Fruits", "Vegetables", "Flowering crops", "Foliar spray"],
      dosage: "250-500 mL per acre",
      packaging: "250mL, 500mL, 1L bottles"
    },
    {
      name: "NORA",
      tagline: "Support for stressed crops",
      icon: "💪",
      category: "Stress Reliever",
      description: "Advanced stress recovery formula that helps crops overcome environmental challenges and build natural immunity.",
      keyBenefits: [
        "Heat and drought stress tolerance",
        "Disease resistance enhancement",
        "Quick recovery from stress",
        "Improved plant immunity",
        "Better stress adaptation"
      ],
      applications: ["All crops", "Stress conditions", "Disease prevention", "Recovery treatment"],
      dosage: "250-500 mL per acre",
      packaging: "250mL, 500mL bottles"
    },
    {
      name: "Soil Sterilizer",
      tagline: "Cleaner soil, stronger starts",
      icon: "🛡️",
      category: "Soil Treatment",
      description: "Natural soil sanitization solution that eliminates harmful pathogens while preserving beneficial microorganisms.",
      keyBenefits: [
        "Pathogen control and elimination",
        "Soil detoxification",
        "Safe for beneficial microbes",
        "Improved seed germination",
        "Healthier root environment"
      ],
      applications: ["Pre-planting treatment", "Nursery preparation", "Problem soils", "Seed bed preparation"],
      dosage: "10-20 kg per acre",
      packaging: "10kg, 25kg bags"
    }
  ];

  const packageKits = [
    {
      name: "Paddy Grower Kit",
      icon: "🌾",
      subtitle: "Complete solution for wetland and dryland paddy cultivation",
      products: [
        { name: "Foundation Mix", qty: "50 kg" },
        { name: "AF-NPK", qty: "1 L" },
        { name: "NORA", qty: "500 mL" },
        { name: "LEO", qty: "500 mL" }
      ],
      benefits: "Improves soil health, supports tillering, and increases grain fill. Perfect for monsoon-planted paddy under unpredictable rainfall conditions.",
      suitableFor: "Kharif and Rabi paddy, both wetland and dryland cultivation",
      coverage: "1 acre",
      popular: true
    },
    {
      name: "Pulses Starter Kit",
      icon: "🫘",
      subtitle: "Specialized package for legume crops",
      products: [
        { name: "Soil Sterilizer", qty: "10 kg" },
        { name: "Rhizobium", qty: "100 mL" },
        { name: "Foundation Mix", qty: "30 kg" },
        { name: "LEO", qty: "250 mL" }
      ],
      benefits: "Better germination, stronger nodulation, and enhanced flowering response. Specially formulated for red soils and dryland farming conditions.",
      suitableFor: "Toor Dal, Green Gram, Black Gram, Cowpea",
      coverage: "1 acre"
    },
    {
      name: "Dryland Vegetable Bundle",
      icon: "🍅",
      subtitle: "Optimized for vegetable cultivation in water-scarce conditions",
      products: [
        { name: "Foundation Mix", qty: "30 kg" },
        { name: "AF-NPK", qty: "500 mL" },
        { name: "NORA", qty: "250 mL" },
        { name: "LEO", qty: "500 mL" }
      ],
      benefits: "Supports flowering, fruit setting, and helps crops recover from heat stress or delayed irrigation. Ideal for dryland vegetable farming.",
      suitableFor: "Brinjal, Tomato, Chili, Okra, Cucumber",
      coverage: "1 acre"
    },
    {
      name: "Orchard Care Kit",
      icon: "🌳",
      subtitle: "Long-term nutrition for perennial fruit trees",
      products: [
        { name: "Foundation Mix", qty: "50 kg" },
        { name: "AF-NPK", qty: "1 L" },
        { name: "LEO", qty: "1 L" },
        { name: "NORA", qty: "500 mL" },
        { name: "Drone Spray Option", qty: "Available" }
      ],
      benefits: "Sustains long-term soil fertility, promotes consistent fruit set and yield in perennial trees. Includes drone-based application for large orchards.",
      suitableFor: "Mango, Citrus, Guava, Pomegranate, other fruit trees",
      coverage: "1 acre",
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      {/* Header Section */}
      <section className="w-full py-20 px-4 text-center bg-gradient-to-br from-[#1a2e1a] via-[#2f3a29] to-[#3d4a35]">
        <div className="mb-6 flex justify-center">
          <img 
            src="/src/assets/Bio Lia Full & Individual Logo - no background-05.png" 
            alt="Biolia Brand Mark" 
            className="h-20 w-auto opacity-95 drop-shadow-2xl filter brightness-110"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-serif text-white font-light mb-6 animate-fade-in">
          Bio-Organic <span className="text-[#a4be88]">Product Range</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-4xl mx-auto mb-8 font-jakarta">
          Scientifically formulated, field-tested solutions for sustainable farming and higher yields across South India
        </p>
        <Link 
          to="/farmer-support"
          className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-bold px-10 py-4 rounded-xl shadow-2xl transition-all text-lg hover:scale-110 focus:ring-4 focus:ring-[#a4be88] focus:outline-none"
        >
          Get Product Recommendations
        </Link>
      </section>

      {/* Individual Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2f3a29] mb-6">
              Individual Products
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Each product is designed to address specific agricultural needs and can be used individually or in combination
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="flex">
                  {/* Product Icon & Category */}
                  <div className="w-32 h-full bg-gradient-to-br from-[#a4be88] to-[#d7e7c4] flex flex-col items-center justify-center p-6">
                    <div className="text-4xl mb-2">{product.icon}</div>
                    <div className="text-xs text-[#2f3a29] font-semibold text-center">{product.category}</div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-bold text-[#2f3a29] mb-2">{product.name}</h3>
                    <p className="text-[#a4be88] font-semibold mb-3 italic">"{product.tagline}"</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                    
                    {/* Key Benefits */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#2f3a29] text-sm mb-2">Key Benefits:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {product.keyBenefits.slice(0, 4).map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-700">
                            <span className="w-1.5 h-1.5 bg-[#a4be88] rounded-full mr-2 flex-shrink-0"></span>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-4">
                      <div>
                        <span className="font-semibold">Dosage:</span> {product.dosage}
                      </div>
                      <div>
                        <span className="font-semibold">Packaging:</span> {product.packaging}
                      </div>
                    </div>
                    
                    <Link
                      to="/farmer-support"
                      className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-2 px-4 rounded-lg transition-all text-sm text-center block"
                    >
                      Get This Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Kits Section */}
      <section id="bundles" className="py-20 px-4 bg-gradient-to-br from-[#1a2e1a] via-[#2f3a29] to-[#3d4a35]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-white mb-6">
              Ready-to-Use <span className="text-[#a4be88]">Package Kits</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specially curated bundles combining multiple products for specific crops and farming conditions. 
              Everything you need for complete crop nutrition and protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packageKits.map((kit, index) => (
              <div key={index} className={`bg-white rounded-3xl shadow-2xl hover:shadow-[#a4be88]/20 transition-all duration-500 hover:scale-105 overflow-hidden ${kit.popular ? 'ring-4 ring-[#a4be88]' : ''} ${kit.premium ? 'ring-4 ring-[#d7e7c4]' : ''} relative`}>
                {kit.popular && (
                  <div className="absolute top-4 right-4 bg-[#a4be88] text-[#2f3a29] px-3 py-1 rounded-full text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}
                {kit.premium && (
                  <div className="absolute top-4 right-4 bg-[#d7e7c4] text-[#2f3a29] px-3 py-1 rounded-full text-sm font-bold z-10">
                    Premium
                  </div>
                )}
                
                <div className="h-40 bg-gradient-to-br from-[#a4be88] to-[#d7e7c4] flex items-center justify-center relative">
                  <div className="text-6xl">{kit.icon}</div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#2f3a29] mb-2">{kit.name}</h3>
                  <p className="text-[#a4be88] font-semibold text-sm mb-6">{kit.subtitle}</p>
                  
                  {/* Included Products */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#2f3a29] mb-3">Package Includes:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {kit.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-[#f4f1ee] rounded-lg p-3">
                          <span className="text-sm font-medium text-[#2f3a29]">{product.name}</span>
                          <span className="text-sm text-[#a4be88] font-semibold">{product.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#2f3a29] mb-2">Benefits:</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{kit.benefits}</p>
                  </div>
                  
                  {/* Suitable For */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#2f3a29] mb-2">Suitable For:</h4>
                    <p className="text-gray-700 text-sm">{kit.suitableFor}</p>
                  </div>
                  
                  {/* Coverage */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center bg-[#a4be88]/10 rounded-lg p-3">
                      <span className="font-semibold text-[#2f3a29]">Coverage:</span>
                      <span className="text-[#a4be88] font-bold">{kit.coverage}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/farmer-support"
                    className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-bold py-4 px-6 rounded-xl transition-all text-center block text-lg"
                  >
                    Get This Kit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2f3a29] mb-6">
              Why Choose Biolia Products?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔬",
                title: "Scientifically Formulated",
                description: "Each product is developed through rigorous research and field testing across different soil types and climatic conditions."
              },
              {
                icon: "🌿",
                title: "100% Organic Certified",
                description: "All products meet organic farming standards and are safe for soil, crops, and the environment."
              },
              {
                icon: "📈",
                title: "Proven Results",
                description: "Trusted by over 15,000 farmers with documented yield improvements of 30-45% across various crops."
              },
              {
                icon: "🎯",
                title: "Crop-Specific Solutions",
                description: "Tailored formulations for different crops, soil types, and regional farming conditions in South India."
              },
              {
                icon: "💰",
                title: "Cost-Effective",
                description: "Reduces dependency on expensive chemical inputs while improving long-term soil health and productivity."
              },
              {
                icon: "🤝",
                title: "Expert Support",
                description: "Comprehensive technical support, application guidance, and ongoing consultation from our agricultural experts."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-[#f4f1ee] rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#a4be88] to-[#d7e7c4]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#2f3a29] mb-6">
            Ready to Boost Your Farm's Productivity?
          </h2>
          <p className="text-xl text-[#2f3a29] mb-8 max-w-2xl mx-auto">
            Get personalized product recommendations based on your crops, soil type, and farming conditions. 
            Our experts will help you choose the right products and application methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farmer-support"
              className="bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-bold px-10 py-4 rounded-xl transition-all text-lg hover:scale-110"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-100 text-[#2f3a29] font-bold px-10 py-4 rounded-xl transition-all text-lg hover:scale-110"
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