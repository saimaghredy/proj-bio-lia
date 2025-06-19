import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Science from './pages/Science';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import WeatherInsights from './pages/WeatherInsights';
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#e9e7e3] font-jakarta">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/science" element={<Science />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/weather-insights" element={<WeatherInsights />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;