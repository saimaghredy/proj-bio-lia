import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import optimizedDatabase from '../services/optimizedSupabaseDatabase';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload || [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const cachedCart = optimizedDatabase.getCart();
    dispatch({ type: 'LOAD_CART', payload: cachedCart });
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
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