import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import optimizedDatabase from '../services/optimizedSupabaseDatabase';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { user, isAuthenticated } = useAuth();

  // Load cart from cache on mount
  useEffect(() => {
    const cachedCart = optimizedDatabase.getCart();
    dispatch({ type: 'LOAD_CART', payload: cachedCart });
  }, []);

  // Auto-sync cart changes
  useEffect(() => {
    // Cart is always stored locally for performance
    // No need to sync to Firestore until checkout
  }, [state.items]);

  // Background sync when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      // Start background sync for user data
      optimizedDatabase.backgroundSync(user.id);
    }
  }, [isAuthenticated, user]);

  const addToCart = (product, quantity = 1) => {
    const updatedCart = optimizedDatabase.addToCart(product, quantity);
    dispatch({ type: 'LOAD_CART', payload: updatedCart });
  };

  const removeFromCart = (productId) => {
    const updatedCart = optimizedDatabase.removeFromCart(productId);
    dispatch({ type: 'LOAD_CART', payload: updatedCart });
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = optimizedDatabase.updateCartQuantity(productId, quantity);
    dispatch({ type: 'LOAD_CART', payload: updatedCart });
  };

  const clearCart = () => {
    const updatedCart = optimizedDatabase.clearCart();
    dispatch({ type: 'LOAD_CART', payload: updatedCart });
  };

  const getCartTotal = () => {
    return optimizedDatabase.getCartTotal();
  };

  const getCartItemsCount = () => {
    return optimizedDatabase.getCartItemsCount();
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};