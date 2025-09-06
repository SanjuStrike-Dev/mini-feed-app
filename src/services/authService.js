
const API_BASE_URL = 'https://mini-feed-app-backend-production.up.railway.app';

class AuthService {
  async makeRequest(url, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  async register(mobile, name) {
    try {
      const response = await this.makeRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ mobile, name }),
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  async loginWithOTP(mobile, otp) {
    try {
      const response = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ mobile, otp }),
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isAuthenticated', 'true');

      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    return true;
  }

  getStoredAuth() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (user && token && isAuthenticated) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      };
    }
    
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }
}

export const authService = new AuthService();
