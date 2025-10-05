import BackgroundWrapper from '@/components/background-wrapper';
import FooterNavigation from '@/components/footer-navigation';
import { useFooterNavigation } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface NutritionAnalysis {
  food: string;
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  totalEnergy: string;
  healthRecommendations: string;
  suggestions: string[];
}

export default function ChatBoxAnalyzerScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<NutritionAnalysis | null>(null);

  const analyzeNutrition = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAnalysis: NutritionAnalysis = {
        food: inputText.trim(),
        totalCalories: 590,
        protein: 41.5,
        carbs: 91,
        fat: 4.9,
        fiber: 4,
        sugar: 2,
        sodium: 110,
        totalEnergy: '589/2000 Kkal',
        healthRecommendations: 'Makanan ini menyediakan kombinasi baik antara protein tanpa lemak dan ayam, karbohidrat kompleks dari nasi, dan serat serta vitamin dari brokoli. Ini adalah pilihan yang tepat rendah lemak dan sodium, mendukung kebutuhan energi dan nutrisi harian.',
        suggestions: [
          'Pertimbangan untuk mengganti nasi putih dengan nasi merah atau beras cokelat untuk meningkatkan kandungan serat dan indeks glikemik yang lebih rendah.',
          'Tambahkan lebih banyak porsi sayuran atau variasi sayuran lain seperti paprika atau wortel untuk meningkatkan asupan mikronutrien.',
          'Pastikan ayam dimasak tanpa kulit dan dengan sedikit minyak jika digoreng atau pilih metode memasak seperti dipanggang atau dikukus.'
        ]
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setInputText('');
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
              <View style={styles.iconWrapper}>
                <Image 
                  source={require('@/assets/Feature/Analisis_Gizi.png')}
                  style={styles.featureIcon}
                />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.title}>Analisis Nutrisi Makanan</Text>
                <Text style={styles.subtitle}>
                  Masukkan nama makanan atau daftar bahan untuk mendapatkan analisis nutrisi
                </Text>
              </View>
            </View>

            {/* Input Section */}
            <View style={styles.inputSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.exampleText}>
                  Contoh : Ayam 100 gram, Brokoli 100 gram, dan Nasi 300 gram
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type a message"
                  placeholderTextColor="#999"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  textAlignVertical="top"
                />
                <View style={styles.inputActions}>
                  <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={analyzeNutrition}
                    disabled={isAnalyzing || !inputText.trim()}
                  >
                    <Ionicons 
                      name="send" 
                      size={20} 
                      color={isAnalyzing || !inputText.trim() ? "#ccc" : "#666"} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.micButton}>
                    <Ionicons name="mic" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Loading State */}
            {isAnalyzing && (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingCard}>
                  <Text style={styles.loadingText}>Menganalisis nutrisi...</Text>
                  <View style={styles.loadingDots}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>
                </View>
              </View>
            )}

            {/* Analysis Result */}
            {analysisResult && (
              <View style={styles.resultContainer}>
                {/* Nutrition Summary */}
                <View style={styles.nutritionCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Ringkasan Gizi</Text>
                    <TouchableOpacity onPress={resetAnalysis}>
                      <Ionicons name="refresh" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.foodName}>{analysisResult.food}</Text>

                  {/* Calories Circle Chart */}
                  <View style={styles.caloriesSection}>
                    <View style={styles.caloriesChart}>
                      <View style={styles.outerCircle}>
                        <View style={styles.progressCircle}>
                          <View style={styles.innerCircle}>
                            <Text style={styles.totalMakroText}>Total Makro</Text>
                            <Text style={styles.caloriesNumber}>{analysisResult.totalCalories}</Text>
                            <Text style={styles.caloriesUnit}>kkal</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Macros Breakdown */}
                  <View style={styles.macrosGrid}>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIndicator, { backgroundColor: '#2E8B8B' }]} />
                      <Text style={styles.macroLabel}>Protein</Text>
                      <Text style={styles.macroValue}>{analysisResult.protein} gram</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIndicator, { backgroundColor: '#4FC3F7' }]} />
                      <Text style={styles.macroLabel}>Karbohidrat</Text>
                      <Text style={styles.macroValue}>{analysisResult.carbs} gram</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <View style={[styles.macroIndicator, { backgroundColor: '#B3E5FC' }]} />
                      <Text style={styles.macroLabel}>Lemak</Text>
                      <Text style={styles.macroValue}>{analysisResult.fat} gram</Text>
                    </View>
                  </View>

                  {/* Total Energy */}
                  <View style={styles.energySection}>
                    <View style={styles.energyBar}>
                      <Text style={styles.energyLabel}>Total Energi</Text>
                      <Text style={styles.energyValue}>{analysisResult.totalEnergy}</Text>
                    </View>
                  </View>

                  {/* Additional Nutrients */}
                  <View style={styles.additionalNutrients}>
                    <View style={styles.nutrientItem}>
                      <Text style={styles.nutrientLabel}>Serat</Text>
                      <Text style={styles.nutrientValue}>{analysisResult.fiber}g</Text>
                    </View>
                    <View style={styles.nutrientItem}>
                      <Text style={styles.nutrientLabel}>Gula</Text>
                      <Text style={styles.nutrientValue}>{analysisResult.sugar}g</Text>
                    </View>
                    <View style={styles.nutrientItem}>
                      <Text style={styles.nutrientLabel}>Natrium</Text>
                      <Text style={styles.nutrientValue}>{analysisResult.sodium}mg</Text>
                    </View>
                  </View>
                </View>

                {/* Health Recommendations */}
                <View style={styles.recommendationsCard}>
                  <Text style={styles.recommendationsTitle}>Ringkasan Kesehatan</Text>
                  <Text style={styles.recommendationsText}>
                    {analysisResult.healthRecommendations}
                  </Text>
                </View>

                {/* Suggestions */}
                <View style={styles.suggestionsCard}>
                  <Text style={styles.suggestionsTitle}>Saran</Text>
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <View key={index} style={styles.suggestionItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </View>
                  ))}
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
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
  },
  iconWrapper: {
    marginRight: 15,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  exampleText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 15,
    paddingRight: 80,
    minHeight: 50,
    maxHeight: 100,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E8B8B',
  },
  resultContainer: {
    gap: 15,
  },
  nutritionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  foodName: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 8,
  },
  caloriesSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  caloriesChart: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    borderColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: '#2E8B8B',
    borderLeftColor: '#4FC3F7',
    borderBottomColor: '#B3E5FC',
    transform: [{ rotate: '-90deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  totalMakroText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  caloriesNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  caloriesUnit: {
    fontSize: 12,
    color: '#666',
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  energySection: {
    marginBottom: 15,
  },
  energyBar: {
    backgroundColor: '#2E8B8B',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  energyLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  energyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  additionalNutrients: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientItem: {
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recommendationsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  suggestionsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#2E8B8B',
    marginRight: 8,
    marginTop: 2,
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
});
