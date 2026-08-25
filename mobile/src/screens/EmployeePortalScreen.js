import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import mobileApi from '../api/client';

const EmployeePortalScreen = () => {
  const [assignedBookings, setAssignedBookings] = useState([]);

  useEffect(() => {
    mobileApi.get('/bookings')
      .then((res) => setAssignedBookings(res.data || []))
      .catch(() => {});
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.badge}>CREW PORTAL</Text>
        <Text style={styles.title}>Assigned Shoots</Text>
      </View>

      {assignedBookings.map((bkg) => (
        <View key={bkg._id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.refText}>#{bkg.bookingNumber}</Text>
            <Text style={styles.dateText}>{new Date(bkg.eventDate).toLocaleDateString()}</Text>
          </View>

          <Text style={styles.eventTitle}>{bkg.eventType}</Text>
          <Text style={styles.locationText}>{bkg.location?.venue}, {bkg.location?.city}</Text>
          <Text style={styles.clientText}>Client: {bkg.customer?.name} ({bkg.customer?.phone})</Text>

          {bkg.scheduleTimeline?.length > 0 && (
            <View style={styles.timelineBox}>
              <Text style={styles.timelineTitle}>Shot Itinerary</Text>
              {bkg.scheduleTimeline.slice(0, 3).map((item, idx) => (
                <View key={idx} style={styles.timelineRow}>
                  <Text style={styles.timeLabel}>{item.time}</Text>
                  <Text style={styles.timeEvent}>{item.event}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
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
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  refText: {
    color: '#D4AF37',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#8E8E93',
    fontSize: 11,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  locationText: {
    color: '#C0C0C0',
    fontSize: 12,
    marginTop: 2,
  },
  clientText: {
    color: '#8E8E93',
    fontSize: 11,
    marginTop: 4,
  },
  timelineBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  timelineTitle: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timeLabel: {
    color: '#D4AF37',
    fontSize: 11,
    fontFamily: 'monospace',
    width: 70,
  },
  timeEvent: {
    color: '#FFFFFF',
    fontSize: 11,
    flex: 1,
  },
});

export default EmployeePortalScreen;
