// Application Data

// Products Data
const PRODUCTS_DATA = [
    {
        id: 'foundation-mix',
        name: 'Foundation Mix',
        tagline: 'Build your soil from the roots up',
        icon: '🌱',
        category: 'Soil Conditioner',
        description: 'Complete soil conditioning blend for long-term fertility',
        use: 'Improves soil structure, porosity, microbial activity, water retention',
        packaging: '30kg / 50kg',
        dosage: '30-50kg per acre',
        stage: 'Land preparation stage',
        benefits: [
            'Improves soil structure',
            'Enhances water retention',
            'Boosts microbial activity'
        ],
        price: 899,
        originalPrice: 999,
        inStock: true,
        featured: true
    },
    {
        id: 'af-npk',
        name: 'AF-NPK',
        tagline: 'Nutrients that go beyond NPK',
        icon: '⚡',
        category: 'Bio-Fertilizer',
        description: 'Advanced nutrient formula with micronutrients',
        use: 'Balanced macro & micronutrients, improves uptake & efficiency',
        packaging: '1L',
        dosage: '1L per acre',
        stage: 'Vegetative stage',
        benefits: [
            'Balanced nutrition',
            'Quick absorption',
            'Sustained release'
        ],
        price: 1299,
        originalPrice: 1399,
        inStock: true,
        featured: true
    },
    {
        id: 'rhizobium',
        name: 'Rhizobium',
        tagline: 'Seed coating that powers pulses',
        icon: '🫘',
        category: 'Bio-Inoculant',
        description: 'Nitrogen-fixing bacteria for legume crops',
        use: 'Nitrogen-fixing bacteria for legumes. Enhances germination & nodulation',
        packaging: '100mL / 250mL',
        dosage: '100-200mL per acre',
        stage: 'Seed coating before sowing',
        benefits: [
            'Better germination',
            'Natural nitrogen fixation',
            'Stronger root system'
        ],
        price: 649,
        originalPrice: 749,
        inStock: true,
        featured: false
    },
    {
        id: 'leo',
        name: 'LEO',
        tagline: 'Tonic for flowering and fruiting',
        icon: '🌸',
        category: 'Growth Enhancer',
        description: 'Specialized formula for reproductive growth',
        use: 'Boosts flower initiation, fruit size, setting, flowering duration',
        packaging: '250mL / 500mL / 1L',
        dosage: '250-500mL per acre',
        stage: 'Flowering stage',
        benefits: [
            'Enhanced flowering',
            'Better fruit setting',
            'Improved yield quality'
        ],
        price: 299,
        originalPrice: 349,
        inStock: true,
        featured: true
    },
    {
        id: 'nora',
        name: 'NORA',
        tagline: 'Support for stressed crops',
        icon: '💪',
        category: 'Stress Reliever',
        description: 'Stress recovery and immunity booster',
        use: 'Heat/drought tolerance, faster recovery, immunity boost',
        packaging: '250mL / 500mL',
        dosage: '250-500mL per acre',
        stage: 'Abiotic stress / mid-season recovery',
        benefits: [
            'Heat stress tolerance',
            'Disease resistance',
            'Quick recovery'
        ],
        price: 199,
        originalPrice: 249,
        inStock: true,
        featured: false
    },
    {
        id: 'soil-sterilizer',
        name: 'Soil Sterilizer',
        tagline: 'Cleaner soil, stronger starts',
        icon: '🛡️',
        category: 'Soil Treatment',
        description: 'Natural soil sanitization for healthy growth',
        use: 'Kills harmful pathogens while preserving good microbes',
        packaging: '10kg / 25kg',
        dosage: '10-20kg per acre',
        stage: 'Before sowing or transplanting',
        benefits: [
            'Pathogen control',
            'Soil detoxification',
            'Safe for beneficial microbes'
        ],
        price: 2499,
        originalPrice: 2799,
        inStock: true,
        featured: true
    }
];

