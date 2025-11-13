const USE_PROXY = process.env.NODE_ENV === 'development';
const WORKOUT_TYPE_API_URL = USE_PROXY 
  ? '/api/workout-type'
  : 'https://workout-type-api.onrender.com';

export async function predictWorkoutType(userProfile) {
  try {
    const requestBody = {
      age: userProfile.age || 25,
      gender: userProfile.gender?.toLowerCase() || 'male',
      weight_kg: userProfile.weight || 70,
      height_cm: userProfile.height || 170,
      fitness_level: userProfile.level?.toLowerCase() || 'beginner',
      goal: userProfile.goal?.toLowerCase() || 'general fitness',
      workouts_per_week: userProfile.workoutsPerWeek || 3,
      target_weight: userProfile.targetWeight || userProfile.weight,
    };

    console.log('Predicting workout type with data:', requestBody);
    console.log('Using API URL:', `${WORKOUT_TYPE_API_URL}/predict`);

    const response = await fetch(`${WORKOUT_TYPE_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Workout Type API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Workout Type API Error:', errorText);
      throw new Error(`Workout Type API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Workout Type API Response:', data);

    return {
      workoutType: data.workout_type || data.workoutType || data.predicted_type || 'Full Body',
      confidence: data.confidence || null,
      rawResponse: data
    };
  } catch (error) {
    console.error('Error predicting workout type:', error);
    return {
      workoutType: 'Full Body',
      confidence: null,
      error: error.message
    };
  }
}
