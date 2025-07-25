import React from 'react';

const FeatureCard = ({ icon, title, description, className = '' }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}>
    <div className="w-16 h-16 bg-sage-500 rounded-full flex items-center justify-center mb-6 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-forest-800 mb-4 text-center">{title}</h3>
    <p className="text-forest-600 text-center">{description}</p>
  </div>
);

export default FeatureCard;