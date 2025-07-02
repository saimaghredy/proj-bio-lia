import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import firebaseAuthService from '../services/firebaseAuth';

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
    case 'UPDATE_VERIFICATION':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          ...action.payload
        } : null,
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

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await firebaseAuthService.getCurrentUserData();
          dispatch({ type: 'SET_USER', payload: userData });
        } catch (error) {
          console.error('Error getting user data:', error);
          dispatch({ type: 'SET_USER', payload: null });
        }
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userData = await firebaseAuthService.login(email, password);
      dispatch({ type: 'SET_USER', payload: userData });
      return userData;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userResponse = await firebaseAuthService.register(userData);
      dispatch({ type: 'SET_USER', payload: userResponse });
      return userResponse;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async () => {
    try {
      await firebaseAuthService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sendOTP = async (type, value) => {
    try {
      if (type === 'email') {
        return await firebaseAuthService.sendEmailVerification();
      } else if (type === 'phone') {
        const confirmationResult = await firebaseAuthService.sendPhoneOTP(value);
        // Store confirmation result for verification
        window.confirmationResult = confirmationResult;
        return { success: true, message: `OTP sent to ${value}` };
      }
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (type, value, otp) => {
    try {
      if (type === 'email') {
        // For email, we check if the user has verified their email
        const isVerified = await firebaseAuthService.checkEmailVerification();
        if (isVerified) {
          dispatch({ type: 'UPDATE_VERIFICATION', payload: { emailVerified: true } });
          return { success: true, message: 'Email verified successfully' };
        } else {
          throw new Error('Please check your email and click the verification link');
        }
      } else if (type === 'phone') {
        const confirmationResult = window.confirmationResult;
        if (confirmationResult) {
          const result = await firebaseAuthService.verifyPhoneOTP(confirmationResult, otp);
          dispatch({ type: 'UPDATE_VERIFICATION', payload: { phoneVerified: true } });
          return result;
        } else {
          throw new Error('Please request a new OTP');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        sendOTP,
        verifyOTP,
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