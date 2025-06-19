export const products = [
  {
    id: 'boxer',
    name: 'BOXER',
    category: 'Soil Enhancement',
    price: 2499,
    description: 'Advanced soil conditioning formula that improves soil structure and enhances root development for stronger, healthier crops.',
    features: [
      'Improves soil aeration and water retention',
      'Enhances root zone development',
      'Increases nutrient uptake efficiency',
      'Suitable for all crop types'
    ],
    usage: 'Apply 2-3 kg per acre during soil preparation',
    packaging: '5kg, 10kg, 25kg bags',
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'comet',
    name: 'COMET',
    category: 'Growth Accelerator',
    price: 1899,
    description: 'High-performance growth accelerator that boosts plant metabolism and accelerates crop development cycles.',
    features: [
      'Accelerates plant growth by 25-30%',
      'Enhances photosynthesis efficiency',
      'Improves stress tolerance',
      'Organic and eco-friendly formula'
    ],
    usage: 'Foliar spray: 2ml per liter of water, apply every 15 days',
    packaging: '250ml, 500ml, 1L bottles',
    inStock: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: 'leo',
    name: 'LEO',
    category: 'Pest Management',
    price: 3299,
    description: 'Natural pest deterrent system that provides comprehensive protection against common agricultural pests.',
    features: [
      '100% organic pest control',
      'Safe for beneficial insects',
      'Long-lasting protection',
      'No chemical residue'
    ],
    usage: 'Spray 3-4ml per liter of water during early morning or evening',
    packaging: '100ml, 250ml, 500ml bottles',
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'pangfo',
    name: 'PANGFO',
    category: 'Nutrient Supplement',
    price: 1599,
    description: 'Complete phosphorus and potassium supplement that enhances flowering, fruiting, and overall plant vigor.',
    features: [
      'High phosphorus and potassium content',
      'Promotes flowering and fruiting',
      'Improves crop quality',
      'Water-soluble formula'
    ],
    usage: 'Soil application: 5-8kg per acre or foliar spray: 5g per liter',
    packaging: '1kg, 5kg, 10kg packs',
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'sprint',
    name: 'SPRINT',
    category: 'Quick Recovery',
    price: 2199,
    description: 'Rapid recovery formula designed to help crops bounce back quickly from stress, disease, or adverse conditions.',
    features: [
      'Rapid stress recovery',
      'Boosts plant immunity',
      'Restores plant vigor',
      'Fast-acting formula'
    ],
    usage: 'Emergency application: 3-5ml per liter, repeat after 7 days if needed',
    packaging: '100ml, 250ml, 500ml bottles',
    inStock: false,
    rating: 4.8,
    reviews: 67
  },
  {
    id: 'rootex',
    name: 'ROOTEX',
    category: 'Root Development',
    price: 1799,
    description: 'Specialized root development enhancer that promotes strong root system formation and improves nutrient absorption.',
    features: [
      'Stimulates root hair development',
      'Increases root mass by 40%',
      'Improves nutrient absorption',
      'Enhances drought tolerance'
    ],
    usage: 'Root zone application: 2-3ml per plant or soil drench',
    packaging: '250ml, 500ml, 1L bottles',
    inStock: true,
    rating: 4.7,
    reviews: 178
  },
  {
    id: 'flora',
    name: 'FLORA',
    category: 'Flowering Enhancer',
    price: 2799,
    description: 'Premium flowering enhancer that maximizes bloom production and improves flower quality in ornamental and fruit crops.',
    features: [
      'Increases flower count by 35%',
      'Improves flower size and color',
      'Extends flowering period',
      'Enhances fruit set'
    ],
    usage: 'Apply during bud formation: 2-3ml per liter, weekly application',
    packaging: '250ml, 500ml bottles',
    inStock: true,
    rating: 4.9,
    reviews: 92
  },
  {
    id: 'nora',
    name: 'NORA',
    category: 'Nitrogen Optimizer',
    price: 1399,
    description: 'Advanced nitrogen management solution that optimizes nitrogen utilization and reduces nitrogen loss from soil.',
    features: [
      'Reduces nitrogen leaching',
      'Improves nitrogen use efficiency',
      'Promotes steady growth',
      'Environmentally friendly'
    ],
    usage: 'Mix with nitrogen fertilizers or apply separately: 1-2kg per acre',
    packaging: '2kg, 5kg, 10kg bags',
    inStock: true,
    rating: 4.5,
    reviews: 145
  },
  {
    id: 'nora-granules',
    name: 'NORA GRANULES',
    category: 'Slow Release Nitrogen',
    price: 1699,
    description: 'Slow-release nitrogen granules that provide consistent nitrogen supply throughout the crop cycle.',
    features: [
      'Controlled nitrogen release',
      '90-day nutrient supply',
      'Reduces application frequency',
      'Weather-resistant coating'
    ],
    usage: 'Broadcast application: 15-20kg per acre at planting',
    packaging: '10kg, 25kg, 50kg bags',
    inStock: true,
    rating: 4.6,
    reviews: 112
  },
  {
    id: 'bioconst',
    name: 'BIOCONST',
    category: 'Soil Constructor',
    price: 3599,
    description: 'Comprehensive soil reconstruction formula that rebuilds degraded soils and restores natural soil biology.',
    features: [
      'Rebuilds soil structure',
      'Restores microbial activity',
      'Improves water holding capacity',
      'Long-term soil health improvement'
    ],
    usage: 'Apply 10-15kg per acre during land preparation',
    packaging: '10kg, 25kg, 50kg bags',
    inStock: true,
    rating: 4.8,
    reviews: 78
  },
  {
    id: 'em-solution',
    name: 'EM.SOLUTION',
    category: 'Microbial Enhancer',
    price: 899,
    description: 'Effective microorganisms solution that introduces beneficial bacteria and fungi to improve soil health.',
    features: [
      'Contains 15+ beneficial microorganisms',
      'Improves soil biology',
      'Enhances nutrient cycling',
      'Suppresses harmful pathogens'
    ],
    usage: 'Dilute 1:100 with water, apply to soil or as foliar spray',
    packaging: '250ml, 500ml, 1L bottles',
    inStock: true,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 'all-biofer',
    name: 'ALL BIOFER',
    category: 'Complete Bio-Fertilizer',
    price: 2299,
    description: 'All-in-one bio-fertilizer containing essential nutrients and beneficial microorganisms for complete plant nutrition.',
    features: [
      'Complete NPK with micronutrients',
      'Contains beneficial microbes',
      'Improves soil fertility',
      '100% organic certification'
    ],
    usage: 'Apply 8-10kg per acre as basal dose or top dressing',
    packaging: '5kg, 10kg, 25kg bags',
    inStock: true,
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'ph-regulator',
    name: 'PH REGULATOR',
    category: 'Soil pH Management',
    price: 1299,
    description: 'Natural pH regulator that maintains optimal soil pH levels for maximum nutrient availability.',
    features: [
      'Stabilizes soil pH',
      'Improves nutrient availability',
      'Reduces soil acidity/alkalinity',
      'Long-lasting effect'
    ],
    usage: 'Apply 3-5kg per acre based on soil pH test results',
    packaging: '5kg, 10kg, 25kg bags',
    inStock: true,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'foundation',
    name: 'FOUNDATION',
    category: 'Soil Foundation',
    price: 4199,
    description: 'Premium soil foundation builder that creates the perfect growing medium for high-value crops.',
    features: [
      'Creates optimal soil structure',
      'Enhances water and air movement',
      'Provides slow-release nutrients',
      'Suitable for greenhouse cultivation'
    ],
    usage: 'Mix 20-30kg per acre into top 6 inches of soil',
    packaging: '10kg, 25kg, 50kg bags',
    inStock: false,
    rating: 4.9,
    reviews: 45
  },
  {
    id: 'af-npk',
    name: 'AF-NPK',
    category: 'Advanced NPK',
    price: 1999,
    description: 'Advanced NPK formula with enhanced absorption technology for maximum nutrient uptake efficiency.',
    features: [
      'Enhanced nutrient absorption',
      'Balanced NPK ratio',
      'Chelated micronutrients',
      'Quick and sustained release'
    ],
    usage: 'Apply 6-8kg per acre during active growth phase',
    packaging: '5kg, 10kg, 25kg bags',
    inStock: true,
    rating: 4.7,
    reviews: 167
  },
  {
    id: 'af-monas',
    name: 'AF-MONAS',
    category: 'Potassium Specialist',
    price: 1799,
    description: 'Specialized potassium supplement that improves fruit quality, disease resistance, and overall plant health.',
    features: [
      'High-quality potassium source',
      'Improves fruit quality',
      'Enhances disease resistance',
      'Increases shelf life of produce'
    ],
    usage: 'Apply 4-6kg per acre during fruit development stage',
    packaging: '5kg, 10kg, 20kg bags',
    inStock: true,
    rating: 4.8,
    reviews: 123
  },
  {
    id: 'af-tricho',
    name: 'AF-TRICHO',
    category: 'Biological Control',
    price: 2599,
    description: 'Trichoderma-based biological control agent that protects crops from soil-borne diseases and promotes growth.',
    features: [
      'Contains Trichoderma fungi',
      'Controls soil-borne diseases',
      'Promotes root development',
      'Improves plant immunity'
    ],
    usage: 'Seed treatment: 5-10g per kg seeds or soil application: 2-3kg per acre',
    packaging: '250g, 500g, 1kg packs',
    inStock: true,
    rating: 4.9,
    reviews: 87
  }
];

export const categories = [
  'All Products',
  'Soil Enhancement',
  'Growth Accelerator',
  'Pest Management',
  'Nutrient Supplement',
  'Quick Recovery',
  'Root Development',
  'Flowering Enhancer',
  'Nitrogen Optimizer',
  'Slow Release Nitrogen',
  'Soil Constructor',
  'Microbial Enhancer',
  'Complete Bio-Fertilizer',
  'Soil pH Management',
  'Soil Foundation',
  'Advanced NPK',
  'Potassium Specialist',
  'Biological Control'
];