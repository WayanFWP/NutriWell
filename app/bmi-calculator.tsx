import BackgroundWrapper from '@/components/background-wrapper';
import BMISpeedometer from '@/components/bmi-speedometer';
import { Dropdown } from '@/components/dropdown';
import FooterNavigation from '@/components/footer-navigation';
import { FormField } from '@/components/form-fields';
import { useFooterNavigation } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BMICalculatorScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    gender: '',
    weight: '',
  });
  
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    status: string;
  } | null>(null);

  const genderOptions = [
    { label: 'Laki-laki', value: 'male' },
    { label: 'Perempuan', value: 'female' },
  ];

  const calculateBMI = () => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    
    if (height && weight && height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      let category = '';
      let status = '';
      
      if (bmi < 16.0) {
        category = 'Severely underweight';
        status = 'Severely Underweight';
      } else if (bmi < 17.0) {
        category = 'Underweight';
        status = 'Underweight';
      } else if (bmi < 18.5) {
        category = 'Underweight';
        status = 'Underweight';
      } else if (bmi < 25.0) {
        category = 'Healthy Weight';
        status = 'Normal';
      } else if (bmi < 30.0) {
        category = 'Overweight';
        status = 'Overweight';
      } else if (bmi < 35.0) {
        category = 'Obese Class I';
        status = 'Obese';
      } else {
        category = 'Obese Class II';
        status = 'Obese';
      }
      
      setBmiResult({ bmi: parseFloat(bmi.toFixed(2)), category, status });
    }
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
          {/* BMI Calculator Card */}
          <View style={styles.calculatorCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Image source={require('@/assets/Feature/BMI_Calculator.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.cardTitle}>BMI Calculator</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formRow}>
                <View style={styles.formHalf}>
                  <FormField
                    label="Age"
                    value={formData.age}
                    onChangeText={(text) => setFormData({...formData, age: text})}
                    keyboardType="numeric"
                    placeholder=""
                  />
                </View>
                <View style={styles.formHalf}>
                  <Text style={styles.label}>Height</Text>
                  <View style={styles.inputWithUnit}>
                    <TextInput
                      style={styles.inputField}
                      value={formData.height}
                      onChangeText={(text) => setFormData({...formData, height: text})}
                      keyboardType="numeric"
                      placeholder=""
                    />
                    <View style={styles.unitContainer}>
                      <Text style={styles.unitText}>cm</Text>
                      <Ionicons name="chevron-down" size={16} color="#666" />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formHalf}>
                  <Dropdown
                    label="Gender"
                    value={formData.gender}
                    options={genderOptions}
                    onSelect={(value) => setFormData({...formData, gender: value})}
                    placeholder=""
                  />
                </View>
                <View style={styles.formHalf}>
                  <Text style={styles.label}>Weight</Text>
                  <View style={styles.inputWithUnit}>
                    <TextInput
                      style={styles.inputField}
                      value={formData.weight}
                      onChangeText={(text) => setFormData({...formData, weight: text})}
                      keyboardType="numeric"
                      placeholder=""
                    />
                    <View style={styles.unitContainer}>
                      <Text style={styles.unitText}>kg</Text>
                      <Ionicons name="chevron-down" size={16} color="#666" />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
              <Text style={styles.calculateButtonText}>Check your BMI</Text>
            </TouchableOpacity>
          </View>

          {/* BMI Result Card */}
          {bmiResult && (
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <TouchableOpacity style={styles.resultBackButton} onPress={() => setBmiResult(null)}>
                  <Ionicons name="chevron-back" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.resultTitle}>Your BMI Result</Text>
              </View>

              {/* BMI Speedometer */}
              <BMISpeedometer bmi={bmiResult.bmi} status={bmiResult.status} />

              {/* BMI Categories Table */}
              <View style={styles.categoriesContainer}>
                <View style={styles.categoriesHeader}>
                  <Text style={styles.categoriesHeaderText}>Category</Text>
                  <Text style={styles.categoriesHeaderText}>Difference</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={[styles.categoryText, bmiResult.category === 'Healthy Weight' && styles.highlightedCategory]}>
                    Healthy Weight
                  </Text>
                  <Text style={styles.categoryRange}>Normal</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryText}>Severely underweight</Text>
                  <Text style={styles.categoryRange}>16.0 - 16.9</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryText}>Underweight</Text>
                  <Text style={styles.categoryRange}>17.0 - 18.4</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryText}>Healthy Weight</Text>
                  <Text style={styles.categoryRange}>18.5 - 24.9</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryText}>Overweight</Text>
                  <Text style={styles.categoryRange}>25.0 - 29.9</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryText}>Obese Class I</Text>
                  <Text style={styles.categoryRange}>30.0 - 34.9</Text>
                </View>
                
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryText}>Obese Class II</Text>
                  <Text style={styles.categoryRange}>35.0 - 39.9</Text>
                </View>
              </View>
            </View>
          )}
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
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'transparent',
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
  calculatorCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formHalf: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWithUnit: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  inputField: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 100,
    overflow: 'hidden',
  },
  resultHeader: {
    backgroundColor: '#4A5568',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  resultBackButton: {
    marginRight: 15,
  },
  resultTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    padding: 20,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  highlightedCategory: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  categoryRange: {
    fontSize: 14,
    color: '#666',
  },
});
