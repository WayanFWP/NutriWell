import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2E8B8B',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/Footer/Home.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#2E8B8B' : '#9CA3AF' 
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/Footer/trending.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#2E8B8B' : '#9CA3AF' 
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/Footer/Profile.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#2E8B8B' : '#9CA3AF' 
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/Footer/History.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#2E8B8B' : '#9CA3AF' 
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/Footer/Settings.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#2E8B8B' : '#9CA3AF' 
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
