import BackgroundWrapper from '@/components/background-wrapper';
import { Dropdown } from '@/components/dropdown';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState('Bahasa Indonesia');
  const [notifications, setNotifications] = useState({
    recipeRecommendations: true,
    appUpdates: false,
  });

  const languageOptions = [
    { label: 'Bahasa Indonesia', value: 'id' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
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
          {/* Main Title */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Pengaturan</Text>
          </View>

          {/* Account Settings Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-circle" size={24} color="#2E8B8B" />
              <Text style={styles.cardTitle}>Pengaturan Akun</Text>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama</Text>
                <View style={styles.greenInput}>
                  <TextInput
                    style={styles.textInput}
                    value={accountData.name}
                    onChangeText={(text: string) => setAccountData({...accountData, name: text})}
                    placeholder=""
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.greenInput}>
                  <TextInput
                    style={styles.textInput}
                    value={accountData.email}
                    onChangeText={(text: string) => setAccountData({...accountData, email: text})}
                    placeholder=""
                    keyboardType="email-address"
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telepon</Text>
                <View style={styles.greenInput}>
                  <TextInput
                    style={styles.textInput}
                    value={accountData.phone}
                    onChangeText={(text: string) => setAccountData({...accountData, phone: text})}
                    placeholder=""
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Language Preferences Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="language" size={24} color="#2E8B8B" />
              <Text style={styles.cardTitle}>Preferensi Bahasa</Text>
            </View>

            <View style={styles.cardContent}>
              <Dropdown
                label=""
                value={selectedLanguage}
                options={languageOptions}
                onSelect={setSelectedLanguage}
                placeholder="Pilih Bahasa"
              />
            </View>
          </View>

          {/* Notifications Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="notifications" size={24} color="#2E8B8B" />
              <Text style={styles.cardTitle}>Notifikasi</Text>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.notificationRow}>
                <Text style={styles.notificationLabel}>Rekomendasi Resep</Text>
                <Switch
                  value={notifications.recipeRecommendations}
                  onValueChange={(value) => 
                    setNotifications({...notifications, recipeRecommendations: value})
                  }
                  trackColor={{ false: '#D1D5DB', true: '#A8E6A3' }}
                  thumbColor={notifications.recipeRecommendations ? '#2E8B8B' : '#9CA3AF'}
                />
              </View>

              <View style={styles.notificationRow}>
                <Text style={styles.notificationLabel}>Update Aplikasi</Text>
                <Switch
                  value={notifications.appUpdates}
                  onValueChange={(value) => 
                    setNotifications({...notifications, appUpdates: value})
                  }
                  trackColor={{ false: '#D1D5DB', true: '#A8E6A3' }}
                  thumbColor={notifications.appUpdates ? '#2E8B8B' : '#9CA3AF'}
                />
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Simpan Pengaturan</Text>
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
  titleSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  cardContent: {
    gap: 15,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  notificationLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
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
  inputGroup: {
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  greenInput: {
    backgroundColor: '#A8E6A3',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 20,
  },
});
