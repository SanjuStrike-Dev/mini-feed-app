import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { useAuth } from './hooks/useAuth';
import { setUser } from './store/slices/authSlice';
import { authService } from './services/authService';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import Layout from './components/Layout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/home" replace />;
};

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = authService.getStoredAuth();
    if (storedAuth.isAuthenticated && storedAuth.user) {
      dispatch(setUser(storedAuth.user));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-post" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AddPostPage />
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;