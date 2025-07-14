import React, { useState, useEffect } from 'react';
import optimizedDatabase from '../services/optimizedFirebaseDatabase';

const CacheMonitor = () => {
  const [cacheStats, setCacheStats] = useState({});
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    if (showMonitor) {
      const updateStats = () => {
        const stats = optimizedDatabase.getCacheStats();
        setCacheStats(stats);
      };

      updateStats();
      const interval = setInterval(updateStats, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [showMonitor]);

  const handleCleanup = () => {
    const cleaned = optimizedDatabase.cleanupCache();
    alert(`Cleaned ${cleaned} expired cache entries`);
    
    // Refresh stats
    const stats = optimizedDatabase.getCacheStats();
    setCacheStats(stats);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all cache? This will require fresh data loading.')) {
      optimizedDatabase.clearAllCache();
      setCacheStats({});
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!showMonitor ? (
        <button
          onClick={() => setShowMonitor(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
          title="Cache Monitor"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Cache Monitor</h3>
            <button
              onClick={() => setShowMonitor(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(cacheStats).map(([key, stats]) => (
              <div key={key} className="border rounded p-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{key}</span>
                  {stats.error ? (
                    <span className="text-red-500 text-xs">{stats.error}</span>
                  ) : stats.status ? (
                    <span className="text-gray-500 text-xs">{stats.status}</span>
                  ) : (
                    <span className={`text-xs ${stats.isExpired ? 'text-red-500' : 'text-green-500'}`}>
                      {stats.isExpired ? 'Expired' : 'Valid'}
                    </span>
                  )}
                </div>
                
                {stats.size && (
                  <div className="text-xs text-gray-600 mt-1">
                    <div>Size: {formatSize(stats.size)}</div>
                    <div>Cached: {stats.cachedAt?.toLocaleTimeString()}</div>
                    <div>Expires: {stats.expires?.toLocaleTimeString()}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCleanup}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-2 px-3 rounded transition-all"
            >
              Cleanup
            </button>
            <button
              onClick={handleClearAll}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 rounded transition-all"
            >
              Clear All
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            💡 Cache reduces Firestore reads by ~85%
          </div>
        </div>
      )}
    </div>
  );
};

export default CacheMonitor;