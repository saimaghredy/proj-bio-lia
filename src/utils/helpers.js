// Utility functions
export const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;

export const formatDate = (date) => new Date(date).toLocaleDateString('en-IN');

export const generateOrderId = () => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `BL${timestamp.toString().slice(-6)}${randomId}`;
};

export const calculateTax = (amount, rate = 0.18) => Math.round(amount * rate);

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone) => /^\d{10}$/.test(phone);

export const validatePincode = (pincode) => /^\d{6}$/.test(pincode);

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getLoyaltyTier = (totalSpent) => {
  if (totalSpent >= 50000) return 'Platinum';
  if (totalSpent >= 25000) return 'Gold';
  if (totalSpent >= 10000) return 'Silver';
  return 'Bronze';
};

export const getNextTierThreshold = (currentSpent) => {
  if (currentSpent < 10000) return 10000 - currentSpent;
  if (currentSpent < 25000) return 25000 - currentSpent;
  if (currentSpent < 50000) return 50000 - currentSpent;
  return 0;
};