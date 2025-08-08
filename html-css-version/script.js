// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Farmer Form Multi-Step Logic
let currentStep = 1;

function goToStep1() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1Indicator').classList.add('active');
    document.getElementById('step2Indicator').classList.remove('active');
    currentStep = 1;
}

function goToStep2() {
    // Validate Step 1 fields
    const fullName = document.getElementById('fullName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const state = document.getElementById('state').value;
    
    if (!fullName || !mobile || mobile.length !== 10 || !state) {
        alert('Please fill in all required fields (Name, Mobile Number, State) before proceeding.');
        return;
    }
    
    // Validate mobile number format
    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }
    
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('step1Indicator').classList.remove('active');
    document.getElementById('step2Indicator').classList.add('active');
    currentStep = 2;
}

// Toggle Other Farming Type Input
function toggleOtherFarmingType(checkbox) {
    const otherGroup = document.getElementById('otherFarmingTypeGroup');
    if (checkbox.checked) {
        otherGroup.style.display = 'block';
    } else {
        otherGroup.style.display = 'none';
        document.getElementById('otherFarmingType').value = '';
    }
}

// Toggle Other Crops Input
function toggleOtherCrops(checkbox) {
    const otherGroup = document.getElementById('otherCropsGroup');
    if (checkbox.checked) {
        otherGroup.style.display = 'block';
    } else {
        otherGroup.style.display = 'none';
        document.getElementById('otherCrops').value = '';
    }
}

// Toggle Other Purpose Input
function toggleOtherPurpose(select) {
    const otherGroup = document.getElementById('otherPurposeGroup');
    if (select.value === 'Other (please specify)') {
        otherGroup.style.display = 'block';
    } else {
        otherGroup.style.display = 'none';
        document.getElementById('otherPurpose').value = '';
    }
}

// Contact Form - Toggle Custom Occupation
document.addEventListener('DOMContentLoaded', function() {
    const occupationSelect = document.getElementById('occupation');
    const customOccupationGroup = document.getElementById('customOccupationGroup');
    
    if (occupationSelect && customOccupationGroup) {
        occupationSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                customOccupationGroup.style.display = 'block';
            } else {
                customOccupationGroup.style.display = 'none';
                document.getElementById('customOccupation').value = '';
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !mobile || !message) {
                alert('Please fill in all required fields (Name, Mobile, Message)');
                return;
            }
            
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        });
    }
    
    // Farmer Form Submission
    const farmForm = document.getElementById('farmForm');
    if (farmForm) {
        farmForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const purposeOfVisit = document.getElementById('purposeOfVisit').value;
            const consent = document.querySelector('input[name="consent"]').checked;
            
            if (!purposeOfVisit) {
                alert('Please select your purpose of visit');
                return;
            }
            
            if (!consent) {
                alert('Please agree to our terms to continue');
                return;
            }
            
            // Hide form and show success message
            document.getElementById('step2').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading states to buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

// Add fade-in animation on scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.product-card, .kit-card, .faq-item, .feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);