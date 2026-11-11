import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function ProfileScreen({ navigation }: any) {
  // Demo customer user state
  const customer = {
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    tier: 'GOLD TIER',
    points: 450,
    visits: 6,
    orders: [
      { id: 'KB-BLR-01-0103', date: 'Today', total: 577.50, items: 'Kalmi Kebab, Royal Dum Biryani' },
      { id: 'KB-BLR-01-0098', date: 'Last Week', total: 750.75, items: 'Butter Chicken Masala, Garlic Naan' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RS</Text>
        </View>
        <Text style={styles.userName}>{customer.name}</Text>
        <Text style={styles.userPhone}>{customer.phone}</Text>

        <View style={styles.tierBadge}>
          <Text style={styles.tierText}>★ {customer.tier} MEMBER</Text>
        </View>

        {/* Loyalty Balance Card */}
        <View style={styles.loyaltyCard}>
          <View style={styles.loyaltyMetric}>
            <Text style={styles.loyaltyNumber}>{customer.points}</Text>
            <Text style={styles.loyaltyLabel}>Loyalty Points</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.loyaltyMetric}>
            <Text style={styles.loyaltyNumber}>{customer.visits}</Text>
            <Text style={styles.loyaltyLabel}>Restaurant Visits</Text>
          </View>
        </View>
      </View>

      {/* Recent Orders */}
      <Text style={styles.sectionHeader}>Recent Dining Orders</Text>
      <View style={styles.ordersList}>
        {customer.orders.map((ord) => (
          <View key={ord.id} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <Text style={styles.orderNumber}>{ord.id}</Text>
              <Text style={styles.orderPrice}>₹{ord.total}</Text>
            </View>
            <Text style={styles.orderItems}>{ord.items}</Text>
            <Text style={styles.orderDate}>Completed • {ord.date}</Text>
          </View>
        ))}
      </View>

      {/* Quick Links */}
      <View style={styles.linksCard}>
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.linkText}>❤️ My Favorite Dishes</Text>
          <Text style={styles.linkArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.linkText}>⚙️ App Settings & Preferences</Text>
          <Text style={styles.linkArrow}>→</Text>
        </TouchableOpacity>
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
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    fontFamily: 'serif',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  userPhone: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  tierBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  tierText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  loyaltyCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loyaltyMetric: {
    alignItems: 'center',
  },
  loyaltyNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'serif',
  },
  loyaltyLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: colors.surfaceBorder,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
    marginBottom: 12,
  },
  ordersList: {
    gap: 10,
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: 4,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'monospace',
  },
  orderPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
  },
  orderItems: {
    fontSize: 11,
    color: colors.textMuted,
  },
  orderDate: {
    fontSize: 10,
    color: colors.accentGreen,
    fontWeight: '600',
    marginTop: 2,
  },
  linksCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: 30,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  linkText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '600',
  },
  linkArrow: {
    fontSize: 14,
    color: colors.primary,
  },
});
