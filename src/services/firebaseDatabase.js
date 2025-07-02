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
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

class FirebaseDatabaseService {
  // Orders
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async getOrder(orderId) {
    try {
      const docRef = doc(db, 'orders', orderId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error getting order:', error);
      throw new Error('Failed to get order');
    }
  }

  async getUserOrders(userId) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const orders = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      
      return orders;
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw new Error('Failed to get orders');
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  // Products
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

  // Weather Insights
  async saveWeatherInsight(insightData) {
    try {
      const docRef = await addDoc(collection(db, 'weatherInsights'), {
        ...insightData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving weather insight:', error);
      throw new Error('Failed to save weather insight');
    }
  }

  async getUserWeatherInsights(userId) {
    try {
      const q = query(
        collection(db, 'weatherInsights'),
        where('userId', '==', userId),
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

  // Contact Forms
  async saveContactForm(formData) {
    try {
      const docRef = await addDoc(collection(db, 'contactForms'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving contact form:', error);
      throw new Error('Failed to save contact form');
    }
  }
}

export default new FirebaseDatabaseService();