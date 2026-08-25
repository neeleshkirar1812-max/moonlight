import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

const demoUsers = {
  'aarav.ananya@gmail.com': {
    _id: 'demo-cust-1',
    name: 'Aarav & Ananya Sharma',
    email: 'aarav.ananya@gmail.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    phone: '+91 92292 29323',
  },
  'admin@moonlightproduction.com': {
    _id: 'demo-admin-1',
    name: 'Moonlight Studio Director',
    email: 'admin@moonlightproduction.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  },
  'admin@lumierestudios.com': {
    _id: 'demo-admin-1',
    name: 'Moonlight Studio Director',
    email: 'admin@lumierestudios.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  },
  'superadmin@moonlightproduction.com': {
    _id: 'demo-super-1',
    name: 'Executive Super Admin',
    email: 'superadmin@moonlightproduction.com',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  },
  'superadmin@lumierestudios.com': {
    _id: 'demo-super-1',
    name: 'Executive Super Admin',
    email: 'superadmin@lumierestudios.com',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  },
  'lead.photographer@moonlightproduction.com': {
    _id: 'demo-emp-1',
    name: 'Rohan Verma (Lead Cinematographer)',
    email: 'lead.photographer@moonlightproduction.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
  },
  'lead.photographer@lumierestudios.com': {
    _id: 'demo-emp-1',
    name: 'Rohan Verma (Lead Cinematographer)',
    email: 'lead.photographer@lumierestudios.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
  },
};

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
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('lumiere_user', JSON.stringify(data.user));
        }
      } catch (err) {
        // If saved user exists in localstorage (offline/demo mode), keep it
        const saved = localStorage.getItem('lumiere_user');
        if (saved) {
          setUser(JSON.parse(saved));
        } else {
          setUser(null);
          localStorage.removeItem('lumiere_token');
          localStorage.removeItem('lumiere_refresh_token');
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('lumiere_token', data.token);
      localStorage.setItem('lumiere_refresh_token', data.refreshToken);
      localStorage.setItem('lumiere_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      // Fallback for Vercel demo mode / offline backend
      const normalizedEmail = email.toLowerCase().trim();
      const matched = demoUsers[normalizedEmail];
      if (matched) {
        const fakeToken = `demo_jwt_${Date.now()}`;
        localStorage.setItem('lumiere_token', fakeToken);
        localStorage.setItem('lumiere_user', JSON.stringify(matched));
        setUser(matched);
        return matched;
      }

      // Default fallback for any custom credentials in demo mode
      const fallbackUser = {
        _id: `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        role: email.includes('admin') ? 'admin' : email.includes('crew') || email.includes('employee') ? 'employee' : 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      };
      localStorage.setItem('lumiere_token', `demo_jwt_${Date.now()}`);
      localStorage.setItem('lumiere_user', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      return fallbackUser;
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.post('/auth/register', userData);
      localStorage.setItem('lumiere_token', data.token);
      localStorage.setItem('lumiere_refresh_token', data.refreshToken);
      localStorage.setItem('lumiere_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      const fallbackUser = {
        _id: `user-${Date.now()}`,
        name: userData.name || 'New Client',
        email: userData.email,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      };
      localStorage.setItem('lumiere_token', `demo_jwt_${Date.now()}`);
      localStorage.setItem('lumiere_user', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      return fallbackUser;
    }
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

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
