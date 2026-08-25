import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import CustomerPortalScreen from './src/screens/CustomerPortalScreen';
import EmployeePortalScreen from './src/screens/EmployeePortalScreen';
import AdminPortalScreen from './src/screens/AdminPortalScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('Home');

  useEffect(() => {
    AsyncStorage.getItem('lumiere_user').then((userStr) => {
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {}
      }
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('lumiere_token');
    await AsyncStorage.removeItem('lumiere_user');
    setCurrentUser(null);
    setCurrentTab('Home');
  };

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen navigation={{ navigate: (screen) => setCurrentTab(screen) }} />;
      case 'Portfolio':
        return <PortfolioScreen />;
      case 'Portal':
        if (!currentUser) {
          return <LoginScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
        }
        if (currentUser.role === 'customer') {
          return <CustomerPortalScreen navigation={{ navigate: (screen) => setCurrentTab(screen) }} />;
        }
        if (currentUser.role === 'employee') {
          return <EmployeePortalScreen />;
        }
        if (currentUser.role === 'admin' || currentUser.role === 'superadmin') {
          return <AdminPortalScreen />;
        }
        return <CustomerPortalScreen />;
      default:
        return <HomeScreen navigation={{ navigate: (screen) => setCurrentTab(screen) }} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Mobile Bar */}
      <View style={styles.topBar}>
        <Text style={styles.brandTitle}>LUMIÈRE STUDIOS</Text>
        {currentUser ? (
          <TouchableOpacity onPress={handleLogout} style={styles.userBadge}>
            <Text style={styles.userRoleText}>{currentUser.role.toUpperCase()}</Text>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setCurrentTab('Portal')} style={styles.loginBadge}>
            <Text style={styles.loginBadgeText}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Screen Content */}
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>

      {/* Bottom Luxury Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentTab('Home')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Home' && styles.tabLabelActive]}>
            SHOWCASE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentTab('Portfolio')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Portfolio' && styles.tabLabelActive]}>
            ARCHIVE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentTab('Portal')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Portal' && styles.tabLabelActive]}>
            {currentUser ? 'MY CONCIERGE' : 'CLIENT SIGN IN'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0B0B0B',
  },
  brandTitle: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 2,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userRoleText: {
    color: '#D4AF37',
    fontSize: 9,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(212,175,55,0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  logoutText: {
    color: '#8E8E93',
    fontSize: 10,
    fontWeight: 'bold',
  },
  loginBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loginBadgeText: {
    color: '#0B0B0B',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.25)',
    paddingVertical: 14,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#8E8E93',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tabLabelActive: {
    color: '#D4AF37',
  },
});
