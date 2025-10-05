import { FooterItem } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Image mapping for footer assets
const footerImages = {
  'Home.png': require('@/assets/Footer/Home.png'),
  'trending.png': require('@/assets/Footer/trending.png'),
  'Profile.png': require('@/assets/Footer/Profile.png'),
  'History.png': require('@/assets/Footer/History.png'),
  'Settings.png': require('@/assets/Footer/Settings.png'),
};

interface FooterNavigationProps {
  items: FooterItem[];
  activeItem?: string;
}

export default function FooterNavigation({ items, activeItem }: FooterNavigationProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.footerItem}
          onPress={item.onPress}
        >
          {item.image ? (
            <Image
              source={footerImages[item.image as keyof typeof footerImages]}
              style={[
                styles.footerImage,
                { 
                  tintColor: activeItem === item.id ? '#2E8B8B' : '#9CA3AF' 
                }
              ]}
            />
          ) : (
            <Ionicons
              name={item.icon!}
              size={24}
              color={activeItem === item.id ? '#2E8B8B' : '#9CA3AF'}
            />
          )}
          <Text
            style={[
              styles.footerText,
              { color: activeItem === item.id ? '#2E8B8B' : '#9CA3AF' }
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  footerImage: {
    width: 24,
    height: 24,
  },
});
