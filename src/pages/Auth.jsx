import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OTPVerification from '../components/OTPVerification';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpType, setOtpType] = useState('');
  const [otpValue, setOtpValue] = useState('');

  const { login, register, sendOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (!isLogin && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate(from, { replace: true });
      } else {
        await register(formData);
        // After registration, verify email
        setOtpType('email');
        setOtpValue(formData.email);
        await sendOTP('email', formData.email);
        setShowOTP(true);
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    await verifyOTP(otpType, otpValue, otp);
    
    if (otpType === 'email') {
      // After email verification, verify phone
      setOtpType('phone');
      setOtpValue(formData.phone);
      await sendOTP('phone', formData.phone);
    } else {
      // Both verifications complete
      setShowOTP(false);
      navigate(from, { replace: true });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            <h1 className="text-3xl font-serif text-[#2f3a29] mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your Bio Lia account' : 'Join Bio Lia for sustainable farming'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                isLogin
                  ? 'bg-white text-[#2f3a29] shadow-sm'
                  : 'text-gray-600 hover:text-[#2f3a29]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                !isLogin
                  ? 'bg-white text-[#2f3a29] shadow-sm'
                  : 'text-gray-600 hover:text-[#2f3a29]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2f3a29] text-sm font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-[#2f3a29] text-sm font-semibold mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#2f3a29] text-sm font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[#2f3a29] text-sm font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                  placeholder="9876543210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            )}

            <div>
              <label className="block text-[#2f3a29] text-sm font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[#2f3a29] text-sm font-semibold mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:border-[#a4be88] focus:ring-2 focus:ring-[#a4be88]/20 transition-all duration-300 outline-none`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-4 px-6 rounded-lg transition-all text-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#a4be88] hover:text-[#2f3a29] font-semibold transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
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

export default Auth;