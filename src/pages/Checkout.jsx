import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LocationSearch from '../components/LocationSearch';
import OTPVerification from '../components/OTPVerification';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user, sendOTP, verifyOTP } = useAuth();
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
    coordinates: { lat: null, lng: null },
    city: '',
    state: '',
    pincode: '',
    
    // Billing Address
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
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
  const [showOTP, setShowOTP] = useState(false);
  const [otpType, setOtpType] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [verificationStatus, setVerificationStatus] = useState({
    email: user?.emailVerified || false,
    phone: user?.phoneVerified || false,
  });

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
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
      
      if (!formData.sameAsShipping) {
        if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
        if (!formData.billingCity) newErrors.billingCity = 'Billing city is required';
        if (!formData.billingState) newErrors.billingState = 'Billing state is required';
        if (!formData.billingPincode) newErrors.billingPincode = 'Billing pincode is required';
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

  const handleVerification = async (type) => {
    const value = type === 'email' ? formData.email : formData.phone;
    setOtpType(type);
    setOtpValue(value);
    
    try {
      await sendOTP(type, value);
      setShowOTP(true);
    } catch (error) {
      setErrors({ [type]: error.message });
    }
  };

  const handleOTPVerify = async (otp) => {
    try {
      await verifyOTP(otpType, otpValue, otp);
      setVerificationStatus(prev => ({ ...prev, [otpType]: true }));
      setShowOTP(false);
      setOtpType('');
      setOtpValue('');
    } catch (error) {
      throw error;
    }
  };

  const handleOTPResend = async () => {
    await sendOTP(otpType, otpValue);
  };

  const handleOTPCancel = () => {
    setShowOTP(false);
    setOtpType('');
    setOtpValue('');
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      // Check verification requirements before proceeding to payment
      if (currentStep === 2) {
        if (!verificationStatus.email || !verificationStatus.phone) {
          setErrors({ verification: 'Please verify both email and phone number before proceeding to payment.' });
          return;
        }
      }
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Check final verification
      if (!verificationStatus.email || !verificationStatus.phone) {
        setErrors({ verification: 'Both email and phone must be verified to place order.' });
        return;
      }
      
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
                    <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Shipping Address & Verification</h2>
                    
                    {/* Verification Status */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-3">Verification Required</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-700">Email: {formData.email}</span>
                          {verificationStatus.email ? (
                            <span className="text-green-600 font-semibold flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleVerification('email')}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
                            >
                              Verify Email
                            </button>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-700">Phone: {formData.phone}</span>
                          {verificationStatus.phone ? (
                            <span className="text-green-600 font-semibold flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleVerification('phone')}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
                            >
                              Verify Phone
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-[#2f3a29] font-semibold mb-2">Address *</label>
                        <LocationSearch onLocationSelect={handleLocationSelect} />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-[#2f3a29] font-semibold mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                            placeholder="Enter city"
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-[#2f3a29] font-semibold mb-2">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                            placeholder="Enter state"
                          />
                          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                        <div>
                          <label className="block text-[#2f3a29] font-semibold mb-2">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                            placeholder="Enter pincode"
                          />
                          {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
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
                            <div>
                              <label className="block text-[#2f3a29] font-semibold mb-2">Billing Address *</label>
                              <input
                                type="text"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                                placeholder="Enter billing address"
                              />
                              {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-[#2f3a29] font-semibold mb-2">City *</label>
                                <input
                                  type="text"
                                  name="billingCity"
                                  value={formData.billingCity}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${errors.billingCity ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                                  placeholder="Enter city"
                                />
                                {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
                              </div>
                              <div>
                                <label className="block text-[#2f3a29] font-semibold mb-2">State *</label>
                                <input
                                  type="text"
                                  name="billingState"
                                  value={formData.billingState}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${errors.billingState ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                                  placeholder="Enter state"
                                />
                                {errors.billingState && <p className="text-red-500 text-sm mt-1">{errors.billingState}</p>}
                              </div>
                              <div>
                                <label className="block text-[#2f3a29] font-semibold mb-2">Pincode *</label>
                                <input
                                  type="text"
                                  name="billingPincode"
                                  value={formData.billingPincode}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${errors.billingPincode ? 'border-red-500' : 'border-gray-300'} focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                                  placeholder="Enter pincode"
                                />
                                {errors.billingPincode && <p className="text-red-500 text-sm mt-1">{errors.billingPincode}</p>}
                              </div>
                            </div>
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

      {/* OTP Verification Modal */}
      {showOTP && (
        <OTPVerification
          type={otpType}
          value={otpValue}
          onVerify={handleOTPVerify}
          onResend={handleOTPResend}
          onCancel={handleOTPCancel}
        />
      )}
    </div>
  );
};

export default Checkout;