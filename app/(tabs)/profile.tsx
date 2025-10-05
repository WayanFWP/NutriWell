import BackgroundWrapper from '@/components/background-wrapper';
import { Dropdown } from '@/components/dropdown';
import { CheckboxField, FormField } from '@/components/form-fields';
import ProfileCard from '@/components/profile-card';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    name: 'Tono',
    age: '20',
    weight: '60',
    height: '150',
    healthGoal: 'Mengelola Gula Darah',
    dietPreference: 'Rendah Gula',
    allergi: 'Gluten',
    conditions: {
      diabetes: true,
      hipertensi: false,
      kolesterol: false,
      asamUrat: false,
      maag: false,
    }
  });

  const healthGoals = [
    { label: 'Mengelola Gula Darah', value: 'Mengelola Gula Darah' },
    { label: 'Menurunkan Berat Badan', value: 'Menurunkan Berat Badan' },
    { label: 'Menaikkan Berat Badan', value: 'Menaikkan Berat Badan' },
    { label: 'Menjaga Kesehatan Jantung', value: 'Menjaga Kesehatan Jantung' },
    { label: 'Meningkatkan Energi', value: 'Meningkatkan Energi' }
  ];

  const dietPreferences = [
    { label: 'Rendah Gula', value: 'Rendah Gula' },
    { label: 'Rendah Garam', value: 'Rendah Garam' },
    { label: 'Rendah Lemak', value: 'Rendah Lemak' },
    { label: 'Tinggi Protein', value: 'Tinggi Protein' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Vegan', value: 'Vegan' }
  ];

  const allergiOptions = [
    { label: 'Gluten', value: 'Gluten' },
    { label: 'Kacang-kacangan', value: 'Kacang-kacangan' },
    { label: 'Susu', value: 'Susu' },
    { label: 'Telur', value: 'Telur' },
    { label: 'Makanan Laut', value: 'Makanan Laut' },
    { label: 'Tidak Ada', value: 'Tidak Ada' }
  ];

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
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <View style={styles.avatarIcon}>
                    <Text style={styles.avatarText}>👤</Text>
                  </View>
                  <View style={styles.leafIcon}>
                    <Text style={styles.leafText}>🌿</Text>
                  </View>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileTitle}>Profile</Text>
                <Text style={styles.profileDescription}>
                  Lengkapi data diri dan riwayat kesehatan anda agar kami dapat 
                  memberikan rekomendasi resep yang sesuai untuk Anda.
                </Text>
              </View>
            </View>
          </View>

          {/* Personal Data Section */}
          <ProfileCard title="Data Pribadi" icon="person-circle-outline">
            <FormField
              label="Nama"
              value={formData.name}
              onChangeText={(text: string) => setFormData({...formData, name: text})}
              placeholder="Masukkan nama Anda"
            />
            
            <FormField
              label="Usia (tahun)"
              value={formData.age}
              onChangeText={(text: string) => setFormData({...formData, age: text})}
              keyboardType="numeric"
            />
            
            <FormField
              label="Berat Badan (kg)"
              value={formData.weight}
              onChangeText={(text: string) => setFormData({...formData, weight: text})}
              keyboardType="numeric"
            />
            
            <FormField
              label="Tinggi Badan (cm)"
              value={formData.height}
              onChangeText={(text: string) => setFormData({...formData, height: text})}
              keyboardType="numeric"
            />
          </ProfileCard>

          {/* Health Goals Section */}
          <ProfileCard title="Tujuan Kesehatan" icon="eye-outline">
            <Dropdown
              label="Apa tujuan utama Anda?"
              value={formData.healthGoal}
              options={healthGoals}
              onSelect={(value) => setFormData({...formData, healthGoal: value})}
              placeholder="Pilih tujuan kesehatan"
            />
          </ProfileCard>

          {/* Conditions & Preferences Section */}
          <ProfileCard title="Kondisi & Preferensi" icon="checkmark-circle-outline">
            <Dropdown
              label="Preferensi Diet"
              value={formData.dietPreference}
              options={dietPreferences}
              onSelect={(value) => setFormData({...formData, dietPreference: value})}
              placeholder="Pilih preferensi diet"
            />
            
            <Dropdown
              label="Alergi Makanan"
              value={formData.allergi}
              options={allergiOptions}
              onSelect={(value) => setFormData({...formData, allergi: value})}
              placeholder="Pilih alergi makanan"
            />

            <View style={styles.formGroup}>
              <Text style={styles.label}>Kondisi Medis Khusus</Text>
              <View style={styles.checkboxContainer}>
                <CheckboxField
                  label="Diabetes"
                  checked={formData.conditions.diabetes}
                  onPress={() => setFormData({
                    ...formData, 
                    conditions: {...formData.conditions, diabetes: !formData.conditions.diabetes}
                  })}
                />
                <CheckboxField
                  label="Hipertensi"
                  checked={formData.conditions.hipertensi}
                  onPress={() => setFormData({
                    ...formData, 
                    conditions: {...formData.conditions, hipertensi: !formData.conditions.hipertensi}
                  })}
                />
                <CheckboxField
                  label="Kolesterol Tinggi"
                  checked={formData.conditions.kolesterol}
                  onPress={() => setFormData({
                    ...formData, 
                    conditions: {...formData.conditions, kolesterol: !formData.conditions.kolesterol}
                  })}
                />
                <CheckboxField
                  label="Asam Urat"
                  checked={formData.conditions.asamUrat}
                  onPress={() => setFormData({
                    ...formData, 
                    conditions: {...formData.conditions, asamUrat: !formData.conditions.asamUrat}
                  })}
                />
                <CheckboxField
                  label="Maag"
                  checked={formData.conditions.maag}
                  onPress={() => setFormData({
                    ...formData, 
                    conditions: {...formData.conditions, maag: !formData.conditions.maag}
                  })}
                />
              </View>
            </View>
          </ProfileCard>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </ScrollView>
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
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    position: 'relative',
  },
  avatarIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    color: 'white',
  },
  leafIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 25,
    height: 25,
    backgroundColor: '#2E8B8B',
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  leafText: {
    fontSize: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    opacity: 0.9,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  checkboxContainer: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 100,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
