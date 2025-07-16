// App-wide constants
export const APP_CONFIG = {
  name: 'Bio Lia',
  tagline: 'Plant Molecules Engineered for Impact',
  colors: {
    primary: '#a4be88',
    secondary: '#d7e7c4',
    dark: '#2f3a29',
    light: '#e9e7e3',
    cream: '#f4f1ee'
  },
  cache: {
    expiry: {
      user: 24 * 60 * 60 * 1000,
      cart: 7 * 24 * 60 * 60 * 1000,
      products: 6 * 60 * 60 * 1000
    }
  },
  auth: {
    timeout: 8000,
    otpLength: 6,
    otpExpiry: 300
  }
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SCIENCE: '/science',
  PRODUCTS: '/products',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CONTACT: '/contact',
  WEATHER: '/weather-insights',
  AUTH: '/auth'
};

export const LOYALTY_TIERS = {
  BRONZE: { min: 0, name: 'Bronze' },
  SILVER: { min: 10000, name: 'Silver' },
  GOLD: { min: 25000, name: 'Gold' },
  PLATINUM: { min: 50000, name: 'Platinum' }
};

export const CROP_TYPES = [
  'Chilli', 'Paddy', 'Cotton', 'Tomato', 'Wheat', 
  'Sugarcane', 'Maize', 'Soybean'
];

export const SOIL_TYPES = [
  'Red', 'Black', 'Alluvial', 'Sandy', 'Clay', 'Loamy'
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Telangana',
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana',
  'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha', 'Kerala'
  // Add more as needed
];