// Farmer Form Page Specific JavaScript

class FarmerFormManager {
    constructor() {
        this.currentStep = 1;
        this.formData = {};
        this.validators = {};
        this.messageComponents = {};
        this.init();
    }
    
    init() {
        Logger.log('Initializing Farmer Form Page');
        
        // Load form content
        this.loadFormContent();
        
        // Setup multi-step form
        this.setupMultiStepForm();
        
        // Load form draft
        this.loadFormDraft();
        
        // Setup auto-save
        if (CONFIG.FEATURES.FORM_AUTO_SAVE) {
            this.setupAutoSave();
        }
        
        Logger.log('Farmer Form Page initialized');
    }
    
    loadFormContent() {
        // Load states dropdown
        this.loadStatesDropdown();
        
        // Load farming types
        this.loadFarmingTypes();
        
        // Load crops
        this.loadCrops();
        
        // Load soil types
        this.loadSoilTypes();
        
        // Load purposes
        this.loadPurposes();
        
        // Load communication modes
        this.loadCommunicationModes();
    }
    
    loadStatesDropdown() {
        const stateSelect = DOM.$('#state');
        if (!stateSelect) return;
        
        // Clear existing options except the first one
        const firstOption = stateSelect.querySelector('option[value=""]');
        stateSelect.innerHTML = '';
        if (firstOption) stateSelect.appendChild(firstOption);
        
        FORM_DATA.states.forEach(state => {
            const option = DOM.create('option', {
                value: state
            }, state);
            stateSelect.appendChild(option);
        });
        
        Logger.log('States dropdown loaded');
    }
    
    loadFarmingTypes() {
        const container = DOM.$('#farmingTypeGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        FORM_DATA.farmingTypes.forEach(type => {
            const item = DOM.create('label', {
                className: 'checkbox-item'
            });
            
            const checkbox = DOM.create('input', {
                type: 'checkbox',
                name: 'farmingType',
                value: type
            });
            
            const label = DOM.create('span', {
                className: 'checkbox-label'
            }, type);
            
            item.appendChild(checkbox);
            item.appendChild(label);
            container.appendChild(item);
            
            // Add change handler for "Other" option
            if (type === 'Other') {
                DOM.on(checkbox, 'change', () => {
                    this.toggleOtherFarmingType(checkbox.checked);
                });
            }
        });
        
