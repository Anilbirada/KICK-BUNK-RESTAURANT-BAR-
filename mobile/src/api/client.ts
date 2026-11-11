// Shared Backend REST API Client for Kick Bunk 360 Mobile
import { Platform } from 'react-native';

// In Android emulator: 10.0.2.2 points to host localhost; in iOS simulator: localhost.
export const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api/v1',
  ios: 'http://localhost:5000/api/v1',
  default: 'http://localhost:5000/api/v1',
});

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; count?: number; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    console.warn(`[Mobile API Error] ${endpoint}:`, error.message);
    return { success: false, message: error.message || 'Network request failed' };
  }
}
