import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
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
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.brandTitle}>KICK BUNK</Text>
      <Text style={styles.brandSubtitle}>GARDEN BAR & RESTAURANT</Text>
      <View style={styles.footerTag}>
        <Text style={styles.footerText}>Electronic City, Bengaluru</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoImage: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textLight,
    letterSpacing: 3,
    fontFamily: 'serif',
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
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
