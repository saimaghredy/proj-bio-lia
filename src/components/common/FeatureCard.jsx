import React from 'react';

const FeatureCard = ({ icon, title, description, className = '' }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}>
    <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mb-6 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-[#2f3a29] mb-4 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default FeatureCard;