// Animation System

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }
    
    init() {
        if (CONFIG.FEATURES.SCROLL_ANIMATIONS) {
            this.setupScrollAnimations();
        }
        this.setupPageTransitions();
    }
    
    setupScrollAnimations() {
        // Create intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe elements with animation classes
        const animatedElements = DOM.$$('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, [data-animate]');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        this.observers.set('scroll', observer);
    }
    
    setupPageTransitions() {
        // Add page load animation
        DOM.on(window, 'load', () => {
            document.body.classList.add('page-loaded');
        });
        
        // Add smooth transitions for navigation
        const navLinks = DOM.$$('a[href^="/"], a[href$=".html"]');
        navLinks.forEach(link => {
            DOM.on(link, 'click', (e) => {
                if (link.hostname === window.location.hostname) {
                    this.handlePageTransition(e, link);
                }
            });
        });
    }
    
    triggerAnimation(element) {
        const animationType = this.getAnimationType(element);
        const delay = DOM.attr(element, 'data-delay') || 0;
        
        setTimeout(() => {
            switch (animationType) {
                case 'fade-in-up':
                    this.fadeInUp(element);
                    break;
                case 'fade-in-left':
                    this.fadeInLeft(element);
                    break;
                case 'fade-in-right':
                    this.fadeInRight(element);
                    break;
                case 'scale-in':
                    this.scaleIn(element);
                    break;
                case 'counter':
                    this.animateCounter(element);
                    break;
                default:
                    this.fadeInUp(element);
            }
        }, delay * 1000);
    }
    
    getAnimationType(element) {
        if (DOM.hasClass(element, 'fade-in-up')) return 'fade-in-up';
        if (DOM.hasClass(element, 'fade-in-left')) return 'fade-in-left';
        if (DOM.hasClass(element, 'fade-in-right')) return 'fade-in-right';
        if (DOM.hasClass(element, 'scale-in')) return 'scale-in';
        if (DOM.attr(element, 'data-count')) return 'counter';
        return DOM.attr(element, 'data-animate') || 'fade-in-up';
    }
    
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    animateCounter(element) {
        const target = parseInt(DOM.attr(element, 'data-count'));
        const numberElement = element.querySelector('.trust-number');
        
        if (numberElement && target) {
            const counter = new CounterAnimation(numberElement, target, 2000);
            counter.start();
        }
    }
    
    handlePageTransition(event, link) {
        // Add page transition effect
        const href = link.getAttribute('href');
        
        if (href && href !== window.location.pathname) {
            event.preventDefault();
            
            // Add exit animation
            document.body.classList.add('page-exit');
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    }
    
    // Utility methods for manual animations
    slideDown(element, duration = 300) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;
        
        const height = element.scrollHeight;
        
        requestAnimationFrame(() => {
            element.style.height = height + 'px';
        });
        
        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }
    
    slideUp(element, duration = 300) {
        element.style.height = element.offsetHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.height = '0';
        });
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }
    
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
        
        setTimeout(() => {
            element.style.transition = '';
        }, duration);
    }
    
    fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.transition = '';
            element.style.opacity = '';
        }, duration);
    }
    
    pulse(element, duration = 600) {
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, duration / 2);
        
        setTimeout(() => {
            element.style.transition = '';
            element.style.transform = '';
        }, duration);
    }
    
    shake(element, duration = 600) {
        element.style.transition = `transform ${duration}ms ease`;
        
        const keyframes = [
            'translateX(0)',
            'translateX(-10px)',
            'translateX(10px)',
            'translateX(-10px)',
            'translateX(10px)',
            'translateX(0)'
        ];
        
        let currentFrame = 0;
        const frameInterval = duration / keyframes.length;
        
        const animate = () => {
            if (currentFrame < keyframes.length) {
                element.style.transform = keyframes[currentFrame];
                currentFrame++;
                setTimeout(animate, frameInterval);
            } else {
                element.style.transition = '';
                element.style.transform = '';
            }
        };
        
        animate();
    }
    
    // Loading animations
    showLoadingDots(element) {
        const dots = DOM.create('div', { className: 'loading-dots' });
        for (let i = 0; i < 3; i++) {
            dots.appendChild(DOM.create('span'));
        }
        element.appendChild(dots);
        return dots;
    }
    
    hideLoadingDots(element) {
        const dots = element.querySelector('.loading-dots');
        if (dots) {
            dots.remove();
        }
    }
    
    // Cleanup
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.animations.clear();
    }
}

// Specific animation classes
class TypewriterAnimation {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }
    
    start() {
        this.element.textContent = '';
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

class ParallaxAnimation {
    constructor() {
        this.elements = DOM.$$('[data-parallax]');
        this.init();
    }
    
    init() {
        if (this.elements.length > 0) {
            DOM.on(window, 'scroll', throttle(() => {
                this.updateParallax();
            }, 16)); // ~60fps
        }
    }
    
    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = parseFloat(DOM.attr(element, 'data-parallax')) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize animations when DOM is ready
DOM.on(document, 'DOMContentLoaded', () => {
    if (CONFIG.FEATURES.SCROLL_ANIMATIONS) {
        window.animationManager = new AnimationManager();
        window.parallaxAnimation = new ParallaxAnimation();
    }
});

// Export animation classes
window.AnimationManager = AnimationManager;
window.TypewriterAnimation = TypewriterAnimation;
window.ParallaxAnimation = ParallaxAnimation;