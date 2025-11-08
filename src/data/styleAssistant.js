export const styleQuestions = [
  {
    id: 1,
    question: "What's your preferred style aesthetic?",
    type: "multiple-choice",
    options: [
      { id: "classic", label: "Classic & Timeless", image: "https://images.unsplash.com/photo-1603561591411-77e003d15943?w=800" },
      { id: "modern", label: "Modern & Minimalist", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800" },
      { id: "vintage", label: "Vintage & Antique", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800" },
      { id: "bohemian", label: "Bohemian & Eclectic", image: "https://images.unsplash.com/photo-1576723417715-6b408c988c23?w=800" },
      { id: "glamorous", label: "Glamorous & Bold", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800" }
    ]
  },
  {
    id: 2,
    question: "What occasions do you typically dress for?",
    type: "multiple-select",
    options: [
      { id: "everyday", label: "Everyday wear" },
      { id: "work", label: "Professional/Work" },
      { id: "formal", label: "Formal events" },
      { id: "casual", label: "Casual outings" },
      { id: "special", label: "Special occasions" }
    ]
  },
  {
    id: 3,
    question: "What's your preferred metal color?",
    type: "multiple-choice",
    options: [
      { id: "yellow", label: "Yellow Gold", color: "#FFD700" },
      { id: "white", label: "White Gold/Silver", color: "#C0C0C0" },
      { id: "rose", label: "Rose Gold", color: "#E8B4B8" },
      { id: "mixed", label: "Mixed metals", color: "linear-gradient" }
    ]
  },
  {
    id: 4,
    question: "How would you describe your personal style?",
    type: "multiple-select",
    options: [
      { id: "elegant", label: "Elegant" },
      { id: "edgy", label: "Edgy" },
      { id: "romantic", label: "Romantic" },
      { id: "sporty", label: "Sporty" },
      { id: "artistic", label: "Artistic" },
      { id: "sophisticated", label: "Sophisticated" }
    ]
  },
  {
    id: 5,
    question: "What size jewelry do you prefer?",
    type: "multiple-choice",
    options: [
      { id: "delicate", label: "Delicate & Subtle" },
      { id: "medium", label: "Medium & Noticeable" },
      { id: "statement", label: "Bold & Statement" },
      { id: "varies", label: "It varies by piece" }
    ]
  }
];

export const skinToneAnalysis = {
  cool: {
    characteristics: ["Pink or blue undertones", "Burns easily in sun", "Veins appear blue"],
    recommendedMetals: ["white-gold", "platinum", "silver"],
    recommendedGemstones: ["diamond", "sapphire", "emerald", "amethyst"],
    avoidMetals: ["yellow-gold"],
    description: "Cool undertones pair beautifully with white metals and blue-based gemstones"
  },
  warm: {
    characteristics: ["Yellow or golden undertones", "Tans easily", "Veins appear green"],
    recommendedMetals: ["yellow-gold", "rose-gold", "copper"],
    recommendedGemstones: ["ruby", "citrine", "amber", "coral"],
    avoidMetals: ["platinum"],
    description: "Warm undertones complement yellow and rose metals with warm-colored stones"
  },
  neutral: {
    characteristics: ["Mix of pink and yellow undertones", "Moderate sun sensitivity", "Veins appear blue-green"],
    recommendedMetals: ["yellow-gold", "white-gold", "rose-gold", "silver"],
    recommendedGemstones: ["diamond", "pearl", "aquamarine", "peridot"],
    avoidMetals: [],
    description: "Neutral undertones are versatile and work well with most metals and gemstones"
  }
};

export const styleRecommendations = {
  classic: {
    description: "Timeless pieces that never go out of style",
    recommendedItems: ["solitaire-rings", "pearl-earrings", "simple-chains", "tennis-bracelets"],
    metals: ["yellow-gold", "white-gold", "platinum"],
    gemstones: ["diamond", "pearl"],
    characteristics: ["Clean lines", "Traditional settings", "Minimal embellishment"]
  },
  modern: {
    description: "Contemporary designs with clean, geometric lines",
    recommendedItems: ["geometric-rings", "linear-earrings", "minimalist-necklaces"],
    metals: ["white-gold", "platinum", "silver"],
    gemstones: ["diamond", "black-diamond", "clear-quartz"],
    characteristics: ["Geometric shapes", "Asymmetrical designs", "Mixed materials"]
  },
  vintage: {
    description: "Inspired by bygone eras with intricate details",
    recommendedItems: ["art-deco-rings", "chandelier-earrings", "ornate-brooches"],
    metals: ["yellow-gold", "rose-gold"],
    gemstones: ["emerald", "ruby", "sapphire", "pearl"],
    characteristics: ["Ornate details", "Filigree work", "Colored gemstones"]
  },
  bohemian: {
    description: "Free-spirited designs with natural elements",
    recommendedItems: ["stacking-rings", "layered-necklaces", "natural-stone-jewelry"],
    metals: ["silver", "copper", "mixed-metals"],
    gemstones: ["turquoise", "amethyst", "moonstone", "labradorite"],
    characteristics: ["Natural stones", "Organic shapes", "Layered styling"]
  },
  glamorous: {
    description: "Bold, eye-catching pieces that make a statement",
    recommendedItems: ["cocktail-rings", "chandelier-earrings", "statement-necklaces"],
    metals: ["yellow-gold", "rose-gold", "platinum"],
    gemstones: ["diamond", "ruby", "emerald", "sapphire"],
    characteristics: ["Large gemstones", "Dramatic designs", "Luxurious materials"]
  }
};