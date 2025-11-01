import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const BillingPage = () => {
  const { state, clearCart, addNotification, setCurrentPage } = useApp();
  const [billingData, setBillingData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    shippingSameAsBilling: true,
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveCard: false
  });

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleBillingChange = (field, value) => {
    setBillingData(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field, value) => {
    setBillingData(prev => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [field]: value }
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate order processing
    const orderId = `SJC-${Date.now()}`;
    
    addNotification({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Your order ${orderId} has been confirmed. You'll receive a confirmation email shortly.`
    });

    clearCart();
    setCurrentPage('home');
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add items to your cart before proceeding to checkout
          </p>
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={billingData.email}
                    onChange={(e) => handleBillingChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    required
                    value={billingData.firstName}
                    onChange={(e) => handleBillingChange('firstName', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    required
                    value={billingData.lastName}
                    onChange={(e) => handleBillingChange('lastName', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={billingData.phone}
                    onChange={(e) => handleBillingChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Billing Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    required
                    value={billingData.address}
                    onChange={(e) => handleBillingChange('address', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    required
                    value={billingData.city}
                    onChange={(e) => handleBillingChange('city', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">State</label>
                  <select
                    required
                    value={billingData.state}
                    onChange={(e) => handleBillingChange('state', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    {/* Add more states as needed */}
                  </select>
                </div>
                <div>
                  <label className="form-label">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={billingData.zipCode}
                    onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Country</label>
                  <select
                    value={billingData.country}
                    onChange={(e) => handleBillingChange('country', e.target.value)}
                    className="form-select"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping Address
                </h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={billingData.shippingSameAsBilling}
                    onChange={(e) => handleBillingChange('shippingSameAsBilling', e.target.checked)}
                    className="mr-2 text-amber-500"
                  />
                  <span className="text-sm text-gray-700">Same as billing address</span>
                </label>
              </div>

              {!billingData.shippingSameAsBilling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      required
                      value={billingData.shippingAddress.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      required
                      value={billingData.shippingAddress.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      required
                      value={billingData.shippingAddress.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      required
                      value={billingData.shippingAddress.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">State</label>
                    <select
                      required
                      value={billingData.shippingAddress.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={billingData.shippingAddress.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Country</label>
                    <select
                      value={billingData.shippingAddress.country}
                      onChange={(e) => handleShippingChange('country', e.target.value)}
                      className="form-select"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    required
                    value={paymentData.cardNumber}
                    onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={paymentData.expiryDate}
                    onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    required
                    value={paymentData.cvv}
                    onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                    placeholder="123"
                    className="form-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Name on Card</label>
                  <input
                    type="text"
                    required
                    value={paymentData.nameOnCard}
                    onChange={(e) => handlePaymentChange('nameOnCard', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={paymentData.saveCard}
                      onChange={(e) => handlePaymentChange('saveCard', e.target.checked)}
                      className="mr-2 text-amber-500"
                    />
                    <span className="text-sm text-gray-700">Save card for future purchases</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {state.cart.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 border-t pt-6">
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
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                  <span>SSL encrypted checkout</span>
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

              {/* Place Order Button */}
              <button
                type="submit"
                className="btn btn-primary w-full btn-lg mb-4"
              >
                <CreditCardIcon className="h-5 w-5 mr-2" />
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingPage;