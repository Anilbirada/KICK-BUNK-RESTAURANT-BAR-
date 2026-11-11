import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { colors } from '../theme/colors';

export default function BusinessInfoScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
      />

      <View style={styles.content}>
        <Text style={styles.title}>About Kick Bunk Group</Text>
        <Text style={styles.tagline}>Luxury Casual Dining & Garden Bar</Text>

        <Text style={styles.description}>
          Kick Bunk is a premier garden restaurant and restobar established in Bengaluru (Electronic City / Yarandahalli) and Tirupati. We specialize in authentic charcoal-grilled tandoori kebabs, royal dum handi biryanis, wok-tossed appetizers, and crafted mocktails in lush open-air settings.
        </Text>

        {/* Facilities Grid */}
        <Text style={styles.subHeading}>Key Amenities & Facilities</Text>
        <View style={styles.amenitiesGrid}>
          {[
            { icon: '🌿', label: 'Open-Air Garden Dining' },
            { icon: '🛖', label: 'Private Cabanas & Gazebos' },
            { icon: '🔥', label: 'Charcoal Clay Tandoor' },
            { icon: '📺', label: 'Sports Screenings' },
            { icon: '🍸', label: 'Lounge & Full Bar' },
            { icon: '🚗', label: 'Valet Parking' },
          ].map((item, idx) => (
            <View key={idx} style={styles.amenityItem}>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</Text>
              <Text style={styles.amenityLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Operating Hours */}
        <Text style={styles.subHeading}>Operating Hours</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoRow}>• Monday – Sunday: 11:00 AM – 11:30 PM</Text>
          <Text style={styles.infoRow}>• Live Charcoal Tandoor closes at 11:00 PM</Text>
          <Text style={styles.infoRow}>• Open 365 days a year</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionBtnPrimary}
            onPress={() => navigation.navigate('Location')}
          >
            <Text style={styles.btnTextPrimary}>View Outlets on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtnSecondary}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.btnTextSecondary}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  tagline: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 12,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
    marginTop: 24,
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityItem: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
  },
  amenityLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: 6,
  },
  infoRow: {
    fontSize: 12,
    color: colors.textMuted,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 30,
  },
  actionBtnPrimary: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnTextPrimary: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.background,
  },
  actionBtnSecondary: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnTextSecondary: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
  },
});
