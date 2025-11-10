import { getMockDietPlan } from './mockNutritionData';
import { calculateMacros } from './macroApi';
import { generateMealPlan } from './mealPlanApi';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

export async function getDietPlan(userPreferences) {
  if (USE_MOCK_DATA) {
    console.log('Using mock diet data');
    console.log('Diet Type:', userPreferences.dietType, 'Goal:', userPreferences.goal);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockDietPlan(userPreferences.dietType, userPreferences.goal));
      }, 500);
    });
  }

  try {
    console.log('=== Starting AI-Powered Nutrition Plan Generation ===');
    console.log('User Preferences:', userPreferences);

    console.log('Step 1: Calculating macros...');
    const macros = await calculateMacros({
      age: userPreferences.age,
      gender: userPreferences.gender,
      weight: userPreferences.weight,
      height: userPreferences.height,
      activityLevel: userPreferences.activityLevel,
      goal: userPreferences.goal,
      dietType: userPreferences.dietType,
    });
    console.log('Calculated Macros:', macros);
    
    console.log('Step 2: Generating meal plan...');
    const mealPlan = await generateMealPlan(macros, {
      dietType: userPreferences.dietType,
      mealsPerDay: userPreferences.mealsPerDay || 4,
      allergies: userPreferences.allergies || [],
      dislikedFoods: userPreferences.dislikedFoods || [],
      cuisinePreference: userPreferences.cuisinePreference,
      goal: userPreferences.goal,
    });
    console.log('Generated Meal Plan:', mealPlan);

    const dietPlan = {
      ...mealPlan,
      tdee: macros.tdee,
      bmr: macros.bmr,
    };

    console.log('=== Complete Diet Plan Generated ===');
    console.log(dietPlan);
    
    return dietPlan;

  } catch (error) {
    console.error('Error in AI nutrition plan generation:', error);
    console.error('Error details:', error.message);
    console.log('Using fallback diet data');
    console.log('Diet Type:', userPreferences.dietType, 'Goal:', userPreferences.goal);
    return getMockDietPlan(userPreferences.dietType, userPreferences.goal);
  }
}


export async function getDailyMacros(userId, date = new Date().toISOString().split('T')[0]) {
  return {
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    date: date,
  };
}

export async function logMeal(userId, mealData) {
  console.log('logMeal called with:', userId, mealData);
  return { success: true, message: 'Meal logging not yet implemented' };
}

export async function getFoodNutrition(foodName) {
  console.log('getFoodNutrition called with:', foodName);
  return { calories: 0, protein: 0, carbs: 0, fat: 0, name: foodName };
}

export async function getMealSuggestions(userId, remainingMacros) {
  console.log('getMealSuggestions called with:', userId, remainingMacros);
  return [];
}
