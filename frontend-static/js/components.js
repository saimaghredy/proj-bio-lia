// Reusable UI Components

// Loading Component
class LoadingComponent {
    constructor() {
        this.overlay = DOM.$('#loadingOverlay');
        this.isVisible = false;
    }
    
    show(message = 'Loading...') {
        if (this.overlay) {
            const messageEl = this.overlay.querySelector('p');
            if (messageEl) messageEl.textContent = message;
            
            DOM.addClass(this.overlay, 'active');
            this.isVisible = true;
            Logger.log('Loading overlay shown:', message);
        }
    }
    
    hide() {
        if (this.overlay) {
            DOM.removeClass(this.overlay, 'active');
            this.isVisible = false;
            Logger.log('Loading overlay hidden');
        }
    }
    
    toggle(show, message) {
        if (show) {
            this.show(message);
        } else {
            this.hide();
        }
    }
}

// Modal Component
class ModalComponent {
    constructor(modalId) {
        this.modal = DOM.$(`#${modalId}`);
        this.isVisible = false;
        this.init();
    }
    
    init() {
        if (this.modal) {
            // Close on overlay click
            DOM.on(this.modal, 'click', (e) => {
                if (e.target === this.modal) {
                    this.hide();
                }
            });
            
            // Close on escape key
            DOM.on(document, 'keydown', (e) => {
                if (e.key === 'Escape' && this.isVisible) {
                    this.hide();
                }
            });
        }
    }
    
    show() {
        if (this.modal) {
            DOM.addClass(this.modal, 'active');
            this.isVisible = true;
            document.body.style.overflow = 'hidden';
            Logger.log('Modal shown');
        }
    }
    
    hide() {
        if (this.modal) {
            DOM.removeClass(this.modal, 'active');
            this.isVisible = false;
            document.body.style.overflow = '';
            Logger.log('Modal hidden');
        }
    }
    
    setContent(title, content) {
        if (this.modal) {
            const titleEl = this.modal.querySelector('.modal-title');
            const contentEl = this.modal.querySelector('.modal-text');
            
            if (titleEl) titleEl.textContent = title;
            if (contentEl) contentEl.innerHTML = content;
        }
    }
}

// Form Validation Component
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
        this.rules = {};
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            DOM.on(input, 'blur', () => this.validateField(input));
            DOM.on(input, 'input', debounce(() => this.validateField(input), CONFIG.FORM_VALIDATION_DELAY));
        });
    }
    
    addRule(fieldName, validator, message) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push({ validator, message });
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.rules[fieldName] || [];
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Apply validation rules
        for (const rule of rules) {
            if (!rule.validator(value, field)) {
                this.setFieldError(field, rule.message);
                return false;
            }
        }
        
        return true;
    }
    
    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    setFieldError(field, message) {
        const errorId = `${field.name}Error`;
        const errorEl = DOM.$(`#${errorId}`);
        
        DOM.addClass(field, 'error');
        
        if (errorEl) {
            errorEl.textContent = message;
            DOM.addClass(errorEl, 'show');
        }
        
        this.errors[field.name] = message;
    }
    
    clearFieldError(field) {
        const errorId = `${field.name}Error`;
        const errorEl = DOM.$(`#${errorId}`);
        
        DOM.removeClass(field, 'error');
        
        if (errorEl) {
            errorEl.textContent = '';
            DOM.removeClass(errorEl, 'show');
        }
        
        delete this.errors[field.name];
    }
    
    clearAllErrors() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => this.clearFieldError(input));
        this.errors = {};
    }
    
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }
    
    getErrors() {
        return { ...this.errors };
    }
}

// Message Component
class MessageComponent {
    constructor(containerId) {
        this.container = DOM.$(`#${containerId}`);
    }
    
    show(message, type = 'info', duration = 5000) {
        if (!this.container) return;
        
        const messageEl = DOM.create('div', {
            className: `form-message ${type}`,
            innerHTML: message
        });
        
        this.container.appendChild(messageEl);
        
        // Auto-hide after duration
        if (duration > 0) {
            setTimeout(() => {
                this.hide(messageEl);
            }, duration);
        }
        
        return messageEl;
    }
    
    hide(messageEl) {
        if (messageEl && messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }
    
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
    
    success(message, duration) {
        return this.show(message, 'success', duration);
    }
    
    error(message, duration) {
        return this.show(message, 'error', duration);
    }
    
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Navigation Component
class NavigationComponent {
    constructor() {
        this.navbar = DOM.$('#navbar');
        this.mobileMenuBtn = DOM.$('#mobileMenuBtn');
        this.mobileMenu = DOM.$('#mobileMenu');
        this.isMenuOpen = false;
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.setupActiveLinks();
    }
    
    setupMobileMenu() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            DOM.on(this.mobileMenuBtn, 'click', () => {
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking on links
            const menuLinks = this.mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                DOM.on(link, 'click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }
    
    setupScrollEffect() {
        if (this.navbar) {
            DOM.on(window, 'scroll', throttle(() => {
                if (window.scrollY > 100) {
                    DOM.addClass(this.navbar, 'scrolled');
                } else {
                    DOM.removeClass(this.navbar, 'scrolled');
                }
            }, 100));
        }
    }
    
    setupActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = DOM.$$('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                DOM.addClass(link, 'active');
            } else {
                DOM.removeClass(link, 'active');
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    openMobileMenu() {
        DOM.addClass(this.mobileMenu, 'active');
        DOM.addClass(this.mobileMenuBtn, 'active');
        this.isMenuOpen = true;
        Logger.log('Mobile menu opened');
    }
    
    closeMobileMenu() {
        DOM.removeClass(this.mobileMenu, 'active');
        DOM.removeClass(this.mobileMenuBtn, 'active');
        this.isMenuOpen = false;
        Logger.log('Mobile menu closed');
    }
}

// Counter Animation Component
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.hasAnimated = false;
    }
    
    start() {
        if (this.hasAnimated) return;
        
        const startTime = performance.now();
        const startValue = 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (this.target - startValue) * easeOut);
            
            this.element.textContent = currentValue + (this.target === 100 ? '%' : this.target > 10 ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.hasAnimated = true;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Intersection Observer Component
class IntersectionObserverComponent {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.handleIntersection(entry.target);
                    }
                });
            }, this.options);
        }
    }
    
    observe(element) {
        if (this.observer && element) {
            this.observer.observe(element);
        }
    }
    
    unobserve(element) {
        if (this.observer && element) {
            this.observer.unobserve(element);
        }
    }
    
    handleIntersection(element) {
        // Add animation class
        DOM.addClass(element, 'animate-in');
        
        // Handle counter animations
        const counterData = DOM.attr(element, 'data-count');
        if (counterData) {
            const counter = new CounterAnimation(
                element.querySelector('.trust-number'),
                parseInt(counterData),
                2000
            );
            counter.start();
        }
        
        // Unobserve after animation
        this.unobserve(element);
    }
}

// Export components to global scope
window.LoadingComponent = LoadingComponent;
window.ModalComponent = ModalComponent;
window.FormValidator = FormValidator;
window.MessageComponent = MessageComponent;
window.NavigationComponent = NavigationComponent;
window.CounterAnimation = CounterAnimation;
window.IntersectionObserverComponent = IntersectionObserverComponent;