import supabaseDatabase from './supabaseDatabase';
import cacheService from './cacheService';

class OptimizedSupabaseDatabaseService {
  constructor() {
    this.originalService = supabaseDatabase;
  }

  // ==================== SMART USER PROFILE OPERATIONS ====================

  async getUserProfile(uid, forceRefresh = false) {
    try {
      // Check cache first (unless forced refresh)
      if (!forceRefresh) {
        const cached = cacheService.getCachedUserProfile();
        if (cached && cached.id === uid) {
          console.log('📱 Using cached user profile');
          return cached;
        }
      }

      // Fetch from Supabase
      console.log('☁️ Fetching user profile from Supabase');
      const userData = await this.originalService.getUserProfile(uid);
      
      // Cache the result
      if (userData) {
        cacheService.cacheUserProfile(userData);
      }
      
      return userData;
    } catch (error) {
      console.error('Error getting user profile:', error);
      
      // Fallback to cache if Supabase fails
      const cached = cacheService.getCachedUserProfile();
      if (cached && cached.id === uid) {
        console.log('📱 Using cached user profile as fallback');
        return cached;
      }
      
      throw error;
    }
  }

  async updateUserProfile(uid, updates) {
    try {
      // Update Supabase first (source of truth)
      await this.originalService.updateUserProfile(uid, updates);
      
      // Update cache
      const cachedProfile = cacheService.getCachedUserProfile();
      if (cachedProfile && cachedProfile.id === uid) {
        const updatedProfile = { ...cachedProfile, ...updates };
        cacheService.cacheUserProfile(updatedProfile);
      }
      
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // ==================== SMART CART OPERATIONS ====================

  getCart() {
    // Cart is always local - no Supabase calls
    console.log('📱 Getting cart from local cache');
    return cacheService.getCachedCart();
  }

  addToCart(product, quantity = 1) {
    // Add to local cache immediately
    console.log('📱 Adding to local cart');
    return cacheService.addToCart(product, quantity);
  }

  removeFromCart(productId) {
    console.log('📱 Removing from local cart');
    return cacheService.removeFromCart(productId);
  }

  updateCartQuantity(productId, quantity) {
    console.log('📱 Updating cart quantity locally');
    return cacheService.updateCartQuantity(productId, quantity);
  }

  clearCart() {
    console.log('📱 Clearing local cart');
    return cacheService.clearCart();
  }

  getCartTotal() {
    const items = this.getCart();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemsCount() {
    const items = this.getCart();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // ==================== SMART PRODUCT OPERATIONS ====================

  async getProducts(forceRefresh = false) {
    try {
      // Check cache first
      if (!forceRefresh) {
        const cached = cacheService.getCachedProducts();
        if (cached && cached.length > 0) {
          console.log('📱 Using cached products');
          return cached;
        }
      }

      // Fetch from Supabase
      console.log('☁️ Fetching products from Supabase');
      const products = await this.originalService.getProducts();
      
      // Cache the result
      if (products && products.length > 0) {
        cacheService.cacheProducts(products);
      }
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      
      // Fallback to cache
      const cached = cacheService.getCachedProducts();
      if (cached && cached.length > 0) {
        console.log('📱 Using cached products as fallback');
        return cached;
      }
      
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      // Check if we have it in cached products
      const cachedProducts = cacheService.getCachedProducts();
      const cachedProduct = cachedProducts.find(p => p.id === productId);
      
      if (cachedProduct) {
        console.log('📱 Using cached product');
        return cachedProduct;
      }

      // Fetch from Supabase
      console.log('☁️ Fetching product from Supabase');
      return await this.originalService.getProduct(productId);
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  // ==================== SMART ORDER OPERATIONS ====================

  async createOrder(orderData) {
    try {
      // Validate cart against server before creating order
      await this.validateCartAtCheckout(orderData.items);
      
      // Create order in Supabase
      console.log('☁️ Creating order in Supabase');
      const order = await this.originalService.createOrder(orderData);
      
      // Clear local cart after successful order
      this.clearCart();
      
      // Cache the new order in recent orders
      const recentOrders = cacheService.getCachedRecentOrders();
      recentOrders.unshift(order);
      cacheService.cacheRecentOrders(recentOrders.slice(0, 5));
      
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getUserOrders(uid, limitCount = 10, forceRefresh = false) {
    try {
      // For recent orders, check cache first
      if (limitCount <= 5 && !forceRefresh) {
        const cached = cacheService.getCachedRecentOrders();
        if (cached && cached.length > 0) {
          console.log('📱 Using cached recent orders');
          return cached;
        }
      }

      // Fetch from Supabase
      console.log('☁️ Fetching orders from Supabase');
      const orders = await this.originalService.getUserOrders(uid, limitCount);
      
      // Cache recent orders
      if (limitCount <= 5 && orders && orders.length > 0) {
        cacheService.cacheRecentOrders(orders);
      }
      
      return orders;
    } catch (error) {
      console.error('Error getting user orders:', error);
      
      // Fallback to cache for recent orders
      if (limitCount <= 5) {
        const cached = cacheService.getCachedRecentOrders();
        if (cached && cached.length > 0) {
          console.log('📱 Using cached orders as fallback');
          return cached;
        }
      }
      
      throw error;
    }
  }

  // ==================== CART VALIDATION ====================

  async validateCartAtCheckout(cartItems) {
    console.log('🔍 Validating cart against server prices');
    
    for (const item of cartItems) {
      try {
        const serverProduct = await this.originalService.getProduct(item.id);
        
        if (!serverProduct) {
          throw new Error(`Product ${item.name} is no longer available`);
        }
        
        if (!serverProduct.in_stock) {
          throw new Error(`Product ${item.name} is out of stock`);
        }
        
        if (serverProduct.price !== item.price) {
          throw new Error(`Price for ${item.name} has changed. Please refresh your cart.`);
        }
      } catch (error) {
        console.error('Cart validation error:', error);
        throw error;
      }
    }
    
    console.log('✅ Cart validation successful');
  }

  // ==================== USER PREFERENCES ====================

  async getUserShippingAddress(uid) {
    try {
      // Check cache first
      const cached = cacheService.getCachedUserPreferences();
      if (cached.shippingAddress) {
        console.log('📱 Using cached shipping address');
        return cached.shippingAddress;
      }

      // Fetch from Supabase
      console.log('☁️ Fetching shipping address from Supabase');
      const address = await this.originalService.getUserShippingAddress(uid);
      
      // Cache the result
      if (address) {
        cacheService.updateUserPreference('shippingAddress', address);
      }
      
      return address;
    } catch (error) {
      console.error('Error getting shipping address:', error);
      throw error;
    }
  }

  async saveUserShippingAddress(uid, address) {
    try {
      // Save to Supabase
      await this.originalService.saveUserShippingAddress(uid, address);
      
      // Update cache
      cacheService.updateUserPreference('shippingAddress', address);
      
      return true;
    } catch (error) {
      console.error('Error saving shipping address:', error);
      throw error;
    }
  }

  // ==================== BACKGROUND SYNC ====================

  async backgroundSync(uid) {
    try {
      console.log('🔄 Starting background sync...');
      
      // Sync critical data in background
      const promises = [
        // Refresh user profile if cache is old
        this.getUserProfile(uid, false),
        
        // Refresh products if cache is old  
        this.getProducts(false),
        
        // Refresh recent orders
        this.getUserOrders(uid, 5, false)
      ];
      
      await Promise.allSettled(promises);
      console.log('✅ Background sync completed');
    } catch (error) {
      console.error('Background sync error:', error);
    }
  }

  // ==================== CACHE MANAGEMENT ====================

  getCacheStats() {
    return cacheService.getCacheStats();
  }

  cleanupCache() {
    return cacheService.cleanupExpiredCache();
  }

  clearAllCache() {
    cacheService.clearAllCache();
  }

  // ==================== FORM PERSISTENCE ====================

  saveFormDraft(formName, formData) {
    return cacheService.saveFormDraft(formName, formData);
  }

  getFormDraft(formName) {
    return cacheService.getFormDraft(formName);
  }

  clearFormDraft(formName) {
    cacheService.clearFormDraft(formName);
  }

  // ==================== PASSTHROUGH METHODS (No Caching Needed) ====================

  async saveWeatherInsight(insightData) {
    return await this.originalService.saveWeatherInsight(insightData);
  }

  async saveContactForm(formData) {
    return await this.originalService.saveContactForm(formData);
  }

  async getOrder(orderId) {
    return await this.originalService.getOrder(orderId);
  }

  async sendPhoneOTP(phoneNumber, userId) {
    return await this.originalService.sendPhoneOTP(phoneNumber, userId);
  }

  async verifyPhoneOTP(phoneNumber, otp, userId) {
    return await this.originalService.verifyPhoneOTP(phoneNumber, otp, userId);
  }
}

export default new OptimizedSupabaseDatabaseService();