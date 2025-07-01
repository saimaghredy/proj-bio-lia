import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import bioLiaLogo from '../assets/bio_lia_full_logo_final.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/science', label: 'Our Science' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

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

        {/* Right Side - Cart, User, Mobile Menu */}
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

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-[#2f3a29] hover:text-[#a4be88] transition-colors"
              >
                <div className="w-8 h-8 bg-[#a4be88] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden md:block font-semibold">
                  {user?.firstName || 'User'}
                </span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-[#2f3a29]">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden md:block bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105"
            >
              Sign In
            </Link>
          )}

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
            {!isAuthenticated && (
              <li>
                <Link
                  to="/auth"
                  className="block py-2 px-4 rounded-lg transition-colors bg-[#a4be88] text-[#2f3a29] font-semibold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;