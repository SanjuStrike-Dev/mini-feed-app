import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const usePageTitle = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Home - Mini Feed';
      case '/add-post':
        return 'Add Post - Mini Feed';
      case '/login':
        return 'Login - Mini Feed';
      default:
        return 'Mini Feed';
    }
  };
  
  const pageTitle = getPageTitle();
  
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  
  return pageTitle;
};
