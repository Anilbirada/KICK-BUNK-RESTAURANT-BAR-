import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.logoBadge}>
        <Text style={styles.logoText}>KB</Text>
      </View>
      <Text style={styles.brandTitle}>KICK BUNK 360</Text>
      <Text style={styles.brandSubtitle}>LUXURY CASUAL DINING & GARDEN BAR</Text>
      <View style={styles.footerTag}>
        <Text style={styles.footerText}>Bengaluru • Tirupati</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoBadge: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.background,
    fontFamily: 'serif',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textLight,
    letterSpacing: 2,
    fontFamily: 'serif',
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1.5,
  },
  footerTag: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 1,
  },
});
