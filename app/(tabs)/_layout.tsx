import { Tabs, usePathname } from 'expo-router';
import React from 'react';

import FooterNavigation from '@/components/footer-navigation';
import { useFooterNavigation } from '@/utils/footer-navigation';

export default function TabLayout() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide the default tab bar
        }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="trending" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="history" />
        <Tabs.Screen name="settings" />
      </Tabs>
      
      <FooterNavigation 
        items={footerItems}
        activeItem={activeItem}
      />
    </>
  );
}
