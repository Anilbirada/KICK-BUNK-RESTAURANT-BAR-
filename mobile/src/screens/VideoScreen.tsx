import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { colors } from '../theme/colors';

export default function VideoScreen() {
  const videos = [
    {
      id: 'v1',
      title: 'Drone Tour: Bengaluru Garden Dining & Cabanas',
      duration: '01:45',
      thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'Aerial walkthrough of our landscaped garden dining zones and private cabanas in Electronic City.',
    },
    {
      id: 'v2',
      title: 'Live Tandoor: The Art of Charcoal Kalmi Kebab',
      duration: '02:10',
      thumbnail: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      description: 'Watch Chef Rakesh roast our signature tandoori drumsticks to smoky perfection in clay ovens.',
    },
    {
      id: 'v3',
      title: 'Tirupati Outlet Garden Bar & Asian Delicacies',
      duration: '01:20',
      thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      description: 'A glimpse of our open-air garden hospitality in Korramenugunta, Tirupati.',
    },
  ];

  const handlePlay = (title: string) => {
    Linking.openURL('https://www.youtube.com/results?search_query=Kick+Bunk+Restaurant+Bangalore');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Video Highlights</Text>
      <Text style={styles.headerSub}>Cinematic tours, live tandoor kitchen reels, and ambience</Text>

      <View style={styles.videoList}>
        {videos.map((vid) => (
          <View key={vid.id} style={styles.videoCard}>
            <View style={styles.thumbWrapper}>
              <Image source={{ uri: vid.thumbnail }} style={styles.thumbnail} />
              <TouchableOpacity style={styles.playButton} onPress={() => handlePlay(vid.title)}>
                <Text style={{ fontSize: 24, marginLeft: 4 }}>▶</Text>
              </TouchableOpacity>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{vid.duration}</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.videoTitle}>{vid.title}</Text>
              <Text style={styles.videoDesc}>{vid.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
    marginBottom: 16,
  },
  videoList: {
    gap: 16,
    paddingBottom: 30,
  },
  videoCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  thumbWrapper: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 14,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  videoDesc: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
});
