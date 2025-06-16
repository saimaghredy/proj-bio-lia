import React from 'react';
import BasicInputForm from './BasicInputForm';
import './index.css';
import bioLiaLogo from './assets/bio_lia_full_logo_final.png';

function App() {
  return (
    <div className="min-h-screen bg-[#e9e7e3] font-jakarta">
      {/* Navigation Bar */}
      <nav className="w-full bg-[#f4f1ee] border-b border-[#e9e7e3] px-8 py-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center">
            <img src={bioLiaLogo} alt="Bio Lia Logo" className="h-16 w-auto transition-transform duration-300 hover:scale-105" />
          </a>
        </div>
        <ul className="flex space-x-8 text-[#2f3a29] font-semibold text-lg">
          <li><a href="#" className="hover:text-[#a4be88] transition-colors border-b-2 border-transparent hover:border-[#a4be88] pb-1">Home</a></li>
          <li><a href="#" className="hover:text-[#a4be88] transition-colors border-b-2 border-transparent hover:border-[#a4be88] pb-1">About</a></li>
          <li><a href="#" className="hover:text-[#a4be88] transition-colors border-b-2 border-transparent hover:border-[#a4be88] pb-1">Our Science</a></li>
          <li><a href="#" className="hover:text-[#a4be88] transition-colors border-b-2 border-transparent hover:border-[#a4be88] pb-1">Products</a></li>
          <li><a href="#" className="hover:text-[#a4be88] transition-colors border-b-2 border-transparent hover:border-[#a4be88] pb-1">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-serif text-[#2f3a29] font-light mb-6 text-center leading-tight opacity-0 animate-fade-in-slow">
          Plant Molecules<br />engineered for impact.
        </h1>
        <p className="text-xl md:text-2xl text-[#2f3a29] max-w-2xl text-center mb-8 font-jakarta">
          Bio Lia bridges traditional farming wisdom and modern biotech with rare plant-based molecules that regenerate soil, enhance crop health, and deliver natural APIs for both agriculture and human healing.
        </p>
        <a href="#" className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-[#a4be88] focus:outline-none">Learn More</a>
      </section>

      {/* Main Form Section */}
      <main className="flex justify-center items-start py-8 px-4">
        <BasicInputForm />
      </main>
    </div>
  );
}

export default App; 