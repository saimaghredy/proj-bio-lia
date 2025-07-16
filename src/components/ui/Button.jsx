import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] focus:ring-[#a4be88]',
    secondary: 'bg-[#2f3a29] hover:bg-[#3d4a35] text-white focus:ring-[#2f3a29]',
    outline: 'border-2 border-[#2f3a29] text-[#2f3a29] hover:bg-[#2f3a29] hover:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </div>
      ) : children}
    </button>
  );
};

export default Button;