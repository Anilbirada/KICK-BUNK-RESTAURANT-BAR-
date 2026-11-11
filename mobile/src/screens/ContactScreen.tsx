import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Linking } from 'react-native';
import { colors } from '../theme/colors';
import { apiRequest } from '../api/client';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !message) {
      Alert.alert('Required Fields', 'Please enter your name, phone number, and message.');
      return;
    }

    setLoading(true);
    const res = await apiRequest('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,
        subject: 'Mobile App Customer Inquiry',
        message,
      }),
    });
    setLoading(false);

    if (res.success) {
      Alert.alert('Inquiry Sent', 'Thank you! Our restaurant banquet team will get in touch with you shortly.');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } else {
      Alert.alert('Submission Error', res.message || 'Failed to submit inquiry.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Contact & Banquets</Text>
      <Text style={styles.headerSub}>Inquiries for party bookings, private cabanas, and catering</Text>

      {/* Quick Action Channels */}
      <View style={styles.channelsRow}>
        <TouchableOpacity
          style={styles.channelBtn}
          onPress={() => Linking.openURL('tel:+919945321367')}
        >
          <Text style={styles.channelIcon}>📞</Text>
          <Text style={styles.channelText}>Call Bengaluru</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelBtn}
          onPress={() => Linking.openURL('tel:+917760594868')}
        >
          <Text style={styles.channelIcon}>📞</Text>
          <Text style={styles.channelText}>Call Tirupati</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.channelBtn, { borderColor: colors.accentGreen }]}
          onPress={() => Linking.openURL('https://wa.me/919945321367?text=Hello%20Kick%20Bunk')}
        >
          <Text style={styles.channelIcon}>💬</Text>
          <Text style={styles.channelText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Send an Inquiry Message</Text>

        <TextInput
          placeholder="Your Full Name *"
          placeholderTextColor={colors.textDim}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Mobile Number (e.g. +91 98765 43210) *"
          placeholderTextColor={colors.textDim}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        <TextInput
          placeholder="Email Address (Optional)"
          placeholderTextColor={colors.textDim}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Your message, party date, or special request..."
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitBtnText}>
            {loading ? 'Submitting...' : 'Send Inquiry Message'}
          </Text>
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
  channelsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  channelBtn: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
    gap: 4,
  },
  channelIcon: {
    fontSize: 18,
  },
  channelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: 12,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: 'serif',
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textLight,
    fontSize: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  submitBtnText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
