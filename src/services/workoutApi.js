import { getMockWorkoutByLevel } from './mockWorkoutData';
import { predictWorkoutType } from './workoutTypeApi';
import { getExerciseSuggestions } from './exerciseApi';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

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

    console.log('Step 1: Predicting workout type...');
    const workoutTypePrediction = await predictWorkoutType(userProfile);
    console.log('Predicted Workout Type:', workoutTypePrediction.workoutType);
    console.log('Step 2: Fetching exercise suggestions...');
    const exercises = await getExerciseSuggestions(
      workoutTypePrediction.workoutType, 
      userProfile
    );
    console.log('Exercise Suggestions:', exercises);

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

function calculateDuration(exercises) {
  if (!exercises || exercises.length === 0) return 30;
  
  const totalSeconds = exercises.reduce((total, exercise) => {
    const workTime = (exercise.sets || 3) * (exercise.reps || 10) * 3;
    const restTime = (exercise.sets || 3) * (exercise.rest || 60);
    return total + workTime + restTime;
  }, 0);
  
  return Math.round(totalSeconds / 60);
}

export async function getExerciseDetails(exerciseId) {
  console.log('getExerciseDetails called with:', exerciseId);
  // TODO: Implement when exercise detail API is available
  return Promise.reject(new Error('Exercise details API not yet implemented'));
}

export async function saveWorkoutProgress(userId, workoutData) {
  console.log('saveWorkoutProgress called with:', userId, workoutData);
  // TODO: Implement when progress tracking API is available
  return Promise.reject(new Error('Progress tracking API not yet implemented'));
}
