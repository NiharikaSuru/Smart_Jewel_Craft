export const jewelryItems = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    category: "rings",
    subcategory: "engagement",
    price: 2500,
    originalPrice: 3000,
    images: ["/images/ring1.jpg", "/images/ring1-2.jpg"],
    materials: ["14k White Gold", "1ct Diamond"],
    description: "Classic solitaire engagement ring with brilliant cut diamond",
    rating: 4.8,
    reviews: 156,
    seller: {
      id: 1,
      name: "Diamond Dreams",
      rating: 4.9,
      verified: true
    },
    sustainability: {
      recycledMetal: true,
      ethicalStones: true,
      certification: "Responsible Jewelry Council",
      carbonNeutral: false
    },
    customizable: true,
    inStock: true,
    weight: "3.2g",
    dimensions: "6mm band width"
  },
  {
    id: 2,
    name: "Emerald Tennis Bracelet",
    category: "bracelets",
    subcategory: "tennis",
    price: 1800,
    originalPrice: 2200,
    images: ["/images/bracelet1.jpg", "/images/bracelet1-2.jpg"],
    materials: ["18k Yellow Gold", "Emerald Stones"],
    description: "Elegant tennis bracelet with natural emerald stones",
    rating: 4.7,
    reviews: 89,
    seller: {
      id: 2,
      name: "Emerald Elegance",
      rating: 4.8,
      verified: true
    },
    sustainability: {
      recycledMetal: false,
      ethicalStones: true,
      certification: "Fair Trade Gold",
      carbonNeutral: true
    },
    customizable: true,
    inStock: true,
    weight: "12.5g",
    dimensions: "7 inches length"
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    category: "earrings",
    subcategory: "drops",
    price: 450,
    originalPrice: 550,
    images: ["/images/earrings1.jpg", "/images/earrings1-2.jpg"],
    materials: ["Sterling Silver", "Freshwater Pearls"],
    description: "Classic pearl drop earrings with sterling silver hooks",
    rating: 4.6,
    reviews: 203,
    seller: {
      id: 3,
      name: "Pearl Paradise",
      rating: 4.7,
      verified: true
    },
    sustainability: {
      recycledMetal: true,
      ethicalStones: true,
      certification: "Sustainable Pearl Initiative",
      carbonNeutral: true
    },
    customizable: false,
    inStock: true,
    weight: "4.8g",
    dimensions: "2.5cm drop length"
  },
  {
    id: 4,
    name: "Sapphire Pendant Necklace",
    category: "necklaces",
    subcategory: "pendants",
    price: 980,
    originalPrice: 1200,
    images: ["/images/necklace1.jpg", "/images/necklace1-2.jpg"],
    materials: ["14k Rose Gold", "Blue Sapphire"],
    description: "Delicate sapphire pendant on rose gold chain",
    rating: 4.9,
    reviews: 134,
    seller: {
      id: 4,
      name: "Sapphire Sublime",
      rating: 4.9,
      verified: true
    },
    sustainability: {
      recycledMetal: true,
      ethicalStones: true,
      certification: "Responsible Jewelry Council",
      carbonNeutral: false
    },
    customizable: true,
    inStock: true,
    weight: "6.2g",
    dimensions: "18 inch chain"
  },
  {
    id: 5,
    name: "Ruby Statement Ring",
    category: "rings",
    subcategory: "statement",
    price: 3200,
    originalPrice: 3800,
    images: ["/images/ring2.jpg", "/images/ring2-2.jpg"],
    materials: ["Platinum", "2ct Ruby", "Diamond Accents"],
    description: "Bold statement ring with central ruby and diamond accents",
    rating: 4.8,
    reviews: 67,
    seller: {
      id: 5,
      name: "Ruby Royalty",
      rating: 4.8,
      verified: true
    },
    sustainability: {
      recycledMetal: false,
      ethicalStones: true,
      certification: "Kimberley Process",
      carbonNeutral: false
    },
    customizable: true,
    inStock: false,
    weight: "8.5g",
    dimensions: "12mm face width"
  }
];

