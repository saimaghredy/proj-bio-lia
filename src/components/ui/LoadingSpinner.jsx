import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} bg-sage-500 rounded-full flex items-center justify-center animate-spin`}>
        <div className="w-1/2 h-1/2 border-4 border-white border-t-transparent rounded-full"></div>
      </div>
      <p className="text-forest-800 font-semibold mt-4">{message}</p>
    </div>
  );
};

export default LoadingSpinner;