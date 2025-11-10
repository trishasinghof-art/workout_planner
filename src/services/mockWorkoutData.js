// Example API Response Mock
// Use this to test your frontend before your actual API is ready

export const mockWorkoutResponse = {
  workoutName: "Beginner Full Body Workout",
  duration: 30,
  exercises: [
    {
      name: "Bodyweight Squats",
      sets: 3,
      reps: 12,
      rest: 60,
      description: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair"
    },
    {
      name: "Push-ups",
      sets: 3,
      reps: 10,
      rest: 60,
      description: "Start in plank position, lower body until chest nearly touches floor"
    },
    {
      name: "Plank",
      sets: 3,
      reps: 30, // 30 seconds
      rest: 45,
      description: "Hold a push-up position with forearms on the ground"
    },
    {
      name: "Lunges",
      sets: 3,
      reps: 10, // per leg
      rest: 60,
      description: "Step forward with one leg, lowering your hips until both knees are bent at 90 degrees"
    }
  ]
};

export const mockIntermediateWorkout = {
  workoutName: "Intermediate Strength Training",
  duration: 45,
  exercises: [
    {
      name: "Barbell Squats",
      sets: 4,
      reps: 10,
      rest: 90,
      weight: 60 // kg
    },
    {
      name: "Bench Press",
      sets: 4,
      reps: 8,
      rest: 90,
      weight: 50
    },
    {
      name: "Deadlifts",
      sets: 3,
      reps: 8,
      rest: 120,
      weight: 70
    },
    {
      name: "Pull-ups",
      sets: 3,
      reps: 8,
      rest: 90
    },
    {
      name: "Dumbbell Rows",
      sets: 3,
      reps: 12,
      rest: 60,
      weight: 20
    }
  ]
};

export const mockAdvancedWorkout = {
  workoutName: "Advanced HIIT Circuit",
  duration: 60,
  exercises: [
    {
      name: "Burpees",
      sets: 4,
      reps: 20,
      rest: 30
    },
    {
      name: "Box Jumps",
      sets: 4,
      reps: 15,
      rest: 45
    },
    {
      name: "Kettlebell Swings",
      sets: 4,
      reps: 20,
      rest: 45,
      weight: 24
    },
    {
      name: "Mountain Climbers",
      sets: 4,
      reps: 30,
      rest: 30
    },
    {
      name: "Battle Ropes",
      sets: 4,
      reps: 45, // seconds
      rest: 60
    }
  ]
};

// Function to get mock data based on fitness level
export function getMockWorkoutByLevel(level) {
  switch(level?.toLowerCase()) {
    case 'beginner':
      return mockWorkoutResponse;
    case 'intermediate':
      return mockIntermediateWorkout;
    case 'advanced':
      return mockAdvancedWorkout;
    default:
      return mockWorkoutResponse;
  }
}
