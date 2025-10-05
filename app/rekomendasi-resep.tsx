import BackgroundWrapper from '@/components/background-wrapper';
import FooterNavigation from '@/components/footer-navigation';
import RecipeDetailModal from '@/components/recipe-detail-modal';
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

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: any;
  calories: number;
  protein: number;
  carbs: number;
  tags: string[];
}

export default function RekomendasiResepScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  
  const [searchText, setSearchText] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState(false);

  const availableIngredients = [
    'Ayam', 'Brokoli', 'Bawang Putih', 'Salmon', 'Wortel', 'Kentang',
    'Tomat', 'Bayam', 'Daging Sapi', 'Ikan Tuna', 'Jamur', 'Paprika'
  ];

  const getRecipesForIngredients = () => {
    const recipes: Recipe[] = [];
    
    if (selectedIngredients.includes('Salmon') || selectedIngredients.includes('Brokoli')) {
      recipes.push({
        id: '1',
        title: 'Salmon Panggang Dengan Lemon dan Brokoli',
        description: 'Hidangan utama yang elegan dan sehat. Salmon kaya akan Omega-3, paduan dengan lemon yang segar',
        image: require('@/assets/Feature/resep_trending.png'),
        calories: 450,
        protein: 40,
        carbs: 10,
        tags: ['Tinggi Protein', 'Rendah Karbohidrat', 'Cocok Untuk Diabetes', 'Tinggi Omega 3']
      });
    }

    if (selectedIngredients.includes('Ayam') || selectedIngredients.includes('Bawang Putih')) {
      recipes.push({
        id: '2',
        title: 'Ayam Panggang Bawang Putih dan Herbs',
        description: 'Ayam panggang yang gurih dengan aroma bawang putih dan herbs segar, rendah lemak dan tinggi protein',
        image: require('@/assets/Feature/resep_trending.png'),
        calories: 320,
        protein: 35,
        carbs: 8,
        tags: ['Tinggi Protein', 'Rendah Lemak', 'Bebas Gluten', 'High Fiber']
      });
    }

    // Default recipe if no specific ingredients match
    if (recipes.length === 0) {
      recipes.push({
        id: '1',
        title: 'Salmon Panggang Dengan Lemon dan Brokoli',
        description: 'Hidangan utama yang elegan dan sehat. Salmon kaya akan Omega-3, paduan dengan lemon yang segar',
        image: require('@/assets/Feature/resep_trending.png'),
        calories: 450,
        protein: 40,
        carbs: 10,
        tags: ['Tinggi Protein', 'Rendah Karbohidrat', 'Cocok Untuk Diabetes', 'Tinggi Omega 3']
      });
    }

    return recipes;
  };

  const handleIngredientToggle = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleSearch = () => {
    setShowRecipes(true);
  };

  const handleAddIngredient = () => {
    if (searchText.trim() && !selectedIngredients.includes(searchText.trim())) {
      setSelectedIngredients([...selectedIngredients, searchText.trim()]);
      setSearchText('');
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const renderIngredientTag = (ingredient: string) => {
    const isSelected = selectedIngredients.includes(ingredient);
    return (
      <TouchableOpacity
        key={ingredient}
        style={[styles.ingredientTag, isSelected && styles.ingredientTagSelected]}
        onPress={() => handleIngredientToggle(ingredient)}
      >
        <Text style={[styles.ingredientText, isSelected && styles.ingredientTextSelected]}>
          {ingredient}
        </Text>
        {isSelected && (
          <TouchableOpacity
            style={styles.removeIngredient}
            onPress={() => handleIngredientToggle(ingredient)}
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
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
                  source={require('@/assets/Feature/resep_trending.png')}
                  style={styles.featureIcon}
                />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.title}>Rekomendasi Resep</Text>
                <Text style={styles.subtitle}>
                  Punya bahan apa? Kami carikan resep seharnya
                </Text>
              </View>
            </View>

            {/* Search Section */}
            <View style={styles.searchSection}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Contoh : ayam, brokoli, bawang putih"
                  placeholderTextColor="#999"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              {/* Add Ingredients Button */}
              <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
                <Text style={styles.addButtonText}>Tambah</Text>
              </TouchableOpacity>

              {/* Selected Ingredients */}
              {selectedIngredients.length > 0 && (
                <View style={styles.selectedIngredientsContainer}>
                  <View style={styles.selectedIngredients}>
                    {selectedIngredients.map(ingredient => renderIngredientTag(ingredient))}
                  </View>
                </View>
              )}

              {/* Filter Category */}
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filter Kategori Resep</Text>
                <Ionicons name="options" size={20} color="#4CAF50" />
              </TouchableOpacity>

              {/* Search Button */}
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Ionicons name="search" size={20} color="white" />
                <Text style={styles.searchButtonText}>Hasilkan Rekomendasi</Text>
              </TouchableOpacity>
            </View>

            {/* Inspiration Section */}
            {!showRecipes && (
              <View style={styles.inspirationSection}>
                <Text style={styles.inspirationTitle}>Menunggu Inspirasi</Text>
                <View style={styles.inspirationIcon}>
                  <Ionicons name="bulb-outline" size={60} color="#4CAF50" />
                </View>
                <Text style={styles.inspirationText}>
                  Masukkan bahan-bahan yang{'\n'}
                  Anda miliki di atas, dan kami{'\n'}
                  akan menyajikan resep-resep{'\n'}
                  pilihan khusus untuk Anda.
                </Text>
              </View>
            )}

            {/* Recipe Results */}
            {showRecipes && (
              <View style={styles.recipesSection}>
                {getRecipesForIngredients().map((recipe) => (
                  <View key={recipe.id} style={styles.recipeCard}>
                    <View style={styles.recipeImageContainer}>
                      <View style={styles.recipePlaceholder}>
                        <Ionicons name="restaurant" size={40} color="#4CAF50" />
                        <Text style={styles.recipePlaceholderText}>Salmon & Brokoli</Text>
                      </View>
                    </View>
                    
                    <View style={styles.recipeInfo}>
                      {/* Recipe Tags */}
                      <View style={styles.recipeTags}>
                        {recipe.tags.map((tag, index) => (
                          <View key={index} style={styles.recipeTag}>
                            <Text style={styles.recipeTagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>

                      {/* Recipe Title */}
                      <Text style={styles.recipeTitle}>{recipe.title}</Text>

                      {/* Recipe Description */}
                      <Text style={styles.recipeDescription}>{recipe.description}</Text>

                      {/* Nutrition Info */}
                      <View style={styles.nutritionRow}>
                        <View style={styles.nutritionItem}>
                          <Ionicons name="flame" size={20} color="#FF6B35" />
                          <Text style={styles.nutritionValue}>{recipe.calories}</Text>
                          <Text style={styles.nutritionLabel}>Kkal</Text>
                        </View>
                        <View style={styles.nutritionItem}>
                          <Ionicons name="fitness" size={20} color="#4FC3F7" />
                          <Text style={styles.nutritionValue}>{recipe.protein}g</Text>
                          <Text style={styles.nutritionLabel}>Protein</Text>
                        </View>
                        <View style={styles.nutritionItem}>
                          <Ionicons name="leaf" size={20} color="#4CAF50" />
                          <Text style={styles.nutritionValue}>{recipe.carbs}g</Text>
                          <Text style={styles.nutritionLabel}>Karbo</Text>
                        </View>
                      </View>

                      {/* View Recipe Button */}
                      <TouchableOpacity 
                        style={styles.viewRecipeButton}
                        onPress={() => handleViewRecipe(recipe)}
                      >
                        <Text style={styles.viewRecipeButtonText}>Lihat Resep Lengkap</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Quick Add Ingredients */}
            {!showRecipes && (
              <View style={styles.quickAddSection}>
                <Text style={styles.quickAddTitle}>Bahan Populer:</Text>
                <View style={styles.quickAddGrid}>
                  {availableIngredients.slice(0, 6).map(ingredient => (
                    <TouchableOpacity
                      key={ingredient}
                      style={styles.quickAddItem}
                      onPress={() => handleIngredientToggle(ingredient)}
                    >
                      <Text style={styles.quickAddText}>{ingredient}</Text>
                    </TouchableOpacity>
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

        {/* Recipe Detail Modal */}
        <RecipeDetailModal 
          visible={showModal}
          recipe={selectedRecipe}
          onClose={handleCloseModal}
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
  searchSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  addButton: {
    backgroundColor: '#2E4057',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedIngredientsContainer: {
    marginBottom: 15,
  },
  selectedIngredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientTag: {
    backgroundColor: '#E8F5E8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ingredientTagSelected: {
    backgroundColor: '#4CAF50',
  },
  ingredientText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  ingredientTextSelected: {
    color: 'white',
  },
  removeIngredient: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inspirationSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  inspirationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inspirationIcon: {
    marginBottom: 20,
  },
  inspirationText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  recipesSection: {
    marginTop: 20,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recipeImageContainer: {
    width: '100%',
    height: 200,
  },
  recipePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
  },
  recipePlaceholderText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 10,
  },
  recipeInfo: {
    padding: 15,
  },
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 10,
  },
  recipeTag: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  recipeTagText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '500',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 15,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
  },
  viewRecipeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewRecipeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quickAddSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  quickAddTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAddItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickAddText: {
    fontSize: 12,
    color: '#666',
  },
});
