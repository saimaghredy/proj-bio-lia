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
  arrayRemove
} from 'firebase/firestore';
import { db } from '../config/firebase';

class FirebaseDatabaseService {
  // ==================== USERS COLLECTION ====================
  
  async createUserProfile(userData) {
    try {
      const userProfile = {
        uid: userData.uid,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone || '',
        joined_on: serverTimestamp(),
        total_points: 0,
        total_spent: 0,
        last_login: serverTimestamp(),
        preferred_products: [],
        // Additional fields for better user management
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailVerified: userData.emailVerified || false,
        phoneVerified: userData.phoneVerified || false,
        provider: userData.provider || 'email',
        profile_completed: true
      };

      await setDoc(doc(db, 'users', userData.uid), userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  }

  async updateUserProfile(uid, updates) {
    try {
      const { setDoc } = await import('firebase/firestore');
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        ...updates,
        last_login: serverTimestamp()
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
        total_points: increment(pointsToAdd)
      });
    } catch (error) {
      console.error('Error updating user points:', error);
      throw new Error('Failed to update user points');
    }
  }

  async addPreferredProduct(uid, productId) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        preferred_products: arrayUnion(productId)
      });
    } catch (error) {
      console.error('Error adding preferred product:', error);
      throw new Error('Failed to add preferred product');
    }
  }

  // ==================== ORDERS COLLECTION ====================

  async createOrder(orderData) {
    try {
      const order = {
        order_id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        client_uid: orderData.userId,
        items: orderData.items.map(item => ({
          product: item.name,
          product_id: item.id,
          size: item.packaging || 'Standard',
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        })),
        total_amount: orderData.totalAmount,
        price_paid: orderData.finalAmount,
        discount_applied: orderData.discount || 0,
        reward_points_earned: Math.floor(orderData.finalAmount / 100), // 1 point per ₹100
        status: 'Pending',
        date_ordered: serverTimestamp(),
        date_shipped: null,
        date_delivered: null,
        review_rating: null,
        review_comment: null,
        
        // Shipping Information
        shipping_address: orderData.shippingAddress,
        billing_address: orderData.billingAddress,
        payment_method: orderData.paymentMethod,
        
        // Contact Information
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      
      // Update user's total spent and points
      await this.updateUserAfterOrder(orderData.userId, orderData.finalAmount, order.reward_points_earned);
      
      return { id: docRef.id, ...order };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async updateUserAfterOrder(uid, amountSpent, pointsEarned) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        total_spent: increment(amountSpent),
        total_points: increment(pointsEarned)
      });
    } catch (error) {
      console.error('Error updating user after order:', error);
    }
  }

  async updateOrderStatus(orderId, status, additionalData = {}) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const updateData = {
        status,
        ...additionalData
      };

      if (status === 'Shipped') {
        updateData.date_shipped = serverTimestamp();
      } else if (status === 'Delivered') {
        updateData.date_delivered = serverTimestamp();
      }

      await updateDoc(orderRef, updateData);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  async getUserOrders(uid) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('client_uid', '==', uid),
        orderBy('date_ordered', 'desc')
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

  async addOrderReview(orderId, rating, comment) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        review_rating: rating,
        review_comment: comment,
        review_date: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding order review:', error);
      throw new Error('Failed to add order review');
    }
  }

  // ==================== LOYALTY SETTINGS COLLECTION ====================

  async getLoyaltySettings() {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'loyalty'));
      if (settingsDoc.exists()) {
        return settingsDoc.data();
      } else {
        // Return default settings if none exist
        return {
          min_order_value: 1000,
          points_per_rupee: 0.01, // 1 point per ₹100
          bonus_points: 0,
          free_shipping_threshold: 2000,
          point_redemption_value: 1, // 1 point = ₹1
          max_points_per_order: 500
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
        updated_at: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating loyalty settings:', error);
      throw new Error('Failed to update loyalty settings');
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

  // ==================== ANALYTICS & INSIGHTS ====================

  async saveWeatherInsight(insightData) {
    try {
      const insight = {
        ...insightData,
        created_at: serverTimestamp(),
        location_coordinates: insightData.coordinates,
        farmer_name: insightData.farmerName,
        contact_number: insightData.contact,
        crop_type: insightData.cropType,
        land_area: insightData.landArea,
        land_area_unit: insightData.landAreaUnit,
        soil_type: insightData.soilType
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
        orderBy('created_at', 'desc'),
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

  // ==================== CONTACT FORMS ====================

  async saveContactForm(formData) {
    try {
      const contact = {
        ...formData,
        created_at: serverTimestamp(),
        status: 'new',
        responded: false
      };

      const docRef = await addDoc(collection(db, 'contactForms'), contact);
      return docRef.id;
    } catch (error) {
      console.error('Error saving contact form:', error);
      throw new Error('Failed to save contact form');
    }
  }

  // ==================== ADMIN FUNCTIONS ====================

  async getAllOrders(limit = 50) {
    try {
      const q = query(
        collection(db, 'orders'),
        orderBy('date_ordered', 'desc'),
        limit(limit)
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

  async getAllUsers(limit = 100) {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('joined_on', 'desc'),
        limit(limit)
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
        totalRevenue += order.price_paid || 0;
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