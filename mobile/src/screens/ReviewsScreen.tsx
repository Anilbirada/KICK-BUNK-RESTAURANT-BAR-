import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<any[]>([]);

  const defaultReviews = [
    {
      id: 'r1',
      customerName: 'Pradeep K. (Local Guide)',
      rating: 5,
      comments: 'Awesome ambience for evening hangouts! The garden seating and cabana setup is beautiful. The Kalmi Kebab and Pepper Chicken are top notch.',
      date: 'Google Maps Verified',
    },
    {
      id: 'r2',
      customerName: 'Shalini R. (Verified Diner)',
      rating: 5,
      comments: 'Great place near Electronic City / Jigani to relax with friends. Biryani and tandoori starters are very flavorful. Staff is attentive and courteous.',
      date: 'Google Maps Verified',
    },
    {
      id: 'r3',
      customerName: 'Naveen Verma (Food Enthusiast)',
      rating: 4,
      comments: 'Visited Kick Bunk Tirupati as well as Bengaluru. Loved the consistent taste in kebabs and peaceful garden setting. Highly recommended!',
      date: 'Google Maps Verified',
    },
    {
      id: 'r4',
      customerName: 'Vikramaditya Hegde',
      rating: 5,
      comments: 'Outstanding open-air garden ambience and the Kalmi Kebab is simply the best in Electronic City!',
      date: 'In-App Verified',
    },
  ];

  useEffect(() => {
    apiRequest('/loyalty/feedback').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setReviews([...res.data, ...defaultReviews]);
      } else {
        setReviews(defaultReviews);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Rating Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.starsRow}>
          <Text style={styles.scoreText}>4.1</Text>
          <View>
            <Text style={styles.stars}>★★★★☆</Text>
            <Text style={styles.ratingSub}>1,800+ Google Maps Reviews</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => Linking.openURL('https://maps.google.com/?q=Kick+Bunk+Yarandahalli')}
        >
          <Text style={styles.googleBtnText}>Review on Google Maps</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listHeader}>Guest Testimonials</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item, index) => item.id || String(index)}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.cardTop}>
              <Text style={styles.reviewerName}>{item.customerName}</Text>
              <Text style={styles.cardStars}>{'★'.repeat(item.rating || 5)}</Text>
            </View>
            <Text style={styles.reviewComment}>"{item.comments}"</Text>
            <Text style={styles.reviewSource}>✓ {item.date || 'Verified Review'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'serif',
  },
  stars: {
    fontSize: 16,
    color: colors.primary,
  },
  ratingSub: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  googleBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  googleBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.background,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  cardStars: {
    fontSize: 13,
    color: colors.primary,
  },
  reviewComment: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  reviewSource: {
    fontSize: 9,
    color: colors.accentGreen,
    fontWeight: '700',
    marginTop: 2,
  },
});
