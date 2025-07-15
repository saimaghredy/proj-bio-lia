import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../config/supabase';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Get user profile from our users table
          const { data: profile, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile && !error) {
            dispatch({ 
              type: 'SET_USER', 
              payload: {
                id: profile.id,
                email: profile.email,
                firstName: profile.first_name,
                lastName: profile.last_name,
                phone: profile.phone_number,
                emailVerified: profile.email_verified,
                phoneVerified: profile.phone_verified,
                role: profile.role,
                farmLocation: profile.farm_location,
                farmSize: profile.farm_size,
                primaryCrops: profile.primary_crops,
                soilType: profile.soil_type,
                profileCompleted: profile.profile_completed
              }
            });
          } else {
            // Create profile if it doesn't exist
            await createUserProfile(session.user);
          }
        } else {
          dispatch({ type: 'SET_USER', payload: null });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Create user profile in our users table
  const createUserProfile = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.id,
            email: authUser.email,
            first_name: authUser.user_metadata?.first_name || '',
            last_name: authUser.user_metadata?.last_name || '',
            phone_number: authUser.phone || '',
            email_verified: authUser.email_confirmed_at ? true : false,
            provider: authUser.app_metadata?.provider || 'email',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (data && !error) {
        dispatch({ 
          type: 'SET_USER', 
          payload: {
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            phone: data.phone_number,
            emailVerified: data.email_verified,
            phoneVerified: data.phone_verified,
            role: data.role,
            profileCompleted: data.profile_completed
          }
        });
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone
          }
        }
      });

      if (error) throw error;

      return data.user;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return data.user;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  };

  // Google Sign-in
  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Send phone OTP using MSG91
  const sendPhoneOTP = async (phoneNumber) => {
    try {
      // Call your edge function or API endpoint for MSG91
      const response = await fetch('/api/send-phone-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ 
          phone_number: phoneNumber,
          user_id: state.user?.id 
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send OTP');
      }

      return result;
    } catch (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  };

  // Verify phone OTP
  const verifyPhoneOTP = async (phoneNumber, otp) => {
    try {
      const response = await fetch('/api/verify-phone-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ 
          phone_number: phoneNumber,
          otp: otp,
          user_id: state.user?.id 
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Verification failed');
      }

      // Update user profile if verification successful
      if (result.verified) {
        dispatch({ 
          type: 'UPDATE_PROFILE', 
          payload: { 
            phoneVerified: true,
            phone: phoneNumber 
          } 
        });
      }

      return result;
    } catch (error) {
      throw new Error(error.message || 'Verification failed');
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', state.user.id)
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'UPDATE_PROFILE', payload: updates });
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        loginWithGoogle,
        logout,
        sendPhoneOTP,
        verifyPhoneOTP,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};