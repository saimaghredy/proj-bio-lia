import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../config/supabase';
import supabaseDatabase from '../services/supabaseDatabase';

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
    let mounted = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        try {
          if (session?.user) {
            // Get user profile from our users table
            try {
              const profile = await supabaseDatabase.getUserProfile(session.user.id);
              
              if (profile && mounted) {
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
                    profileCompleted: profile.profile_completed,
                    totalPoints: profile.total_points,
                    totalSpent: profile.total_spent,
                    loyaltyTier: profile.loyalty_tier
                  }
                });
              } else {
                // Create profile if it doesn't exist
                if (mounted) {
                  await createUserProfile(session.user);
                }
              }
            } catch (error) {
              console.error('Error loading user profile:', error);
              // Create profile if there's an error (likely user doesn't exist)
              if (mounted) {
                await createUserProfile(session.user);
              }
            }
          } else {
            if (mounted) {
              dispatch({ type: 'SET_USER', payload: null });
            }
          }
        } catch (error) {
          console.error('Auth state change error:', error);
        } finally {
          if (mounted) {
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Create user profile in our users table
  const createUserProfile = async (authUser) => {
    try {
      const userData = {
        id: authUser.id,
        email: authUser.email,
        firstName: authUser.user_metadata?.first_name || '',
        lastName: authUser.user_metadata?.last_name || '',
        phone: authUser.phone || '',
        emailVerified: authUser.email_confirmed_at ? true : false,
        provider: authUser.app_metadata?.provider || 'email'
      };

      const profile = await supabaseDatabase.createUserProfile(userData);
      
      if (profile) {
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
            profileCompleted: profile.profile_completed,
            totalPoints: profile.total_points,
            totalSpent: profile.total_spent,
            loyaltyTier: profile.loyalty_tier
          }
        });
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      // Set loading to false even if profile creation fails
      dispatch({ type: 'SET_LOADING', payload: false });
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
          redirectTo: `${window.location.origin}`
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

  // Send phone OTP using MSG91 via Supabase Edge Function
  const sendPhoneOTP = async (phoneNumber) => {
    try {
      const result = await supabaseDatabase.sendPhoneOTP(phoneNumber, state.user?.id);
      return result;
    } catch (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  };

  // Verify phone OTP
  const verifyPhoneOTP = async (phoneNumber, otp) => {
    try {
      const result = await supabaseDatabase.verifyPhoneOTP(phoneNumber, otp, state.user?.id);

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
      const data = await supabaseDatabase.updateUserProfile(state.user.id, {
        first_name: updates.firstName,
        last_name: updates.lastName,
        phone_number: updates.phone,
        farm_location: updates.farmLocation,
        farm_size: updates.farmSize,
        primary_crops: updates.primaryCrops,
        soil_type: updates.soilType,
        profile_completed: updates.profileCompleted
      });

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