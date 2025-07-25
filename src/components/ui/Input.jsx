import React from 'react';

const Input = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-300 outline-none';
  const stateClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
    : 'border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20';

  return (
    <div className="group">
      {label && (
        <label className="block text-forest-800 text-sm font-semibold mb-2 group-hover:text-sage-600 transition-colors">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`${baseClasses} ${stateClasses} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;