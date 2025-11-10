import { getMockWorkoutByLevel } from './mockWorkoutData';
import { predictWorkoutType } from './workoutTypeApi';
import { getExerciseSuggestions } from './exerciseApi';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

/**
 * Gets workout recommendations using the integrated AI APIs
 * Step 1: Predict workout type based on user profile
 * Step 2: Get exercise suggestions based on predicted workout type
 * @param {Object} userProfile - User profile data
 * @returns {Promise<Object>} Complete workout plan with exercises
 */
export async function getWorkoutRecommendations(userProfile) {
  if (USE_MOCK_DATA) {
    console.log('Using mock workout data');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockWorkoutByLevel(userProfile.level));
      }, 500);
    });
  }

  try {
    console.log('=== Starting AI-Powered Workout Generation ===');
    console.log('User Profile:', userProfile);

    // Step 1: Predict workout type based on user profile
    console.log('Step 1: Predicting workout type...');
    const workoutTypePrediction = await predictWorkoutType(userProfile);
    console.log('Predicted Workout Type:', workoutTypePrediction.workoutType);
    
    // Step 2: Get exercise suggestions based on predicted workout type
    console.log('Step 2: Fetching exercise suggestions...');
    const exercises = await getExerciseSuggestions(
      workoutTypePrediction.workoutType, 
      userProfile
    );
    console.log('Exercise Suggestions:', exercises);

    // Step 3: Combine into a complete workout plan
    const workoutPlan = {
      workoutName: `${workoutTypePrediction.workoutType} - Day ${userProfile.day || 1}`,
      workoutType: workoutTypePrediction.workoutType,
      confidence: workoutTypePrediction.confidence,
      duration: calculateDuration(exercises),
      exercises: exercises,
      fitnessLevel: userProfile.level,
      day: userProfile.day || 1
    };

    console.log('=== Complete Workout Plan Generated ===');
    console.log(workoutPlan);
    
    return workoutPlan;

  } catch (error) {
    console.error('Error in AI workout generation:', error);
    console.error('Error details:', error.message);
    console.log('Using fallback workout data');
    return getMockWorkoutByLevel(userProfile.level);
  }
}

/**
 * Calculate total duration based on exercises
 * @param {Array} exercises - Array of exercises
 * @returns {number} Duration in minutes
 */
function calculateDuration(exercises) {
  if (!exercises || exercises.length === 0) return 30;
  
  // Estimate: (sets * reps * 3 seconds per rep) + (sets * rest time)
  const totalSeconds = exercises.reduce((total, exercise) => {
    const workTime = (exercise.sets || 3) * (exercise.reps || 10) * 3;
    const restTime = (exercise.sets || 3) * (exercise.rest || 60);
    return total + workTime + restTime;
  }, 0);
  
  return Math.round(totalSeconds / 60);
}

function transformWorkoutResponse(apiData, fitnessLevel) {
  if (apiData.exercises && apiData.workoutName) {
    return apiData;
  }

  const getWorkoutName = () => {
    if (apiData.workoutName) return apiData.workoutName;
    if (apiData.workout_name) return apiData.workout_name;
    if (apiData.name) return apiData.name;
    if (apiData.workout_type) return apiData.workout_type;
    return `${capitalize(fitnessLevel || 'Full')} Body Workout`;
  };

  const getDuration = () => {
    if (apiData.duration) return apiData.duration;
    if (apiData.total_duration) return apiData.total_duration;
    if (apiData.workout_duration) return apiData.workout_duration;
    const exercises = apiData.exercises || apiData.exercise_list || apiData.workouts || [];
    if (exercises.length > 0) {
      return exercises.length * 8;
    }
    return 45;
  };

  const transformExercises = () => {
    const rawExercises = apiData.exercises || apiData.exercise_list || apiData.workouts || apiData.workout_plan || [];
    
    if (rawExercises.length === 0) {
      return getDefaultExercises(fitnessLevel);
    }

    return rawExercises.map((exercise, index) => ({
      name: exercise.name || exercise.exercise_name || exercise.exercise || `Exercise ${index + 1}`,
      sets: exercise.sets || exercise.num_sets || 3,
      reps: exercise.reps || exercise.num_reps || exercise.repetitions || 12,
      rest: exercise.rest || exercise.rest_time || exercise.rest_seconds || 60,
      weight: exercise.weight || exercise.weight_kg || undefined,
      description: exercise.description || exercise.instructions || undefined
    }));
  };

  return {
    workoutName: getWorkoutName(),
    duration: getDuration(),
    exercises: transformExercises()
  };
}

function getDefaultExercises(level) {
  const levelLower = level?.toLowerCase() || 'beginner';
  
  if (levelLower === 'advanced') {
    return [
      { name: 'Barbell Squats', sets: 4, reps: 8, rest: 90, weight: 60 },
      { name: 'Bench Press', sets: 4, reps: 8, rest: 90, weight: 50 },
      { name: 'Deadlifts', sets: 3, reps: 6, rest: 120, weight: 80 },
      { name: 'Pull-ups', sets: 3, reps: 10, rest: 90 },
      { name: 'Overhead Press', sets: 3, reps: 8, rest: 90, weight: 35 }
    ];
  } else if (levelLower === 'intermediate') {
    return [
      { name: 'Goblet Squats', sets: 3, reps: 12, rest: 75 },
      { name: 'Push-ups', sets: 3, reps: 15, rest: 60 },
      { name: 'Dumbbell Rows', sets: 3, reps: 12, rest: 75 },
      { name: 'Lunges', sets: 3, reps: 12, rest: 60 },
      { name: 'Plank', sets: 3, reps: 45, rest: 60 }
    ];
  } else {
    return [
      { name: 'Bodyweight Squats', sets: 3, reps: 12, rest: 60 },
      { name: 'Push-ups', sets: 3, reps: 10, rest: 60 },
      { name: 'Plank', sets: 3, reps: 30, rest: 45 },
      { name: 'Lunges', sets: 3, reps: 10, rest: 60 },
      { name: 'Mountain Climbers', sets: 3, reps: 20, rest: 60 }
    ];
  }
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Fetches specific exercise details
 * NOTE: Currently not implemented - placeholder for future feature
 * @param {string} exerciseId - The ID of the exercise
 * @returns {Promise<Object>} Exercise details
 */
export async function getExerciseDetails(exerciseId) {
  console.log('getExerciseDetails called with:', exerciseId);
  // TODO: Implement when exercise detail API is available
  return Promise.reject(new Error('Exercise details API not yet implemented'));
}

/**
 * Save workout completion/progress to API
 * NOTE: Currently not implemented - placeholder for future feature
 * @param {string} userId - User ID
 * @param {Object} workoutData - Workout completion data
 * @returns {Promise<Object>} Response from API
 */
export async function saveWorkoutProgress(userId, workoutData) {
  console.log('saveWorkoutProgress called with:', userId, workoutData);
  // TODO: Implement when progress tracking API is available
  return Promise.reject(new Error('Progress tracking API not yet implemented'));
}
