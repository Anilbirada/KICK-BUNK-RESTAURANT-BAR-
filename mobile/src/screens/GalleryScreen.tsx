import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function GalleryScreen({ navigation }: any) {
  const [media, setMedia] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const fallbackMedia = [
    { id: '1', title: 'Kalmi Kebab Charcoal Grill', url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80' },
    { id: '2', title: 'Royal Dum Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
    { id: '3', title: 'Open Air Garden Ambience', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { id: '4', title: 'Private Bamboo Cabana', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
    { id: '5', title: 'Crispy Hong Kong Chicken', url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80' },
    { id: '6', title: 'Mocktails & Evening Bar', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  ];

  useEffect(() => {
    apiRequest('/media').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setMedia(res.data);
      } else {
        setMedia(fallbackMedia);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Photo Gallery</Text>
      <Text style={styles.headerSub}>Kick Bunk dining ambiance & charcoal grills</Text>

      <FlatList
        data={media.length > 0 ? media : fallbackMedia}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10, paddingTop: 14 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.photoCard}
            onPress={() => setSelectedPhoto(item)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.url }} style={styles.photo} />
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText} numberOfLines={1}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Modal transparent animationType="fade" visible={!!selectedPhoto}>
          <View style={styles.modalBackdrop}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedPhoto(null)}
            >
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>

            <Image source={{ uri: selectedPhoto.url }} style={styles.modalImage} resizeMode="contain" />

            <View style={styles.modalFooter}>
              <Text style={styles.modalTitle}>{selectedPhoto.title}</Text>
              <Text style={styles.modalTag}>Official Kick Bunk Group Photography</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  headerSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  photoCard: {
    flex: 1,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 6,
  },
  captionText: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalImage: {
    width: '100%',
    height: '70%',
  },
  modalFooter: {
    marginTop: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  modalTag: {
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
  },
});
