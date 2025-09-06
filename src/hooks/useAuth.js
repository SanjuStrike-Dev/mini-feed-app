import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginWithOTP, registerUser, logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const login = useCallback(
    async (mobile, otp) => {
      try {
        await dispatch(loginWithOTP({ mobile, otp })).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (mobile, name) => {
      try {
        await dispatch(registerUser({ mobile, name })).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
    clearError: clearAuthError,
  };
};
