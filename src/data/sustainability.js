export const sustainabilityInfo = {
  certifications: [
    {
      id: "rjc",
      name: "Responsible Jewelry Council",
      description: "Promotes responsible ethical, human rights, social and environmental practices",
      logo: "https://www.responsiblejewellery.com/wp-content/uploads/2019/09/RJC_Logo.png"
    },
    {
      id: "fairtrade",
      name: "Fair Trade Gold",
      description: "Ensures miners receive fair wages and work in safe conditions",
      logo: "https://www.fairtrade.org.uk/wp-content/uploads/2020/07/Fairtrade_Mark.png"
    },
    {
      id: "kimberley",
      name: "Kimberley Process",
      description: "Prevents conflict diamonds from entering the mainstream market",
      logo: "https://www.kimberleyprocess.com/sites/all/themes/kpcs/images/kp_logo.png"
    },
    {
      id: "spi",
      name: "Sustainable Pearl Initiative",
      description: "Promotes sustainable pearl farming and ocean conservation",
      logo: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=400"
    }
  ],
  metalSourcing: {
    recycled: {
      title: "Recycled Metals",
      description: "Metals sourced from previously used jewelry and electronic waste",
      benefits: ["Reduces mining impact", "Lower carbon footprint", "Preserves natural resources"],
      availability: ["Gold", "Silver", "Platinum", "Palladium"]
    },
    newlyMined: {
      title: "Responsibly Mined",
      description: "Newly mined metals from certified responsible sources",
      benefits: ["Fair labor practices", "Environmental protection", "Community development"],
      certifications: ["Fair Trade", "RJC", "ARM"]
    }
  },
  gemstoneEthics: {
    conflict_free: {
      title: "Conflict-Free Diamonds",
      description: "Diamonds that have not financed civil wars or human rights abuses",
      verification: "Kimberley Process Certification"
    },
    lab_grown: {
      title: "Lab-Grown Gems",
      description: "Identical to natural gems but created in controlled laboratory environments",
      benefits: ["No mining required", "Traceable origin", "Lower environmental impact"]
    },
    ethical_sourcing: {
      title: "Ethically Sourced",
      description: "Gems sourced with respect for human rights and environmental protection",
      standards: ["Fair wages", "Safe working conditions", "Environmental restoration"]
    }
  }
};

export const educationalContent = [
  {
    id: 1,
    title: "Understanding Jewelry Sustainability",
    category: "sustainability",
    content: "Learn about the environmental and social impact of jewelry production and how to make responsible choices.",
    readTime: "5 min",
    image: "/images/education-sustainability.jpg"
  },
  {
    id: 2,
    title: "Recycled vs. Newly Mined Metals",
    category: "materials",
    content: "Discover the differences between recycled and newly mined precious metals and their environmental impact.",
    readTime: "3 min",
    image: "/images/education-metals.jpg"
  },
  {
    id: 3,
    title: "Conflict-Free Diamond Guide",
    category: "gemstones",
    content: "Everything you need to know about conflict-free diamonds and ethical gemstone sourcing.",
    readTime: "7 min",
    image: "/images/education-diamonds.jpg"
  },
  {
    id: 4,
    title: "Lab-Grown vs. Natural Gems",
    category: "gemstones",
    content: "Compare lab-grown and natural gemstones in terms of quality, value, and environmental impact.",
    readTime: "6 min",
    image: "/images/education-lab-grown.jpg"
  }
];