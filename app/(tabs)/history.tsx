import BackgroundWrapper from '@/components/background-wrapper';
import FooterNavigation from '@/components/footer-navigation';
import { useFooterNavigation } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
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

interface ConsultationHistory {
  id: string;
  doctorName: string;
  doctorTitle: string;
  doctorImage: string;
  status: 'Online' | 'Sibuk';
  description: string;
  time: string;
  date: string;
}

interface AnalysisHistory {
  id: string;
  title: string;
  description: string;
  tag: string;
  time: string;
  date: string;
}

export default function HistoryScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  
  const [activeTab, setActiveTab] = useState<'konsultasi' | 'analisis'>('konsultasi');

  const consultationHistory: ConsultationHistory[] = [
    {
      id: '1',
      doctorName: 'Dr. Budi Setiawan, M. Gizi, Sp.G.K',
      doctorTitle: 'Dokter Spesialis Gizi',
      doctorImage: 'male_doctor',
      status: 'Online',
      description: '"Baik, untuk menjaga gula darah, coba kurangi porsi nasi putih dan ..."',
      time: 'Kemarin, 14:30',
      date: '2025-10-05'
    },
    {
      id: '2',
      doctorName: 'Dr. Budi Setiawan, M. Gizi, Sp.G.K',
      doctorTitle: 'Dokter Spesialis Gizi',
      doctorImage: 'female_doctor',
      status: 'Sibuk',
      description: '"Baik, untuk menjaga gula darah, coba kurangi porsi nasi putih dan ..."',
      time: 'Kemarin, 14:30',
      date: '2025-10-05'
    },
    {
      id: '3',
      doctorName: 'Dr. Budi Setiawan, M. Gizi, Sp.G.K',
      doctorTitle: 'Dokter Spesialis Gizi',
      doctorImage: 'female_doctor',
      status: 'Online',
      description: '"Baik, untuk menjaga gula darah, coba kurangi porsi nasi putih dan ..."',
      time: 'Kemarin, 14:30',
      date: '2025-10-05'
    }
  ];

  const analysisHistory: AnalysisHistory[] = [
    {
      id: '1',
      title: 'Salmon Panggang Dengan Lemon dan Brokoli',
      description: '"Hidangan utama yang elegan dan sehat. Salmon kaya akan Omega-3, appaduan dengan lemon yang segar"',
      tag: 'Tinggi Protein',
      time: 'Kemarin, 14:30',
      date: '2025-10-05'
    },
    {
      id: '2',
      title: 'Salmon Panggang Dengan Lemon dan Brokoli',
      description: '"Hidangan utama yang elegan dan sehat. Salmon kaya akan Omega-3, appaduan dengan lemon yang segar"',
      tag: 'Tinggi Protein',
      time: 'Kemarin, 14:30',
      date: '2025-10-05'
    },
    {
      id: '3',
      title: 'Salmon Panggang Dengan Lemon dan Brokoli',
      description: '"Hidangan utama yang elegan dan sehat. Salmon kaya akan Omega-3, appaduan dengan lemon yang segar"',
      tag: 'Tinggi Protein',
      time: 'Kemarin, 14:30',
      date: '2025-10-05'
    }
  ];

  const renderDoctorAvatar = (imageType: string) => {
    if (imageType === 'male_doctor') {
      return (
        <View style={[styles.doctorAvatar, { backgroundColor: '#E8F5E8' }]}>
          <Ionicons name="person" size={30} color="#4CAF50" />
        </View>
      );
    } else {
      return (
        <View style={[styles.doctorAvatar, { backgroundColor: '#E3F2FD' }]}>
          <Ionicons name="person" size={30} color="#2196F3" />
        </View>
      );
    }
  };

  const renderConsultationItem = (item: ConsultationHistory) => (
    <View key={item.id} style={styles.historyCard}>
      <View style={styles.doctorInfo}>
        {renderDoctorAvatar(item.doctorImage)}
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <View style={[
            styles.statusBadge, 
            item.status === 'Online' ? styles.statusOnline : styles.statusBusy
          ]}>
            <Text style={[
              styles.statusText,
              item.status === 'Online' ? styles.statusTextOnline : styles.statusTextBusy
            ]}>
              {item.status}
            </Text>
          </View>
          <Text style={styles.doctorDescription}>{item.description}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#999" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
          <View style={styles.detailBadge}>
            <Ionicons name="chevron-forward" size={12} color="#4CAF50" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAnalysisItem = (item: AnalysisHistory) => (
    <View key={item.id} style={styles.historyCard}>
      <View style={styles.analysisHeader}>
        <Text style={styles.analysisTitle}>{item.title}</Text>
        <View style={styles.analysisTag}>
          <Text style={styles.analysisTagText}>{item.tag}</Text>
        </View>
      </View>
      
      <Text style={styles.analysisDescription}>{item.description}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#999" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
          <View style={styles.detailBadge}>
            <Ionicons name="chevron-forward" size={12} color="#4CAF50" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#2E8B8B" />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Content Card */}
          <View style={styles.mainCard}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.iconWrapper}>
                <View style={styles.historyIcon}>
                  <Ionicons name="document-text" size={30} color="white" />
                  <View style={styles.clockOverlay}>
                    <Ionicons name="time" size={16} color="white" />
                  </View>
                </View>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.title}>Riwayat Aktivitas</Text>
                <Text style={styles.subtitle}>
                  Lihat kembali riwayat konsultasi dan analisis nutrisi Anda sebelumnya.
                </Text>
              </View>
            </View>

            {/* Tab Section */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'konsultasi' && styles.activeTab]}
                onPress={() => setActiveTab('konsultasi')}
              >
                <Text style={[styles.tabText, activeTab === 'konsultasi' && styles.activeTabText]}>
                  Konsultasi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'analisis' && styles.activeTab]}
                onPress={() => setActiveTab('analisis')}
              >
                <Text style={[styles.tabText, activeTab === 'analisis' && styles.activeTabText]}>
                  Analisis gizi
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
              {activeTab === 'konsultasi' ? (
                <View style={styles.historyList}>
                  {consultationHistory.map(renderConsultationItem)}
                </View>
              ) : (
                <View style={styles.historyList}>
                  {analysisHistory.map(renderAnalysisItem)}
                </View>
              )}
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
  scrollView: {
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    margin: 20,
    marginTop: 60,
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
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
  },
  iconWrapper: {
    marginRight: 15,
  },
  historyIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  clockOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    backgroundColor: '#2E8B8B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  contentSection: {
    flex: 1,
  },
  historyList: {
    paddingTop: 5,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  doctorInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  statusOnline: {
    backgroundColor: '#E8F5E8',
  },
  statusBusy: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: '#4CAF50',
  },
  statusTextBusy: {
    color: '#FF9800',
  },
  doctorDescription: {
    fontSize: 13,
    color: '#777',
    lineHeight: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  analysisTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  analysisTag: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  analysisTagText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  analysisDescription: {
    fontSize: 13,
    color: '#777',
    lineHeight: 16,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginRight: 6,
  },
  detailBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
