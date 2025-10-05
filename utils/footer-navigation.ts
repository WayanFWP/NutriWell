import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export interface FooterItem {
  id: string;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  image?: string;
  onPress: () => void;
}

export const createFooterItems = (): FooterItem[] => [
  {
    id: 'home',
    title: 'Home',
    image: 'Home.png',
    onPress: () => router.push('/(tabs)'),
  },
  {
    id: 'trending',
    title: 'Trending',
    image: 'trending.png',
    onPress: () => router.push('/(tabs)/trending'),
  },
  {
    id: 'profile',
    title: 'Profile',
    image: 'Profile.png',
    onPress: () => router.push('/(tabs)/profile'),
  },
  {
    id: 'history',
    title: 'History',
    image: 'History.png',
    onPress: () => router.push('/(tabs)/history'),
  },
  {
    id: 'settings',
    title: 'Settings',
    image: 'Settings.png',
    onPress: () => router.push('/(tabs)/settings'),
  },
];

export const getActiveFooterItem = (pathname: string): string => {
  if (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/') return 'home';
  if (pathname.includes('/trending')) return 'trending';
  if (pathname.includes('/profile')) return 'profile';
  if (pathname.includes('/history')) return 'history';
  if (pathname.includes('/settings')) return 'settings';
  return 'home'; // Default to home for other screens
};

export const useFooterNavigation = (pathname: string) => {
  const footerItems = createFooterItems();
  const activeItem = getActiveFooterItem(pathname);
  
  return {
    footerItems,
    activeItem,
  };
};