// Package Kits Data
const PACKAGE_KITS_DATA = [
    {
        id: 'paddy-grower-kit',
        name: 'Paddy Grower Kit',
        icon: '🌾',
        subtitle: 'For wetland and dryland paddy',
        contents: 'Foundation Mix, AF-NPK, NORA, LEO',
        products: [
            'Foundation Mix - 50kg',
            'AF-NPK - 1L',
            'NORA - 500mL',
            'LEO - 500mL'
        ],
        bestFor: 'Kharif & Rabi Paddy, wet & dryland',
        benefits: 'Improves soil health, supports tillering, and increases grain fill. Perfect for monsoon-planted paddy.',
        coverage: '1 acre',
        price: 'Complete Solution',
        popular: true,
        savings: '15%'
    },
    {
        id: 'pulses-starter-kit',
        name: 'Pulses Starter Kit',
        icon: '🫘',
        subtitle: 'For Toor Dal, Green Gram, Black Gram',
        contents: 'Soil Sterilizer, Rhizobium, Foundation Mix, LEO',
        products: [
            'Soil Sterilizer - 10kg',
            'Rhizobium - 100mL',
            'Foundation Mix - 30kg',
            'LEO - 250mL'
        ],
        bestFor: 'Toor, Green Gram, Black Gram, Cowpea',
        benefits: 'Better germination, stronger nodulation, and flowering response. Suits red soils and dryland farming.',
        coverage: '1 acre',
        price: 'Starter Package',
        popular: false,
        savings: '12%'
    },
    {
        id: 'dryland-vegetable-bundle',
        name: 'Dryland Vegetable Bundle',
        icon: '🍅',
        subtitle: 'For Brinjal, Tomato, Chili, Okra',
        contents: 'Foundation Mix, AF-NPK, NORA, LEO',
        products: [
            'Foundation Mix - 30kg',
            'AF-NPK - 500mL',
            'NORA - 250mL',
            'LEO - 500mL'
        ],
        bestFor: 'Tomato, Brinjal, Chilli, Okra, Cucumber',
        benefits: 'Supports flowering, fruit setting, and helps crops recover from heat stress or delayed irrigation.',
        coverage: '1 acre',
        price: 'Vegetable Special',
        popular: false,
        savings: '10%'
    },
    {
        id: 'orchard-care-kit',
        name: 'Orchard Care Kit',
        icon: '🌳',
        subtitle: 'For Mango, Citrus, Guava plantations',
        contents: 'Foundation Mix, AF-NPK, LEO, NORA, Drone Option',
        products: [
            'Foundation Mix - 50kg',
            'AF-NPK - 1L',
            'LEO - 1L',
            'NORA - 500mL',
            'Drone Spray Option'
        ],
        bestFor: 'Mango, Guava, Citrus, Pomegranate',
        benefits: 'Sustains long-term soil fertility, promotes fruit set and yield in perennial trees.',
        coverage: '1 acre',
        price: 'Premium Package',
        premium: true,
        savings: '20%'
    }
];

// FAQ Data
const FAQ_DATA = [
    {
        id: 'organic-certified',
        question: 'Are Biolia products organic certified?',
        answer: 'Yes, all our products follow natural farming and organic compliance standards.'
    },
    {
        id: 'chemical-compatibility',
        question: 'Can I use Biolia inputs with chemical fertilizers?',
        answer: 'Yes. But to maximize benefits, we recommend reducing chemical dependency gradually.'
    },
    {
        id: 'application-guide',
        question: 'How do I apply these products on my crops?',
        answer: 'Each product has usage instructions. You can also download crop-specific guides from the product pages.'
    },
    {
        id: 'bulk-rates',
        question: 'Do you offer bulk rates for FPOs or dealers?',
        answer: 'Yes. Contact our sales team for special pricing and bundled offers.'
    }
];

// Resources Data
const RESOURCES_DATA = [
    {
        id: 'product-catalog',
        title: 'Product Catalog',
        subtitle: 'May 2025 (PDF)',
        icon: '📄',
        size: '2.5 MB',
        description: 'Complete product range with detailed specifications'
    },
    {
        id: 'crop-advisory',
        title: 'Crop-wise Advisory',
        subtitle: 'Toor, Brinjal, Paddy',
        icon: '📄',
        size: '1.8 MB',
        description: 'Detailed guidelines for major crops'
    },
    {
        id: 'farmer-templates',
        title: 'Farmer Templates',
        subtitle: 'Hindi, Telugu, Marathi',
        icon: '📄',
        size: '950 KB',
        description: 'Application guides in regional languages'
    },
    {
        id: 'application-protocols',
        title: 'Application Protocols',
        subtitle: 'Foliar Spray & Drip',
        icon: '📄',
        size: '1.2 MB',
        description: 'Step-by-step application methods'
    }
];

// Stage-wise Application Data
const STAGES_DATA = [
    {
        id: 'soil-prep',
        stage: 'Soil Prep',
        input: 'Foundation Mix + Soil Sterilizer',
        icon: '🌱',
        description: 'Prepare soil foundation for healthy growth'
    },
    {
        id: 'sowing-seeding',
        stage: 'Sowing/Seeding',
        input: 'Rhizobium (Pulses only)',
        icon: '🌰',
        description: 'Enhance seed germination and root development'
    },
    {
        id: 'early-growth',
        stage: 'Early Growth',
        input: 'AF-NPK',
        icon: '⚡',
        description: 'Provide balanced nutrition for vegetative growth'
    },
    {
        id: 'flowering',
        stage: 'Flowering',
        input: 'LEO',
        icon: '🌸',
        description: 'Support flower initiation and development'
    },
    {
        id: 'stress-period',
        stage: 'Stress Period',
        input: 'NORA',
        icon: '💪',
        description: 'Help crops recover from environmental stress'
    }
];

