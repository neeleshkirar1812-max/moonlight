import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import mobileApi from '../api/client';

const CustomerPortalScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [pinInput, setPinInput] = useState('');
  const [unlockedGallery, setUnlockedGallery] = useState(null);

  useEffect(() => {
    mobileApi.get('/bookings')
      .then((res) => setBookings(res.data || []))
      .catch(() => {});

    mobileApi.get('/galleries')
      .then((res) => setGalleries(res.data || []))
      .catch(() => {});
  }, []);

  const handleUnlockGallery = async (galleryId) => {
    try {
      const res = await mobileApi.get(`/galleries/${galleryId}?pin=${pinInput || '2026'}`);
      setUnlockedGallery(res.data);
      Alert.alert('Unlocked', 'Private high-resolution client archive unlocked.');
    } catch (err) {
      Alert.alert('Access Error', err.response?.data?.message || 'Incorrect PIN');
    }
  };

  const activeBooking = bookings[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>CLIENT CONCIERGE</Text>
        <Text style={styles.title}>My Wedding Sanctuary</Text>
      </View>

      {/* Active Booking Card */}
      {activeBooking && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.refText}>REF: {activeBooking.bookingNumber}</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{activeBooking.bookingStatus}</Text>
            </View>
          </View>

          <Text style={styles.eventTitle}>{activeBooking.eventType}</Text>
          <Text style={styles.eventSub}>
            {new Date(activeBooking.eventDate).toLocaleDateString()} • {activeBooking.location?.city}
          </Text>

          <View style={styles.financialRow}>
            <View>
              <Text style={styles.finLabel}>Total Package</Text>
              <Text style={styles.finVal}>₹{activeBooking.totalAmount?.toLocaleString('en-IN')}</Text>
            </View>
            <View>
              <Text style={styles.finLabel}>Paid Advance</Text>
              <Text style={[styles.finVal, { color: '#34D399' }]}>₹{activeBooking.advanceAmount?.toLocaleString('en-IN')}</Text>
            </View>
            <View>
              <Text style={styles.finLabel}>Remaining</Text>
              <Text style={[styles.finVal, { color: '#D4AF37' }]}>₹{activeBooking.remainingAmount?.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Private Albums */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Private Client Galleries</Text>

        {galleries.map((gal) => (
          <View key={gal._id} style={styles.galleryCard}>
            <Image source={{ uri: gal.coverImage }} style={styles.galThumb} />
            <View style={styles.galContent}>
              <Text style={styles.galTitle}>{gal.title}</Text>
              <Text style={styles.galPhotos}>{gal.totalPhotos || 0} Master Photos</Text>

              <View style={styles.pinRow}>
                <TextInput
                  style={styles.pinInput}
                  placeholder="PIN (2026)"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={pinInput}
                  onChangeText={setPinInput}
                />
                <TouchableOpacity
                  style={styles.unlockButton}
                  onPress={() => handleUnlockGallery(gal._id)}
                >
                  <Text style={styles.unlockText}>UNLOCK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 16,
  },
  header: {
    paddingTop: 16,
    marginBottom: 20,
  },
  badge: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#141414',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  refText: {
    color: '#D4AF37',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  statusPill: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  statusText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  eventSub: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 14,
  },
  finLabel: {
    color: '#8E8E93',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  finVal: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginTop: 2,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 16,
  },
  galleryCard: {
    backgroundColor: '#141414',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  galThumb: {
    width: '100%',
    height: 160,
  },
  galContent: {
    padding: 16,
  },
  galTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  galPhotos: {
    color: '#8E8E93',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 12,
  },
  pinRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pinInput: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#FFFFFF',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  unlockButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: 'center',
  },
  unlockText: {
    color: '#0B0B0B',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default CustomerPortalScreen;
