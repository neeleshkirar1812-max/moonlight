import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import mobileApi from '../api/client';

const { width, height } = Dimensions.get('window');

const categories = ['ALL', 'wedding', 'pre-wedding', 'destination-wedding', 'films'];

const PortfolioScreen = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    mobileApi.get('/portfolio')
      .then((res) => setItems(res.data || []))
      .catch(() => {});
  }, []);

  const filtered = items.filter((i) =>
    activeCategory === 'ALL' ? true : i.category === activeCategory
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>VISUAL ARCHIVE</Text>
        <Text style={styles.title}>Editorial Portfolio</Text>
      </View>

      {/* Categories Bar */}
      <View style={styles.categoryBar}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(c) => c}
          renderItem={({ item: cat }) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.catButton,
                activeCategory === cat && styles.catButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.catText,
                  activeCategory === cat && styles.catTextActive,
                ]}
              >
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Image Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => setSelectedImage(item)}
          >
            <Image source={{ uri: item.coverImage }} style={styles.gridImage} />
            <View style={styles.gridOverlay}>
              <Text style={styles.gridTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.gridSub}>{item.location?.city}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.closeText}>✕ CLOSE</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage.coverImage }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>{selectedImage.title}</Text>
              <Text style={styles.modalDesc}>{selectedImage.description}</Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
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
  categoryBar: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  catButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#141414',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  catButtonActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  catText: {
    color: '#8E8E93',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  catTextActive: {
    color: '#0B0B0B',
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  gridCard: {
    flex: 1,
    margin: 4,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1F1F1F',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  gridTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  gridSub: {
    color: '#D4AF37',
    fontSize: 10,
    marginTop: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  closeText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  modalImage: {
    width: width * 0.95,
    height: height * 0.65,
  },
  modalInfo: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 24,
    width: '100%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  modalDesc: {
    color: '#C0C0C0',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
});

export default PortfolioScreen;
