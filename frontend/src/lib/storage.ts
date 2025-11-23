// Local storage utilities for BabyBTC

import { LocalProfile } from './types';

const STORAGE_KEY = 'babybtc_profile_v1';

export function loadProfile(): LocalProfile | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load profile from localStorage:', error);
    return null;
  }
}

export function saveProfile(profile: LocalProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save profile to localStorage:', error);
  }
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear profile from localStorage:', error);
  }
}
