import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(false);
  const [preferredBranch, setPreferredBranch] = useState('Bengaluru Flagship');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Settings</Text>
      <Text style={styles.headerSub}>Manage your notification and dining preferences</Text>

      {/* Notifications Group */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingLabel}>Live Order Status Alerts</Text>
            <Text style={styles.settingSub}>Real-time updates when kitchen accepts & prepares food</Text>
          </View>
          <Switch
            value={orderAlerts}
            onValueChange={setOrderAlerts}
            trackColor={{ false: colors.surfaceBorder, true: colors.accentGreen }}
            thumbColor={orderAlerts ? colors.primary : '#FFF'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingLabel}>Special Offers & Weekend Promos</Text>
            <Text style={styles.settingSub}>Exclusive discounts and match night updates</Text>
          </View>
          <Switch
            value={promoAlerts}
            onValueChange={setPromoAlerts}
            trackColor={{ false: colors.surfaceBorder, true: colors.accentGreen }}
            thumbColor={promoAlerts ? colors.primary : '#FFF'}
          />
        </View>
      </View>

      {/* Preferred Outlet Group */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Primary Outlet</Text>
        {['Bengaluru Flagship (Electronic City)', 'Tirupati Outlet (Korramenugunta)'].map((b) => (
          <TouchableOpacity
            key={b}
            style={[styles.outletOption, preferredBranch === b && styles.outletOptionActive]}
            onPress={() => setPreferredBranch(b)}
          >
            <Text style={[styles.outletOptionText, preferredBranch === b && { color: colors.primary, fontWeight: 'bold' }]}>
              {preferredBranch === b ? '◉ ' : '○ '} {b}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* App Version Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Kick Bunk 360 Mobile App</Text>
        <Text style={styles.infoText}>Version 1.0.0 (Production Release)</Text>
        <Text style={styles.infoText}>Designed & Engineered by RSR Technologies</Text>
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
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  settingSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  outletOption: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  outletOptionActive: {
    borderColor: colors.primary,
  },
  outletOptionText: {
    fontSize: 12,
    color: colors.textLight,
  },
  infoCard: {
    alignItems: 'center',
    padding: 20,
    gap: 4,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  infoText: {
    fontSize: 10,
    color: colors.textDim,
  },
});
