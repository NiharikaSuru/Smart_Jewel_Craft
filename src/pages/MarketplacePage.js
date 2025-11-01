import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { jewelryItems, sellers } from '../data/jewelry';
import JewelryCard from '../components/JewelryCard';
import { 
  CameraIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  StarIcon,
  CheckBadgeIcon,
  EyeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const MarketplacePage = () => {
  const { state, setCurrentPage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [showArTryOn, setShowArTryOn] = useState(false);
  const [filteredItems, setFilteredItems] = useState(jewelryItems);
  const [viewMode, setViewMode] = useState('marketplace');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let filtered = [...jewelryItems];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materials.some(material => 
          material.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        item.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Seller filter
    if (selectedSeller) {
      filtered = filtered.filter(item => item.seller.id.toString() === selectedSeller);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedSeller]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleArTryOn = (item) => {
    setSelectedItem(item);
    setShowArTryOn(true);
  };

  const ArTryOnModal = () => {
    if (!showArTryOn || !selectedItem) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowArTryOn(false)}>
        <div className="modal-content max-w-4xl w-full m-4" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold font-playfair">Virtual Try-On</h2>
              <button
                onClick={() => setShowArTryOn(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Try-On Interface */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Camera/Preview Area */}
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <CameraIcon className="h-24 w-24 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Camera Access Required
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Allow camera access to try on jewelry virtually
                      </p>
                      <button className="btn btn-primary">
                        Enable Camera
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <div className="mb-6">
                    <img
                      src={selectedItem.images[0]}
                      alt={selectedItem.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedItem.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {selectedItem.materials.join(', ')}
                    </p>
                    <p className="text-2xl font-bold text-amber-600">
                      ${selectedItem.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Try-On Controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adjust Size
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        defaultValue="100"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="btn btn-outline btn-sm">Move Up</button>
                        <button className="btn btn-outline btn-sm">Move Down</button>
                        <button className="btn btn-outline btn-sm">Move Left</button>
                        <button className="btn btn-outline btn-sm">Move Right</button>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button className="btn btn-primary flex-1">
                        <ShoppingBagIcon className="h-5 w-5 mr-2" />
                        Add to Cart
                      </button>
                      <button className="btn btn-outline">
                        Save Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Jewelry Marketplace
          </h1>
          <p className="text-xl text-gray-600">
            Discover unique pieces from verified sellers worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search jewelry, materials, or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </form>
            </div>

            {/* Seller Filter */}
            <div>
              <select
                value={selectedSeller}
                onChange={(e) => setSelectedSeller(e.target.value)}
                className="form-select w-full py-3"
              >
                <option value="">All Sellers</option>
                {sellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Filters */}
            <div>
              <button
                onClick={() => setCurrentPage('categories')}
                className="btn btn-outline w-full flex items-center justify-center space-x-2"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span>Advanced Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Sellers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sellers.slice(0, 3).map((seller) => (
              <div key={seller.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{seller.name}</h3>
                        {seller.verified && (
                          <CheckBadgeIcon className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {seller.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(seller.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {seller.rating} ({seller.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Specializes in: {seller.specialties.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Est. {seller.establishedYear}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSeller(seller.id.toString())}
                  className="btn btn-outline w-full"
                >
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedSeller 
              ? `Products by ${sellers.find(s => s.id.toString() === selectedSeller)?.name}`
              : 'All Products'
            }
          </h2>
          <div className="text-sm text-gray-600">
            {filteredItems.length} items found
          </div>
        </div>

        {/* Products Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredItems.map((item) => (
              <div key={item.id} className="relative group">
                <JewelryCard item={item} />
                
                {/* AR Try-On Button */}
                <button
                  onClick={() => handleArTryOn(item)}
                  className="absolute top-4 left-4 bg-purple-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-600"
                  title="Try On Virtually"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-24 w-24 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSeller('');
              }}
              className="btn btn-primary"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Virtual Try-On CTA */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">
            Try Before You Buy
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Use our AR technology to see how jewelry looks on you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleArTryOn(filteredItems[0])}
              className="btn bg-white text-purple-500 hover:bg-gray-100 btn-lg"
            >
              <CameraIcon className="h-6 w-6 mr-2" />
              Start Virtual Try-On
            </button>
            <button
              onClick={() => setCurrentPage('style-assistant')}
              className="btn btn-outline border-white text-white hover:bg-white hover:text-purple-500 btn-lg"
            >
              Get Style Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* AR Try-On Modal */}
      <ArTryOnModal />
    </div>
  );
};

export default MarketplacePage;