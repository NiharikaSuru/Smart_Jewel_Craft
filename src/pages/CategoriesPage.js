import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { categories, jewelryItems } from '../data/jewelry';
import JewelryCard from '../components/JewelryCard';
import { 
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const CategoriesPage = () => {
  const { state, setFilters } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredItems, setFilteredItems] = useState(jewelryItems);
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  const priceRanges = [
    { min: 0, max: 500, label: 'Under $500' },
    { min: 500, max: 1000, label: '$500 - $1,000' },
    { min: 1000, max: 2500, label: '$1,000 - $2,500' },
    { min: 2500, max: 5000, label: '$2,500 - $5,000' },
    { min: 5000, max: Infinity, label: 'Over $5,000' }
  ];

  const materialOptions = [
    'Gold',
    'Silver',
    'Platinum',
    'Diamond',
    'Pearl',
    'Emerald',
    'Ruby',
    'Sapphire'
  ];

  useEffect(() => {
    let filtered = [...jewelryItems];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      filtered = filtered.filter(item => item.subcategory === selectedSubcategory);
    }

    // Filter by price range
    filtered = filtered.filter(item => 
      item.price >= state.filters.priceRange[0] && 
      item.price <= state.filters.priceRange[1]
    );

    // Filter by materials
    if (state.filters.materials.length > 0) {
      filtered = filtered.filter(item =>
        state.filters.materials.some(material =>
          item.materials.some(itemMaterial =>
            itemMaterial.toLowerCase().includes(material.toLowerCase())
          )
        )
      );
    }

    // Filter by sustainability
    if (state.filters.sustainability.length > 0) {
      filtered = filtered.filter(item => {
        return state.filters.sustainability.every(filter => {
          switch (filter) {
            case 'recycled-metal':
              return item.sustainability?.recycledMetal;
            case 'ethical-stones':
              return item.sustainability?.ethicalStones;
            case 'carbon-neutral':
              return item.sustainability?.carbonNeutral;
            default:
              return true;
          }
        });
      });
    }

    // Filter by stock
    if (state.filters.inStock) {
      filtered = filtered.filter(item => item.inStock);
    }

    // Sort items
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured (default order)
        break;
    }

    setFilteredItems(filtered);
  }, [selectedCategory, selectedSubcategory, state.filters, sortBy]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handlePriceRangeChange = (range) => {
    setFilters({ priceRange: [range.min, range.max] });
  };

  const handleMaterialToggle = (material) => {
    const currentMaterials = state.filters.materials;
    const updatedMaterials = currentMaterials.includes(material)
      ? currentMaterials.filter(m => m !== material)
      : [...currentMaterials, material];
    setFilters({ materials: updatedMaterials });
  };

  const handleSustainabilityToggle = (filter) => {
    const currentSustainability = state.filters.sustainability;
    const updatedSustainability = currentSustainability.includes(filter)
      ? currentSustainability.filter(s => s !== filter)
      : [...currentSustainability, filter];
    setFilters({ sustainability: updatedSustainability });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 10000],
      materials: [],
      sustainability: [],
      inStock: false
    });
    setSelectedCategory('');
    setSelectedSubcategory('');
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Jewelry Categories
          </h1>
          <p className="text-xl text-gray-600">
            Browse our extensive collection by category
          </p>
        </div>

        {/* Category Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="group relative overflow-hidden rounded-lg aspect-square bg-white shadow-md hover:shadow-lg transition-all duration-300"
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
        )}

        {/* Selected Category View */}
        {selectedCategory && (
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <button
                onClick={() => setSelectedCategory('')}
                className="hover:text-amber-600 transition-colors duration-200"
              >
                Categories
              </button>
              <span>/</span>
              <span className="font-medium text-gray-900">
                {selectedCategoryData?.name}
              </span>
              {selectedSubcategory && (
                <>
                  <span>/</span>
                  <span className="font-medium text-gray-900">
                    {selectedCategoryData?.subcategories.find(sub => sub.id === selectedSubcategory)?.name}
                  </span>
                </>
              )}
            </nav>

            {/* Subcategories */}
            {selectedCategoryData && !selectedSubcategory && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {selectedCategoryData.name} Subcategories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {selectedCategoryData.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategorySelect(subcategory.id)}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
                    >
                      <h3 className="font-medium text-gray-900">
                        {subcategory.name}
                      </h3>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filters and Controls */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={
                              state.filters.priceRange[0] === range.min &&
                              state.filters.priceRange[1] === range.max
                            }
                            onChange={() => handlePriceRangeChange(range)}
                            className="mr-2 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Materials</h4>
                    <div className="space-y-2">
                      {materialOptions.map((material) => (
                        <label key={material} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={state.filters.materials.includes(material)}
                            onChange={() => handleMaterialToggle(material)}
                            className="mr-2 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm text-gray-700">{material}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Sustainability</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={state.filters.sustainability.includes('recycled-metal')}
                          onChange={() => handleSustainabilityToggle('recycled-metal')}
                          className="mr-2 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-gray-700">Recycled Metal</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={state.filters.sustainability.includes('ethical-stones')}
                          onChange={() => handleSustainabilityToggle('ethical-stones')}
                          className="mr-2 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-gray-700">Ethical Stones</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={state.filters.sustainability.includes('carbon-neutral')}
                          onChange={() => handleSustainabilityToggle('carbon-neutral')}
                          className="mr-2 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-gray-700">Carbon Neutral</span>
                      </label>
                    </div>
                  </div>

                  {/* In Stock */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={state.filters.inStock}
                        onChange={(e) => setFilters({ inStock: e.target.checked })}
                        className="mr-2 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700">In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Controls Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {filteredItems.length} items
                    </span>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden btn btn-outline btn-sm flex items-center space-x-2"
                    >
                      <FunnelIcon className="h-4 w-4" />
                      <span>Filters</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Sort */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="form-select text-sm pr-8"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Mode */}
                    <div className="flex border border-gray-300 rounded-md">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:text-amber-600'}`}
                      >
                        <Squares2X2Icon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:text-amber-600'}`}
                      >
                        <ListBulletIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredItems.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredItems.map((item) => (
                      <JewelryCard 
                        key={item.id} 
                        item={item} 
                        variant={viewMode === 'list' ? 'compact' : 'default'}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">
                      No items found matching your criteria
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn btn-primary"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;