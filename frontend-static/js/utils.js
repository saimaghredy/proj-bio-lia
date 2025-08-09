// Utility Functions

// DOM Utilities
const DOM = {
    // Element selection
    $(selector) {
        return document.querySelector(selector);
    },
    
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    // Element creation
    create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (content) {
            element.textContent = content;
        }
        
        return element;
    },
    
    // Class manipulation
    addClass(element, className) {
        if (element) element.classList.add(className);
    },
    
    removeClass(element, className) {
        if (element) element.classList.remove(className);
    },
    
    toggleClass(element, className) {
        if (element) element.classList.toggle(className);
    },
    
    hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    },
    
    // Event handling
    on(element, event, handler, options = {}) {
        if (element) {
            element.addEventListener(event, handler, options);
        }
    },
    
    off(element, event, handler) {
        if (element) {
            element.removeEventListener(event, handler);
        }
    },
    
    // Attribute manipulation
    attr(element, name, value) {
        if (!element) return null;
        
        if (value === undefined) {
            return element.getAttribute(name);
        } else {
            element.setAttribute(name, value);
            return element;
        }
    },
    
    removeAttr(element, name) {
        if (element) element.removeAttribute(name);
    },
    
    // Style manipulation
    css(element, property, value) {
        if (!element) return null;
        
        if (typeof property === 'object') {
            Object.entries(property).forEach(([prop, val]) => {
                element.style[prop] = val;
            });
        } else if (value === undefined) {
            return getComputedStyle(element)[property];
        } else {
            element.style[property] = value;
        }
        
        return element;
    },
    
    // Visibility
    show(element, display = 'block') {
        if (element) {
            element.style.display = display;
        }
    },
    
    hide(element) {
        if (element) {
            element.style.display = 'none';
        }
    },
    
    toggle(element, display = 'block') {
        if (element) {
            element.style.display = element.style.display === 'none' ? display : 'none';
        }
    }
};

// Validation Utilities
const Validator = {
    // Phone validation
    isValidPhone(phone) {
        return CONFIG.VALIDATION.PHONE_REGEX.test(phone);
    },
    
    // Email validation
    isValidEmail(email) {
        return CONFIG.VALIDATION.EMAIL_REGEX.test(email);
    },
    
    // Name validation
    isValidName(name) {
        return name && name.trim().length >= CONFIG.VALIDATION.NAME_MIN_LENGTH;
    },
    
    // Message validation
    isValidMessage(message) {
        return message && message.trim().length >= CONFIG.VALIDATION.MESSAGE_MIN_LENGTH;
    },
    
    // Required field validation
    isRequired(value) {
        return value && value.toString().trim().length > 0;
    },
    
    // Number validation
    isValidNumber(value, min = null, max = null) {
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        if (min !== null && num < min) return false;
        if (max !== null && num > max) return false;
        return true;
    }
};

// Storage Utilities
const Storage = {
    // Local Storage
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            Logger.error('Storage.set error:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            Logger.error('Storage.get error:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            Logger.error('Storage.remove error:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            Logger.error('Storage.clear error:', error);
            return false;
        }
    },
    
    // Form draft management
    saveFormDraft(formId, data) {
        const drafts = this.get(CONFIG.STORAGE_KEYS.FORM_DRAFTS, {});
        drafts[formId] = {
            data,
            timestamp: Date.now()
        };
        return this.set(CONFIG.STORAGE_KEYS.FORM_DRAFTS, drafts);
    },
    
    getFormDraft(formId) {
        const drafts = this.get(CONFIG.STORAGE_KEYS.FORM_DRAFTS, {});
        return drafts[formId] ? drafts[formId].data : null;
    },
    
    clearFormDraft(formId) {
        const drafts = this.get(CONFIG.STORAGE_KEYS.FORM_DRAFTS, {});
        delete drafts[formId];
        return this.set(CONFIG.STORAGE_KEYS.FORM_DRAFTS, drafts);
    }
};

// HTTP Utilities
const HTTP = {
    // GET request
    async get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    },
    
    // POST request
    async post(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
    },
    
    // Generic request
    async request(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            clearTimeout(timeoutId);
            Logger.error('HTTP request error:', error);
            throw error;
        }
    }
};

// Logger Utility
const Logger = {
    log(...args) {
        if (DEBUG.enabled && DEBUG.logLevel === 'debug') {
            console.log('[Biolia]', ...args);
        }
    },
    
    warn(...args) {
        if (DEBUG.enabled) {
            console.warn('[Biolia]', ...args);
        }
    },
    
    error(...args) {
        if (DEBUG.enabled) {
            console.error('[Biolia]', ...args);
        }
    },
    
    info(...args) {
        if (DEBUG.enabled && DEBUG.logLevel === 'debug') {
            console.info('[Biolia]', ...args);
        }
    }
};

// Format Utilities
const Format = {
    // Phone number formatting
    phone(phone) {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        return phone;
    },
    
    // Currency formatting
    currency(amount, currency = '₹') {
        if (typeof amount !== 'number') return `${currency}0`;
        return `${currency}${amount.toLocaleString('en-IN')}`;
    },
    
    // Date formatting
    date(date, options = {}) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        });
    },
    
    // Time formatting
    time(date, options = {}) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            ...options
        });
    },
    
    // Truncate text
    truncate(text, length = 100, suffix = '...') {
        if (!text || text.length <= length) return text;
        return text.substring(0, length) + suffix;
    },
    
    // Capitalize first letter
    capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    
    // Title case
    titleCase(text) {
        if (!text) return '';
        return text.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }
};

// Debounce Utility
const debounce = (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
};

// Throttle Utility
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Device Detection
const Device = {
    isMobile() {
        return window.innerWidth <= CONFIG.UI.MOBILE_BREAKPOINT;
    },
    
    isTablet() {
        return window.innerWidth <= CONFIG.UI.TABLET_BREAKPOINT && 
               window.innerWidth > CONFIG.UI.MOBILE_BREAKPOINT;
    },
    
    isDesktop() {
        return window.innerWidth > CONFIG.UI.TABLET_BREAKPOINT;
    },
    
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
};

// Performance Utilities
const Performance = {
    mark(name) {
        if (DEBUG.showPerformanceMetrics && performance.mark) {
            performance.mark(name);
        }
    },
    
    measure(name, startMark, endMark) {
        if (DEBUG.showPerformanceMetrics && performance.measure) {
            performance.measure(name, startMark, endMark);
            const measure = performance.getEntriesByName(name)[0];
            Logger.info(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
        }
    }
};

// Export utilities to global scope
window.DOM = DOM;
window.Validator = Validator;
window.Storage = Storage;
window.HTTP = HTTP;
window.Logger = Logger;
window.Format = Format;
window.debounce = debounce;
window.throttle = throttle;
window.Device = Device;
window.Performance = Performance;