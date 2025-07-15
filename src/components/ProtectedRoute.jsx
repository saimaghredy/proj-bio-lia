import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = (props = {}) => {
  const { children, requireAuth = true } = props;
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Move useEffect to top level - MUST be called unconditionally
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Authentication loading timeout - forcing reload');
        window.location.reload();
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  // Single loading state handler - no duplicate blocks
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-[#2f3a29] font-semibold mb-2">Loading...</p>
          <p className="text-gray-600 text-sm">Setting up your account...</p>
          
          <div className="mt-4">
            <button 
              onClick={() => window.location.reload()} 
              className="text-[#a4be88] hover:text-[#2f3a29] text-sm underline"
            >
              Taking too long? Click to refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;