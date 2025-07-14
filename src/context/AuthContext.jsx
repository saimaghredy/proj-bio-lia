import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import firebaseAuthService from '../services/firebaseAuth';
import optimizedDatabase from '../services/optimizedFirebaseDatabase';

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
          
          // Start background sync for user data
          if (userData) {
            optimizedDatabase.backgroundSync(userData.id);
          }
          
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

  const loginWithGoogle = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userData = await firebaseAuthService.signInWithGoogle();
      
      // Ensure user profile exists in database
      const existingProfile = await optimizedDatabase.getUserProfile(userData.id);
      if (!existingProfile) {
        await optimizedDatabase.originalService.createUserProfile(userData);
      } else {
        // Update last login
        await optimizedDatabase.updateUserProfile(userData.id, { last_login: new Date() });
      }
      
      // Start background sync
      optimizedDatabase.backgroundSync(userData.id);
      
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
      
      // Create user profile in database
      await optimizedDatabase.originalService.createUserProfile(userResponse);
      
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        register,
        logout,
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