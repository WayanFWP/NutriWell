import BackgroundWrapper from '@/components/background-wrapper';
import FooterNavigation from '@/components/footer-navigation';
import { useFooterNavigation } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ScanResult {
  id: string;
  detectedFood: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: string[];
  healthScore: number;
}

export default function NutriScanScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = () => {
    setCameraActive(true);
    // In a real app, this would initialize the camera
    Alert.alert('Camera', 'Kamera akan dibuka untuk memindai makanan');
  };

  const startScan = () => {
    if (!cameraActive) {
      startCamera();
      return;
    }

    setIsScanning(true);
    
    // Simulate AR scanning
    setTimeout(() => {
      const mockScanResult: ScanResult = {
        id: Date.now().toString(),
        detectedFood: 'Salad Buah Segar',
        confidence: 95,
        calories: 180,
        protein: 3,
        carbs: 42,
        fat: 2,
        vitamins: ['Vitamin C', 'Vitamin A', 'Folat', 'Kalium'],
        healthScore: 8.5,
      };
      
      setScanResult(mockScanResult);
      setIsScanning(false);
    }, 3000);
  };

  const resetScan = () => {
    setScanResult(null);
    setCameraActive(false);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return '#4CAF50';
    if (score >= 6) return '#FF9800';
    return '#F44336';
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
                <Ionicons name="camera" size={40} color="white" />
              </View>
              <Text style={styles.title}>NutriScan</Text>
              <Text style={styles.subtitle}>
                Arahkan kamera ke makanan untuk analisis nutrisi real-time
              </Text>
            </View>

            {/* Camera/Scan Section */}
            {!scanResult && (
              <View style={styles.scanSection}>
                <View style={styles.cameraContainer}>
                  <View style={styles.cameraPreview}>
                    {!cameraActive ? (
                      <View style={styles.cameraPlaceholder}>
                        <Ionicons name="camera-outline" size={60} color="#CCCCCC" />
                        <Text style={styles.cameraPlaceholderText}>
                          Tekan tombol untuk mengaktifkan kamera
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.activeCameraView}>
                        <View style={styles.scanOverlay}>
                          <View style={styles.scanFrame}>
                            <View style={styles.cornerTL} />
                            <View style={styles.cornerTR} />
                            <View style={styles.cornerBL} />
                            <View style={styles.cornerBR} />
                          </View>
                          
                          {isScanning && (
                            <View style={styles.scanningIndicator}>
                              <View style={styles.scanLine} />
                              <Text style={styles.scanningText}>Memindai makanan...</Text>
                            </View>
                          )}
                        </View>
                        
                        <View style={styles.cameraControls}>
                          <TouchableOpacity 
                            style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
                            onPress={startScan}
                            disabled={isScanning}
                          >
                            <View style={styles.scanButtonInner}>
                              {isScanning ? (
                                <Ionicons name="hourglass" size={24} color="white" />
                              ) : (
                                <Ionicons name="scan" size={24} color="white" />
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {!cameraActive && (
                  <TouchableOpacity style={styles.activateButton} onPress={startCamera}>
                    <Ionicons name="camera" size={20} color="white" />
                    <Text style={styles.activateButtonText}>Aktifkan Kamera</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Scan Result */}
            {scanResult && (
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle}>Hasil Pemindaian</Text>
                  <TouchableOpacity style={styles.resetButton} onPress={resetScan}>
                    <Ionicons name="refresh" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.detectedFood}>
                  <Text style={styles.foodName}>{scanResult.detectedFood}</Text>
                  <View style={styles.confidenceContainer}>
                    <Text style={styles.confidenceLabel}>Akurasi: </Text>
                    <Text style={styles.confidenceValue}>{scanResult.confidence}%</Text>
                  </View>
                </View>

                <View style={styles.healthScoreContainer}>
                  <Text style={styles.healthScoreLabel}>Skor Kesehatan</Text>
                  <View style={styles.scoreCircle}>
                    <Text style={[styles.scoreValue, { color: getHealthScoreColor(scanResult.healthScore) }]}>
                      {scanResult.healthScore}/10
                    </Text>
                  </View>
                </View>

                <View style={styles.nutritionInfo}>
                  <View style={styles.nutritionGrid}>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{scanResult.calories}</Text>
                      <Text style={styles.nutritionLabel}>Kalori</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{scanResult.protein}g</Text>
                      <Text style={styles.nutritionLabel}>Protein</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{scanResult.carbs}g</Text>
                      <Text style={styles.nutritionLabel}>Karbohidrat</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{scanResult.fat}g</Text>
                      <Text style={styles.nutritionLabel}>Lemak</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.vitaminsSection}>
                  <Text style={styles.vitaminsTitle}>Vitamin & Mineral:</Text>
                  <View style={styles.vitaminsList}>
                    {scanResult.vitamins.map((vitamin, index) => (
                      <View key={index} style={styles.vitaminTag}>
                        <Text style={styles.vitaminText}>{vitamin}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
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
    width: 80,
    height: 80,
    backgroundColor: '#4CAF50',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  scanSection: {
    alignItems: 'center',
  },
  cameraContainer: {
    width: '100%',
    marginBottom: 20,
  },
  cameraPreview: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    borderRadius: 15,
    overflow: 'hidden',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cameraPlaceholderText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  activeCameraView: {
    flex: 1,
    position: 'relative',
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanFrame: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#4CAF50',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#4CAF50',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#4CAF50',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#4CAF50',
  },
  scanningIndicator: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: 20,
  },
  scanLine: {
    width: 180,
    height: 2,
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  scanningText: {
    color: 'white',
    fontSize: 14,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  scanButton: {
    width: 70,
    height: 70,
    backgroundColor: '#4CAF50',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  scanButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  scanButtonInner: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    padding: 5,
  },
  detectedFood: {
    backgroundColor: '#E8F5E8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#666',
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  healthScoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  healthScoreLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E5E5E5',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutritionInfo: {
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  nutritionItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '47%',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
  },
  vitaminsSection: {
    marginTop: 10,
  },
  vitaminsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  vitaminsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vitaminTag: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  vitaminText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
});
