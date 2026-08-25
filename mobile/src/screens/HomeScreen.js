import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import mobileApi from '../api/client';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    mobileApi.get('/portfolio?isFeatured=true')
      .then((res) => setFeatured(res.data?.slice(0, 4) || []))
      .catch(() => {});
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Hero Banner */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>HAUTE COUTURE WEDDING MEDIA</Text>
          <Text style={styles.heroTitle}>Lumière Studios</Text>
          <Text style={styles.heroSubtitle}>Immortalizing Royal Love Across Palaces & Continents</Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Portfolio')}
          >
            <Text style={styles.ctaText}>EXPLORE ARCHIVE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Counter */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Weddings / Year</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Countries Covered</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Mastery</Text>
        </View>
      </View>

      {/* Featured Masterworks */}
      <View style={styles.section}>
        <Text style={styles.sectionBadge}>CURATED MASTERPIECES</Text>
        <Text style={styles.sectionTitle}>Featured Royal Archives</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
          {featured.map((item, idx) => (
            <TouchableOpacity
              key={item._id || idx}
              style={styles.card}
              onPress={() => navigation.navigate('Portfolio')}
            >
              <Image source={{ uri: item.coverImage }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardCategory}>{item.category?.toUpperCase()}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>{item.location?.city}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Experience Statement */}
      <View style={styles.statementBox}>
        <Text style={styles.statementTitle}>The Lumière Standard</Text>
        <Text style={styles.statementText}>
          We don't merely document celebrations; we compose generational fine-art heirlooms filmed on ARRI and RED cinema systems.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  hero: {
    height: 480,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  heroContent: {
    padding: 24,
    paddingBottom: 40,
  },
  heroBadge: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: '#F5E6BE',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#0B0B0B',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  statLabel: {
    color: '#8E8E93',
    fontSize: 10,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  section: {
    marginTop: 36,
    paddingHorizontal: 16,
  },
  sectionBadge: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginTop: 4,
    marginBottom: 16,
  },
  cardScroll: {
    marginHorizontal: -16,
    paddingLeft: 16,
  },
  card: {
    width: width * 0.75,
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardCategory: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginTop: 2,
  },
  cardLocation: {
    color: '#C0C0C0',
    fontSize: 11,
    marginTop: 2,
  },
  statementBox: {
    margin: 16,
    marginTop: 36,
    marginBottom: 48,
    padding: 24,
    backgroundColor: '#141414',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  statementTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  statementText: {
    color: '#C0C0C0',
    fontSize: 12,
    lineHeight: 20,
  },
});

export default HomeScreen;
