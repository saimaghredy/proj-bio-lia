import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-forest-900 via-forest-800 to-olive-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-sage-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-earth-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sage-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-serif text-white font-light mb-8 leading-tight animate-fade-in">
            Rebuilding Soil.<br />
            <span className="text-sage-300">Empowering Farmers.</span><br />
            <span className="text-earth-200">The Bio-Organic Way.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto mb-12 font-jakarta leading-relaxed">
            Smart, bio-based solutions crafted for Indian farming — from drylands to deltas.
            Trusted by farmers growing <span className="text-sage-300 font-semibold">paddy, pulses, vegetables, and fruits across India.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/products" 
              className="bg-gradient-to-r from-sage-400 to-sage-300 hover:from-sage-300 hover:to-sage-200 text-forest-800 font-bold px-10 py-5 rounded-xl shadow-2xl transition-all text-xl hover:scale-110 focus:ring-4 focus:ring-sage-400 focus:outline-none text-center transform hover:shadow-sage-400/50"
            >
              🌿 View Products
            </Link>
            <Link 
              to="/products#bundles" 
              className="bg-gradient-to-r from-sage-400 to-sage-300 hover:from-sage-300 hover:to-sage-200 text-forest-800 font-bold px-10 py-5 rounded-xl shadow-2xl transition-all text-xl hover:scale-110 focus:ring-4 focus:ring-sage-400 focus:outline-none text-center"
            >
              📦 Explore Bundles
            </Link>
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-sage-400 to-sage-300 hover:from-sage-300 hover:to-sage-200 text-forest-800 font-bold px-10 py-5 rounded-xl shadow-2xl transition-all text-xl hover:scale-110 focus:ring-4 focus:ring-sage-400 focus:outline-none text-center"
            >
              📥 Download Brochure
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-gradient-to-r from-earth-50 to-sage-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-sage-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-forest-800 mb-2">Organic Certified</div>
              <p className="text-forest-600 text-sm">Natural compliance</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-sage-600 mb-2">5+</div>
              <div className="text-lg font-semibold text-forest-800 mb-2">Curated Kits</div>
              <p className="text-forest-600 text-sm">For common farming systems</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-sage-600 mb-2">10+</div>
              <div className="text-lg font-semibold text-forest-800 mb-2">States Tested</div>
              <p className="text-forest-600 text-sm">Under various soil types</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-sage-600 mb-2">45%</div>
              <div className="text-lg font-semibold text-forest-800 mb-2">Yield Increase</div>
              <p className="text-forest-600 text-sm">Average improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 px-4 bg-gradient-to-br from-earth-100 via-sage-50 to-earth-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-forest-800 mb-6">
              Complete Bio-Organic Solutions
            </h2>
            <p className="text-xl text-forest-700 max-w-3xl mx-auto">
              From soil foundation to harvest, our scientifically formulated products support every stage of your crop's journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Foundation Mix", 
                tagline: "Build your soil from the roots up", 
                icon: "🌱",
                desc: "Complete soil conditioning blend for long-term fertility",
                benefits: ["Improves soil structure", "Enhances water retention", "Boosts microbial activity"]
              },
              { 
                name: "AF-NPK", 
                tagline: "Nutrients that go beyond NPK", 
                icon: "⚡",
                desc: "Advanced nutrient formula with micronutrients",
                benefits: ["Balanced nutrition", "Quick absorption", "Sustained release"]
              },
              { 
                name: "Rhizobium", 
                tagline: "Seed coating that powers pulses", 
                icon: "🫘",
                desc: "Nitrogen-fixing bacteria for legume crops",
                benefits: ["Better germination", "Natural nitrogen fixation", "Stronger root system"]
              },
              { 
                name: "LEO", 
                tagline: "Tonic for flowering and fruiting", 
                icon: "🌸",
                desc: "Specialized formula for reproductive growth",
                benefits: ["Enhanced flowering", "Better fruit setting", "Improved yield quality"]
              },
              { 
                name: "NORA", 
                tagline: "Support for stressed crops", 
                icon: "💪",
                desc: "Stress recovery and immunity booster",
                benefits: ["Heat stress tolerance", "Disease resistance", "Quick recovery"]
              },
              { 
                name: "Soil Sterilizer", 
                tagline: "Cleaner soil, stronger starts", 
                icon: "🛡️",
                desc: "Natural soil sanitization for healthy growth",
                benefits: ["Pathogen control", "Soil detoxification", "Safe for beneficial microbes"]
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-sage-400 to-earth-300 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.icon}</div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-forest-800 mb-2">{product.name}</h3>
                  <p className="text-sage-600 font-semibold mb-4 italic">"{product.tagline}"</p>
                  <p className="text-forest-600 mb-6 leading-relaxed">{product.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-forest-700">
                        <span className="w-2 h-2 bg-sage-500 rounded-full mr-3"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/farmer-support"
                    className="w-full bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-semibold py-3 px-6 rounded-xl transition-all text-center block group-hover:shadow-lg"
                  >
                    Get Recommendations
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Kits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-forest-900 via-olive-800 to-forest-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-white mb-6">
              Ready-to-Use <span className="text-sage-300">Package Kits</span>
            </h2>
            <p className="text-xl text-earth-200 max-w-3xl mx-auto">
              Specially curated bundles for different crops and farming needs. Everything you need in one package.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Paddy Grower Kit",
                icon: "🌾",
                subtitle: "For wetland and dryland paddy",
                products: ["Foundation Mix - 50kg", "AF-NPK - 1L", "NORA - 500mL", "LEO - 500mL"],
                benefits: "Improves soil health, supports tillering, and increases grain fill. Perfect for monsoon-planted paddy.",
                price: "Complete Solution",
                popular: true
              },
              {
                name: "Pulses Starter Kit",
                icon: "🫘",
                subtitle: "For Toor Dal, Green Gram, Black Gram",
                products: ["Soil Sterilizer - 10kg", "Rhizobium - 100mL", "Foundation Mix - 30kg", "LEO - 250mL"],
                benefits: "Better germination, stronger nodulation, and flowering response. Suits red soils and dryland farming.",
                price: "Starter Package"
              },
              {
                name: "Dryland Vegetable Bundle",
                icon: "🍅",
                subtitle: "For Brinjal, Tomato, Chili, Okra",
                products: ["Foundation Mix - 30kg", "AF-NPK - 500mL", "NORA - 250mL", "LEO - 500mL"],
                benefits: "Supports flowering, fruit setting, and helps crops recover from heat stress or delayed irrigation.",
                price: "Vegetable Special"
              },
              {
                name: "Orchard Care Kit",
                icon: "🌳",
                subtitle: "For Mango, Citrus, Guava plantations",
                products: ["Foundation Mix - 50kg", "AF-NPK - 1L", "LEO - 1L", "NORA - 500mL", "Drone Spray Option"],
                benefits: "Sustains long-term soil fertility, promotes fruit set and yield in perennial trees.",
                price: "Premium Package"
              }
            ].map((kit, index) => (
              <div key={index} className={`bg-white rounded-3xl shadow-2xl hover:shadow-sage-400/20 transition-all duration-500 hover:scale-105 overflow-hidden ${kit.popular ? 'ring-4 ring-sage-400 relative' : ''}`}>
                {kit.popular && (
                  <div className="absolute top-4 right-4 bg-sage-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="h-32 bg-gradient-to-br from-sage-400 to-earth-300 flex items-center justify-center">
                  <div className="text-5xl">{kit.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-forest-800 mb-2">{kit.name}</h3>
                  <p className="text-sage-600 font-semibold text-sm mb-4">{kit.subtitle}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-forest-800 text-sm mb-2">Included Products:</h4>
                    <ul className="space-y-1">
                      {kit.products.map((product, idx) => (
                        <li key={idx} className="text-xs text-forest-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-sage-500 rounded-full mr-2"></span>
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-forest-600 text-sm mb-4 leading-relaxed">{kit.benefits}</p>
                  
                  <div className="text-center">
                    <div className="text-sage-600 font-bold mb-3">{kit.price}</div>
                    <Link
                      to="/farmer-support"
                      className="w-full bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm block"
                    >
                      Get This Kit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-earth-50 to-sage-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-forest-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-forest-600">
              Everything you need to know about Biolia products
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Are Biolia products organic certified?",
                answer: "Yes, all our products follow natural farming and organic compliance standards."
              },
              {
                question: "Can I use Biolia inputs with chemical fertilizers?",
                answer: "Yes. But to maximize benefits, we recommend reducing chemical dependency gradually."
              },
              {
                question: "How do I apply these products on my crops?",
                answer: "Each product has usage instructions. You can also download crop-specific guides from the product pages."
              },
              {
                question: "Do you offer bulk rates for FPOs or dealers?",
                answer: "Yes. Contact our sales team for special pricing and bundled offers."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-sage-100">
                <h3 className="text-lg font-semibold text-forest-800 mb-3">{faq.question}</h3>
                <p className="text-forest-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-20 px-4 bg-gradient-to-br from-sage-400 via-earth-300 to-sage-300">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-forest-800 mb-6">
            Download Resources
          </h2>
          <p className="text-xl text-forest-800 mb-12 max-w-3xl mx-auto">
            Get detailed product information, application guides, and crop-specific recommendations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Product Catalog", subtitle: "May 2025 (PDF)", icon: "📄" },
              { title: "Crop-wise Advisory", subtitle: "Toor, Brinjal, Paddy", icon: "📄" },
              { title: "Farmer Templates", subtitle: "Hindi, Telugu, Marathi", icon: "📄" },
              { title: "Application Protocols", subtitle: "Foliar Spray & Drip", icon: "📄" }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-lg font-semibold text-forest-800 mb-2">{resource.title}</h3>
                <p className="text-forest-600 text-sm mb-4">{resource.subtitle}</p>
                <Link
                  to="/contact"
                  className="bg-sage-500 hover:bg-forest-700 text-white hover:text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm"
                >
                  Download
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-forest-900 via-olive-800 to-forest-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-earth-200 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who have increased their yields and improved soil health with Biolia's bio-organic solutions.
          </p>
          <Link 
            to="/farmer-support" 
            className="bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-bold px-12 py-5 rounded-xl shadow-2xl transition-all text-xl hover:scale-110 focus:ring-4 focus:ring-sage-400 focus:outline-none inline-block"
          >
            Get Free Expert Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;