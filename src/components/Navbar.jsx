import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import bioLiaLogo from '../assets/bio_lia_full_logo_final.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartItemsCount } = useCart();

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

        {/* Cart and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-[#2f3a29] hover:text-[#a4be88] transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            {getCartItemsCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#a4be88] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                {getCartItemsCount()}
              </span>
            )}
          </Link>

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
            <li>
              <Link
                to="/cart"
                className="block py-2 px-4 rounded-lg transition-colors text-[#2f3a29] hover:bg-[#d7e7c4] flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {getCartItemsCount() > 0 && (
                  <span className="bg-[#a4be88] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;