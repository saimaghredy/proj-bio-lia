import React, { useState, useEffect } from 'react';

const OTPVerification = ({ type, value, onVerify, onResend, onCancel }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onVerify(otpString);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(300);
    
    try {
      await onResend();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#a4be88] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-[#2f3a29] mb-2">Verify {type === 'email' ? 'Email' : 'Phone'}</h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to<br />
            <span className="font-semibold">{value}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#a4be88] focus:outline-none transition-colors"
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm mb-2">
            Time remaining: <span className="font-semibold">{formatTime(timeLeft)}</span>
          </p>
          {timeLeft > 0 ? (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-[#a4be88] hover:text-[#2f3a29] font-semibold text-sm transition-colors"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-red-600 text-sm">OTP expired. Please request a new one.</p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={loading || otp.join('').length !== 6}
            className="flex-1 bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;