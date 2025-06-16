import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Science from './pages/Science';
import Products from './pages/Products';
import Contact from './pages/Contact';
import WeatherInsights from './pages/WeatherInsights';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#e9e7e3] font-jakarta">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/science" element={<Science />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weather-insights" element={<WeatherInsights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;