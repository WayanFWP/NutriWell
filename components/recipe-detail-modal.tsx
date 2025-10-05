import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
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

interface RecipeDetailModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeDetailModal({ visible, recipe, onClose }: RecipeDetailModalProps) {
  if (!recipe) return null;

  const ingredients = [
    '200g fillet salmon',
    '1 ikat asparagus, buang ujung kerasnya',
    '1 sdm minyak zaitun',
    '1 buah lemon, iris tipis',
    '2 sdm dill segar, cincang',
    'Garam dan lada hitam'
  ];

  const cookingSteps = [
    'Panaskan oven hingga 200°C.',
    'Letakkan salmon dan asparagus di atas loyang yang dilapisi kertas roti.',
    'Siram dengan minyak zaitun, tabur dengan garam, lada, dan dill cincang.',
    'Letakkan irisan lemon di atas salmon.',
    'Panggang selama 15-20 menit, atau hingga salmon matang sempurna.',
    'Sajikan segera.'
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Recipe Image */}
          <View style={styles.imageContainer}>
            <View style={styles.recipeImagePlaceholder}>
              <Ionicons name="restaurant" size={60} color="#4CAF50" />
            </View>
          </View>

          {/* Recipe Content */}
          <View style={styles.contentContainer}>
            {/* Recipe Title */}
            <Text style={styles.recipeTitle}>{recipe.title}</Text>

            {/* Recipe Tags */}
            <View style={styles.tagsContainer}>
              {recipe.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Nutrition Info */}
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <Ionicons name="flame" size={24} color="#FF6B35" />
                <Text style={styles.nutritionValue}>{recipe.calories}</Text>
                <Text style={styles.nutritionLabel}>Kkal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Ionicons name="fitness" size={24} color="#4FC3F7" />
                <Text style={styles.nutritionValue}>{recipe.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Ionicons name="leaf" size={24} color="#4CAF50" />
                <Text style={styles.nutritionValue}>{recipe.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Karbo</Text>
              </View>
            </View>

            {/* Ingredients Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bahan-bahan</Text>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            {/* Cooking Steps */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cara Memasak</Text>
              {cookingSteps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.actionButton} onPress={onClose}>
              <Text style={styles.actionButtonText}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#2E8B8B',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
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
  imageContainer: {
    height: 250,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 10,
    marginTop: 2,
  },
  ingredientText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
