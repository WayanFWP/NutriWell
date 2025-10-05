import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

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
          <Ionicons
            name={item.icon}
            size={24}
            color={activeItem === item.id ? '#2E8B8B' : '#9CA3AF'}
          />
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
});
