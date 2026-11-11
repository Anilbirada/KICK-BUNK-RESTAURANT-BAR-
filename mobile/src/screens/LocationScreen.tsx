import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function LocationScreen() {
  const [branches, setBranches] = useState<any[]>([]);

  const defaultOutlets = [
    {
      id: 'b1',
      name: 'Kick Bunk Family Garden Restaurant & Bar',
      code: 'KB-BLR-01',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: 'Hulimangala Main Road, Near Vinayaka Layout / Yarandahalli, Electronic City Phase 1, Jigani Hobli, Bengaluru 560105',
      phone: '+91 99453 21367',
      hours: '11:00 AM – 11:30 PM (All 7 Days)',
      googleMapsUrl: 'https://maps.google.com/?q=Kick+Bunk+Yarandahalli',
    },
    {
      id: 'b2',
      name: 'Kick Bunk Garden Bar & Restaurant',
      code: 'KB-TPT-01',
      city: 'Tirupati',
      state: 'Andhra Pradesh',
      address: 'Door No. 19-1-G/25, Kothapalli, Samavayi Margam, Chinthalachenu, Korramenugunta / Korlagunta, Tirupati 517501',
      phone: '+91 77605 94868',
      hours: '11:30 AM – 11:00 PM (All 7 Days)',
      googleMapsUrl: 'https://maps.google.com/?q=Kick+Bunk+Tirupati',
    },
  ];

  useEffect(() => {
    apiRequest('/branches').then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setBranches(res.data);
      } else {
        setBranches(defaultOutlets);
      }
    });
  }, []);

  const openMap = (url: string) => {
    Linking.openURL(url);
  };

  const dialPhone = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  };

  const outlets = branches.length > 0 ? branches : defaultOutlets;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Our Outlets</Text>
      <Text style={styles.headerSub}>Find nearest Kick Bunk dining location</Text>

      <View style={styles.list}>
        {outlets.map((b) => (
          <View key={b.id} style={styles.outletCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.codeBadge}>{b.code || 'FLAGSHIP'}</Text>
              <Text style={styles.openStatus}>● Open Now</Text>
            </View>

            <Text style={styles.outletName}>{b.name}</Text>
            <Text style={styles.addressText}>📍 {b.address}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>🕒 {b.hours || '11:00 AM – 11:30 PM'}</Text>
              <Text style={styles.metaText}>📞 {b.phone}</Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.mapBtn}
                onPress={() => openMap(b.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(b.name)}`)}
              >
                <Text style={styles.mapBtnText}>Get Directions on Maps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => dialPhone(b.phone)}
              >
                <Text style={styles.callBtnText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  list: {
    gap: 16,
    paddingBottom: 30,
  },
  outletCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  openStatus: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.accentGreen,
  },
  outletName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
  },
  addressText: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
  },
  metaRow: {
    gap: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  metaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  mapBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  mapBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.background,
  },
  callBtn: {
    backgroundColor: colors.surfaceBorder,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textLight,
  },
});
