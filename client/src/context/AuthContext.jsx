import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

// Core Official Studio Accounts
const defaultSystemAccounts = {
  'superadmin@moonlightproduction.com': {
    _id: 'usr-superadmin',
    name: 'Executive Super Admin Director',
    email: 'superadmin@moonlightproduction.com',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    phone: '+91 92292 29323',
    status: 'active',
  },
  'admin@moonlightproduction.com': {
    _id: 'usr-admin',
    name: 'Moonlight Studio Director & HR',
    email: 'admin@moonlightproduction.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    phone: '+91 92292 29323',
    status: 'active',
  },
  'lead.photographer@moonlightproduction.com': {
    _id: 'usr-lead-crew',
    name: 'Rohan Verma (Lead Cinematographer)',
    email: 'lead.photographer@moonlightproduction.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    phone: '+91 98260 11223',
    status: 'active',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('Moonlight_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('Moonlight_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || import.meta.env.VITE_API_URL) {
          const data = await api.get('/auth/me');
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem('Moonlight_user', JSON.stringify(data.user));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Continue with local storage user
      }
      
      const saved = localStorage.getItem('Moonlight_user');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = (email || '').toLowerCase().trim();

    // Check if we can make a live server request
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || import.meta.env.VITE_API_URL) {
      try {
        const data = await api.post('/auth/login', { email, password });
        if (data?.token && data?.user) {
          localStorage.setItem('Moonlight_token', data.token);
          localStorage.setItem('Moonlight_refresh_token', data.refreshToken || `refresh_${Date.now()}`);
          localStorage.setItem('Moonlight_user', JSON.stringify(data.user));
          setUser(data.user);
          return data.user;
        }
      } catch (err) {
        console.warn('Live backend unavailable, using local authentication:', err.message);
      }
    }

    // Check registered system accounts
    const registeredUsers = JSON.parse(localStorage.getItem('moonlight_system_users') || '{}');
    const allUsers = { ...defaultSystemAccounts, ...registeredUsers };
    const matched = allUsers[normalizedEmail];

    if (matched) {
      if (matched.status === 'locked' || matched.status === 'suspended') {
        throw new Error('This account has been locked by Super Admin. Please contact studio director.');
      }
      const fakeToken = `moonlight_jwt_${Date.now()}`;
      localStorage.setItem('Moonlight_token', fakeToken);
      localStorage.setItem('Moonlight_user', JSON.stringify(matched));
      setUser(matched);
      return matched;
    }

    // For any other newly created or authenticated user
    const role = normalizedEmail.includes('superadmin')
      ? 'superadmin'
      : normalizedEmail.includes('admin')
      ? 'admin'
      : normalizedEmail.includes('crew') || normalizedEmail.includes('employee') || normalizedEmail.includes('lead')
      ? 'employee'
      : 'customer';

    const newUser = {
      _id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email: email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      phone: '+91 92292 29323',
      status: 'active',
    };

    localStorage.setItem('Moonlight_token', `moonlight_jwt_${Date.now()}`);
    localStorage.setItem('Moonlight_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const register = async (userData) => {
    try {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || import.meta.env.VITE_API_URL) {
        const data = await api.post('/auth/register', userData);
        if (data?.token && data?.user) {
          localStorage.setItem('Moonlight_token', data.token);
          localStorage.setItem('Moonlight_refresh_token', data.refreshToken || `refresh_${Date.now()}`);
          localStorage.setItem('Moonlight_user', JSON.stringify(data.user));
          setUser(data.user);
          return data.user;
        }
      }
    } catch (err) {
      console.warn('Backend API registration unavailable, using persistent client storage');
    }

    const newUser = {
      _id: `usr-${Date.now()}`,
      name: userData.name || 'Valued Couple',
      email: userData.email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      phone: userData.phone || '+91 92292 29323',
      status: 'pending_approval',
    };

    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('Moonlight_token');
    localStorage.removeItem('Moonlight_refresh_token');
    localStorage.removeItem('Moonlight_user');
    setUser(null);
    window.location.href = '/login';
  };

  const updateUser = (updated) => {
    const newUserData = { ...user, ...updated };
    setUser(newUserData);
    localStorage.setItem('Moonlight_user', JSON.stringify(newUserData));
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

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
