import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bioLiaLogo from '../assets/bio_lia_full_logo_final.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/science', label: 'Our Science' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="w-full bg-[#f4f1ee] border-b border-[#e9e7e3] px-8 py-6 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img 
              src={bioLiaLogo} 
              alt="Bio Lia Logo" 
              className="h-16 w-auto transition-transform duration-300 hover:scale-105" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-[#2f3a29] font-semibold text-lg">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:text-[#a4be88] transition-colors border-b-2 pb-1 ${
                  isActive(item.path)
                    ? 'border-[#a4be88] text-[#a4be88]'
                    : 'border-transparent hover:border-[#a4be88]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#2f3a29] hover:text-[#a4be88] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-2 px-4 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#a4be88] text-[#2f3a29]'
                      : 'text-[#2f3a29] hover:bg-[#d7e7c4]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;