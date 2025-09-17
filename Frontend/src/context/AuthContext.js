import React, { createContext, useContext, useEffect, useState } from 'react';
import { adminAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a token in localStorage on initial load
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify the token and get admin profile
      getAdminProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const getAdminProfile = async () => {
    try {
      const profile = await adminAPI.getAdminProfile();
      setAdmin(profile);
    } catch (error) {
      // If token is invalid, remove it
      localStorage.removeItem('adminToken');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (adminData) => {
    try {
      const data = await adminAPI.loginAdmin(adminData);
      localStorage.setItem('adminToken', data.token);
      setAdmin(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};