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
    
    const limitedValue = numericValue.length > 10 ? numericValue.slice(0, 10) : numericValue;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite_alternate]">
          Mini Feed
        </h1>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-8 relative overflow-hidden group hover:bg-white/90 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-transparent to-pink-500/10 p-[1px]">
            <div className="w-full h-full bg-white/90 rounded-3xl"></div>
          </div>
          <div className="text-center mb-6 relative z-10">
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white relative z-10" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Us!'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isLogin ? 'Sign in to continue sharing' : 'Create your account to get started'}
            </p>
          </div>
          
          <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 ${
                      mobileError 
                        ? 'border-red-400 focus:ring-red-400' 
                        : 'border-gray-200 focus:ring-indigo-400 hover:border-gray-300'
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 hover:border-gray-300"
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
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 ${
                      otpError 
                        ? 'border-red-400 focus:ring-red-400' 
                        : 'border-gray-200 focus:ring-indigo-400 hover:border-gray-300'
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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

          <div className="mt-4 text-center relative z-10">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-300 hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center relative z-10">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
