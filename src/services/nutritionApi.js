import { getMockDietPlan } from './mockNutritionData';
import { calculateMacros } from './macroApi';
import { generateMealPlan } from './mealPlanApi';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

/**
 * Gets complete diet plan using integrated AI APIs
 * Step 1: Calculate macros based on user profile
 * Step 2: Generate meal plan based on calculated macros
 * @param {Object} userPreferences - User preferences and profile data
 * @returns {Promise<Object>} Complete diet plan with meals
 */
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

    // Step 1: Calculate macros based on user profile
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
    
    // Step 2: Generate meal plan based on calculated macros
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

    // Step 3: Combine into complete diet plan
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


/**
 * Fetches daily macros summary
 * @param {string} userId - User ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Object>} Macro nutrients summary
 */
export async function getDailyMacros(userId, date = new Date().toISOString().split('T')[0]) {
  // This returns the macros for display purposes
  // In a full implementation, this would fetch from a tracking database
  return {
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    date: date,
  };
}

/**
 * Log a meal (placeholder for future feature)
 * @param {string} userId - User ID
 * @param {Object} mealData - Meal data to log
 * @returns {Promise<Object>} Response
 */
export async function logMeal(userId, mealData) {
  console.log('logMeal called with:', userId, mealData);
  // TODO: Implement meal logging when tracking API is available
  return { success: true, message: 'Meal logging not yet implemented' };
}

/**
 * Get food nutrition info (placeholder for future feature)
 * @param {string} foodName - Name of the food
 * @returns {Promise<Object>} Nutrition information
 */
export async function getFoodNutrition(foodName) {
  console.log('getFoodNutrition called with:', foodName);
  // TODO: Implement when food database API is available
  return { calories: 0, protein: 0, carbs: 0, fat: 0, name: foodName };
}

/**
 * Get meal suggestions (placeholder for future feature)
 * @param {string} userId - User ID
 * @param {Object} remainingMacros - Remaining macros for the day
 * @returns {Promise<Array>} Meal suggestions
 */
export async function getMealSuggestions(userId, remainingMacros) {
  console.log('getMealSuggestions called with:', userId, remainingMacros);
  // TODO: Implement when meal suggestion API is available
  return [];
}
