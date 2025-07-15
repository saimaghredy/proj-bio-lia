import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = (props = {}) => {
  const { children, requireAuth = true } = props;
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-[#2f3a29] font-semibold mb-2">Loading...</p>
          <p className="text-gray-600 text-sm">Setting up your account...</p>
          
          {/* Add timeout fallback */}
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

  // Add fallback timeout component
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Authentication loading timeout - forcing reload');
        window.location.reload();
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-[#2f3a29] font-semibold">Loading...</p>
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