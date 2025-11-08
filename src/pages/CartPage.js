import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrashIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

const CartPage = () => {
  const { state, removeFromCart, updateCartQuantity, addToWishlist, clearCart, setCurrentPage } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% tax
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount for promo
  const total = subtotal + shipping + tax - discount;

  const handleQuantityUpdate = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
    } else {
      updateCartQuantity(cartId, newQuantity);
    }
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.cartId);
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo({
        code: 'WELCOME10',
        discount: 0.1,
        description: '10% off your first order'
      });
    } else {
      alert('Invalid promo code');
    }
    setPromoCode('');
  };

  const handleCheckout = () => {
    setCurrentPage('billing');
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <TruckIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn btn-primary btn-lg"
              >
                Browse Marketplace
              </button>
              <button
                onClick={() => setCurrentPage('categories')}
                className="btn btn-outline btn-lg"
              >
                Shop by Category
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {state.cart.length} {state.cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {state.cart.map((item) => (
                <div key={item.cartId} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=240'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=240';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.materials.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Seller: {item.seller.name}
                          </p>
                          
                          {/* Customizations */}
                          {item.customizations && Object.keys(item.customizations).length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700">Customizations:</p>
                              <div className="text-sm text-gray-600">
                                {Object.entries(item.customizations).map(([key, value]) => (
                                  <span key={key} className="mr-3">
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${item.price.toLocaleString()}
                          </p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-sm text-gray-500 line-through">
                              ${item.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityUpdate(item.cartId, item.quantity - 1)}
                            className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityUpdate(item.cartId, item.quantity + 1)}
                            className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-amber-600"
                          >
                            <HeartIcon className="h-4 w-4" />
                            <span>Save for later</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Promo Code
              </h3>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 form-input"
                />
                <button
                  onClick={handleApplyPromo}
                  className="btn btn-outline px-6"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    <GiftIcon className="h-4 w-4 inline mr-1" />
                    {appliedPromo.code}: {appliedPromo.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {shipping > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Add ${(500 - subtotal).toFixed(2)} more for free shipping
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full btn-lg mb-4"
              >
                <CreditCardIcon className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>

              {/* Security Features */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TruckIcon className="h-4 w-4 text-blue-500" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCardIcon className="h-4 w-4 text-purple-500" />
                  <span>Multiple payment options</span>
                </div>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn btn-outline w-full mt-4"
              >
                Continue Shopping
              </button>
            </div>

            {/* Recently Viewed (if any) */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                You Might Also Like
              </h3>
              <p className="text-sm text-gray-600">
                Based on your current selection
              </p>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn btn-outline w-full mt-4 text-sm"
              >
                View Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;