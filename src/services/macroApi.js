const USE_PROXY = process.env.NODE_ENV === 'development';
const MACRO_API_URL = USE_PROXY 
  ? '/api/macro'
  : 'https://macro-api-igmt.onrender.com';

export async function calculateMacros(userProfile) {
  try {
    const requestBody = {
      age: userProfile.age || 25,
      gender: userProfile.gender?.toLowerCase() || 'male',
      weight: userProfile.weight || 70,
      height: userProfile.height || 170,
      activity_level: userProfile.activityLevel?.toLowerCase() || 'moderate',
      goal: userProfile.goal?.toLowerCase() || 'maintenance',
      diet_type: userProfile.dietType?.toLowerCase() || 'balanced',
    };

    console.log('Calculating macros with data:', requestBody);
    console.log('Using API URL:', `${MACRO_API_URL}/calculate`);

    const response = await fetch(`${MACRO_API_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Macro API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Macro API Error:', errorText);
      throw new Error(`Macro API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Macro API Response:', data);

    return {
      calories: data.calories || data.total_calories || data.daily_calories || 2000,
      protein: data.protein || data.protein_grams || 150,
      carbs: data.carbs || data.carbohydrates || data.carbs_grams || 200,
      fat: data.fat || data.fat_grams || 65,
      tdee: data.tdee || data.maintenance_calories || null,
      bmr: data.bmr || data.basal_metabolic_rate || null,
      rawResponse: data
    };
  } catch (error) {
    console.error('Error calculating macros:', error);
    return getDefaultMacros(userProfile.goal);
  }
}

function getDefaultMacros(goal) {
  const goalLower = goal?.toLowerCase() || 'maintenance';
  
  if (goalLower.includes('loss') || goalLower.includes('cut')) {
    return {
      calories: 1800,
      protein: 135,
      carbs: 160,
      fat: 50,
      tdee: 2300,
      bmr: 1600
    };
  } else if (goalLower.includes('gain') || goalLower.includes('bulk') || goalLower.includes('muscle')) {
    return {
      calories: 2800,
      protein: 200,
      carbs: 320,
      fat: 80,
      tdee: 2500,
      bmr: 1800
    };
  } else {
    return {
      calories: 2200,
      protein: 165,
      carbs: 240,
      fat: 65,
      tdee: 2200,
      bmr: 1700
    };
  }
}
