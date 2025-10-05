import BackgroundWrapper from '@/components/background-wrapper';
import FooterNavigation from '@/components/footer-navigation';
import { useFooterNavigation } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function AnalisisNutrisiScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);

  const handleChatBoxAnalyzer = () => {
    router.push('/chat-box-analyzer');
  };

  const handleNutriScan = () => {
    router.push('/nutri-scan');
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#2E8B8B" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Content Card */}
          <View style={styles.mainCard}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.iconContainer}>
                <View style={styles.nutritionIcon}>
                  {/* Nutrition Analysis Icon */}
                  <View style={styles.chartBars}>
                    <View style={[styles.bar, styles.bar1]} />
                    <View style={[styles.bar, styles.bar2]} />
                    <View style={[styles.bar, styles.bar3]} />
                    <View style={[styles.bar, styles.bar4]} />
                  </View>
                  <View style={styles.foodItems}>
                    <View style={styles.apple} />
                    <View style={styles.carrot} />
                    <View style={styles.magnifyingGlass}>
                      <Ionicons name="search" size={16} color="white" />
                    </View>
                  </View>
                </View>
              </View>
              
              <Text style={styles.title}>Analisis Nutrisi</Text>
              <Text style={styles.subtitle}>
                Masukkan makanan dan bahan untuk mendapatkan analisis gizi, 
                ringkasan kesehatan, dan saran perbaikan optimal untuk Anda.
              </Text>
            </View>

            {/* Feature Options */}
            <View style={styles.featuresContainer}>
              {/* Chat Box Analyzer */}
              <TouchableOpacity 
                style={styles.featureCard}
                onPress={handleChatBoxAnalyzer}
                activeOpacity={0.8}
              >
                <View style={styles.featureIcon}>
                  <View style={styles.chatBoxIcon}>
                    <Ionicons name="chatbubbles" size={24} color="#4CAF50" />
                    <View style={styles.analysisSymbol}>
                      <Text style={styles.analysisText}>%</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Chat Box Analyzer</Text>
                  <Text style={styles.featureDescription}>
                    Masukan bahan atau resep dengan teks ataupun suara
                  </Text>
                </View>
              </TouchableOpacity>

              {/* NutriScan */}
              <TouchableOpacity 
                style={styles.featureCard}
                onPress={handleNutriScan}
                activeOpacity={0.8}
              >
                <View style={styles.featureIcon}>
                  <View style={styles.nutriScanIcon}>
                    <Ionicons name="camera" size={24} color="white" />
                    <View style={styles.scanFrame}>
                      <View style={styles.cornerTL} />
                      <View style={styles.cornerTR} />
                      <View style={styles.cornerBL} />
                      <View style={styles.cornerBR} />
                    </View>
                  </View>
                </View>
                
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>NutriScan</Text>
                  <Text style={styles.featureDescription}>
                    Masukan bahan atau resep dengan teks ataupun suara
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <FooterNavigation 
          items={footerItems}
          activeItem={activeItem}
        />
      </SafeAreaView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    margin: 20,
    marginBottom: 100,
    padding: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  nutritionIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#A8E6A3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginBottom: 5,
  },
  bar: {
    backgroundColor: '#4CAF50',
    width: 4,
    borderRadius: 2,
  },
  bar1: { height: 8 },
  bar2: { height: 12 },
  bar3: { height: 16 },
  bar4: { height: 10 },
  foodItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  apple: {
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  carrot: {
    width: 10,
    height: 12,
    backgroundColor: '#FF9800',
    borderRadius: 2,
  },
  magnifyingGlass: {
    width: 16,
    height: 16,
    backgroundColor: '#2E8B8B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  featuresContainer: {
    gap: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  featureIcon: {
    marginRight: 15,
  },
  chatBoxIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#E8F5E8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  analysisSymbol: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 18,
    height: 18,
    backgroundColor: '#FF9800',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nutriScanIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scanFrame: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'white',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 8,
    height: 8,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'white',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});
