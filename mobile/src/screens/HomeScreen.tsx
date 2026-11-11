import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Linking,
} from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function HomeScreen({ navigation }: any) {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const res = await apiRequest('/menu/items?isBestSeller=true');
    if (res.success && res.data) {
      setBestsellers(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {/* Top Brand Bar */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>KB</Text>
          </View>
          <View>
            <Text style={styles.brandName}>KICK BUNK 360</Text>
            <Text style={styles.outletTag}>Bengaluru Flagship (Electronic City)</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bellButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Google Rating Hero Badge */}
      <View style={styles.ratingHero}>
        <View style={styles.ratingLeft}>
          <Text style={styles.ratingScore}>4.1 ★</Text>
          <Text style={styles.ratingLabel}>Google Maps Rating</Text>
          <Text style={styles.reviewCount}>1,800+ Verified Customer Reviews</Text>
        </View>
        <TouchableOpacity
          style={styles.reviewCta}
          onPress={() => navigation.navigate('Reviews')}
        >
          <Text style={styles.reviewCtaText}>View Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Promo Offer Banner */}
      <View style={styles.promoBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.promoTitle}>WELCOME100 PROMO</Text>
          <Text style={styles.promoSub}>Get flat ₹100 off on dining or takeaway above ₹500.</Text>
        </View>
        <TouchableOpacity
          style={styles.promoButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.promoBtnText}>Order</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access Action Grid */}
      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.actionIcon}>🍽️</Text>
          <Text style={styles.actionLabel}>Digital Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.actionIcon}>📍</Text>
          <Text style={styles.actionLabel}>Our Outlets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Text style={styles.actionIcon}>🖼️</Text>
          <Text style={styles.actionLabel}>Photo Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Linking.openURL('https://wa.me/919945321367?text=Hello%20Kick%20Bunk')}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionLabel}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Signature Dishes Carousel / Section */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionCategory}>CHEF'S SIGNATURES</Text>
          <Text style={styles.sectionTitle}>Popular Dishes</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.seeAll}>See Menu →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dishesList}>
        {bestsellers.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.dishCard}
            onPress={() => navigation.navigate('ProductDetail', { item })}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80' }}
              style={styles.dishImage}
            />
            <View style={styles.dishInfo}>
              <View style={styles.dishHeader}>
                <Text style={styles.vegTag}>{item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}</Text>
                <Text style={styles.dishPrice}>₹{item.basePrice}</Text>
              </View>
              <Text style={styles.dishName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.dishDesc} numberOfLines={2}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.background,
    fontFamily: 'serif',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  outletTag: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  ratingHero: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 16,
  },
  ratingLeft: {
    flex: 1,
  },
  ratingScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 2,
  },
  reviewCount: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  reviewCta: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  reviewCtaText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.background,
  },
  promoBanner: {
    backgroundColor: '#1E2C22',
    borderWidth: 1,
    borderColor: 'rgba(46, 111, 64, 0.4)',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  promoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  promoSub: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  promoButton: {
    backgroundColor: colors.accentGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  promoBtnText: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: 'bold',
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '23%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  sectionCategory: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  seeAll: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  dishesList: {
    gap: 14,
    paddingBottom: 30,
  },
  dishCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  dishImage: {
    width: '100%',
    height: 160,
  },
  dishInfo: {
    padding: 14,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vegTag: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'serif',
  },
  dishName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  dishDesc: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 16,
  },
});
