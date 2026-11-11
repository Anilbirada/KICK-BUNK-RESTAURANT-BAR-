import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../theme/colors';

export default function ProductDetailScreen({ route, navigation }: any) {
  const { item } = route.params || {};
  const [selectedVariant, setSelectedVariant] = useState<any>(item?.variants?.[0] || null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  if (!item) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.textLight }}>Dish details not found.</Text>
      </View>
    );
  }

  const basePrice = selectedVariant ? selectedVariant.price : item.basePrice;
  const addonsTotal = (item.addons || [])
    .filter((a: any) => selectedAddons.includes(a.id))
    .reduce((sum: number, a: any) => sum + a.price, 0);
  const totalPrice = basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((aId) => aId !== id) : [...prev, id]
    );
  };

  const handleOrder = () => {
    Alert.alert(
      'Added to Order',
      `"${item.name}" (₹${totalPrice}) added to your active dining cart!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: item.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80' }}
          style={styles.heroImage}
        />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.tagsRow}>
              <Text style={styles.vegTag}>{item.isVeg ? '🟢 PURE VEG' : '🔴 NON-VEG'}</Text>
              {item.isBestSeller && <Text style={styles.specialTag}>★ BESTSELLER</Text>}
            </View>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Text style={{ fontSize: 24 }}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dishTitle}>{item.name}</Text>
          <Text style={styles.dishDesc}>{item.description}</Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Prep Time</Text>
              <Text style={styles.metricValue}>⏱ {item.prepTimeMin} mins</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Spice Level</Text>
              <Text style={styles.metricValue}>🌶️ Level {item.spiceLevel}/4</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Clay Tandoor</Text>
              <Text style={styles.metricValue}>🔥 100% Charcoal</Text>
            </View>
          </View>

          {/* Variants */}
          {item.variants && item.variants.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Select Portion Size</Text>
              <View style={styles.variantsRow}>
                {item.variants.map((v: any) => (
                  <TouchableOpacity
                    key={v.id}
                    style={[
                      styles.variantCard,
                      selectedVariant?.id === v.id && styles.variantCardActive,
                    ]}
                    onPress={() => setSelectedVariant(v)}
                  >
                    <Text style={[styles.variantName, selectedVariant?.id === v.id && { color: colors.primary }]}>
                      {v.name}
                    </Text>
                    <Text style={styles.variantPrice}>₹{v.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Add-ons */}
          {item.addons && item.addons.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Extra Accompaniments</Text>
              {item.addons.map((a: any) => {
                const checked = selectedAddons.includes(a.id);
                return (
                  <TouchableOpacity
                    key={a.id}
                    style={[styles.addonRow, checked && styles.addonRowActive]}
                    onPress={() => toggleAddon(a.id)}
                  >
                    <Text style={styles.addonText}>{checked ? '☑' : '☐'} {a.name}</Text>
                    <Text style={styles.addonPrice}>+₹{a.price}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>₹{totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleOrder}>
          <Text style={styles.addBtnText}>Add to Dining Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  vegTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  specialTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dishTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  dishDesc: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: 6,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginTop: 18,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9,
    color: colors.textDim,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textLight,
    marginTop: 2,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  variantsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  variantCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
  },
  variantCardActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  variantName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  variantPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginTop: 2,
  },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: 8,
  },
  addonRowActive: {
    borderColor: colors.primary,
  },
  addonText: {
    fontSize: 12,
    color: colors.textLight,
  },
  addonPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'serif',
  },
  addBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
  },
  addBtnText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
