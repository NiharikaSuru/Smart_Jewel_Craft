import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartIcon, 
  ShoppingBagIcon, 
  EyeIcon,
  StarIcon,
  CheckBadgeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const JewelryCard = ({ item, variant = 'default', className = '' }) => {
  const { state, addToCart, addToWishlist, removeFromWishlist, setCurrentPage } = useApp();
  
  const isInWishlist = state.wishlist.some(wishItem => wishItem.id === item.id);
  const isInCart = state.cart.some(cartItem => cartItem.id === item.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const cartItem = {
      ...item,
      cartId: `${item.id}-${Date.now()}`,
      customizations: {}
    };
    addToCart(cartItem);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const handleViewDetails = () => {
    setCurrentPage('product-details');
    // Store selected product in context or state management
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarSolidIcon className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  const cardClasses = variant === 'compact' 
    ? 'bg-white border border-gray-100 overflow-hidden transition-all duration-200'
    : 'bg-white border border-gray-100 overflow-hidden transition-all duration-200';

  return (
    <div className={`${cardClasses} ${className} cursor-pointer group`} onClick={handleViewDetails}>
      {/* Image Container */}
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={item.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'}
            alt={item.name}
            className="w-full h-64 object-cover object-center"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlistToggle}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
            >
              {isInWishlist ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
            >
              <EyeIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stock Status */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={variant === 'compact' ? 'p-4' : 'p-6'}>
        {/* Seller Info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">{item.seller.name}</span>
            {item.seller.verified && (
              <CheckBadgeIcon className="h-4 w-4 text-gray-400" />
            )}
          </div>
          {item.sustainability?.ethicalStones && (
            <SparklesIcon className="h-4 w-4 text-green-500" />
          )}
        </div>

        {/* Product Name */}
        <h3 className={`font-semibold text-gray-900 mb-2 ${variant === 'compact' ? 'text-sm' : 'text-lg'}`}>
          {item.name}
        </h3>

        {/* Materials */}
        <p className="text-sm text-gray-600 mb-3">
          {item.materials.join(', ')}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {renderStars(item.rating)}
          </div>
          <span className="text-sm text-gray-600">
            {item.rating} ({item.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`font-bold text-gray-900 ${variant === 'compact' ? 'text-lg' : 'text-xl'}`}>
              ${item.price.toLocaleString()}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-sm text-gray-500 line-through">
                ${item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Sustainability Indicators */}
        {(item.sustainability?.recycledMetal || item.sustainability?.ethicalStones) && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.sustainability.recycledMetal && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Recycled Metal
              </span>
            )}
            {item.sustainability.ethicalStones && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Ethical Stones
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        {item.inStock && (
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              isInCart
                ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default JewelryCard;