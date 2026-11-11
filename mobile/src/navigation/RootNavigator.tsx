import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import BottomTabNavigator from './BottomTabNavigator';
import BusinessInfoScreen from '../screens/BusinessInfoScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import GalleryScreen from '../screens/GalleryScreen';
import VideoScreen from '../screens/VideoScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import LocationScreen from '../screens/LocationScreen';
import ContactScreen from '../screens/ContactScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.textLight,
          fontFamily: 'serif',
          fontWeight: 'bold',
        },
        headerTintColor: colors.primary,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BusinessInfo" component={BusinessInfoScreen} options={{ title: 'About Kick Bunk' }} />
      <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Menu Categories' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Dish Details' }} />
      <Stack.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Photo Gallery' }} />
      <Stack.Screen name="Video" component={VideoScreen} options={{ title: 'Video Reels & Tour' }} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Customer Reviews' }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'Restaurant Outlets' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact & Inquiries' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Account' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'My Favorites' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Dining Alerts' }} />
    </Stack.Navigator>
  );
}
