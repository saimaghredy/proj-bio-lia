import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/farmer-support', label: 'Get Support' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-earth-50/95 to-sage-50/95 backdrop-blur-sm border-b border-sage-200 px-8 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center group">
            <img 
              src="/src/assets/Bio-Lia-Brand-Mark-transparent-background-02.png" 
              alt="Biolia Logo" 
              className="h-12 w-auto group-hover:scale-105 transition-all duration-300"
            />
          </Link>
          <div className="hidden md:block">
            <div className="text-xs text-forest-600 font-medium">Bio-Organic Solutions</div>
            <div className="text-xs text-sage-600 font-semibold">for Indian Farmers</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8 text-forest-800 font-semibold text-lg">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:text-sage-600 transition-all duration-300 pb-1 relative group ${
                  isActive(item.path)
                    ? 'text-sage-600'
                    : ''
                }`}
              >
                {item.label}
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-sage-500 transform transition-transform duration-300 ${
                  isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Link
            to="/farmer-support"
            className="hidden md:block bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🌾 Free Consultation
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-forest-800 hover:text-sage-600 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-sage-200">
          <ul className="flex flex-col space-y-2 pt-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-3 px-4 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-sage-500 text-white font-semibold'
                      : 'text-forest-800 hover:bg-sage-100 hover:text-sage-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/farmer-support"
                className="block py-3 px-4 rounded-xl transition-all duration-300 bg-gradient-to-r from-sage-500 to-sage-400 text-white font-bold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                🌾 Get Free Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;