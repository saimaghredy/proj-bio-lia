import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      {/* Header Section */}
      <section className="w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2f3a29] font-light mb-6 animate-fade-in">
          About Bio Lia
        </h1>
        <p className="text-xl text-[#2f3a29] max-w-3xl mx-auto mb-8 font-jakarta">
          Bridging ancient wisdom with modern innovation to create sustainable solutions for agriculture and human wellness.
        </p>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-[#2f3a29] mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At Bio Lia, we believe in the power of nature's intelligence. Our mission is to unlock the potential of rare plant-based molecules to create sustainable solutions that benefit both agriculture and human health.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We combine traditional farming wisdom passed down through generations with cutting-edge biotechnology to develop innovative products that regenerate soil, enhance crop health, and provide natural active pharmaceutical ingredients.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#a4be88] to-[#d7e7c4] rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-[#2f3a29] mb-2">10+</div>
              <div className="text-[#2f3a29] font-semibold mb-4">Years of Research</div>
              <div className="text-4xl font-bold text-[#2f3a29] mb-2">50+</div>
              <div className="text-[#2f3a29] font-semibold mb-4">Plant Molecules Studied</div>
              <div className="text-4xl font-bold text-[#2f3a29] mb-2">1000+</div>
              <div className="text-[#2f3a29] font-semibold">Farmers Impacted</div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-serif text-[#2f3a29] mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to creating solutions that protect and regenerate our planet's natural resources.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge science and technology to unlock nature's potential for human benefit.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-3">Community</h3>
                <p className="text-gray-600">
                  We work closely with farming communities to ensure our solutions meet real-world needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;