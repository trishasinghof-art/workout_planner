const USE_PROXY = process.env.NODE_ENV === 'development';
const MEAL_PLAN_API_URL = USE_PROXY
  ? '/api/meal-plan'
  : 'https://meal-plan-new-api.onrender.com';

export async function generateMealPlan(macros, userPreferences = {}) {
  try {
    const requestBody = {
      calories: macros.calories || 2000,
      protein: macros.protein || 150,
      carbs: macros.carbs || 200,
      fat: macros.fat || 65,
      diet_type: userPreferences.dietType?.toLowerCase() || 'balanced',
      meals_per_day: userPreferences.mealsPerDay || 4,
      allergies: userPreferences.allergies || [],
      disliked_foods: userPreferences.dislikedFoods || [],
      cuisine_preference: userPreferences.cuisinePreference || 'any',
    };

    console.log('Generating meal plan with data:', requestBody);
    console.log('Using API URL:', `${MEAL_PLAN_API_URL}/generate`);

    const response = await fetch(`${MEAL_PLAN_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Meal Plan API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Meal Plan API Error:', errorText);
      throw new Error(`Meal Plan API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Meal Plan API Response:', data);

    return transformMealPlanResponse(data, macros, userPreferences);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return getDefaultMealPlan(macros, userPreferences);
  }
}

function transformMealPlanResponse(apiData, macros, userPreferences) {
  let meals = [];
  if (apiData.meals && Array.isArray(apiData.meals)) {
    meals = apiData.meals;
  } else if (apiData.meal_plan && Array.isArray(apiData.meal_plan)) {
    meals = apiData.meal_plan;
  } else if (apiData.daily_meals && Array.isArray(apiData.daily_meals)) {
    meals = apiData.daily_meals;
  } else if (Array.isArray(apiData)) {
    meals = apiData;
  }

  if (meals.length === 0) {
    return getDefaultMealPlan(macros, userPreferences);
  }

  const transformedMeals = meals.map((meal, index) => ({
    name: meal.name || meal.meal_name || meal.meal_type || getMealName(index),
    time: meal.time || meal.meal_time || getMealTime(index),
    calories: meal.calories || meal.cals || Math.round(macros.calories / meals.length),
    items: meal.items || meal.food_items || meal.foods || meal.ingredients || [],
    macros: {
      protein: meal.protein || meal.macros?.protein || Math.round(macros.protein / meals.length),
      carbs: meal.carbs || meal.carbohydrates || meal.macros?.carbs || Math.round(macros.carbs / meals.length),
      fat: meal.fat || meal.macros?.fat || Math.round(macros.fat / meals.length),
    },
    description: meal.description || meal.notes || undefined
  }));

  return {
    dietType: userPreferences.dietType || 'Balanced',
    totalCalories: macros.calories,
    macros: {
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
    },
    meals: transformedMeals,
    quote: apiData.quote || getMotivationalQuote(userPreferences.goal),
    quoteSub: apiData.quote_sub || "Stay committed to your nutrition goals"
  };
}

function getMealName(index) {
  const names = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Post-Workout'];
  return names[index] || `Meal ${index + 1}`;
}

function getMealTime(index) {
  const times = ['7:30 AM', '12:30 PM', '4:00 PM', '7:30 PM', '9:00 PM'];
  return times[index] || '12:00 PM';
}

function getMotivationalQuote(goal) {
  const quotes = {
    'weight loss': 'Small changes lead to big transformations.',
    'muscle gain': 'Muscles are built in the kitchen, revealed in the gym.',
    'maintenance': 'Eat well, live well, be well – your body is your temple.',
  };
  return quotes[goal?.toLowerCase()] || 'Fuel your body with quality nutrients.';
}

function getDefaultMealPlan(macros, userPreferences) {
  const isVegetarian = userPreferences.dietType?.toLowerCase().includes('veg') 
                       && !userPreferences.dietType?.toLowerCase().includes('non');

  const mealsPerDay = userPreferences.mealsPerDay || 4;
  const caloriesPerMeal = Math.round(macros.calories / mealsPerDay);
  const proteinPerMeal = Math.round(macros.protein / mealsPerDay);
  const carbsPerMeal = Math.round(macros.carbs / mealsPerDay);
  const fatPerMeal = Math.round(macros.fat / mealsPerDay);

  const defaultMeals = [
    {
      name: 'Breakfast',
      time: '7:30 AM',
      calories: caloriesPerMeal,
      items: isVegetarian 
        ? ['Oatmeal with berries and nuts', 'Scrambled tofu (100g)', 'Green tea']
        : ['Scrambled eggs (3 whole)', 'Whole wheat toast (2 slices)', 'Turkey sausage', 'Orange juice'],
      macros: { protein: proteinPerMeal, carbs: carbsPerMeal, fat: fatPerMeal }
    },
    {
      name: 'Lunch',
      time: '12:30 PM',
      calories: caloriesPerMeal,
      items: isVegetarian
        ? ['Paneer tikka (150g)', 'Brown rice (1 cup)', 'Mixed vegetable salad', 'Chickpea curry']
        : ['Grilled chicken breast (180g)', 'Brown rice (1.5 cups)', 'Steamed vegetables', 'Avocado'],
      macros: { protein: proteinPerMeal, carbs: carbsPerMeal, fat: fatPerMeal }
    },
    {
      name: 'Snack',
      time: '4:00 PM',
      calories: caloriesPerMeal,
      items: isVegetarian
        ? ['Greek yogurt (1 cup)', 'Mixed nuts (40g)', 'Apple slices', 'Protein shake (plant-based)']
        : ['Greek yogurt (1 cup)', 'Almonds (40g)', 'Banana', 'Protein shake (whey)'],
      macros: { protein: proteinPerMeal, carbs: carbsPerMeal, fat: fatPerMeal }
    },
    {
      name: 'Dinner',
      time: '7:30 PM',
      calories: caloriesPerMeal,
      items: isVegetarian
        ? ['Tofu stir-fry (150g)', 'Quinoa (1 cup)', 'Steamed broccoli and carrots', 'Mixed green salad']
        : ['Baked salmon (150g)', 'Sweet potato (1 medium)', 'Grilled asparagus', 'Mixed green salad'],
      macros: { protein: proteinPerMeal, carbs: carbsPerMeal, fat: fatPerMeal }
    }
  ];

  return {
    dietType: userPreferences.dietType || 'Balanced',
    totalCalories: macros.calories,
    macros: {
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
    },
    meals: defaultMeals.slice(0, mealsPerDay),
    quote: getMotivationalQuote(userPreferences.goal),
    quoteSub: "Stay committed to your nutrition goals"
  };
}
