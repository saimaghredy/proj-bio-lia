import React, { createContext, useContext, useReducer, useEffect } from 'react';

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

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bioLiaUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: parsedUser });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('bioLiaUser');
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('bioLiaUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('bioLiaUser');
    }
  }, [state.user]);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (simulate database)
      const users = JSON.parse(localStorage.getItem('bioLiaUsers') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
      };

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('bioLiaUsers') || '[]');
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        emailVerified: false,
        phoneVerified: false,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('bioLiaUsers', JSON.stringify(users));

      const userResponse = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        emailVerified: newUser.emailVerified,
        phoneVerified: newUser.phoneVerified,
      };

      dispatch({ type: 'SET_USER', payload: userResponse });
      return userResponse;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const sendOTP = async (type, value) => {
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in localStorage (in real app, this would be server-side)
    const otpData = {
      otp,
      type,
      value,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };
    
    localStorage.setItem(`bioLiaOTP_${type}_${value}`, JSON.stringify(otpData));
    
    // In real app, send OTP via email/SMS service
    console.log(`OTP for ${type} (${value}): ${otp}`);
    
    return { success: true, message: `OTP sent to ${value}` };
  };

  const verifyOTP = async (type, value, otp) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const storedOTPData = localStorage.getItem(`bioLiaOTP_${type}_${value}`);
    if (!storedOTPData) {
      throw new Error('OTP not found or expired');
    }
    
    const { otp: storedOTP, expiresAt } = JSON.parse(storedOTPData);
    
    if (Date.now() > expiresAt) {
      localStorage.removeItem(`bioLiaOTP_${type}_${value}`);
      throw new Error('OTP has expired');
    }
    
    if (otp !== storedOTP) {
      throw new Error('Invalid OTP');
    }
    
    // Remove OTP after successful verification
    localStorage.removeItem(`bioLiaOTP_${type}_${value}`);
    
    // Update user verification status
    if (state.user) {
      const updatedUser = {
        ...state.user,
        [`${type}Verified`]: true,
      };
      
      // Update in users storage
      const users = JSON.parse(localStorage.getItem('bioLiaUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === state.user.id);
      if (userIndex !== -1) {
        users[userIndex][`${type}Verified`] = true;
        localStorage.setItem('bioLiaUsers', JSON.stringify(users));
      }
      
      dispatch({ type: 'SET_USER', payload: updatedUser });
    }
    
    return { success: true, message: `${type} verified successfully` };
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