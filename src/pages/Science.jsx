import React from 'react';

const Science = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      {/* Header Section */}
      <section className="w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2f3a29] font-light mb-6 animate-fade-in">
          Our Science
        </h1>
        <p className="text-xl text-[#2f3a29] max-w-3xl mx-auto mb-8 font-jakarta">
          Discover how we harness the power of rare plant molecules through advanced biotechnology and traditional wisdom.
        </p>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="space-y-12">
          {/* Research Areas */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-serif text-[#2f3a29] mb-8 text-center">Research Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-[#f4f1ee] rounded-xl">
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-4">Plant Molecular Biology</h3>
                <p className="text-gray-600 mb-4">
                  We study the molecular mechanisms of rare plants to understand how they produce bioactive compounds that can benefit agriculture and human health.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Secondary metabolite analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Biosynthetic pathway mapping
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Gene expression profiling
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-[#f4f1ee] rounded-xl">
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-4">Soil Microbiome</h3>
                <p className="text-gray-600 mb-4">
                  Our research focuses on understanding soil microbiome interactions and how plant molecules can enhance soil health and fertility.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Microbial community analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Nutrient cycling studies
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a4be88] mr-2">•</span>
                    Plant-microbe interactions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Platform */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-serif text-[#2f3a29] mb-8 text-center">Technology Platform</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012-2v1a2 2 0 00-2 2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-4">Extraction & Purification</h3>
                <p className="text-gray-600">
                  Advanced extraction techniques to isolate and purify bioactive compounds from rare plants while maintaining their efficacy.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-4">Bioassay Testing</h3>
                <p className="text-gray-600">
                  Comprehensive testing protocols to evaluate the biological activity and safety of our plant-derived compounds.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2f3a29] mb-4">Formulation</h3>
                <p className="text-gray-600">
                  Innovative formulation techniques to create stable, effective products for agricultural and pharmaceutical applications.
                </p>
              </div>
            </div>
          </div>

          {/* Publications */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-serif text-[#2f3a29] mb-8 text-center">Recent Publications</h2>
            <div className="space-y-6">
              <div className="p-6 bg-[#f4f1ee] rounded-xl">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">
                  "Novel Plant Metabolites for Sustainable Agriculture"
                </h3>
                <p className="text-gray-600 mb-2">Journal of Agricultural Biotechnology, 2024</p>
                <p className="text-gray-600">
                  This study explores the potential of rare plant metabolites in enhancing crop resilience and soil health through natural mechanisms.
                </p>
              </div>
              <div className="p-6 bg-[#f4f1ee] rounded-xl">
                <h3 className="text-lg font-semibold text-[#2f3a29] mb-2">
                  "Bioactive Compounds from Indigenous Plants: A New Frontier"
                </h3>
                <p className="text-gray-600 mb-2">Nature Biotechnology, 2024</p>
                <p className="text-gray-600">
                  Research on the identification and characterization of bioactive compounds from indigenous plants for pharmaceutical applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Science;