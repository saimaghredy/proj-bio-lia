import { supabase } from '../config/supabase';

class SupabaseDatabase {
  // Get user profile by ID
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Create new user profile
  async createUserProfile(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          id: userData.id,
          email: userData.email,
          first_name: userData.firstName || '',
          last_name: userData.lastName || '',
          phone_number: userData.phone || '',
          email_verified: userData.emailVerified || false,
          phone_verified: false,
          provider: userData.provider || 'email',
          role: 'customer',
          profile_completed: false,
          total_points: 0,
          total_spent: 0,
          loyalty_tier: 'Bronze'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Send phone OTP via edge function
  async sendPhoneOTP(phoneNumber, userId) {
    try {
      const { data, error } = await supabase.functions.invoke('phone-verification', {
        body: {
          phone_number: phoneNumber,
          action: 'send'
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }

  // Verify phone OTP via edge function
  async verifyPhoneOTP(phoneNumber, otp, userId) {
    try {
      const { data, error } = await supabase.functions.invoke('phone-verification', {
        body: {
          phone_number: phoneNumber,
          otp: otp,
          action: 'verify'
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }
}

export default new SupabaseDatabase();