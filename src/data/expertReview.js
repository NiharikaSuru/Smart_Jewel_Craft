export const expertReviewData = {
  analysisTypes: [
    {
      id: "basic",
      name: "Basic Analysis",
      price: 25,
      deliveryTime: "24-48 hours",
      includes: [
        "Material identification",
        "Approximate weight estimation",
        "Basic condition assessment",
        "Market value range"
      ]
    },
    {
      id: "detailed",
      name: "Detailed Analysis",
      price: 75,
      deliveryTime: "48-72 hours",
      includes: [
        "Comprehensive material analysis",
        "Precise weight calculations",
        "Detailed condition report",
        "Accurate market valuation",
        "Craftsmanship assessment",
        "Age and origin estimation"
      ]
    },
    {
      id: "premium",
      name: "Premium Analysis",
      price: 150,
      deliveryTime: "3-5 business days",
      includes: [
        "Complete gemological assessment",
        "Certified weight measurements",
        "Professional photography",
        "Detailed condition documentation",
        "Market analysis and trends",
        "Authentication verification",
        "Insurance appraisal document",
        "Video consultation with expert"
      ]
    }
  ],
  imageRequirements: {
    quantity: "3-5 high-quality images",
    requirements: [
      "Clear, well-lit photos",
      "Multiple angles (front, back, side)",
      "Close-up of hallmarks/stamps",
      "Any damage or wear areas",
      "Scale reference (coin or ruler)"
    ],
    acceptedFormats: ["JPEG", "PNG", "HEIC"],
    maxFileSize: "10MB per image"
  },
  sampleReports: [
    {
      id: 1,
      type: "basic",
      itemType: "Diamond Ring",
      analysisDate: "2024-10-15",
      expert: "Sarah Mitchell, GIA",
      findings: {
        materials: ["14K White Gold", "0.75ct Diamond"],
        estimatedWeight: "3.2g",
        condition: "Excellent",
        marketValue: "$1,800 - $2,200",
        notes: "Well-maintained solitaire setting with good quality diamond"
      }
    },
    {
      id: 2,
      type: "detailed",
      itemType: "Vintage Emerald Necklace",
      analysisDate: "2024-10-12",
      expert: "Michael Chen, FGA",
      findings: {
        materials: ["18K Yellow Gold", "Natural Emeralds", "Diamond Accents"],
        estimatedWeight: "15.6g",
        condition: "Very Good - Minor wear consistent with age",
        marketValue: "$3,200 - $3,800",
        craftsmanship: "High quality handcrafted piece",
        ageEstimate: "1950s-1960s",
        notes: "Art Deco influence with excellent emerald quality"
      }
    }
  ]
};

export const experts = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Senior Gemologist",
    credentials: ["GIA Graduate Gemologist", "15+ years experience"],
    specialties: ["Diamond Grading", "Engagement Rings", "Modern Jewelry"],
    rating: 4.9,
    reviewCount: 342,
    avatar: "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?w=400&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Certified Appraiser",
    credentials: ["FGA Fellow", "Certified Gemologist Appraiser", "20+ years experience"],
    specialties: ["Colored Gemstones", "Vintage Jewelry", "Insurance Appraisals"],
    rating: 4.8,
    reviewCount: 287,
    avatar: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?w=400&fit=crop"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Jewelry Historian",
    credentials: ["Master's in Art History", "Antique Jewelry Specialist", "12+ years experience"],
    specialties: ["Antique Jewelry", "Period Identification", "Authentication"],
    rating: 4.9,
    reviewCount: 156,
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=400&fit=crop"
  }
];

export const communicationFeatures = {
  chatSupport: {
    available: true,
    responseTime: "Within 2 hours during business hours",
    languages: ["English", "Spanish", "French"]
  },
  videoConsultation: {
    available: true,
    duration: "30 minutes",
    includedIn: ["premium"],
    additionalCost: 50
  },
  followUpQuestions: {
    unlimited: true,
    timeFrame: "30 days after report delivery"
  }
};