import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { ROUTES } from './utils/constants';
import Home from './pages/Home';
import About from './pages/About';
import Science from './pages/Science';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import WeatherInsights from './pages/WeatherInsights';
import Auth from './pages/Auth';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-[#e9e7e3] font-jakarta">
              <Navbar />
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.SCIENCE} element={<Science />} />
                <Route path={ROUTES.PRODUCTS} element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path={ROUTES.CART} element={<Cart />} />
                <Route 
                  path={ROUTES.CHECKOUT} 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path={ROUTES.WEATHER} element={<WeatherInsights />} />
                <Route 
                  path={ROUTES.AUTH} 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <Auth />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;