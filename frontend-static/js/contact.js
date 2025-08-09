// Contact Page Specific JavaScript

class ContactPageManager {
    constructor() {
        this.contactInfo = CONTACT_INFO_DATA;
        this.resources = RESOURCES_DATA;
        this.form = null;
        this.validator = null;
        this.messageComponent = null;
        this.init();
    }
    
    init() {
        Logger.log('Initializing Contact Page');
        
        // Load content
        this.loadContactContent();
        
        // Setup form
        this.setupContactForm();
        
        Logger.log('Contact Page initialized');
    }
    
    loadContactContent() {
        // Load contact information
        this.loadContactInfo();
        
        // Load downloadable resources
        this.loadDownloadableResources();
    }
    
    loadContactInfo() {
        const container = DOM.$('#contactInfoItems');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.contactInfo.forEach(info => {
            const infoItem = this.createContactInfoItem(info);
            container.appendChild(infoItem);
        });
        
        Logger.log('Contact information loaded');
    }
    
    loadDownloadableResources() {
        const container = DOM.$('#downloadableResources');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.resources.forEach(resource => {
            const resourceItem = this.createResourceItem(resource);
            container.appendChild(resourceItem);
        });
        
        Logger.log('Downloadable resources loaded');
    }
    
    createContactInfoItem(info) {
        const item = DOM.create('div', {
            className: 'info-item fade-in-up'
        });
        
        item.innerHTML = `
            <div class="info-icon">
                ${info.icon}
            </div>
            <div class="info-content">
                <h3 class="info-label">${info.label}</h3>
                <p class="info-text">${info.content}</p>
            </div>
        `;
        
        return item;
    }
    
    createResourceItem(resource) {
        const item = DOM.create('div', {
            className: 'resource-item fade-in-up'
        });
        
        item.innerHTML = `
            <div class="resource-info">
                <div class="resource-icon">${resource.icon}</div>
                <div class="resource-details">
                    <h3 class="resource-name">${resource.title}</h3>
                    <p class="resource-desc">${resource.subtitle}</p>
                </div>
            </div>
            <div class="resource-meta">
                <div class="resource-size">${resource.size}</div>
                <div class="resource-download">Download</div>
            </div>
        `;
        
        // Add click handler for download
        DOM.on(item, 'click', () => {
            this.handleResourceDownload(resource);
        });
        
        return item;
    }
    
