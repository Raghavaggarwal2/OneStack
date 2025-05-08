import { createContext, useState, useContext, useEffect } from 'react';
import { AUTH_ENDPOINTS } from '../constants/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Login error:', data);
        throw new Error(data.message || 'Failed to login');
      }
      
      console.log('Login successful');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      console.log('Attempting registration with:', { ...userData, password: '********' });
      
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log('Registered');
      
      if (!response.ok) {
        console.error('Registration error response:', data);
        if (data.errors && Array.isArray(data.errors)) {
          return { success: false, errors: data.errors };
        }
        throw new Error(data.message || 'Registration failed');
      }
      
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Call the logout API endpoint
      await fetch(AUTH_ENDPOINTS.LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
        }
      });
      
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all localStorage data
      Object.keys(localStorage).forEach(key => {
        // Clear domain progress and user data
        if (key.startsWith('domain_') || key === 'user') {
          localStorage.removeItem(key);
        }
      });
      setUser(null);
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      if (!user || !user.token) {
        throw new Error('User not authenticated');
      }
      
      // Make API call to update user profile
      const response = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Profile update error:', errorData, 'Status:', response.status);
        throw new Error(errorData.message || `Failed to update profile: ${response.status}`);
      }
      
      // After successful update, fetch the latest user data
      const userResponse = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!userResponse.ok) {
        console.error('Failed to fetch updated profile');
        throw new Error('Failed to fetch updated profile');
      }
      
      const latestUserData = await userResponse.json();
      console.log(latestUserData)
      // Update user in state and localStorage with complete user data
      const updatedUser = { ...latestUserData, token: user.token };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;