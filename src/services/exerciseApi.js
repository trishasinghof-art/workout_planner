const USE_PROXY = process.env.NODE_ENV === 'development';
const EXERCISE_API_URL = USE_PROXY
  ? '/api/exercise'
  : 'https://exercise-api-cvza.onrender.com';

export async function getExerciseSuggestions(workoutType, userProfile = {}) {
  try {
    const requestBody = {
      workout_type: workoutType,
      fitness_level: userProfile.level?.toLowerCase() || 'beginner',
      day_index: userProfile.day || 1,
    };

    console.log('Fetching exercise suggestions with data:', requestBody);
    console.log('Using API URL:', `${EXERCISE_API_URL}/get_day_exercises`);

    const response = await fetch(`${EXERCISE_API_URL}/get_day_exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Exercise API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Exercise API Error:', errorText);
      throw new Error(`Exercise API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Exercise API Response:', data);

    return transformExerciseResponse(data, userProfile.level);
  } catch (error) {
    console.error('Error fetching exercise suggestions:', error);
    return getDefaultExercises(userProfile.level || 'beginner');
  }
}

function transformExerciseResponse(apiData, fitnessLevel) {
  let exercises = [];

  if (apiData.exercises && Array.isArray(apiData.exercises)) {
    exercises = apiData.exercises;
  } else if (apiData.suggested_exercises && Array.isArray(apiData.suggested_exercises)) {
    exercises = apiData.suggested_exercises;
  } else if (apiData.workouts && Array.isArray(apiData.workouts)) {
    exercises = apiData.workouts;
  } else if (Array.isArray(apiData)) {
    exercises = apiData;
  }

  if (exercises.length === 0) {
    return getDefaultExercises(fitnessLevel);
  }

  return exercises.map((exercise, index) => ({
    name: exercise.name || exercise.exercise_name || exercise.exercise || `Exercise ${index + 1}`,
    sets: exercise.sets || exercise.num_sets || getSetsForLevel(fitnessLevel),
    reps: exercise.reps || exercise.num_reps || exercise.repetitions || getRepsForLevel(fitnessLevel),
    rest: exercise.rest || exercise.rest_time || exercise.rest_seconds || getRestForLevel(fitnessLevel),
    weight: exercise.weight || exercise.weight_kg || undefined,
    description: exercise.description || exercise.instructions || undefined,
    difficulty: exercise.difficulty || exercise.level || fitnessLevel
  }));
}

function getSetsForLevel(level) {
  const levelLower = level?.toLowerCase() || 'beginner';
  if (levelLower === 'advanced') return 4;
  if (levelLower === 'intermediate') return 3;
  return 3;
}

function getRepsForLevel(level) {
  const levelLower = level?.toLowerCase() || 'beginner';
  if (levelLower === 'advanced') return 8;
  if (levelLower === 'intermediate') return 10;
  return 12;
}

function getRestForLevel(level) {
  const levelLower = level?.toLowerCase() || 'beginner';
  if (levelLower === 'advanced') return 90;
  if (levelLower === 'intermediate') return 75;
  return 60;
}

function getDefaultExercises(level) {
  const levelLower = level?.toLowerCase() || 'beginner';
  
  if (levelLower === 'advanced') {
    return [
      { name: 'Barbell Squats', sets: 4, reps: 8, rest: 90, weight: 60, description: 'Compound leg exercise' },
      { name: 'Bench Press', sets: 4, reps: 8, rest: 90, weight: 50, description: 'Upper body strength' },
      { name: 'Deadlifts', sets: 3, reps: 6, rest: 120, weight: 80, description: 'Full body strength' },
      { name: 'Pull-ups', sets: 3, reps: 10, rest: 90, description: 'Back and biceps' },
      { name: 'Overhead Press', sets: 3, reps: 8, rest: 90, weight: 35, description: 'Shoulder strength' }
    ];
  } else if (levelLower === 'intermediate') {
    return [
      { name: 'Goblet Squats', sets: 3, reps: 12, rest: 75, description: 'Lower body exercise' },
      { name: 'Push-ups', sets: 3, reps: 15, rest: 60, description: 'Upper body push' },
      { name: 'Dumbbell Rows', sets: 3, reps: 12, rest: 75, description: 'Back exercise' },
      { name: 'Lunges', sets: 3, reps: 12, rest: 60, description: 'Unilateral leg work' },
      { name: 'Plank', sets: 3, reps: 45, rest: 60, description: 'Core stability' }
    ];
  } else {
    return [
      { name: 'Bodyweight Squats', sets: 3, reps: 12, rest: 60, description: 'Basic leg exercise' },
      { name: 'Push-ups', sets: 3, reps: 10, rest: 60, description: 'Upper body strength' },
      { name: 'Plank', sets: 3, reps: 30, rest: 45, description: 'Core strength' },
      { name: 'Lunges', sets: 3, reps: 10, rest: 60, description: 'Lower body exercise' },
      { name: 'Mountain Climbers', sets: 3, reps: 20, rest: 60, description: 'Cardio and core' }
    ];
  }
}
