import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FeatureCardProps {
  title: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  style?: any;
}

export function FeatureCard({ title, image, onPress, style }: FeatureCardProps) {
  return (
    <TouchableOpacity style={[styles.featureCard, style]} onPress={onPress}>
      <Image source={image} style={styles.featureIcon} />
      <Text style={styles.featureTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

interface TopFeatureCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

export function TopFeatureCard({ title, description, image, onPress }: TopFeatureCardProps) {
  return (
    <TouchableOpacity style={styles.topFeatureCard} onPress={onPress}>
      <View style={styles.topFeatureIconContainer}>
        <Image source={image} style={styles.topFeatureIcon} />
      </View>
      <View style={styles.topFeatureContent}>
        <Text style={styles.topFeatureTitle}>{title}</Text>
        <Text style={styles.topFeatureDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  featureCard: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },
  topFeatureCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  topFeatureIconContainer: {
    marginBottom: 15,
  },
  topFeatureIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  topFeatureContent: {
    flex: 1,
  },
  topFeatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  topFeatureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