// Crop Recommendations Data
const CROP_RECOMMENDATIONS_DATA = [
    {
        id: 'paddy',
        crop: 'Paddy',
        kit: 'Paddy Grower Kit',
        icon: '🌾',
        description: 'Complete solution for rice cultivation'
    },
    {
        id: 'red-gram',
        crop: 'Red Gram',
        kit: 'Pulses Starter Kit',
        icon: '🫘',
        description: 'Specialized for pulse crops'
    },
    {
        id: 'chilli',
        crop: 'Chilli',
        kit: 'Dryland Vegetable Bundle',
        icon: '🌶️',
        description: 'Perfect for spice cultivation'
    },
    {
        id: 'mango',
        crop: 'Mango',
        kit: 'Orchard Care Kit',
        icon: '🥭',
        description: 'Premium care for fruit trees'
    }
];

// Features Data
const FEATURES_DATA = [
    {
        id: 'indian-conditions',
        icon: '🇮🇳',
        title: 'Designed for Indian Conditions',
        description: 'Biolia products are curated with Indian farmers in mind—formulated for local crops like paddy, pulses, vegetables, and fruit trees, and optimized for dryland and red soils.'
    },
    {
        id: 'ready-kits',
        icon: '📦',
        title: 'Ready-to-Use Kits for Every Crop',
        description: 'Choose from pre-designed kits like the Paddy Grower Kit, Dryland Vegetable Bundle, or Orchard Care Kit—each with specific inputs needed for 1 acre.'
    },
    {
        id: 'natural-inputs',
        icon: '🌱',
        title: 'Simplified Natural Inputs',
        description: 'Using bio-formulations like Foundation Mix, AF-NPK, and LEO, farmers get a combination of soil conditioners, growth stimulants, and microbial inoculants—all from one place.'
    }
];

// Contact Information Data
const CONTACT_INFO_DATA = [
    {
        id: 'address',
        icon: `<svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>`,
        label: 'Head Office',
        content: `Biolia Bio-Organic Solutions<br>
                 Agricultural Innovation Center<br>
                 Hyderabad, Telangana 500032<br>
                 India`
    },
    {
        id: 'phone',
        icon: `<svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>`,
        label: 'Phone',
        content: `+91 40 1234 5678 (Head Office)<br>
                 +91 40 1234 5679 (Sales)<br>
                 +91 40 1234 5680 (Technical Support)`
    },
    {
        id: 'email',
        icon: `<svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>`,
        label: 'Email',
        content: `info@biolia.com<br>
                 sales@biolia.com<br>
                 support@biolia.com`
    },
    {
        id: 'hours',
        icon: `<svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979.446.74.736 1.747.736 2.771 0 1.024-.29 2.031-.736 2.771C10.792 13.807 10.304 14 10 14c-.304 0-.792-.193-1.264-.979C8.29 12.281 8 11.274 8 10.25c0-1.024.29-2.031.736-2.771z" clip-rule="evenodd" />
        </svg>`,
        label: 'Business Hours',
        content: `Monday - Friday: 9:00 AM - 6:00 PM<br>
                 Saturday: 9:00 AM - 2:00 PM<br>
                 Sunday: Closed`
    }
];

// Form Data
const FORM_DATA = {
    states: [
        'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra',
        'Gujarat', 'Rajasthan', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar',
        'West Bengal', 'Odisha', 'Kerala', 'Madhya Pradesh', 'Chhattisgarh'
    ],
    
    farmingTypes: [
        'Organic', 'Natural', 'Traditional', 'Mixed', 'Other'
    ],
    
    crops: [
        'Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 'Soybean', 'Groundnut',
        'Tomato', 'Onion', 'Potato', 'Chilli', 'Brinjal', 'Okra', 'Cabbage',
        'Cauliflower', 'Beans', 'Peas', 'Carrot', 'Beetroot', 'Spinach', 'Other'
    ],
    
    soilTypes: [
        'Red Soil', 'Black Soil', 'Sandy Soil', 'Loamy Soil', 'Clay Soil', 'Mixed Soil'
    ],
    
    purposes: [
        'To buy products for my farm',
        'To understand recommended products for my crop',
        'To get consultation for crop issues',
        'To learn about organic farming methods',
        'To become a distributor or partner',
        'To attend training/workshop',
        'Just exploring options',
        'Other (please specify)'
    ],
    
    communicationModes: [
        { value: 'phone', label: 'Phone Call' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' }
    ]
};

// Export data to global scope
window.PRODUCTS_DATA = PRODUCTS_DATA;
window.PACKAGE_KITS_DATA = PACKAGE_KITS_DATA;
window.FAQ_DATA = FAQ_DATA;
window.RESOURCES_DATA = RESOURCES_DATA;
window.STAGES_DATA = STAGES_DATA;
window.CROP_RECOMMENDATIONS_DATA = CROP_RECOMMENDATIONS_DATA;
window.FEATURES_DATA = FEATURES_DATA;
window.CONTACT_INFO_DATA = CONTACT_INFO_DATA;
window.FORM_DATA = FORM_DATA;