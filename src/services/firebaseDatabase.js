import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

class FirebaseDatabaseService {
  // ==================== USERS COLLECTION (Profile Data Only) ====================
  
  async createUserProfile(userData) {
    try {
      const userProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || '',
        emailVerified: userData.emailVerified || false,
        phoneVerified: userData.phoneVerified || false,
        provider: userData.provider || 'email',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        // Profile completion status
        profileCompleted: true,
        // Loyalty data
        totalPoints: 0,
        totalSpent: 0,
        loyaltyTier: 'Bronze'
      };

      await setDoc(doc(db, 'users', userData.uid || userData.id), userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  }

  async updateUserProfile(uid, updates) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  async getUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  async updateUserPoints(uid, pointsToAdd) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        totalPoints: increment(pointsToAdd),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user points:', error);
      throw new Error('Failed to update user points');
    }
  }

  async updateUserAfterOrder(uid, amountSpent, pointsEarned) {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      const currentSpent = userDoc.exists() ? (userDoc.data().totalSpent || 0) : 0;
      const newTotalSpent = currentSpent + amountSpent;
      
      // Calculate loyalty tier
      let loyaltyTier = 'Bronze';
      if (newTotalSpent >= 50000) loyaltyTier = 'Platinum';
      else if (newTotalSpent >= 25000) loyaltyTier = 'Gold';
      else if (newTotalSpent >= 10000) loyaltyTier = 'Silver';

      await updateDoc(userRef, {
        totalSpent: increment(amountSpent),
        totalPoints: increment(pointsEarned),
        loyaltyTier,
        lastOrderDate: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user after order:', error);
    }
  }

  // ==================== USER PREFERENCES COLLECTION ====================
  
  async saveUserCart(uid, cartItems) {
    try {
      const userPrefsRef = doc(db, 'userPreferences', uid);
      await setDoc(userPrefsRef, {
        cart: cartItems,
        cartUpdatedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user cart:', error);
      throw new Error('Failed to save cart');
    }
  }

  async getUserCart(uid) {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        return data.cart || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting user cart:', error);
      return [];
    }
  }

  async saveUserShippingAddress(uid, shippingAddress) {
    try {
      const userPrefsRef = doc(db, 'userPreferences', uid);
      const userPrefsDoc = await getDoc(userPrefsRef);
      
      let addresses = [];
      if (userPrefsDoc.exists()) {
        addresses = userPrefsDoc.data().shippingAddresses || [];
      }
      
      // Add new address to the beginning of the array (most recent first)
      addresses.unshift({
        ...shippingAddress,
        savedAt: serverTimestamp(),
        isDefault: addresses.length === 0 // First address becomes default
      });
      
      // Keep only last 3 addresses
      if (addresses.length > 3) {
        addresses = addresses.slice(0, 3);
      }

      await setDoc(userPrefsRef, {
        shippingAddresses: addresses,
        lastShippingAddress: shippingAddress,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving shipping address:', error);
    }
  }

  async getUserShippingAddress(uid) {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        return data.lastShippingAddress || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting shipping address:', error);
      return null;
    }
  }

  async getUserShippingAddresses(uid) {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        return data.shippingAddresses || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting shipping addresses:', error);
      return [];
    }
  }

  async addPreferredProduct(uid, productId) {
    try {
      const userPrefsRef = doc(db, 'userPreferences', uid);
      await setDoc(userPrefsRef, {
        preferredProducts: arrayUnion(productId),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error adding preferred product:', error);
      throw new Error('Failed to add preferred product');
    }
  }

  // ==================== ORDERS COLLECTION ====================

  async createOrder(orderData) {
    try {
      // Generate unique order ID
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const orderId = `BL${timestamp.toString().slice(-6)}${randomId}`;
      
      const order = {
        orderId: orderId,
        userId: orderData.userId,
        
        // Order Items
        items: orderData.items.map(item => ({
          productId: item.id,
          productName: item.name,
          category: item.category,
          packaging: item.packaging || 'Standard',
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        })),
        
        // Financial Information
        subtotal: orderData.totalAmount,
        taxAmount: orderData.taxAmount,
        totalAmount: orderData.finalAmount,
        discountApplied: orderData.discount || 0,
        rewardPointsEarned: Math.floor(orderData.finalAmount / 100),
        
        // Order Status & Tracking
        status: 'Order Confirmed',
        paymentStatus: orderData.paymentStatus || 'Pending',
        paymentMethod: orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment',
        
        // Dates & Tracking
        orderDate: serverTimestamp(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        shippedDate: null,
        deliveredDate: null,
        trackingNumber: null,
        shippingPartner: 'Blue Dart',
        
        // Customer Information
        customerInfo: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone
        },
        
        // Addresses
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress,
        
        // Additional Info
        orderNotes: '',
        internalNotes: `Order placed via website on ${new Date().toLocaleDateString('en-IN')}`,
        
        // Review Information
        reviewRating: null,
        reviewComment: null,
        reviewDate: null,
        
        // Metadata
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      
      // Update user's total spent and points
      await this.updateUserAfterOrder(orderData.userId, orderData.finalAmount, order.rewardPointsEarned);
      
      return { id: docRef.id, ...order };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async updateOrderStatus(orderId, status, additionalData = {}) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const updateData = {
        status,
        updatedAt: serverTimestamp(),
        ...additionalData
      };

      if (status === 'Shipped') {
        updateData.shippedDate = serverTimestamp();
        updateData.trackingNumber = additionalData.trackingNumber || `TRK${Date.now()}`;
      } else if (status === 'Delivered') {
        updateData.deliveredDate = serverTimestamp();
      }

      await updateDoc(orderRef, updateData);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  async getUserOrders(uid, limitCount = 10) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', uid),
        orderBy('orderDate', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const orders = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      
      return orders;
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw new Error('Failed to get user orders');
    }
  }

  async getOrder(orderId) {
    try {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (orderDoc.exists()) {
        return { id: orderDoc.id, ...orderDoc.data() };
      }
      throw new Error('Order not found');
    } catch (error) {
      console.error('Error getting order:', error);
      throw new Error('Failed to get order');
    }
  }

  async addOrderReview(orderId, rating, comment) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        reviewRating: rating,
        reviewComment: comment,
        reviewDate: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding order review:', error);
      throw new Error('Failed to add order review');
    }
  }

  // ==================== PRODUCTS COLLECTION ====================

  async getProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];
      
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw new Error('Failed to get products');
    }
  }

  async getProduct(productId) {
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error getting product:', error);
      throw new Error('Failed to get product');
    }
  }

  // ==================== WEATHER INSIGHTS COLLECTION ====================

  async saveWeatherInsight(insightData) {
    try {
      const insight = {
        userId: insightData.userId || null,
        farmerName: insightData.farmerName,
        contactNumber: insightData.contact,
        location: insightData.location,
        coordinates: insightData.coordinates,
        cropType: insightData.cropType,
        landArea: insightData.landArea,
        landAreaUnit: insightData.landAreaUnit,
        soilType: insightData.soilType,
        weatherData: insightData.weatherData,
        recommendations: insightData.recommendations,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'weatherInsights'), insight);
      return docRef.id;
    } catch (error) {
      console.error('Error saving weather insight:', error);
      throw new Error('Failed to save weather insight');
    }
  }

  async getUserWeatherInsights(uid) {
    try {
      const q = query(
        collection(db, 'weatherInsights'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      
      const querySnapshot = await getDocs(q);
      const insights = [];
      
      querySnapshot.forEach((doc) => {
        insights.push({ id: doc.id, ...doc.data() });
      });
      
      return insights;
    } catch (error) {
      console.error('Error getting weather insights:', error);
      throw new Error('Failed to get weather insights');
    }
  }

  // ==================== CONTACT FORMS COLLECTION ====================

  async saveContactForm(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        message: formData.message,
        status: 'new',
        responded: false,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'contactForms'), contact);
      return docRef.id;
    } catch (error) {
      console.error('Error saving contact form:', error);
      throw new Error('Failed to save contact form');
    }
  }

  // ==================== SETTINGS COLLECTION ====================

  async getLoyaltySettings() {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'loyalty'));
      if (settingsDoc.exists()) {
        return settingsDoc.data();
      } else {
        // Return default settings if none exist
        return {
          minOrderValue: 1000,
          pointsPerRupee: 0.01, // 1 point per ₹100
          bonusPoints: 0,
          freeShippingThreshold: 2000,
          pointRedemptionValue: 1, // 1 point = ₹1
          maxPointsPerOrder: 500
        };
      }
    } catch (error) {
      console.error('Error getting loyalty settings:', error);
      throw new Error('Failed to get loyalty settings');
    }
  }

  async updateLoyaltySettings(settings) {
    try {
      await setDoc(doc(db, 'settings', 'loyalty'), {
        ...settings,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating loyalty settings:', error);
      throw new Error('Failed to update loyalty settings');
    }
  }

  // ==================== ADMIN FUNCTIONS ====================

  async getAllOrders(limitCount = 50) {
    try {
      const q = query(
        collection(db, 'orders'),
        orderBy('orderDate', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const orders = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      
      return orders;
    } catch (error) {
      console.error('Error getting all orders:', error);
      throw new Error('Failed to get orders');
    }
  }

  async getAllUsers(limitCount = 100) {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const users = [];
      
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get users');
    }
  }

  async getOrderAnalytics() {
    try {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const usersSnapshot = await getDocs(collection(db, 'users'));
      
      let totalRevenue = 0;
      let totalOrders = 0;
      let totalUsers = 0;
      const statusCounts = {};
      
      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        totalRevenue += order.totalAmount || 0;
        totalOrders++;
        
        const status = order.status || 'Unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      
      usersSnapshot.forEach(() => {
        totalUsers++;
      });
      
      return {
        totalRevenue,
        totalOrders,
        totalUsers,
        averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        statusBreakdown: statusCounts
      };
    } catch (error) {
      console.error('Error getting order analytics:', error);
      throw new Error('Failed to get analytics');
    }
  }
}

export default new FirebaseDatabaseService();