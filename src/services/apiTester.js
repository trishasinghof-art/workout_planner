async function testNutritionAPI() {
  const API_URL = 'https://exercise-api-cvza.onrender.com';
  
  console.log('Testing Nutrition/Diet API...');
  console.log('API URL:', API_URL);
  
  const endpoints = [
    { path: '/diet-plan', method: 'POST' },
    { path: '/predict', method: 'POST' },
    { path: '/nutrition', method: 'POST' },
    { path: '/meal-plan', method: 'POST' },
    { path: '/', method: 'GET' },
  ];
  
  const testData = {
    dietType: "Vegetarian",
    goal: "weight loss",
    age: 28,
    gender: "male",
    weight: 70,
    height: 175,
    activityLevel: "moderate",
    calorieTarget: 2000,
    mealsPerDay: 4
  };
  
  for (const endpoint of endpoints) {
    try {
  console.log(`\nTesting ${endpoint.method} ${endpoint.path}...`);
      
      const options = {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (endpoint.method === 'POST') {
        options.body = JSON.stringify(testData);
      }
      
      const response = await fetch(`${API_URL}${endpoint.path}`, options);
  console.log(`Status: ${response.status} ${response.statusText}`);
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
  console.log('Response:', data);
      } else {
        const text = await response.text();
  console.log('Response:', text);
      }
    } catch (error) {
  console.error(`Error:`, error.message);
    }
  }
}

async function testWorkoutAPI() {
  const API_URL = 'https://workout-type-api.onrender.com';
  
  console.log('\n\nTesting Workout API...');
  console.log('API URL:', API_URL);
  
  const testData = {
    fitnessLevel: "intermediate",
    workoutsPerWeek: 4,
    goal: "muscle gain",
    age: 28,
    gender: "male",
    weight: 75,
    height: 180,
    targetWeight: 80,
    day: 1
  };
  
  try {
  console.log('\nTesting POST /predict...');
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
  console.log(`Status: ${response.status} ${response.statusText}`);
    const data = await response.json();
  console.log('Response:', data);
  } catch (error) {
  console.error(`Error:`, error.message);
  }
}

async function runTests() {
  console.log('Starting API Tests...\n');
  console.log('=' . repeat(50));
  
  await testNutritionAPI();
  await testWorkoutAPI();
  
  console.log('\n' + '='.repeat(50));
  console.log('Tests Complete!');
  console.log('\nCheck the output above to see:');
  console.log('1. Which endpoints work');
  console.log('2. What data format the API expects');
  console.log('3. What response format the API returns');
}

if (typeof window !== 'undefined') {
  window.testAPIs = runTests;
  window.testNutrition = testNutritionAPI;
  window.testWorkout = testWorkoutAPI;
  
  console.log('API Testing Tools Loaded!');
  console.log('Run in browser console:');
  console.log('  window.testAPIs()      - Test all APIs');
  console.log('  window.testNutrition() - Test nutrition API only');
  console.log('  window.testWorkout()   - Test workout API only');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testNutritionAPI, testWorkoutAPI, runTests };
}
