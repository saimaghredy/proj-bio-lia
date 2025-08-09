// Main Application Entry Point

class BioliaApp {
    constructor() {
        this.components = {};
        this.currentPage = this.getCurrentPage();
        this.init();
    }
    
    init() {
        Performance.mark('app-init-start');
        
        // Initialize core components
        this.initializeComponents();
        
        // Setup global event listeners
        this.setupGlobalEvents();
        
        // Initialize page-specific functionality
        this.initializePage();
        
        // Setup analytics if enabled
        if (CONFIG.FEATURES.ANALYTICS_ENABLED) {
            this.initializeAnalytics();
        }
        
        Performance.mark('app-init-end');
        Performance.measure('app-initialization', 'app-init-start', 'app-init-end');
        
        Logger.log('Biolia App initialized successfully');
    }
    
    initializeComponents() {
        // Initialize loading component
        this.components.loading = new LoadingComponent();
        
        // Initialize navigation
        this.components.navigation = new NavigationComponent();
        
        // Initialize intersection observer for animations
        if (CONFIG.FEATURES.SCROLL_ANIMATIONS) {
            this.components.intersectionObserver = new IntersectionObserverComponent();
            this.setupScrollAnimations();
        }
        
        Logger.log('Core components initialized');
    }
    
    setupGlobalEvents() {
        // Handle window resize
        DOM.on(window, 'resize', debounce(() => {
            this.handleResize();
        }, 250));
        
        // Handle page visibility changes
        DOM.on(document, 'visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Handle online/offline status
        DOM.on(window, 'online', () => {
            Logger.log('Connection restored');
        });
        
        DOM.on(window, 'offline', () => {
            Logger.warn('Connection lost');
        });
        
        // Handle unhandled errors
        DOM.on(window, 'error', (event) => {
            Logger.error('Unhandled error:', event.error);
        });
        
        // Handle unhandled promise rejections
        DOM.on(window, 'unhandledrejection', (event) => {
            Logger.error('Unhandled promise rejection:', event.reason);
        });
    }
    
    setupScrollAnimations() {
        // Setup counter animations for trust indicators
        const trustItems = DOM.$$('.trust-item[data-count]');
        trustItems.forEach(item => {
            this.components.intersectionObserver.observe(item);
        });
        
        // Setup fade-in animations for other elements
        const animatedElements = DOM.$$('.fade-in-up, .scale-in, [data-animate]');
        animatedElements.forEach(element => {
            this.components.intersectionObserver.observe(element);
        });
    }
    
    initializePage() {
        switch (this.currentPage) {
            case 'index.html':
            case '':
                this.initializeHomePage();
                break;
            case 'products.html':
                this.initializeProductsPage();
                break;
            case 'contact.html':
                this.initializeContactPage();
                break;
            case 'farmer-form.html':
                this.initializeFarmerFormPage();
                break;
            default:
                Logger.warn('Unknown page:', this.currentPage);
        }
    }
    
    initializeHomePage() {
        Logger.log('Initializing home page');
        
        // Load dynamic content
        this.loadHomePageContent();
        
        // Setup hero animations
        this.setupHeroAnimations();
        
        // Setup trust indicators
        this.setupTrustIndicators();
    }
    
    initializeProductsPage() {
        Logger.log('Initializing products page');
        
        // Load products data
        this.loadProductsContent();
        
        // Setup product filters
        this.setupProductFilters();
    }
    
    initializeContactPage() {
        Logger.log('Initializing contact page');
        
        // Load contact information
        this.loadContactContent();
        
        // Setup contact form
        this.setupContactForm();
    }
    
    initializeFarmerFormPage() {
        Logger.log('Initializing farmer form page');
        
        // Load form data
        this.loadFarmerFormContent();
        
        // Setup multi-step form
        this.setupFarmerForm();
    }
    
    loadHomePageContent() {
        // Load products showcase
        const productsGrid = DOM.$('#productsGrid');
        if (productsGrid) {
            this.renderProductsGrid(productsGrid, PRODUCTS_DATA.slice(0, 6));
        }
        
        // Load package kits
        const kitsGrid = DOM.$('#kitsGrid');
        if (kitsGrid) {
            this.renderKitsGrid(kitsGrid, PACKAGE_KITS_DATA);
        }
        
        // Load FAQ
        const faqList = DOM.$('#faqList');
        if (faqList) {
            this.renderFAQList(faqList, FAQ_DATA);
        }
        
        // Load resources
        const resourcesGrid = DOM.$('#resourcesGrid');
        if (resourcesGrid) {
            this.renderResourcesGrid(resourcesGrid, RESOURCES_DATA);
        }
    }
    
    loadProductsContent() {
        // This would be handled by products.js
        Logger.log('Products content loading delegated to products.js');
    }
    
    loadContactContent() {
        // This would be handled by contact.js
        Logger.log('Contact content loading delegated to contact.js');
    }
    
    loadFarmerFormContent() {
        // This would be handled by farmer-form.js
        Logger.log('Farmer form content loading delegated to farmer-form.js');
    }
    
    renderProductsGrid(container, products) {
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });
    }
    
    renderKitsGrid(container, kits) {
        container.innerHTML = '';
        
        kits.forEach(kit => {
            const kitCard = this.createKitCard(kit);
            container.appendChild(kitCard);
        });
    }
    
    renderFAQList(container, faqs) {
        container.innerHTML = '';
        
        faqs.forEach(faq => {
            const faqItem = this.createFAQItem(faq);
            container.appendChild(faqItem);
        });
    }
    
    renderResourcesGrid(container, resources) {
        container.innerHTML = '';
        
        resources.forEach(resource => {
            const resourceCard = this.createResourceCard(resource);
            container.appendChild(resourceCard);
        });
    }
    
    createProductCard(product) {
        const card = DOM.create('div', {
            className: 'product-card fade-in-up'
        });
        
        card.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                </div>
                <p class="product-tagline">"${product.tagline}"</p>
                <p class="product-desc">${product.description}</p>
                <ul class="product-benefits">
                    ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
                <a href="farmer-form.html" class="product-btn" data-analytics="product-${product.id}">
                    Get Recommendations
                </a>
            </div>
        `;
        
        return card;
    }
    
    createKitCard(kit) {
        const card = DOM.create('div', {
            className: `kit-card ${kit.popular ? 'popular' : ''} ${kit.premium ? 'premium' : ''}`
        });
        
        const badge = kit.popular ? '<div class="kit-badge">Most Popular</div>' : 
                     kit.premium ? '<div class="kit-badge premium-badge">Premium</div>' : '';
        
        card.innerHTML = `
            ${badge}
            <div class="kit-icon">${kit.icon}</div>
            <div class="kit-content">
                <h3 class="kit-name">${kit.name}</h3>
                <p class="kit-subtitle">${kit.subtitle}</p>
                
                <div class="kit-products">
                    <h4>Included Products:</h4>
                    <ul>
                        ${kit.products.map(product => `<li>${product}</li>`).join('')}
                    </ul>
                </div>
                
                <p class="kit-benefits">${kit.benefits}</p>
                
                <div class="kit-price">${kit.price}</div>
                <a href="farmer-form.html" class="kit-btn" data-analytics="kit-${kit.id}">
                    Get This Kit
                </a>
            </div>
        `;
        
        return card;
    }
    
    createFAQItem(faq) {
        const item = DOM.create('div', {
            className: 'faq-item fade-in-up'
        });
        
        item.innerHTML = `
            <h3 class="faq-question">${faq.question}</h3>
            <p class="faq-answer">${faq.answer}</p>
        `;
        
        return item;
    }
    
    createResourceCard(resource) {
        const card = DOM.create('div', {
            className: 'resource-card fade-in-up'
        });
        
        card.innerHTML = `
            <div class="resource-icon">${resource.icon}</div>
            <h3 class="resource-title">${resource.title}</h3>
            <p class="resource-subtitle">${resource.subtitle}</p>
            <a href="contact.html" class="resource-btn" data-analytics="resource-${resource.id}">
                Download
            </a>
        `;
        
        return card;
    }
    
    setupHeroAnimations() {
        // Add staggered animations to hero elements
        const heroTitle = DOM.$('.hero-title');
        const heroSubtitle = DOM.$('.hero-subtitle');
        const heroButtons = DOM.$('.hero-buttons');
        
        if (heroTitle) DOM.addClass(heroTitle, 'fade-in-up');
        if (heroSubtitle) DOM.addClass(heroSubtitle, 'fade-in-up delay-1');
        if (heroButtons) DOM.addClass(heroButtons, 'fade-in-up delay-2');
    }
    
    setupTrustIndicators() {
        const trustItems = DOM.$$('.trust-item');
        trustItems.forEach((item, index) => {
            DOM.addClass(item, 'fade-in-up');
            DOM.attr(item, 'style', `animation-delay: ${index * 0.2}s`);
        });
    }
    
    setupProductFilters() {
        const filterTabs = DOM.$$('.filter-tab');
        const productCards = DOM.$$('.product-detailed-card');
        
        filterTabs.forEach(tab => {
            DOM.on(tab, 'click', () => {
                const filter = DOM.attr(tab, 'data-filter');
                this.filterProducts(filter, filterTabs, productCards);
            });
        });
    }
    
    filterProducts(filter, tabs, cards) {
        // Update active tab
        tabs.forEach(tab => DOM.removeClass(tab, 'active'));
        const activeTab = DOM.$(`[data-filter="${filter}"]`);
        if (activeTab) DOM.addClass(activeTab, 'active');
        
        // Filter products
        cards.forEach(card => {
            const category = DOM.attr(card, 'data-category') || '';
            const shouldShow = filter === 'all' || category.toLowerCase().includes(filter.toLowerCase());
            
            if (shouldShow) {
                DOM.show(card);
                DOM.addClass(card, 'fade-in-up');
            } else {
                DOM.hide(card);
            }
        });
        
        Logger.log('Products filtered by:', filter);
    }
    
    setupContactForm() {
        // This would be handled by contact.js
        Logger.log('Contact form setup delegated to contact.js');
    }
    
    setupFarmerForm() {
        // This would be handled by farmer-form.js
        Logger.log('Farmer form setup delegated to farmer-form.js');
    }
    
    initializeAnalytics() {
        // Track page view
        this.trackPageView();
        
        // Setup click tracking
        this.setupClickTracking();
        
        Logger.log('Analytics initialized');
    }
    
    trackPageView() {
        const pageData = {
            page: this.currentPage,
            title: document.title,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            viewport: Device.getViewportSize()
        };
        
        // Store analytics data
        const analytics = Storage.get(CONFIG.STORAGE_KEYS.ANALYTICS, []);
        analytics.push(pageData);
        Storage.set(CONFIG.STORAGE_KEYS.ANALYTICS, analytics);
        
        Logger.log('Page view tracked:', pageData);
    }
    
    setupClickTracking() {
        // Track clicks on elements with data-analytics attribute
        DOM.on(document, 'click', (event) => {
            const element = event.target.closest('[data-analytics]');
            if (element) {
                const action = DOM.attr(element, 'data-analytics');
                this.trackEvent('click', action, {
                    element: element.tagName,
                    text: element.textContent.trim(),
                    href: element.href || null
                });
            }
        });
    }
    
    trackEvent(type, action, data = {}) {
        const eventData = {
            type,
            action,
            data,
            page: this.currentPage,
            timestamp: Date.now()
        };
        
        // Store event data
        const analytics = Storage.get(CONFIG.STORAGE_KEYS.ANALYTICS, []);
        analytics.push(eventData);
        Storage.set(CONFIG.STORAGE_KEYS.ANALYTICS, analytics);
        
        Logger.log('Event tracked:', eventData);
    }
    
    handleResize() {
        // Update environment variables
        ENV.isMobile = Device.isMobile();
        ENV.isTablet = Device.isTablet();
        ENV.isDesktop = Device.isDesktop();
        
        // Trigger resize event for components
        Object.values(this.components).forEach(component => {
            if (component.handleResize) {
                component.handleResize();
            }
        });
        
        Logger.log('Window resized:', Device.getViewportSize());
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            Logger.log('Page hidden');
        } else {
            Logger.log('Page visible');
        }
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }
    
    // Public API methods
    showLoading(message) {
        this.components.loading.show(message);
    }
    
    hideLoading() {
        this.components.loading.hide();
    }
    
    trackCustomEvent(action, data) {
        this.trackEvent('custom', action, data);
    }
    
    // Cleanup method
    destroy() {
        Object.values(this.components).forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        Logger.log('Biolia App destroyed');
    }
}

// Initialize app when DOM is ready
DOM.on(document, 'DOMContentLoaded', () => {
    Performance.mark('dom-ready');
    
    // Initialize the main application
    window.bioliaApp = new BioliaApp();
    
    // Make app globally accessible for debugging
    if (DEBUG.enabled) {
        window.app = window.bioliaApp;
    }
});

// Handle page load
DOM.on(window, 'load', () => {
    Performance.mark('page-loaded');
    Performance.measure('page-load-time', 'dom-ready', 'page-loaded');
    
    Logger.log('Page fully loaded');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BioliaApp;
}