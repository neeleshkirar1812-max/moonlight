import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import mobileApi from '../api/client';

const AdminPortalScreen = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    mobileApi.get('/admin/dashboard')
      .then((res) => setDashboard(res.data))
      .catch(() => {});
  }, []);

  const kpis = dashboard?.kpis || {};
  const recentEnquiries = dashboard?.recentEnquiries || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.badge}>EXECUTIVE APP</Text>
        <Text style={styles.title}>Admin Operations</Text>
      </View>

      {/* KPI Grid */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Revenue</Text>
          <Text style={styles.kpiValue}>₹{Math.round((kpis.totalRevenue || 0) / 1000)}k</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Bookings</Text>
          <Text style={styles.kpiValue}>{kpis.totalBookings || 0}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Enquiries</Text>
          <Text style={styles.kpiValue}>{kpis.totalEnquiries || 0}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Clients</Text>
          <Text style={styles.kpiValue}>{kpis.totalCustomers || 0}</Text>
        </View>
      </View>

      {/* Recent Enquiries */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pipeline Enquiries</Text>
        {recentEnquiries.map((enq) => (
          <View key={enq._id} style={styles.enqCard}>
            <View style={styles.enqHeader}>
              <Text style={styles.enqId}>{enq.enquiryId}</Text>
              <Text style={styles.enqStatus}>{enq.status}</Text>
            </View>
            <Text style={styles.enqClient}>{enq.customerDetails?.fullName}</Text>
            <Text style={styles.enqDetails}>{enq.eventType} • {enq.location?.city}</Text>
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  kpiCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#141414',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  kpiLabel: {
    color: '#8E8E93',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  kpiValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginTop: 4,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 14,
  },
  enqCard: {
    backgroundColor: '#141414',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  enqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  enqId: {
    color: '#D4AF37',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  enqStatus: {
    color: '#F5E6BE',
    fontSize: 9,
    fontFamily: 'monospace',
  },
  enqClient: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  enqDetails: {
    color: '#8E8E93',
    fontSize: 11,
    marginTop: 2,
  },
});

export default AdminPortalScreen;