    setupContactForm() {
        this.form = DOM.$('#contactForm');
        if (!this.form) return;
        
        // Initialize form validator
        this.validator = new FormValidator(this.form);
        this.setupValidationRules();
        
        // Initialize message component
        this.messageComponent = new MessageComponent('formMessages');
        
        // Setup form submission
        DOM.on(this.form, 'submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
        
        // Setup occupation change handler
        const occupationSelect = DOM.$('#occupation');
        if (occupationSelect) {
            DOM.on(occupationSelect, 'change', () => {
                this.handleOccupationChange();
            });
        }
        
        // Load form draft if exists
        this.loadFormDraft();
        
        // Setup auto-save
        if (CONFIG.FEATURES.FORM_AUTO_SAVE) {
            this.setupAutoSave();
        }
        
        Logger.log('Contact form setup complete');
    }
    
    setupValidationRules() {
        // Name validation
        this.validator.addRule('name', 
            (value) => Validator.isValidName(value),
            'Please enter a valid name (at least 2 characters)'
        );
        
        // Mobile validation
        this.validator.addRule('mobile',
            (value) => Validator.isValidPhone(value),
            'Please enter a valid 10-digit mobile number'
        );
        
        // Email validation (optional but must be valid if provided)
        this.validator.addRule('email',
            (value) => !value || Validator.isValidEmail(value),
            'Please enter a valid email address'
        );
        
        // Message validation
        this.validator.addRule('message',
            (value) => Validator.isValidMessage(value),
            'Please enter a message (at least 10 characters)'
        );
    }
    
    handleOccupationChange() {
        const occupationSelect = DOM.$('#occupation');
        const customGroup = DOM.$('#customOccupationGroup');
        
        if (occupationSelect && customGroup) {
            if (occupationSelect.value === 'Other') {
                DOM.show(customGroup, 'block');
            } else {
                DOM.hide(customGroup);
                const customInput = DOM.$('#customOccupation');
                if (customInput) customInput.value = '';
            }
        }
    }
    
    async handleFormSubmission() {
        // Clear previous messages
        this.messageComponent.clear();
        
        // Validate form
        if (!this.validator.validateForm()) {
            this.messageComponent.error('Please correct the errors below and try again.');
            return;
        }
        
        // Get form data
        const formData = this.getFormData();
        
        // Show loading state
        this.setFormLoading(true);
        
        try {
            // Simulate API call
            await this.submitContactForm(formData);
            
            // Show success
            this.showSuccessModal();
            
            // Clear form and draft
            this.form.reset();
            this.clearFormDraft();
            
            // Track success
            if (window.bioliaApp) {
                window.bioliaApp.trackCustomEvent('contact-form-success', {
                    occupation: formData.occupation,
                    hasEmail: !!formData.email
                });
            }
            
        } catch (error) {
            Logger.error('Contact form submission error:', error);
            this.messageComponent.error('Failed to send message. Please try again.');
            
            // Track error
            if (window.bioliaApp) {
                window.bioliaApp.trackCustomEvent('contact-form-error', {
                    error: error.message
                });
            }
        } finally {
            this.setFormLoading(false);
        }
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Handle custom occupation
        if (data.occupation === 'Other' && data.customOccupation) {
            data.occupation = data.customOccupation;
        }
        
        return data;
    }
    
    async submitContactForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true, message: 'Message sent successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
    
    setFormLoading(loading) {
        const submitBtn = DOM.$('#submitBtn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');
        
        if (submitBtn) {
            submitBtn.disabled = loading;
            
            if (loading) {
                DOM.hide(btnText);
                DOM.show(btnLoading, 'flex');
            } else {
                DOM.show(btnText, 'block');
                DOM.hide(btnLoading);
            }
        }
    }
    
    showSuccessModal() {
        const modal = DOM.$('#successModal');
        if (modal) {
            DOM.addClass(modal, 'active');
        }
    }
    
    loadFormDraft() {
        const draft = Storage.getFormDraft('contact');
        if (draft) {
            // Populate form fields
            Object.entries(draft).forEach(([key, value]) => {
                const field = this.form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = value;
                    
                    // Trigger change event for occupation
                    if (key === 'occupation') {
                        field.dispatchEvent(new Event('change'));
                    }
                }
            });
            
            Logger.log('Contact form draft loaded');
        }
    }
    
    saveFormDraft() {
        const formData = this.getFormData();
        
        // Only save if there's meaningful data
        if (formData.name || formData.mobile || formData.message) {
            Storage.saveFormDraft('contact', formData);
        }
    }
    
    clearFormDraft() {
        Storage.clearFormDraft('contact');
    }
    
    setupAutoSave() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            DOM.on(input, 'input', debounce(() => {
                this.saveFormDraft();
            }, 1000));
        });
        
        Logger.log('Contact form auto-save enabled');
    }
    
    handleResourceDownload(resource) {
        // Track download
        if (window.bioliaApp) {
            window.bioliaApp.trackCustomEvent('resource-download', {
                resourceId: resource.id,
                resourceTitle: resource.title
            });
        }
        
        // Show download message
        this.messageComponent.info(`Download started: ${resource.title}`, 3000);
        
        // In a real application, this would trigger the actual download
        Logger.log('Resource download requested:', resource);
    }
}

// Global function to close success modal
window.closeSuccessModal = function() {
    const modal = DOM.$('#successModal');
    if (modal) {
        DOM.removeClass(modal, 'active');
    }
};

// Initialize Contact Page Manager when DOM is ready
DOM.on(document, 'DOMContentLoaded', () => {
    if (window.location.pathname.includes('contact.html')) {
        window.contactPageManager = new ContactPageManager();
    }
});