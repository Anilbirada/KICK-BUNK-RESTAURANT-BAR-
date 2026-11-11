import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function MenuScreen({ navigation, route }: any) {
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [catsRes, itemsRes] = await Promise.all([
        apiRequest('/menu/categories'),
        apiRequest('/menu/items'),
      ]);
      if (catsRes.success && catsRes.data) setCategories(catsRes.data);
      if (itemsRes.success && itemsRes.data) setMenuItems(itemsRes.data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesVeg && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search & Veg Filter */}
      <View style={styles.filterBar}>
        <TextInput
          placeholder="Search dishes (e.g. Kalmi Kebab)..."
          placeholderTextColor={colors.textDim}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <TouchableOpacity
          style={[styles.vegBtn, vegOnly && styles.vegBtnActive]}
          onPress={() => setVegOnly(!vegOnly)}
        >
          <Text style={[styles.vegBtnText, vegOnly && { color: colors.accentGreen }]}>
            {vegOnly ? '🟢 Pure Veg' : '⚪ All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <View style={{ height: 44, marginBottom: 12 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'All Dishes' }, ...categories]}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryPill,
                selectedCategory === item.id && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === item.id && styles.categoryPillTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Dishes List */}
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dishRow}
              onPress={() => navigation.navigate('ProductDetail', { item })}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80' }}
                style={styles.dishThumb}
              />
              <View style={styles.dishDetails}>
                <View style={styles.dishTopRow}>
                  <Text style={styles.vegIndicator}>{item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}</Text>
                  <Text style={styles.priceText}>₹{item.basePrice}</Text>
                </View>
                <Text style={styles.dishTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.dishSummary} numberOfLines={2}>{item.description}</Text>
                <View style={styles.badgeRow}>
                  {item.isBestSeller && (
                    <Text style={styles.specialBadge}>CHEF'S SPECIAL</Text>
                  )}
                  <Text style={styles.prepTime}>⏱ {item.prepTimeMin} mins</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  filterBar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.textLight,
    fontSize: 13,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  vegBtn: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    borderRadius: 14,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  vegBtnActive: {
    borderColor: colors.accentGreen,
    backgroundColor: 'rgba(46, 111, 64, 0.2)',
  },
  vegBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  categoryPill: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignSelf: 'center',
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryPillText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: colors.background,
    fontWeight: 'bold',
  },
  dishRow: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  dishThumb: {
    width: 88,
    height: 88,
    borderRadius: 12,
  },
  dishDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dishTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vegIndicator: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'serif',
  },
  dishTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  dishSummary: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  specialBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  prepTime: {
    fontSize: 10,
    color: colors.textDim,
  },
});
