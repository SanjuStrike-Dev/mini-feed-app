import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [otpError, setOtpError] = useState('');
  
  const { login, register, error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Allow only numbers, spaces, +, -, (, )
    const numericValue = value.replace(/[^0-9+\-() ]/g, '');
    
    const limitedValue = numericValue.length > 15 ? numericValue.slice(0, 15) : numericValue;
    setMobile(limitedValue);
    
    const digitCount = limitedValue.replace(/[^0-9]/g, '').length;
    
    if (digitCount > 0 && digitCount < 10) {
      setMobileError('Mobile number must be at least 10 digits');
    } else {
      setMobileError('');
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setOtp(numericValue);
    
    if (numericValue && !/^[0-9]+$/.test(numericValue)) {
      setOtpError('Please enter only numbers');
    } else if (numericValue && numericValue.length !== 6) {
      setOtpError('OTP must be 6 digits');
    } else {
      setOtpError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const digitCount = mobile.replace(/[^0-9]/g, '').length;
    if (!mobile || digitCount < 10) {
      setMobileError('Please enter a valid mobile number (at least 10 digits)');
      return;
    }
    
    if (isLogin && (!otp || otp.length !== 6)) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }
    
    if (!isLogin && (!name || name.trim().length < 2)) {
      toast.error('Please enter a valid name');
      return;
    }
    
    setIsSubmitting(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(mobile, otp);
      } else {
        success = await register(mobile, name);
      }

      if (success) {
        if (isLogin) {
          toast.success('Login successful!');
        } else {
          toast.success('Registration successful! Please login with OTP: 123456');
          setIsLogin(true);
          setShowOtp(true);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMobile('');
    setOtp('');
    setName('');
    setShowOtp(false);
    setMobileError('');
    setOtpError('');
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* App Name - Outside Container */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Mini Feed
        </h1>
      </div>
      
      <div className="max-w-md w-full">
        {/* Modern Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Us!'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {isLogin ? 'Sign in to continue sharing' : 'Create your account to get started'}
            </p>
          </div>
          
          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mobile Number Input */}
            <div className="space-y-2">
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700">
                Mobile Number
              </label>
              <div>
                <div className="relative">
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    value={mobile}
                    onChange={handleMobileChange}
                    maxLength={15}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 ${
                      mobileError 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:ring-indigo-500'
                    }`}
                    placeholder="Enter Mobile Number"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                {mobileError && (
                  <p className="mt-1 text-xs text-red-600">{mobileError}</p>
                )}
              </div>
            </div>

            {/* Name Input (Registration only) */}
            {!isLogin && (
              <div className="space-y-2 mt-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                    placeholder="Enter Name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* OTP Input (Login only) */}
            {isLogin && (
              <div className="space-y-2 mt-4">
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                  OTP Code
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    name="otp"
                    type={showOtp ? 'text' : 'password'}
                    required
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 ${
                      otpError 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:ring-indigo-500'
                    }`}
                    placeholder="Enter 6-digit code"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowOtp(!showOtp)}
                  >
                    {showOtp ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {otpError ? (
                  <p className="mt-1 text-xs text-red-600">{otpError}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    For testing, use OTP: <span className="font-mono font-semibold">123456</span>
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
