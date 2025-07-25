import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const FarmerForm = () => {
  const { sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [showOTP, setShowOTP] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    state: '',
    district: '',
    village: '',
    farmSize: '',
    farmingType: [],
    cropsGrown: [],
    soilType: '',
    purposeOfVisit: '',
    otherPurpose: '',
    cropIssues: '',
    communicationMode: 'phone',
    consent: false
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 
    'Gujarat', 'Rajasthan', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 
    'West Bengal', 'Odisha', 'Kerala', 'Madhya Pradesh', 'Chhattisgarh'
  ];

  const crops = [
    'Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 'Soybean', 'Groundnut',
    'Tomato', 'Onion', 'Potato', 'Chilli', 'Brinjal', 'Okra', 'Cabbage',
    'Cauliflower', 'Beans', 'Peas', 'Carrot', 'Beetroot', 'Spinach'
  ];

  const purposes = [
    'To buy products for my farm',
    'To understand recommended products for my crop',
    'To get consultation for crop issues',
    'To learn about organic farming methods',
    'To become a distributor or partner',
    'To attend training/workshop',
    'Just exploring options',
    'Other (please specify)'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && (name === 'farmingType' || name === 'cropsGrown')) {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    
    if (error) setError('');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const sendOTP = async () => {
    if (!formData.mobile || formData.mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await sendPhoneOTP(formData.mobile);
      setShowOTP(true);
      setOtpTimer(300); // 5 minutes
      
      const timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await verifyPhoneOTP(formData.mobile, otpString);
      if (result.verified) {
        setShowOTP(false);
        setStep(2);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setError('Please agree to our terms to continue');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await api.saveFarmerInquiry(formData);
      setStep(3); // Success step
    } catch (error) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#2f3a29] mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your inquiry has been submitted successfully. Our agricultural expert will contact you within 24 hours to provide personalized recommendations for your farm.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <img 
              src="/src/assets/Bio Lia Full & Individual Logo - Mineral Light Colour-03.png" 
              alt="Biolia Brand Mark" 
              className="h-18 w-auto drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-serif text-[#2f3a29] mb-4">
            Get Expert Farm Consultation
          </h1>
          <p className="text-xl text-[#2f3a29] max-w-2xl mx-auto">
            Share your farm details and get personalized organic solutions for higher yields
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? 'bg-[#a4be88] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className={`ml-2 font-semibold ${
                step >= 1 ? 'text-[#a4be88]' : 'text-gray-600'
              }`}>
                Contact Details
              </span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300" />
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? 'bg-[#a4be88] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className={`ml-2 font-semibold ${
                step >= 2 ? 'text-[#a4be88]' : 'text-gray-600'
              }`}>
                Farm Details
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Step 1: Contact Details */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                    />
                    <button
                      type="button"
                      onClick={sendOTP}
                      disabled={loading || formData.mobile.length !== 10}
                      className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {showOTP && (
                  <div className="p-6 bg-[#f4f1ee] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#2f3a29] mb-4">
                      Enter OTP sent to {formData.mobile}
                    </h3>
                    <div className="flex justify-center space-x-2 mb-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#a4be88] focus:outline-none transition-colors"
                          maxLength={1}
                        />
                      ))}
                    </div>
                    <div className="text-center mb-4">
                      <p className="text-gray-600 text-sm mb-2">
                        Time remaining: <span className="font-semibold">{formatTime(otpTimer)}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={loading || otp.join('').length !== 6}
                      className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    WhatsApp Number (if different)
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                    placeholder="WhatsApp number"
                    maxLength={10}
                  />
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Email ID (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#2f3a29] font-semibold mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white"
                      required
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#2f3a29] font-semibold mb-2">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                      placeholder="Enter district"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Village / Location
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                    placeholder="Enter village or location"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Farm Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-[#2f3a29] mb-6">Farm & Crop Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Farm Size (in acres)
                  </label>
                  <input
                    type="number"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                    placeholder="e.g., 2.5"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-3">
                    Type of Farming (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Organic', 'Natural', 'Traditional', 'Mixed'].map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          name="farmingType"
                          value={type}
                          checked={formData.farmingType.includes(type)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-[#2f3a29]">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-3">
                    Crops Grown (Current/Planned)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {crops.map(crop => (
                      <label key={crop} className="flex items-center">
                        <input
                          type="checkbox"
                          name="cropsGrown"
                          value={crop}
                          checked={formData.cropsGrown.includes(crop)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-[#2f3a29] text-sm">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Soil Type
                  </label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white"
                  >
                    <option value="">Select Soil Type</option>
                    <option value="Red">Red Soil</option>
                    <option value="Black">Black Soil</option>
                    <option value="Sandy">Sandy Soil</option>
                    <option value="Loamy">Loamy Soil</option>
                    <option value="Clay">Clay Soil</option>
                    <option value="Mixed">Mixed Soil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Purpose of Visit <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="purposeOfVisit"
                    value={formData.purposeOfVisit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none appearance-none bg-white"
                    required
                  >
                    <option value="">Select Purpose</option>
                    {purposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>

                {formData.purposeOfVisit === 'Other (please specify)' && (
                  <div>
                    <label className="block text-[#2f3a29] font-semibold mb-2">
                      Please specify
                    </label>
                    <input
                      type="text"
                      name="otherPurpose"
                      value={formData.otherPurpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none"
                      placeholder="Please specify your purpose"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-2">
                    Crop Issues / Requirements (Optional)
                  </label>
                  <textarea
                    name="cropIssues"
                    value={formData.cropIssues}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none resize-vertical"
                    placeholder="Describe any specific crop issues, pest problems, or requirements..."
                  />
                </div>

                <div>
                  <label className="block text-[#2f3a29] font-semibold mb-3">
                    Preferred Communication Mode
                  </label>
                  <div className="flex gap-6">
                    {[
                      { value: 'phone', label: 'Phone Call' },
                      { value: 'whatsapp', label: 'WhatsApp' },
                      { value: 'email', label: 'Email' }
                    ].map(mode => (
                      <label key={mode.value} className="flex items-center">
                        <input
                          type="radio"
                          name="communicationMode"
                          value={mode.value}
                          checked={formData.communicationMode === mode.value}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-[#2f3a29]">{mode.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mr-3 mt-1"
                    required
                  />
                  <label className="text-[#2f3a29] text-sm">
                    I agree to be contacted by Bio Lia experts for farm consultation and product recommendations. 
                    I understand that my information will be used to provide personalized agricultural solutions.
                  </label>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerForm;