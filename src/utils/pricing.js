import { materials } from '../data/jewelry';

export const calculateJewelryPrice = (customizations) => {
  let basePrice = 0;
  let materialCosts = 0;
  let laborCosts = 0;
  let designComplexity = 1;

  const {
    metalType = '',
    metalWeight = 0,
    gemstones = [],
    setting = 'basic',
    size = 'standard',
    engraving = false,
    customDesign = false
  } = customizations;

  // Base metal cost
  const metalMaterial = materials.find(m => m.id === metalType);
  if (metalMaterial && metalWeight) {
    materialCosts += metalMaterial.pricePerGram * metalWeight;
  }

  // Gemstone costs
  gemstones.forEach(gemstone => {
    const gemstoneMaterial = materials.find(m => m.id === gemstone.type);
    if (gemstoneMaterial && gemstone.carats) {
      materialCosts += gemstoneMaterial.pricePerCarat * gemstone.carats;
    }
  });

  // Setting complexity
  const settingMultipliers = {
    basic: 1,
    prong: 1.2,
    bezel: 1.3,
    pave: 1.8,
    channel: 1.5,
    vintage: 2.0
  };
  designComplexity *= settingMultipliers[setting] || 1;

  // Size adjustments
  const sizeMultipliers = {
    xs: 0.8,
    small: 0.9,
    standard: 1,
    large: 1.1,
    xl: 1.2
  };
  designComplexity *= sizeMultipliers[size] || 1;

  // Labor costs (base + complexity)
  laborCosts = 200 * designComplexity;

  // Additional services
  if (engraving) {
    laborCosts += 50;
  }
  
  if (customDesign) {
    laborCosts += 300;
    designComplexity *= 1.5;
  }

  // Calculate total
  basePrice = materialCosts + laborCosts;
  
  return {
    materials: materialCosts,
    labor: laborCosts,
    total: basePrice,
    breakdown: {
      metalCost: metalMaterial ? metalMaterial.pricePerGram * metalWeight : 0,
      gemstoneCost: gemstones.reduce((sum, gem) => {
        const gemMaterial = materials.find(m => m.id === gem.type);
        return sum + (gemMaterial ? gemMaterial.pricePerCarat * gem.carats : 0);
      }, 0),
      settingCost: laborCosts * 0.6,
      craftingCost: laborCosts * 0.4,
      additionalServices: (engraving ? 50 : 0) + (customDesign ? 300 : 0)
    }
  };
};

export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const getPriceRange = (basePrice) => {
  const variance = 0.15; // ±15% variance
  const min = basePrice * (1 - variance);
  const max = basePrice * (1 + variance);
  
  return {
    min: Math.round(min),
    max: Math.round(max),
    formatted: `${formatPrice(min)} - ${formatPrice(max)}`
  };
};

export const getShippingCost = (totalValue, expedited = false, international = false) => {
  let shippingCost = 0;
  
  if (totalValue >= 500) {
    shippingCost = 0; // Free shipping over $500
  } else {
    shippingCost = international ? 50 : 25;
  }
  
  if (expedited) {
    shippingCost += international ? 75 : 35;
  }
  
  return shippingCost;
};

export const getTaxRate = (state) => {
  const taxRates = {
    'CA': 0.0975, // California
    'NY': 0.08,   // New York
    'TX': 0.0625, // Texas
    'FL': 0.06,   // Florida
    'WA': 0.065,  // Washington
    // Add more states as needed
  };
  
  return taxRates[state] || 0.08; // Default 8% tax rate
};

export const calculateOrderTotal = (items, shippingInfo = {}) => {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const shipping = getShippingCost(
    subtotal, 
    shippingInfo.expedited, 
    shippingInfo.international
  );
  
  const taxRate = getTaxRate(shippingInfo.state);
  const tax = subtotal * taxRate;
  
  const total = subtotal + shipping + tax;
  
  return {
    subtotal,
    shipping,
    tax,
    taxRate,
    total,
    breakdown: {
      items: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      averageItemPrice: subtotal / items.reduce((sum, item) => sum + item.quantity, 0),
      freeShippingEligible: subtotal >= 500
    }
  };
};