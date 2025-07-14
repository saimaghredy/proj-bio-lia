class CacheService {
  constructor() {
    this.CACHE_KEYS = {
      USER_PROFILE: 'userProfile',
      CART: 'cart',
      PRODUCTS: 'products',
      RECENT_ORDERS: 'recentOrders',
      USER_PREFERENCES: 'userPreferences'
    };

    this.CACHE_EXPIRY = {
      USER_PROFILE: 24 * 60 * 60 * 1000, // 24 hours
      CART: 7 * 24 * 60 * 60 * 1000,     // 7 days
      PRODUCTS: 6 * 60 * 60 * 1000,      // 6 hours
      RECENT_ORDERS: 1 * 60 * 60 * 1000, // 1 hour
      USER_PREFERENCES: 24 * 60 * 60 * 1000 // 24 hours
    };
  }

  // ==================== CORE CACHE OPERATIONS ====================

  setCache(key, data, customExpiry = null) {
    try {
      const expiry = customExpiry || this.CACHE_EXPIRY[key.toUpperCase()] || (24 * 60 * 60 * 1000);
      const cacheItem = {
        data,
        cachedAt: Date.now(),
        expires: Date.now() + expiry
      };
      
      localStorage.setItem(key, JSON.stringify(cacheItem));
      return true;
    } catch (error) {
      console.error('Error setting cache:', error);
      return false;
    }
  }

  getCache(key) {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      
      // Check if expired
      if (parsed.expires < Date.now()) {
        this.removeCache(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      this.removeCache(key); // Remove corrupted cache
      return null;
    }
  }

  removeCache(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing cache:', error);
    }
  }

  clearAllCache() {
    try {
      Object.values(this.CACHE_KEYS).forEach(key => {
        this.removeCache(key);
      });
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  // ==================== USER PROFILE CACHING ====================

  cacheUserProfile(userData) {
    return this.setCache(this.CACHE_KEYS.USER_PROFILE, userData);
  }

  getCachedUserProfile() {
    return this.getCache(this.CACHE_KEYS.USER_PROFILE);
  }

  // ==================== CART CACHING ====================

  cacheCart(cartItems) {
    const cartData = {
      items: cartItems,
      lastUpdated: Date.now()
    };
    return this.setCache(this.CACHE_KEYS.CART, cartData);
  }

  getCachedCart() {
    const cached = this.getCache(this.CACHE_KEYS.CART);
    if (!cached) return [];
    
    // Validate cart items
    const validItems = this.validateCartItems(cached.items || []);
    
    // If validation removed items, update cache
    if (validItems.length !== (cached.items || []).length) {
      this.cacheCart(validItems);
    }
    
    return validItems;
  }

  validateCartItems(items) {
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    return items.filter(item => {
      // Basic validation
      if (!item.id || !item.name || !item.price || !item.quantity) {
        return false;
      }
      
      // Age validation
      if (item.addedAt && (now - item.addedAt) > maxAge) {
        return false;
      }
      
      // Quantity validation
      if (item.quantity <= 0 || item.quantity > 100) {
        return false;
      }
      
      // Price validation (basic sanity check)
      if (item.price <= 0 || item.price > 1000000) {
        return false;
      }
      
      return true;
    });
  }

  addToCart(product, quantity = 1) {
    const currentCart = this.getCachedCart();
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      currentCart[existingItemIndex].quantity += quantity;
      currentCart[existingItemIndex].addedAt = Date.now();
    } else {
      // Add new item
      currentCart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        packaging: product.packaging,
        quantity,
        addedAt: Date.now()
      });
    }
    
    this.cacheCart(currentCart);
    return currentCart;
  }

  removeFromCart(productId) {
    const currentCart = this.getCachedCart();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.cacheCart(updatedCart);
    return updatedCart;
  }

  updateCartQuantity(productId, quantity) {
    const currentCart = this.getCachedCart();
    const updatedCart = currentCart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(0, quantity), addedAt: Date.now() };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    this.cacheCart(updatedCart);
    return updatedCart;
  }

  clearCart() {
    this.removeCache(this.CACHE_KEYS.CART);
    return [];
  }

  // ==================== PRODUCTS CACHING ====================

  cacheProducts(products) {
    return this.setCache(this.CACHE_KEYS.PRODUCTS, products);
  }

  getCachedProducts() {
    return this.getCache(this.CACHE_KEYS.PRODUCTS) || [];
  }

  // ==================== RECENT ORDERS CACHING ====================

  cacheRecentOrders(orders) {
    // Only cache last 5 orders for performance
    const recentOrders = orders.slice(0, 5);
    return this.setCache(this.CACHE_KEYS.RECENT_ORDERS, recentOrders);
  }

  getCachedRecentOrders() {
    return this.getCache(this.CACHE_KEYS.RECENT_ORDERS) || [];
  }

  // ==================== USER PREFERENCES CACHING ====================

  cacheUserPreferences(preferences) {
    return this.setCache(this.CACHE_KEYS.USER_PREFERENCES, preferences);
  }

  getCachedUserPreferences() {
    return this.getCache(this.CACHE_KEYS.USER_PREFERENCES) || {};
  }

  updateUserPreference(key, value) {
    const preferences = this.getCachedUserPreferences();
    preferences[key] = value;
    preferences.lastUpdated = Date.now();
    this.cacheUserPreferences(preferences);
    return preferences;
  }

  // ==================== CACHE HEALTH & MAINTENANCE ====================

  getCacheStats() {
    const stats = {};
    
    Object.entries(this.CACHE_KEYS).forEach(([key, cacheKey]) => {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          stats[key] = {
            size: new Blob([cached]).size,
            cachedAt: new Date(parsed.cachedAt),
            expires: new Date(parsed.expires),
            isExpired: parsed.expires < Date.now()
          };
        } catch (error) {
          stats[key] = { error: 'Corrupted cache' };
        }
      } else {
        stats[key] = { status: 'Not cached' };
      }
    });
    
    return stats;
  }

  cleanupExpiredCache() {
    let cleanedCount = 0;
    
    Object.values(this.CACHE_KEYS).forEach(key => {
      const cached = localStorage.getItem(key);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.expires < Date.now()) {
            this.removeCache(key);
            cleanedCount++;
          }
        } catch (error) {
          this.removeCache(key);
          cleanedCount++;
        }
      }
    });
    
    return cleanedCount;
  }

  // ==================== SESSION STORAGE (TEMPORARY DATA) ====================

  setSessionData(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Error setting session data:', error);
      return false;
    }
  }

  getSessionData(key) {
    try {
      const stored = sessionStorage.getItem(key);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      return parsed.data;
    } catch (error) {
      console.error('Error getting session data:', error);
      sessionStorage.removeItem(key);
      return null;
    }
  }

  removeSessionData(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing session data:', error);
    }
  }

  // ==================== FORM DATA PERSISTENCE ====================

  saveFormDraft(formName, formData) {
    return this.setSessionData(`formDraft_${formName}`, formData);
  }

  getFormDraft(formName) {
    return this.getSessionData(`formDraft_${formName}`);
  }

  clearFormDraft(formName) {
    this.removeSessionData(`formDraft_${formName}`);
  }
}

export default new CacheService();