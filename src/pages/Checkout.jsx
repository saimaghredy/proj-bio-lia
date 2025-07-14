import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LocationSearch from '../components/LocationSearch';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information (pre-filled from user account)
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    
    // Shipping Address
    address: '',
   fullName: '',
   mobileNumber: '',
   houseDetails: '',
   areaDetails: '',
   landmark: '',
    city: '',
    state: '',
    pincode: '',
   addressType: 'home',
    
    // Billing Address
    billingAddress: '',
    sameAsShipping: true,
    
    // Payment
    paymentMethod: 'cod',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLocationSelect = (locationData) => {
    setFormData(prev => ({
      ...prev,
      address: locationData.formattedAddress,
      coordinates: locationData.location
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
      if (!formData.houseDetails) newErrors.houseDetails = 'House/flat details are required';
      if (!formData.areaDetails) newErrors.areaDetails = 'Area/street details are required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
      
      // Validate mobile number (10 digits)
      if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Mobile number must be 10 digits';
      }
      
      // Validate pincode (6 digits)
      if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be 6 digits';
      }
      
      if (!formData.sameAsShipping) {
        if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
      }
    }
    
    if (step === 3 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Simulate order processing
      setTimeout(() => {
        setOrderPlaced(true);
        clearCart();
      }, 2000);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-[#2f3a29] mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some products before checkout</p>
          <Link
            to="/products"
            className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-8 py-4 rounded-lg transition-all text-lg hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#2f3a29] mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>
          <div className="space-y-3">
            <Link
              to="/products"
              className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all block"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="w-full bg-[#2f3a29] hover:bg-[#3d4a35] text-white font-semibold py-3 px-6 rounded-lg transition-all block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = getCartTotal();
  const taxAmount = Math.round(totalAmount * 0.18);
  const finalAmount = totalAmount + taxAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-[#2f3a29] mb-4">Checkout</h1>
          <p className="text-gray-600">Complete your order in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-[#a4be88] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 font-semibold ${
                  currentStep >= step ? 'text-[#a4be88]' : 'text-gray-600'
                }`}>
                  {step === 1 ? 'Personal Info' : step === 2 ? 'Address & Verification' : 'Payment'}
                </span>
                {step < 3 && <div className="w-16 h-0.5 bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit}>
                {/* Global Errors */}
                {errors.verification && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{errors.verification}</p>
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address Information & Verification */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Shipping Address</h2>

                    <div className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="Enter full name for delivery"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Mobile Number *</label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                      </div>

                      {/* Pincode First (for auto-fill) */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="6-digit pincode"
                          maxLength={6}
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                        <p className="text-sm text-gray-600 mt-1">Enter pincode to auto-fill city and state</p>
                      </div>

                      {/* House/Flat Details */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Flat, House no., Building, Company, Apartment *</label>
                        <input
                          type="text"
                          name="houseDetails"
                          value={formData.houseDetails}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.houseDetails ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="e.g., Flat 201, ABC Apartments"
                        />
                        {errors.houseDetails && <p className="text-red-500 text-sm mt-1">{errors.houseDetails}</p>}
                      </div>

                      {/* Area/Street Details */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Area, Street, Sector, Village *</label>
                        <input
                          type="text"
                          name="areaDetails"
                          value={formData.areaDetails}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.areaDetails ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                          placeholder="e.g., MG Road, Sector 15"
                        />
                        {errors.areaDetails && <p className="text-red-500 text-sm mt-1">{errors.areaDetails}</p>}
                      </div>

                      {/* Landmark (Optional) */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Landmark (Optional)</label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                          placeholder="e.g., Near Metro Station, Opposite Mall"
                        />
                      </div>

                      {/* City and State (Auto-filled from pincode) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#2f3a29] font-semibold mb-2">City/District/Town *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                            placeholder="Enter city/district"
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-[#2f3a29] font-semibold mb-2">State *</label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white`}
                          >
                            <option value="">Select State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                          </select>
                          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                      </div>

                      {/* Address Type */}
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-3">Address Type</label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="addressType"
                              value="home"
                              checked={formData.addressType === 'home'}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <span className="text-[#2f3a29]">🏠 Home</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="addressType"
                              value="work"
                              checked={formData.addressType === 'work'}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <span className="text-[#2f3a29]">🏢 Work</span>
                          </label>
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex items-center mb-4">
                          <input
                            type="checkbox"
                            name="sameAsShipping"
                            checked={formData.sameAsShipping}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label className="text-[#2f3a29] font-semibold">Billing address same as shipping</label>
                        </div>

                        {!formData.sameAsShipping && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#2f3a29]">Billing Address</h3>
                            <p className="text-gray-600 text-sm">Please enter your complete billing address details</p>
                            <textarea
                              name="billingAddress"
                              value={formData.billingAddress}
                              onChange={handleChange}
                              rows={4}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none resize-vertical`}
                              placeholder="Enter complete billing address with pincode"
                            />
                            {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Payment Method</h2>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <label className="text-[#2f3a29] font-semibold">Cash on Delivery</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <label className="text-[#2f3a29] font-semibold">Credit/Debit Card</label>
                        </div>
                      </div>

                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-[#2f3a29] font-semibold mb-2">Cardholder Name *</label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                              placeholder="Enter cardholder name"
                            />
                            {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                          </div>
                          <div>
                            <label className="block text-[#2f3a29] font-semibold mb-2">Card Number *</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                              placeholder="1234 5678 9012 3456"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[#2f3a29] font-semibold mb-2">Expiry Date *</label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                                placeholder="MM/YY"
                              />
                              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                            </div>
                            <div>
                              <label className="block text-[#2f3a29] font-semibold mb-2">CVV *</label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                                placeholder="123"
                              />
                              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                      Previous
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all ml-auto"
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a4be88] to-[#d7e7c4] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="font-semibold">₹{taxAmount.toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-[#2f3a29]">Total</span>
                  <span className="font-bold text-[#2f3a29]">₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Free Shipping
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

export default Checkout;