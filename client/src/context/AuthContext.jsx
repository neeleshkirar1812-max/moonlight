import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lumiere_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('lumiere_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.get('/auth/me');
        setUser(data.user);
        localStorage.setItem('lumiere_user', JSON.stringify(data.user));
      } catch (err) {
        setUser(null);
        localStorage.removeItem('lumiere_token');
        localStorage.removeItem('lumiere_refresh_token');
        localStorage.removeItem('lumiere_user');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('lumiere_token', data.token);
    localStorage.setItem('lumiere_refresh_token', data.refreshToken);
    localStorage.setItem('lumiere_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (userData) => {
    const data = await api.post('/auth/register', userData);
    localStorage.setItem('lumiere_token', data.token);
    localStorage.setItem('lumiere_refresh_token', data.refreshToken);
    localStorage.setItem('lumiere_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('lumiere_token');
    localStorage.removeItem('lumiere_refresh_token');
    localStorage.removeItem('lumiere_user');
    setUser(null);
    window.location.href = '/login';
  };

  const updateUser = (updated) => {
    const newUserData = { ...user, ...updated };
    setUser(newUserData);
    localStorage.setItem('lumiere_user', JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: Boolean(user),
        isCustomer: user?.role === 'customer',
        isEmployee: user?.role === 'employee',
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
        isSuperAdmin: user?.role === 'superadmin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
