// Products Page Specific JavaScript

class ProductsPageManager {
    constructor() {
        this.currentFilter = 'all';
        this.products = PRODUCTS_DATA;
        this.kits = PACKAGE_KITS_DATA;
        this.stages = STAGES_DATA;
        this.cropRecommendations = CROP_RECOMMENDATIONS_DATA;
        this.features = FEATURES_DATA;
        this.init();
    }
    
    init() {
        Logger.log('Initializing Products Page');
        
        // Load all content
        this.loadProductsContent();
        
        // Setup interactions
        this.setupProductFilters();
        this.setupProductSearch();
        
        Logger.log('Products Page initialized');
    }
    
    loadProductsContent() {
        // Load individual products
        this.loadIndividualProducts();
        
        // Load stage guide
        this.loadStageGuide();
        
        // Load package kits
        this.loadPackageKits();
        
        // Load crop recommendations
        this.loadCropRecommendations();
        
        // Load features
        this.loadFeatures();
    }
    
    loadIndividualProducts() {
        const container = DOM.$('#productsDetailedGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.products.forEach(product => {
            const productCard = this.createDetailedProductCard(product);
            container.appendChild(productCard);
        });
        
        Logger.log('Individual products loaded');
    }
    
    loadStageGuide() {
        const container = DOM.$('#stagesGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.stages.forEach(stage => {
            const stageItem = this.createStageItem(stage);
            container.appendChild(stageItem);
        });
        
        Logger.log('Stage guide loaded');
    }
    
    loadPackageKits() {
        const container = DOM.$('#kitsGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.kits.forEach(kit => {
            const kitCard = this.createKitCard(kit);
            container.appendChild(kitCard);
        });
        
        Logger.log('Package kits loaded');
    }
    
    loadCropRecommendations() {
        const container = DOM.$('#cropGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.cropRecommendations.forEach(crop => {
            const cropCard = this.createCropCard(crop);
            container.appendChild(cropCard);
        });
        
        Logger.log('Crop recommendations loaded');
    }
    
    loadFeatures() {
        const container = DOM.$('#featuresGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.features.forEach(feature => {
            const featureCard = this.createFeatureCard(feature);
            container.appendChild(featureCard);
        });
        
        Logger.log('Features loaded');
    }
    
    createDetailedProductCard(product) {
        const card = DOM.create('div', {
            className: 'product-detailed-card fade-in-up',
            'data-category': product.category.toLowerCase().replace(/[^a-z0-9]/g, '-')
        });
        
        card.innerHTML = `
            <div class="product-detailed-icon">${product.icon}</div>
            <div class="product-detailed-content">
                <div class="product-detailed-header">
                    <h3 class="product-detailed-name">${product.name}</h3>
                    <span class="product-category">${product.category}</span>
                </div>
                <p class="product-detailed-tagline">"${product.tagline}"</p>
                <p class="product-detailed-desc">${product.use}</p>
                
                <div class="product-specs">
                    <div class="spec-row">
                        <span class="spec-label">Packaging:</span>
                        <span class="spec-value">${product.packaging}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Dosage:</span>
                        <span class="spec-value">${product.dosage}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Best Stage:</span>
                        <span class="spec-value-highlight">${product.stage}</span>
                    </div>
                </div>
                
                <a href="farmer-form.html" class="product-detailed-btn" data-analytics="product-detailed-${product.id}">
                    Get This Product
                </a>
            </div>
        `;
        
        return card;
    }
    
    createStageItem(stage) {
        const item = DOM.create('div', {
            className: 'stage-item fade-in-up'
        });
        
        item.innerHTML = `
            <div class="stage-icon">${stage.icon}</div>
            <h3 class="stage-title">${stage.stage}</h3>
            <p class="stage-desc">${stage.input}</p>
        `;
        
        return item;
    }
    
    createKitCard(kit) {
        const card = DOM.create('div', {
            className: `kit-card ${kit.popular ? 'popular' : ''} ${kit.premium ? 'premium' : ''} fade-in-up`
        });
        
        const badge = kit.popular ? '<div class="kit-badge">Most Popular</div>' : 
                     kit.premium ? '<div class="kit-badge premium-badge">Premium</div>' : '';
        
        card.innerHTML = `
            ${badge}
            <div class="kit-icon">${kit.icon}</div>
            <div class="kit-content">
                <h3 class="kit-name">${kit.name}</h3>
                <p class="kit-subtitle">${kit.bestFor}</p>
                
                <div class="kit-products">
                    <h4>Contents:</h4>
                    <p>${kit.contents}</p>
                </div>
                
                <div class="kit-products">
                    <h4>Best For:</h4>
                    <p>${kit.bestFor}</p>
                </div>
                
                <div class="kit-coverage">
                    <span class="coverage-label">Coverage:</span>
                    <span class="coverage-value">${kit.coverage}</span>
                </div>
                
                <a href="farmer-form.html" class="kit-btn" data-analytics="kit-detailed-${kit.id}">
                    Get This Kit
                </a>
            </div>
        `;
        
        return card;
    }
    
    createCropCard(crop) {
        const card = DOM.create('div', {
            className: 'crop-card fade-in-up'
        });
        
        card.innerHTML = `
            <div class="crop-icon">${crop.icon}</div>
            <h3 class="crop-name">${crop.crop}</h3>
            <p class="crop-kit">→ ${crop.kit}</p>
            <a href="farmer-form.html" class="crop-btn" data-analytics="crop-${crop.id}">
                Get Kit
            </a>
        `;
        
        return card;
    }
    
    createFeatureCard(feature) {
        const card = DOM.create('div', {
            className: 'feature-card fade-in-up'
        });
        
        card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-desc">${feature.description}</p>
        `;
        
        return card;
    }
    
    setupProductFilters() {
        const filterTabs = DOM.$$('.filter-tab');
        
        filterTabs.forEach(tab => {
            DOM.on(tab, 'click', () => {
                const filter = DOM.attr(tab, 'data-filter');
                this.applyFilter(filter, filterTabs);
            });
        });
        
        Logger.log('Product filters setup complete');
    }
    
    setupProductSearch() {
        // Add search functionality if search input exists
        const searchInput = DOM.$('#productSearch');
        if (searchInput) {
            DOM.on(searchInput, 'input', debounce((e) => {
                this.searchProducts(e.target.value);
            }, 300));
        }
    }
    
    applyFilter(filter, tabs) {
        this.currentFilter = filter;
        
        // Update active tab
        tabs.forEach(tab => DOM.removeClass(tab, 'active'));
        const activeTab = DOM.$(`[data-filter="${filter}"]`);
        if (activeTab) DOM.addClass(activeTab, 'active');
        
        // Filter products
        const productCards = DOM.$$('.product-detailed-card');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const category = DOM.attr(card, 'data-category') || '';
            const shouldShow = filter === 'all' || category.includes(filter);
            
            if (shouldShow) {
                DOM.show(card, 'block');
                DOM.addClass(card, 'fade-in-up');
                visibleCount++;
            } else {
                DOM.hide(card);
            }
        });
        
        // Update results count if element exists
        const resultsCount = DOM.$('#resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `${visibleCount} products found`;
        }
        
        Logger.log(`Products filtered by: ${filter}, showing: ${visibleCount}`);
    }
    
    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        const productCards = DOM.$$('.product-detailed-card');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-detailed-name')?.textContent.toLowerCase() || '';
            const productDesc = card.querySelector('.product-detailed-desc')?.textContent.toLowerCase() || '';
            const productCategory = DOM.attr(card, 'data-category') || '';
            
            const matchesSearch = !searchTerm || 
                                productName.includes(searchTerm) || 
                                productDesc.includes(searchTerm) || 
                                productCategory.includes(searchTerm);
            
            const matchesFilter = this.currentFilter === 'all' || 
                                productCategory.includes(this.currentFilter);
            
            if (matchesSearch && matchesFilter) {
                DOM.show(card, 'block');
                visibleCount++;
            } else {
                DOM.hide(card);
            }
        });
        
        // Update results count
        const resultsCount = DOM.$('#resultsCount');
        if (resultsCount) {
            resultsCount.textContent = searchTerm ? 
                `${visibleCount} products found for "${query}"` : 
                `${visibleCount} products found`;
        }
        
        Logger.log(`Products searched: "${query}", showing: ${visibleCount}`);
    }
    
    // Product comparison functionality
    compareProducts(productIds) {
        const products = this.products.filter(p => productIds.includes(p.id));
        
        // Create comparison modal or navigate to comparison page
        this.showProductComparison(products);
    }
    
    showProductComparison(products) {
        // Implementation for product comparison modal
        Logger.log('Product comparison:', products);
    }
    
    // Product details modal
    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        // Create and show product details modal
        const modal = this.createProductDetailsModal(product);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            DOM.addClass(modal, 'active');
        }, 10);
    }
    
    createProductDetailsModal(product) {
        const modal = DOM.create('div', {
            className: 'modal-overlay',
            id: 'productDetailsModal'
        });
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <div class="product-details">
                    <div class="product-details-header">
                        <div class="product-icon-large">${product.icon}</div>
                        <div>
                            <h2>${product.name}</h2>
                            <p class="product-category">${product.category}</p>
                        </div>
                    </div>
                    <div class="product-details-body">
                        <p class="product-tagline">"${product.tagline}"</p>
                        <p class="product-description">${product.description}</p>
                        <div class="product-benefits">
                            <h4>Benefits:</h4>
                            <ul>
                                ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="product-specifications">
                            <h4>Specifications:</h4>
                            <div class="spec-grid">
                                <div class="spec-item">
                                    <span class="spec-label">Packaging:</span>
                                    <span class="spec-value">${product.packaging}</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Dosage:</span>
                                    <span class="spec-value">${product.dosage}</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Best Stage:</span>
                                    <span class="spec-value">${product.stage}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-details-footer">
                        <a href="farmer-form.html" class="btn-primary" data-analytics="product-modal-${product.id}">
                            Get This Product
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
}

// Initialize Products Page Manager when DOM is ready
DOM.on(document, 'DOMContentLoaded', () => {
    if (window.location.pathname.includes('products.html')) {
        window.productsPageManager = new ProductsPageManager();
    }
});