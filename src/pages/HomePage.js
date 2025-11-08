import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { jewelryItems, categories } from '../data/jewelry';
import JewelryCard from '../components/JewelryCard';
import { 
  SparklesIcon, 
  StarIcon, 
  ShieldCheckIcon,
  TruckIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const { setCurrentPage } = useApp();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Get featured items (highest rated and in stock)
    const featured = jewelryItems
      .filter(item => item.inStock && item.rating >= 4.7)
      .slice(0, 6);
    setFeaturedItems(featured);
  }, []);

  const heroSlides = [
    {
      id: 1,
      title: "Discover Your Perfect Style",
      subtitle: "Personalized jewelry recommendations powered by intelligent style analysis",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
      cta: "Take Style Quiz",
      action: () => setCurrentPage('style-assistant')
    },
    {
      id: 2,
      title: "Expert Jewelry Analysis",
      subtitle: "Get professional evaluation and detailed reports for your jewelry pieces",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200",
      cta: "Start Analysis",
      action: () => setCurrentPage('expert-review')
    },
    {
      id: 3,
      title: "Sustainable & Ethical",
      subtitle: "Shop jewelry from verified sellers committed to responsible practices",
      image: "https://images.unsplash.com/photo-1589207212797-cfd546dea0fe?w=1200",
      cta: "Learn More",
      action: () => setCurrentPage('sustainability')
    }
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: "Style Assistant",
      description: "Get personalized jewelry recommendations based on your style preferences and skin tone",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: StarIcon,
      title: "Expert Reviews",
      description: "Professional analysis and detailed reports from certified and experienced gemologists",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ShieldCheckIcon,
      title: "Virtual Try-On",
      description: "See how jewelry looks on you with our advanced AR technology and realistic rendering",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TruckIcon,
      title: "Sustainability",
      description: "Ethically sourced materials and detailed sustainability information on very jewelry piece",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Customer",
      content: "The style assistant helped me find the best engagement ring. The recommendations were spot-on!",
      rating: 5,
      avatar: "/images/testimonial-1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Jewelry Collector",
      content: "Expert reviews provided detailed analysis that helped me understand my collection's true value.",
      rating: 5,
      avatar: "/images/testimonial-2.jpg"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Eco-conscious Buyer",
      content: "Love that I can easily find sustainably sourced jewelry with detailed ethical information.",
      rating: 5,
      avatar: "/images/testimonial-3.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSlides[currentSlide].image || "/images/hero-default.jpg"}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 fade-in">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 fade-in opacity-90">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={heroSlides[currentSlide].action}
              className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold"
            >
              {heroSlides[currentSlide].cta}
            </button>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-gray-900"
            >
              Browse Marketplace
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
              Why Choose Smart Jewel Craft?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of jewelry shopping with our innovative features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${feature.color} group-hover:scale-110 transition-transform duration-300 `}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-2">
                Featured Jewelry
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked pieces from our verified sellers
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="btn btn-outline flex items-center space-x-2"
            >
              <span>View All</span>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <JewelryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect piece for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCurrentPage('categories')}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image || "/images/category-placeholder.jpg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg text-center">
                    {category.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300">
              Real experiences from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  {/* <img
                    src="/images/diamond_ring.jpg"
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  /> */}
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">
            Ready to Find Your Perfect Jewelry?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Start with our style assistant or browse our curated marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('style-assistant')}
              className="btn bg-white text-amber-500 hover:bg-gray-100 btn-lg px-8 py-4 text-lg font-semibold"
            >
              <SparklesIcon className="h-6 w-6 mr-2" />
              Start Style Quiz
            </button>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="btn bg-white text-amber-500 hover:bg-gray-100 btn-lg px-8 py-4 text-lg font-semibold"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;