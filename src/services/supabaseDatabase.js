import { supabase } from '../config/supabase';

class SupabaseDatabaseService {
  // ==================== USER PROFILE OPERATIONS ====================
  
  async createUserProfile(userData) {
    try {
      const userProfile = {
        id: userData.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone_number: userData.phone || '',
        email_verified: userData.emailVerified || false,
        phone_verified: userData.phoneVerified || false,
        provider: userData.provider || 'email',
        profile_completed: true,
        total_points: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('users')
        .insert([userProfile])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  }

  async updateUserProfile(uid, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', uid)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  async getUserProfile(uid) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  // ==================== PRODUCTS OPERATIONS ====================

  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting products:', error);
      throw new Error('Failed to get products');
    }
  }

  async getProduct(productId) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting product:', error);
      throw new Error('Failed to get product');
    }
  }

  // ==================== ORDERS OPERATIONS ====================

  async createOrder(orderData) {
    try {
      // Generate unique order ID
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const orderId = `BL${timestamp.toString().slice(-6)}${randomId}`;
      
      const order = {
        order_id: orderId,
        user_id: orderData.userId,
        items: orderData.items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          category: item.category,
          packaging: item.packaging || 'Standard',
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        })),
        subtotal: orderData.totalAmount,
        tax_amount: orderData.taxAmount,
        total_amount: orderData.finalAmount,
        discount_applied: orderData.discount || 0,
        reward_points_earned: Math.floor(orderData.finalAmount / 100),
        status: 'Order Confirmed',
        payment_status: orderData.paymentStatus || 'Pending',
        payment_method: orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment',
        estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        customer_info: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone
        },
        shipping_address: orderData.shippingAddress,
        billing_address: orderData.billingAddress,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;

      // Update user's total spent and points
      await this.updateUserAfterOrder(orderData.userId, orderData.finalAmount, order.reward_points_earned);
      
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async updateUserAfterOrder(uid, amountSpent, pointsEarned) {
    try {
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('total_spent, total_points')
        .eq('id', uid)
        .single();

      if (fetchError) throw fetchError;

      const newTotalSpent = (user.total_spent || 0) + amountSpent;
      
      // Calculate loyalty tier
      let loyaltyTier = 'Bronze';
      if (newTotalSpent >= 50000) loyaltyTier = 'Platinum';
      else if (newTotalSpent >= 25000) loyaltyTier = 'Gold';
      else if (newTotalSpent >= 10000) loyaltyTier = 'Silver';

      const { error: updateError } = await supabase
        .from('users')
        .update({
          total_spent: newTotalSpent,
          total_points: (user.total_points || 0) + pointsEarned,
          loyalty_tier: loyaltyTier,
          last_order_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error updating user after order:', error);
    }
  }

  async getUserOrders(uid, limitCount = 10) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(limitCount);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw new Error('Failed to get user orders');
    }
  }

  async getOrder(orderId) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting order:', error);
      throw new Error('Failed to get order');
    }
  }

  // ==================== USER PREFERENCES OPERATIONS ====================

  async saveUserShippingAddress(uid, shippingAddress) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: uid,
          last_shipping_address: shippingAddress,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving shipping address:', error);
      throw new Error('Failed to save shipping address');
    }
  }

  async getUserShippingAddress(uid) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('last_shipping_address')
        .eq('user_id', uid)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
      return data?.last_shipping_address || null;
    } catch (error) {
      console.error('Error getting shipping address:', error);
      return null;
    }
  }

  // ==================== WEATHER INSIGHTS OPERATIONS ====================

  async saveWeatherInsight(insightData) {
    try {
      const insight = {
        user_id: insightData.userId || null,
        farmer_name: insightData.farmerName,
        contact_number: insightData.contact,
        location: insightData.location,
        coordinates: insightData.coordinates,
        crop_type: insightData.cropType,
        land_area: insightData.landArea,
        land_area_unit: insightData.landAreaUnit,
        soil_type: insightData.soilType,
        weather_data: insightData.weatherData,
        recommendations: insightData.recommendations,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('weather_insights')
        .insert([insight])
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error saving weather insight:', error);
      throw new Error('Failed to save weather insight');
    }
  }

  async getUserWeatherInsights(uid) {
    try {
      const { data, error } = await supabase
        .from('weather_insights')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting weather insights:', error);
      throw new Error('Failed to get weather insights');
    }
  }

  // ==================== CONTACT FORMS OPERATIONS ====================

  async saveContactForm(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        message: formData.message,
        status: 'new',
        responded: false,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('contact_forms')
        .insert([contact])
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error saving contact form:', error);
      throw new Error('Failed to save contact form');
    }
  }

  // ==================== PHONE VERIFICATION OPERATIONS ====================

  async sendPhoneOTP(phoneNumber, userId) {
    try {
      const { data, error } = await supabase.functions.invoke('phone-verification', {
        body: {
          phone_number: phoneNumber,
          user_id: userId,
          action: 'send'
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending phone OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  async verifyPhoneOTP(phoneNumber, otp, userId) {
    try {
      const { data, error } = await supabase.functions.invoke('phone-verification', {
        body: {
          phone_number: phoneNumber,
          otp: otp,
          user_id: userId,
          action: 'verify'
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error verifying phone OTP:', error);
      throw new Error('Failed to verify OTP');
    }
  }
}

export default new SupabaseDatabaseService();