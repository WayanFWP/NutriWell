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
  TouchableOpacity,
  View
} from 'react-native';

interface Doctor {
  id: string;
  name: string;
  title: string;
  avatar: any;
  status: 'Online' | 'Sibuk' | 'Offline';
  price: string;
  satisfactionRate: string;
  patientsServed: string;
  consultationType: string;
  isLiked?: boolean;
}

export default function KonsultasiGiziScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Pengalaman');
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Budi Setiawan, M. Gizi, Sp.G.K',
      title: 'Spesialis Gizi Klinis',
      avatar: require('@/assets/Assets-images/Speech_idle.png'),
      status: 'Online',
      price: 'Rp. 1.000.000,-',
      satisfactionRate: '90%',
      patientsServed: '10.5k',
      consultationType: 'Konsultasi',
      isLiked: false,
    },
    {
      id: '2',
      name: 'Dr. Budi Setiawan, M. Gizi, Sp.G.K',
      title: 'Spesialis Gizi Klinis',
      avatar: require('@/assets/Assets-images/Speech_idle.png'),
      status: 'Sibuk',
      price: 'Rp. 1.000.000,-',
      satisfactionRate: '90%',
      patientsServed: '10.5k',
      consultationType: 'Konsultasi',
      isLiked: false,
    },
    {
      id: '3',
      name: 'Dr. Budi Setiawan, M. Gizi, Sp.G.K',
      title: 'Spesialis Gizi Klinis',
      avatar: require('@/assets/Assets-images/Speech_idle.png'),
      status: 'Offline',
      price: 'Rp. 1.000.000,-',
      satisfactionRate: '90%',
      patientsServed: '10.5k',
      consultationType: 'Konsultasi',
      isLiked: false,
    },
  ]);



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return '#4CAF50';
      case 'Sibuk': return '#FF9800';
      case 'Offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const handleThumbsUp = (doctorId: string) => {
    setDoctors(prevDoctors => 
      prevDoctors.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, isLiked: !doctor.isLiked }
          : doctor
      )
    );
  };

  const handleConsultationPress = (doctor: Doctor) => {
    router.push({
      pathname: '/chat-konsultasi',
      params: { 
        doctorId: doctor.id,
        doctorName: doctor.name,
      },
    });
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
            {/* Header with Icon */}
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/Feature/Konsultasi_Ahli_gizi.png')}
                  style={styles.headerIcon}
                />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Konsultasi Ahli Gizi Profesional</Text>
                <Text style={styles.headerSubtitle}>
                  Jadwalkan sesi konsultasi personal dengan salah satu ahli gizi kami.
                </Text>
              </View>
            </View>

            {/* Filter and Search */}
            <View style={styles.filterSection}>
              <View style={styles.filterRow}>
                <TouchableOpacity 
                  style={[styles.filterButton, selectedFilter === 'Pengalaman' && styles.filterButtonActive]}
                  onPress={() => setSelectedFilter('Pengalaman')}
                >
                  <Text style={[styles.filterText, selectedFilter === 'Pengalaman' && styles.filterTextActive]}>
                    Pengalaman
                  </Text>
                  <Ionicons name="chevron-down" size={16} color={selectedFilter === 'Pengalaman' ? 'white' : '#666'} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.filterButton, selectedFilter === 'Harga' && styles.filterButtonActive]}
                  onPress={() => setSelectedFilter('Harga')}
                >
                  <Text style={[styles.filterText, selectedFilter === 'Harga' && styles.filterTextActive]}>
                    Harga
                  </Text>
                  <Ionicons name="chevron-down" size={16} color={selectedFilter === 'Harga' ? 'white' : '#666'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchButton}>
                  <Image
                    source={require('@/assets/Assets-images/Search_icon.png')}
                    style={styles.searchIcon}
                  />
                  <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Doctors List */}
            <View style={styles.doctorsList}>
              {doctors.map((doctor) => (
                <View
                  key={doctor.id}
                  style={styles.doctorCard}
                >
                  <View style={styles.doctorInfo}>
                    <Image source={doctor.avatar} style={styles.doctorAvatar} />
                    
                    <View style={styles.doctorDetails}>
                      <Text style={styles.doctorName}>{doctor.name}</Text>
                      <Text style={styles.doctorTitle}>{doctor.title}</Text>
                      <View style={[
                        styles.statusBadge,
                        doctor.status === 'Online' ? styles.statusOnline :
                        doctor.status === 'Sibuk' ? styles.statusBusy : styles.statusOffline
                      ]}>
                        <Text style={[
                          styles.statusText,
                          doctor.status === 'Online' ? styles.statusTextOnline :
                          doctor.status === 'Sibuk' ? styles.statusTextBusy : styles.statusTextOffline
                        ]}>
                          {doctor.status}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.doctorPrice}>{doctor.price}</Text>
                  </View>

                  <View style={styles.doctorStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Tingkat kepuasan</Text>
                      <View style={styles.statValue}>
                        <TouchableOpacity
                          style={styles.thumbsButton}
                          onPress={() => handleThumbsUp(doctor.id)}
                          activeOpacity={0.7}
                        >
                          <Image
                            source={doctor.isLiked 
                              ? require('@/assets/Assets-images/Thumbs_Upclicked.png')
                              : require('@/assets/Assets-images/Thumbs_Upidle.png')
                            }
                            style={styles.thumbsIcon}
                          />
                        </TouchableOpacity>
                        <Text style={styles.statText}>{doctor.satisfactionRate}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Pasien Terlayani</Text>
                      <View style={styles.statValue}>
                        <Ionicons name="people" size={16} color="#4CAF50" />
                        <Text style={styles.statText}>{doctor.patientsServed}</Text>
                      </View>
                    </View>

                    <TouchableOpacity 
                      style={styles.consultationBadge}
                      onPress={() => handleConsultationPress(doctor)}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.consultationText}>{doctor.consultationType}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 15,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
    gap: 5,
  },
  filterButtonActive: {
    backgroundColor: '#2E8B8B',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: 'white',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    gap: 5,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  searchText: {
    fontSize: 14,
    color: 'white',
  },
  doctorsList: {
    gap: 15,
  },
  doctorCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D4E6D4',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  doctorTitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusOnline: {
    backgroundColor: '#E8F5E8',
  },
  statusBusy: {
    backgroundColor: '#FFF3E0',
  },
  statusOffline: {
    backgroundColor: '#F5F5F5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: '#4CAF50',
  },
  statusTextBusy: {
    color: '#FF9800',
  },
  statusTextOffline: {
    color: '#9E9E9E',
  },
  doctorPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  doctorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  consultationBadge: {
    backgroundColor: '#FF9800',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  consultationText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  thumbsButton: {
    padding: 2,
  },
  thumbsIcon: {
    width: 16,
    height: 16,
  },
});