        Logger.log('Farming types loaded');
    }
    
    loadCrops() {
        const container = DOM.$('#cropsGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        FORM_DATA.crops.forEach(crop => {
            const item = DOM.create('label', {
                className: 'checkbox-item'
            });
            
            const checkbox = DOM.create('input', {
                type: 'checkbox',
                name: 'cropsGrown',
                value: crop
            });
            
            const label = DOM.create('span', {
                className: 'checkbox-label'
            }, crop);
            
            item.appendChild(checkbox);
            item.appendChild(label);
            container.appendChild(item);
            
            // Add change handler for "Other" option
            if (crop === 'Other') {
                DOM.on(checkbox, 'change', () => {
                    this.toggleOtherCrops(checkbox.checked);
                });
            }
        });
        
        Logger.log('Crops loaded');
    }
    
    loadSoilTypes() {
        const soilSelect = DOM.$('#soilType');
        if (!soilSelect) return;
        
        // Clear existing options except the first one
        const firstOption = soilSelect.querySelector('option[value=""]');
        soilSelect.innerHTML = '';
        if (firstOption) soilSelect.appendChild(firstOption);
        
        FORM_DATA.soilTypes.forEach(soilType => {
            const option = DOM.create('option', {
                value: soilType
            }, soilType);
            soilSelect.appendChild(option);
        });
        
        Logger.log('Soil types loaded');
    }
    
    loadPurposes() {
        const purposeSelect = DOM.$('#purposeOfVisit');
        if (!purposeSelect) return;
        
        // Clear existing options except the first one
        const firstOption = purposeSelect.querySelector('option[value=""]');
        purposeSelect.innerHTML = '';
        if (firstOption) purposeSelect.appendChild(firstOption);
        
        FORM_DATA.purposes.forEach(purpose => {
            const option = DOM.create('option', {
                value: purpose
            }, purpose);
            purposeSelect.appendChild(option);
        });
        
        // Add change handler for "Other" option
        DOM.on(purposeSelect, 'change', () => {
            this.toggleOtherPurpose(purposeSelect.value === 'Other (please specify)');
        });
        
        Logger.log('Purposes loaded');
    }
    
    loadCommunicationModes() {
        const container = DOM.$('#communicationModeGroup');
        if (!container) return;
        
        container.innerHTML = '';
        
        FORM_DATA.communicationModes.forEach((mode, index) => {
            const item = DOM.create('label', {
                className: 'radio-item'
            });
            
            const radio = DOM.create('input', {
                type: 'radio',
                name: 'communicationMode',
                value: mode.value
            });
            
            // Set first option as default
            if (index === 0) {
                radio.checked = true;
            }
            
            const label = DOM.create('span', {
                className: 'radio-label'
            }, mode.label);
            
            item.appendChild(radio);
            item.appendChild(label);
            container.appendChild(item);
        });
        
        Logger.log('Communication modes loaded');
    }
    
    setupMultiStepForm() {
        // Setup step 1 form
        this.setupStep1();
        
        // Setup step 2 form
        this.setupStep2();
        
        // Setup navigation buttons
        this.setupStepNavigation();
        
        Logger.log('Multi-step form setup complete');
    }
    
    setupStep1() {
        const form = DOM.$('#contactDetailsForm');
        if (!form) return;
        
        // Initialize validator
        this.validators.step1 = new FormValidator(form);
        this.setupStep1ValidationRules();
        
        // Initialize message component
        this.messageComponents.step1 = new MessageComponent('step1Messages');
    }
    
    setupStep2() {
        const form = DOM.$('#farmDetailsForm');
        if (!form) return;
        
        // Initialize validator
        this.validators.step2 = new FormValidator(form);
        this.setupStep2ValidationRules();
        
        // Initialize message component
        this.messageComponents.step2 = new MessageComponent('step2Messages');
        
        // Setup form submission
        DOM.on(form, 'submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }
    
    setupStep1ValidationRules() {
        const validator = this.validators.step1;
        
        // Full name validation
        validator.addRule('fullName',
            (value) => Validator.isValidName(value),
            'Please enter a valid full name (at least 2 characters)'
        );
        
        // Mobile validation
        validator.addRule('mobile',
            (value) => Validator.isValidPhone(value),
            'Please enter a valid 10-digit mobile number'
        );
        
        // Email validation (optional)
        validator.addRule('email',
            (value) => !value || Validator.isValidEmail(value),
            'Please enter a valid email address'
        );
        
        // State validation
        validator.addRule('state',
            (value) => Validator.isRequired(value),
            'Please select your state'
        );
    }
    
    setupStep2ValidationRules() {
        const validator = this.validators.step2;
        
        // Purpose validation
        validator.addRule('purposeOfVisit',
            (value) => Validator.isRequired(value),
            'Please select your purpose of visit'
        );
        
        // Consent validation
        validator.addRule('consent',
            (value, field) => field.checked,
            'Please agree to our terms to continue'
        );
    }
    
    setupStepNavigation() {
        // Next to step 2 button
        const nextBtn = DOM.$('#nextToStep2');
        if (nextBtn) {
            DOM.on(nextBtn, 'click', () => {
                this.goToStep2();
            });
        }
        
        // Back to step 1 button
        const backBtn = DOM.$('#backToStep1');
        if (backBtn) {
            DOM.on(backBtn, 'click', () => {
                this.goToStep1();
            });
        }
    }
    
    goToStep1() {
        this.currentStep = 1;
        this.updateStepVisibility();
        this.updateStepIndicators();
        
        Logger.log('Navigated to step 1');
    }
    
    goToStep2() {
        // Validate step 1 first
        if (!this.validators.step1.validateForm()) {
            this.messageComponents.step1.error('Please correct the errors below before proceeding.');
            return;
        }
        
        // Save step 1 data
        this.saveStepData(1);
        
        this.currentStep = 2;
        this.updateStepVisibility();
        this.updateStepIndicators();
        
        Logger.log('Navigated to step 2');
    }
    
    updateStepVisibility() {
        const step1 = DOM.$('#step1');
        const step2 = DOM.$('#step2');
        const successMessage = DOM.$('#successMessage');
        
        // Hide all steps
        if (step1) DOM.hide(step1);
        if (step2) DOM.hide(step2);
        if (successMessage) DOM.hide(successMessage);
        
        // Show current step
        if (this.currentStep === 1 && step1) {
            DOM.show(step1, 'block');
        } else if (this.currentStep === 2 && step2) {
            DOM.show(step2, 'block');
        } else if (this.currentStep === 3 && successMessage) {
            DOM.show(successMessage, 'block');
        }
    }
    
    updateStepIndicators() {
        const step1Indicator = DOM.$('#step1Indicator');
        const step2Indicator = DOM.$('#step2Indicator');
        
        // Reset indicators
        if (step1Indicator) DOM.removeClass(step1Indicator, 'active');
        if (step2Indicator) DOM.removeClass(step2Indicator, 'active');
        
        // Set active indicator
        if (this.currentStep >= 1 && step1Indicator) {
            DOM.addClass(step1Indicator, 'active');
        }
        if (this.currentStep >= 2 && step2Indicator) {
            DOM.addClass(step2Indicator, 'active');
        }
    }
    
    saveStepData(step) {
        if (step === 1) {
            const form = DOM.$('#contactDetailsForm');
            if (form) {
                const formData = new FormData(form);
                for (let [key, value] of formData.entries()) {
                    this.formData[key] = value;
                }
            }
        } else if (step === 2) {
            const form = DOM.$('#farmDetailsForm');
            if (form) {
                const formData = new FormData(form);
                
                // Handle checkboxes
                const farmingTypes = [];
                const cropsGrown = [];
                
                form.querySelectorAll('input[name="farmingType"]:checked').forEach(cb => {
                    farmingTypes.push(cb.value);
                });
                
                form.querySelectorAll('input[name="cropsGrown"]:checked').forEach(cb => {
                    cropsGrown.push(cb.value);
                });
                
                // Save regular form data
                for (let [key, value] of formData.entries()) {
                    if (key !== 'farmingType' && key !== 'cropsGrown') {
                        this.formData[key] = value;
                    }
                }
                
                // Save checkbox arrays
                this.formData.farmingType = farmingTypes;
                this.formData.cropsGrown = cropsGrown;
            }
        }
        
        // Save to storage
        this.saveFormDraft();
    }
    
    async handleFormSubmission() {
        // Clear previous messages
        this.messageComponents.step2.clear();
        
        // Validate step 2
        if (!this.validators.step2.validateForm()) {
            this.messageComponents.step2.error('Please correct the errors below and try again.');
            return;
        }
        
        // Save step 2 data
        this.saveStepData(2);
        
        // Show loading state
        this.setFormLoading(true);
        
        try {
            // Submit form
            await this.submitFarmerForm(this.formData);
            
            // Show success
            this.currentStep = 3;
            this.updateStepVisibility();
            
            // Clear form draft
            this.clearFormDraft();
            
            // Track success
            if (window.bioliaApp) {
                window.bioliaApp.trackCustomEvent('farmer-form-success', {
                    state: this.formData.state,
                    farmingTypes: this.formData.farmingType,
                    cropsGrown: this.formData.cropsGrown,
                    purpose: this.formData.purposeOfVisit
                });
            }
            
        } catch (error) {
            Logger.error('Farmer form submission error:', error);
            this.messageComponents.step2.error('Failed to submit form. Please try again.');
            
            // Track error
            if (window.bioliaApp) {
                window.bioliaApp.trackCustomEvent('farmer-form-error', {
                    error: error.message,
                    step: this.currentStep
                });
            }
        } finally {
            this.setFormLoading(false);
        }
    }
    
    async submitFarmerForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.05) { // 95% success rate
                    resolve({ success: true, message: 'Form submitted successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 3000);
        });
    }
    
    setFormLoading(loading) {
        const submitBtn = DOM.$('#submitFarmerForm');
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
    
    toggleOtherFarmingType(show) {
        const group = DOM.$('#otherFarmingTypeGroup');
        const input = DOM.$('#otherFarmingType');
        
        if (show) {
            DOM.show(group, 'block');
        } else {
            DOM.hide(group);
            if (input) input.value = '';
        }
    }
    
    toggleOtherCrops(show) {
        const group = DOM.$('#otherCropsGroup');
        const input = DOM.$('#otherCrops');
        
        if (show) {
            DOM.show(group, 'block');
        } else {
            DOM.hide(group);
            if (input) input.value = '';
        }
    }
    
    toggleOtherPurpose(show) {
        const group = DOM.$('#otherPurposeGroup');
        const input = DOM.$('#otherPurpose');
        
        if (show) {
            DOM.show(group, 'block');
        } else {
            DOM.hide(group);
            if (input) input.value = '';
        }
    }
    
    loadFormDraft() {
        const draft = Storage.getFormDraft('farmer-form');
        if (!draft) return;
        
        // Populate step 1 fields
        Object.entries(draft).forEach(([key, value]) => {
            const field = DOM.$(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    if (Array.isArray(value)) {
                        // Handle checkbox arrays
                        value.forEach(val => {
                            const checkbox = DOM.$(`[name="${key}"][value="${val}"]`);
                            if (checkbox) checkbox.checked = true;
                        });
                    } else {
                        field.checked = field.value === value;
                    }
                } else {
                    field.value = value;
                }
            }
        });
        
        // Trigger change events for conditional fields
        const occupationSelect = DOM.$('#occupation');
        if (occupationSelect) occupationSelect.dispatchEvent(new Event('change'));
        
        const purposeSelect = DOM.$('#purposeOfVisit');
        if (purposeSelect) purposeSelect.dispatchEvent(new Event('change'));
        
        Logger.log('Farmer form draft loaded');
    }
    
    saveFormDraft() {
        // Only save if there's meaningful data
        if (this.formData.fullName || this.formData.mobile) {
            Storage.saveFormDraft('farmer-form', this.formData);
        }
    }
    
    clearFormDraft() {
        Storage.clearFormDraft('farmer-form');
    }
    
    setupAutoSave() {
        const forms = DOM.$$('#contactDetailsForm, #farmDetailsForm');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                DOM.on(input, 'input', debounce(() => {
                    this.saveStepData(this.currentStep);
                }, 1000));
                
                DOM.on(input, 'change', debounce(() => {
                    this.saveStepData(this.currentStep);
                }, 1000));
            });
        });
        
        Logger.log('Farmer form auto-save enabled');
    }
}

// Global function to reset form
window.resetForm = function() {
    if (window.farmerFormManager) {
        window.farmerFormManager.currentStep = 1;
        window.farmerFormManager.formData = {};
        window.farmerFormManager.updateStepVisibility();
        window.farmerFormManager.updateStepIndicators();
        
        // Clear forms
        const forms = DOM.$$('#contactDetailsForm, #farmDetailsForm');
        forms.forEach(form => {
            if (form) form.reset();
        });
        
        // Clear drafts
        window.farmerFormManager.clearFormDraft();
        
        Logger.log('Farmer form reset');
    }
};

// Initialize Farmer Form Manager when DOM is ready
DOM.on(document, 'DOMContentLoaded', () => {
    if (window.location.pathname.includes('farmer-form.html')) {
        window.farmerFormManager = new FarmerFormManager();
    }
});