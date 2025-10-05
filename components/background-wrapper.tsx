import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <ImageBackground
      source={require('@/assets/BackGround.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 139, 139, 0.8)', // Semi-transparent overlay to maintain the green theme
  },
});
