import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../theme/colors';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 'n1',
      title: 'Order Completed & Points Awarded',
      body: 'Your dining bill for Order #KB-BLR-01-0103 has been settled. 30 Loyalty Points have been added to your account!',
      time: '15 mins ago',
      icon: '🎉',
    },
    {
      id: 'n2',
      title: 'Kitchen Ticket Update',
      body: 'Chef Rakesh started preparing your Kalmi Kebab & Royal Dum Biryani.',
      time: '45 mins ago',
      icon: '🔥',
    },
    {
      id: 'n3',
      title: 'Table Reservation Confirmed',
      body: 'Your booking for 6 guests on Saturday at Kick Bunk Bengaluru Garden Cabana is confirmed.',
      time: 'Yesterday',
      icon: '🛖',
    },
    {
      id: 'n4',
      title: 'Weekend Live Sports Screening',
      body: 'Catch the cricket match live on our garden projector screens this Sunday at 7 PM!',
      time: '2 days ago',
      icon: '🏏',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <Text style={styles.headerSub}>Dining alerts, KDS order progress, and table confirmations</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.notifCard}>
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.cardTop}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.notifBody}>{item.body}</Text>
            </View>
          </View>
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
  notifCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  timeText: {
    fontSize: 10,
    color: colors.textDim,
  },
  notifBody: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 16,
  },
});
