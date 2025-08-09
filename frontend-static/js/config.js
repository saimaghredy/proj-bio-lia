// Application Configuration
const CONFIG = {
    // App Info
    APP_NAME: 'Biolia',
    APP_VERSION: '1.0.0',
    
    // API Configuration
    API_BASE_URL: 'https://api.biolia.com',
    API_TIMEOUT: 10000,
    
    // Form Configuration
    FORM_AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    FORM_VALIDATION_DELAY: 500, // 0.5 seconds
    
    // Animation Configuration
    ANIMATION_DURATION: 300,
    SCROLL_ANIMATION_OFFSET: 100,
    
    // Local Storage Keys
    STORAGE_KEYS: {
        FORM_DRAFTS: 'biolia_form_drafts',
        USER_PREFERENCES: 'biolia_user_preferences',
        ANALYTICS: 'biolia_analytics'
    },
    
    // Validation Rules
    VALIDATION: {
        PHONE_REGEX: /^\d{10}$/,
        EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        NAME_MIN_LENGTH: 2,
        MESSAGE_MIN_LENGTH: 10
    },
    
    // UI Configuration
    UI: {
        MOBILE_BREAKPOINT: 768,
        TABLET_BREAKPOINT: 1024,
        DESKTOP_BREAKPOINT: 1200
    },
    
    // Feature Flags
    FEATURES: {
        ANALYTICS_ENABLED: true,
        FORM_AUTO_SAVE: true,
        SCROLL_ANIMATIONS: true,
        LOADING_ANIMATIONS: true
    },
    
    // Error Messages
    ERRORS: {
        NETWORK_ERROR: 'Network error. Please check your connection and try again.',
        VALIDATION_ERROR: 'Please check your input and try again.',
        GENERIC_ERROR: 'Something went wrong. Please try again later.',
        FORM_SUBMISSION_ERROR: 'Failed to submit form. Please try again.'
    },
    
    // Success Messages
    SUCCESS: {
        FORM_SUBMITTED: 'Form submitted successfully!',
        MESSAGE_SENT: 'Message sent successfully!',
        DATA_SAVED: 'Data saved successfully!'
    }
};

// Environment Detection
const ENV = {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    isProduction: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
    isMobile: window.innerWidth <= CONFIG.UI.MOBILE_BREAKPOINT,
    isTablet: window.innerWidth <= CONFIG.UI.TABLET_BREAKPOINT && window.innerWidth > CONFIG.UI.MOBILE_BREAKPOINT,
    isDesktop: window.innerWidth > CONFIG.UI.TABLET_BREAKPOINT
};

// Debug Configuration
const DEBUG = {
    enabled: ENV.isDevelopment,
    logLevel: ENV.isDevelopment ? 'debug' : 'error',
    showPerformanceMetrics: ENV.isDevelopment
};

// Export configuration
window.CONFIG = CONFIG;
window.ENV = ENV;
window.DEBUG = DEBUG;