export const categories = [
  {
    id: "rings",
    name: "Rings",
    image: "/images/category-rings.jpg",
    subcategories: [
      { id: "engagement", name: "Engagement" },
      { id: "wedding", name: "Wedding" },
      { id: "statement", name: "Statement" },
      { id: "eternity", name: "Eternity" },
      { id: "cocktail", name: "Cocktail" }
    ]
  },
  {
    id: "necklaces",
    name: "Necklaces",
    image: "/images/category-necklaces.jpg",
    subcategories: [
      { id: "pendants", name: "Pendants" },
      { id: "chains", name: "Chains" },
      { id: "chokers", name: "Chokers" },
      { id: "statement", name: "Statement" },
      { id: "lockets", name: "Lockets" }
    ]
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "/images/category-earrings.jpg",
    subcategories: [
      { id: "studs", name: "Studs" },
      { id: "drops", name: "Drops" },
      { id: "hoops", name: "Hoops" },
      { id: "chandeliers", name: "Chandeliers" },
      { id: "climbers", name: "Climbers" }
    ]
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "/images/category-bracelets.jpg",
    subcategories: [
      { id: "tennis", name: "Tennis" },
      { id: "bangles", name: "Bangles" },
      { id: "chain", name: "Chain" },
      { id: "charm", name: "Charm" },
      { id: "cuff", name: "Cuff" }
    ]
  },
  {
    id: "watches",
    name: "Watches",
    image: "/images/category-watches.jpg",
    subcategories: [
      { id: "luxury", name: "Luxury" },
      { id: "sport", name: "Sport" },
      { id: "classic", name: "Classic" },
      { id: "smart", name: "Smart" },
      { id: "vintage", name: "Vintage" }
    ]
  }
];

export const materials = [
  {
    id: "gold-14k",
    name: "14K Gold",
    type: "metal",
    pricePerGram: 65,
    colors: ["yellow", "white", "rose"],
    sustainable: false
  },
  {
    id: "gold-18k",
    name: "18K Gold",
    type: "metal",
    pricePerGram: 85,
    colors: ["yellow", "white", "rose"],
    sustainable: false
  },
  {
    id: "platinum",
    name: "Platinum",
    type: "metal",
    pricePerGram: 120,
    colors: ["white"],
    sustainable: false
  },
  {
    id: "silver-sterling",
    name: "Sterling Silver",
    type: "metal",
    pricePerGram: 2.5,
    colors: ["silver"],
    sustainable: true
  },
  {
    id: "diamond",
    name: "Diamond",
    type: "gemstone",
    pricePerCarat: 5000,
    ethical: true
  },
  {
    id: "ruby",
    name: "Ruby",
    type: "gemstone",
    pricePerCarat: 3000,
    ethical: true
  },
  {
    id: "sapphire",
    name: "Sapphire",
    type: "gemstone",
    pricePerCarat: 2500,
    ethical: true
  },
  {
    id: "emerald",
    name: "Emerald",
    type: "gemstone",
    pricePerCarat: 2800,
    ethical: true
  },
  {
    id: "pearl",
    name: "Pearl",
    type: "gemstone",
    pricePerCarat: 800,
    ethical: true
  }
];

export const sellers = [
  {
    id: 1,
    name: "Diamond Dreams",
    rating: 4.9,
    reviewCount: 1205,
    verified: true,
    location: "New York, NY",
    specialties: ["Engagement Rings", "Diamond Jewelry"],
    establishedYear: 1995,
    certifications: ["GIA", "RJC"]
  },
  {
    id: 2,
    name: "Emerald Elegance",
    rating: 4.8,
    reviewCount: 892,
    verified: true,
    location: "Los Angeles, CA",
    specialties: ["Colored Gemstones", "Custom Design"],
    establishedYear: 2003,
    certifications: ["AGTA", "Fair Trade"]
  },
  {
    id: 3,
    name: "Pearl Paradise",
    rating: 4.7,
    reviewCount: 654,
    verified: true,
    location: "Miami, FL",
    specialties: ["Pearls", "Bridal Jewelry"],
    establishedYear: 1988,
    certifications: ["SPI", "RJC"]
  }
];