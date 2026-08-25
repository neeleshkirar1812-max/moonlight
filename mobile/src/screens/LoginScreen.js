import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobileApi from '../api/client';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('aarav.ananya@gmail.com');
  const [password, setPassword] = useState('Customer@2026');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await mobileApi.post('/auth/login', { email, password });
      await AsyncStorage.setItem('lumiere_token', res.data.token);
      await AsyncStorage.setItem('lumiere_user', JSON.stringify(res.data.user));
      onLoginSuccess(res.data.user);
    } catch (err) {
      Alert.alert('Sign In Failed', err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const setRole = (e, p) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>L</Text>
        </View>
        <Text style={styles.title}>Lumière Sign In</Text>
        <Text style={styles.sub}>Client & Production Staff Portal</Text>

        {/* Quick credential buttons */}
        <View style={styles.testRoleBox}>
          <Text style={styles.testHeader}>Quick Demo Logins:</Text>
          <View style={styles.testBtnRow}>
            <TouchableOpacity
              style={styles.testBtn}
              onPress={() => setRole('aarav.ananya@gmail.com', 'Customer@2026')}
            >
              <Text style={styles.testBtnText}>❤️ Couple</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.testBtn}
              onPress={() => setRole('lead.photographer@lumierestudios.com', 'Employee@2026')}
            >
              <Text style={styles.testBtnText}>📸 Crew</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.testBtn}
              onPress={() => setRole('admin@lumierestudios.com', 'Admin@2026')}
            >
              <Text style={styles.testBtnText}>🛡️ Admin</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginBtnText}>
            {loading ? 'AUTHENTICATING...' : 'ENTER CONCIERGE'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#141414',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    alignItems: 'center',
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoLetter: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  sub: {
    color: '#8E8E93',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 16,
  },
  testRoleBox: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    padding: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  testHeader: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  testBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testBtn: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  testBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  loginBtnText: {
    color: '#0B0B0B',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default LoginScreen;
