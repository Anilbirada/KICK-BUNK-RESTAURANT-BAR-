import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function FavoritesScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<any[]>([]);

  // Demo fallback favorite dishes
  const sampleFavorites = [
    {
      id: 'fav-1',
      name: 'Kick Bunk Special Kalmi Kebab (3 Pcs)',
      basePrice: 340,
      isVeg: false,
      prepTimeMin: 20,
      description: 'Slow-roasted chicken drumsticks in charcoal tandoor with cashew marinade.',
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80' }],
    },
    {
      id: 'fav-2',
      name: 'Kick Bunk Royal Dum Chicken Biryani',
      basePrice: 310,
      isVeg: false,
      prepTimeMin: 15,
      description: 'Fragrant basmati rice layered with tender spiced chicken, saffron, and fried onions.',
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80' }],
    },
  ];

  useEffect(() => {
    // Attempt load from customer favorites API
    apiRequest('/menu/items?isBestSeller=true').then((res) => {
      if (res.success && res.data) {
        setFavorites(res.data.slice(0, 3));
      } else {
        setFavorites(sampleFavorites);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Favorite Dishes</Text>
      <Text style={styles.headerSub}>Quick re-order of your beloved Kick Bunk specialties</Text>

      <FlatList
        data={favorites.length > 0 ? favorites : sampleFavorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { item })}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80' }}
              style={styles.dishImage}
            />
            <View style={styles.details}>
              <View style={styles.row}>
                <Text style={styles.veg}>{item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}</Text>
                <Text style={styles.price}>₹{item.basePrice}</Text>
              </View>
              <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.footerRow}>
                <Text style={styles.reorderText}>Tap to Re-Order →</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  veg: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'serif',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  desc: {
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 14,
  },
  footerRow: {
    marginTop: 4,
  },
  reorderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
