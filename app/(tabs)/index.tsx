import BackgroundWrapper from '@/components/background-wrapper';
import { FeatureCard, TopFeatureCard } from '@/components/feature-cards';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const featuresData = [
    {
      id: 1,
      title: 'Rekomendasi Resep',
      image: require('@/assets/Feature/resep_trending.png'),
    },
    {
      id: 2,
      title: 'BMI Calculator',
      image: require('@/assets/Feature/BMI_Calculator.png'),
    },
    {
      id: 3,
      title: 'Analisis Nutrisi',
      image: require('@/assets/Feature/Analisis_Gizi.png'),
    },
    {
      id: 4,
      title: 'Konsultasi Ahli Gizi',
      image: require('@/assets/Feature/Konsultasi_Ahli_gizi.png'),
    },
  ];

  const topFeaturesData = [
    {
      id: 1,
      title: 'Rekomendasi Cerdas',
      description: 'Beritahu kami bahan apa yang Anda miliki dan kami akan sarankan resep lezat yang disesuaikan untuk Anda.',
      image: require('@/assets/Feature/resep_trending.png'),
    },
    {
      id: 2,
      title: 'Konsultasi Ahli Gizi',
      description: 'Konsultasi dengan dokter gizi terbaik. Raih tujuan kesehatan Anda melalui panduan nutrisi personal oleh para ahli terkemuka dan terpercaya.',
      image: require('@/assets/Feature/Konsultasi_Ahli_gizi.png'),
    },
    {
      id: 3,
      title: 'BMI Calculator',
      description: 'Hitung Indeks Massa Tubuh (BMI) dengan mudah untuk mengetahui status berat badan ideal Anda sebagai langkah awal menuju pola hidup yang lebih sehat',
      image: require('@/assets/Feature/BMI_Calculator.png'),
    },
    {
      id: 4,
      title: 'Analisis Nutrisi',
      description: 'Masukkan makanan dan bahan anda untuk mendapatkan analisis gizi, ringkasan kesehatan, dan saran perbaikan optimal untuk Anda.',
      image: require('@/assets/Feature/Analisis_Gizi.png'),
    },
  ];

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#2E8B8B" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.heartIcon}>
                {/*       image: require('@/assets/Feature/resep_trending.png'), */}
                <Image
                  source={require('@/assets/icons/Icon.png')}
                  style={styles.heartImage}
                />
              </View>
            </View>
            <View style={styles.profileContainer}>
              <Text style={styles.profileName}>M. Farid A.</Text>
              <View style={styles.profileImage}>
                <Text style={styles.profileText}>👤</Text>
              </View>
            </View>
          </View>
          
          {/* Wallet Balance */}
          <View style={styles.walletContainer}>
            <View style={styles.walletContent}>
              <Text style={styles.walletIcon}>💳</Text>
              <Text style={styles.walletAmount}>Rp 1.777.777</Text>
              <TouchableOpacity style={styles.topUpButton}>
                <Text style={styles.topUpText}>Top Up</Text>
                <Text style={styles.plusIcon}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <View style={styles.featuresGrid}>
            {featuresData.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                image={feature.image}
                onPress={() => {
                  if (feature.title === 'BMI Calculator') {
                    router.push('/bmi-calculator');
                  } else if (feature.title === 'Konsultasi Ahli Gizi') {
                    router.push('/konsultasi-gizi');
                  } else if (feature.title === 'Analisis Nutrisi') {
                    router.push('/analisis-nutrisi');
                  } else if (feature.title === 'Rekomendasi Resep') {
                    router.push('/rekomendasi-resep');
                  } else {
                    console.log(`Navigate to ${feature.title}`);
                  }
                }}
              />
            ))}
          </View>
        </View>

        {/* Top Features Section */}
        <View style={styles.topFeaturesSection}>
          <Text style={styles.topFeaturesTitle}>Top Features</Text>
          
          {topFeaturesData.map((feature) => (
            <TopFeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              onPress={() => {
                if (feature.title === 'BMI Calculator') {
                  router.push('/bmi-calculator');
                } else if (feature.title === 'Konsultasi Ahli Gizi') {
                  router.push('/konsultasi-gizi');
                } else if (feature.title === 'Analisis Nutrisi') {
                  router.push('/analisis-nutrisi');
                } else if (feature.title === 'Rekomendasi Cerdas') {
                  router.push('/rekomendasi-resep');
                } else {
                  console.log(`Navigate to ${feature.title}`);
                }
              }}
            />
          ))}
        </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flex: 1,
  },
  heartIcon: {
    width: 52,
    height: 52,
    backgroundColor: '#FFE4E1',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 20,
  },
  heartImage: {
    width: 42,
    height: 42,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileImage: {
    width: 40,
    height: 40,
    backgroundColor: '#FFE4E1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
  },
  walletContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
  },
  walletContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  topUpButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  topUpText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  plusIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginTop: -10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  topFeaturesSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  topFeaturesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
