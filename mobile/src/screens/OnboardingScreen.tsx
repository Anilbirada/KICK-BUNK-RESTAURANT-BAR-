import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export default function OnboardingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80' }}
        style={styles.heroImage}
      />
      <View style={styles.contentCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>OFFICIAL MOBILE APP</Text>
        </View>

        <Text style={styles.headline}>
          Good Food.{'\n'}
          <Text style={{ color: colors.primary }}>Great Moments.</Text>
        </Text>

        <Text style={styles.subtext}>
          Discover live charcoal tandoori grills, fragrant royal dum biryanis, and reserve secluded garden cabanas at Kick Bunk Bengaluru and Tirupati.
        </Text>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.replace('MainTabs')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Explore Kick Bunk</Text>
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
    height: '52%',
  },
  contentCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -30,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
    lineHeight: 38,
    marginTop: 12,
  },
  subtext: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 8,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
