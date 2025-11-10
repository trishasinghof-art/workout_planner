import React, { useState } from 'react';
import { predictWorkoutType } from '../../services/workoutTypeApi';
import { getExerciseSuggestions } from '../../services/exerciseApi';
import { getWorkoutRecommendations } from '../../services/workoutApi';
import { calculateMacros } from '../../services/macroApi';
import { generateMealPlan } from '../../services/mealPlanApi';
import { getDietPlan } from '../../services/nutritionApi';

/**
 * API Tester Component
 * Use this to test the integrated workout and exercise APIs
 */
const ApiTester = () => {
  const [workoutTypeResult, setWorkoutTypeResult] = useState(null);
  const [exerciseResult, setExerciseResult] = useState(null);
  const [fullWorkoutResult, setFullWorkoutResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample user profile for testing
  const sampleProfile = {
    age: 25,
    gender: 'male',
    weight: 75,
    height: 175,
    level: 'intermediate',
    goal: 'muscle gain',
    workoutsPerWeek: 4,
    targetWeight: 80,
    day: 1
  };

  const testWorkoutTypeAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictWorkoutType(sampleProfile);
      setWorkoutTypeResult(result);
    } catch (err) {
      setError('Workout Type API Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testExerciseAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      // First get workout type
      const workoutType = workoutTypeResult?.workoutType || 'Full Body';
      const result = await getExerciseSuggestions(workoutType, sampleProfile);
      setExerciseResult(result);
    } catch (err) {
      setError('Exercise API Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testFullWorkoutFlow = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getWorkoutRecommendations(sampleProfile);
      setFullWorkoutResult(result);
    } catch (err) {
      setError('Full Workflow Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#0f0f1e', minHeight: '100vh' }}>
      <h1 style={{ color: '#B144FF', marginBottom: '20px' }}>🔬 API Integration Tester</h1>
      
      <div style={{ 
        background: '#1a1a2e', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px' 
      }}>
        <h3 style={{ color: '#fff', marginBottom: '10px' }}>Sample User Profile</h3>
        <pre style={{ 
          background: '#0f0f1e', 
          padding: '15px', 
          borderRadius: '5px', 
          overflow: 'auto',
          color: '#00ff88'
        }}>
          {JSON.stringify(sampleProfile, null, 2)}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={testWorkoutTypeAPI}
          disabled={loading}
          style={{
            background: '#B144FF',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            opacity: loading ? 0.6 : 1
          }}
        >
          1️⃣ Test Workout Type API
        </button>

        <button 
          onClick={testExerciseAPI}
          disabled={loading || !workoutTypeResult}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: (loading || !workoutTypeResult) ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            opacity: (loading || !workoutTypeResult) ? 0.6 : 1
          }}
        >
          2️⃣ Test Exercise API
        </button>

        <button 
          onClick={testFullWorkoutFlow}
          disabled={loading}
          style={{
            background: '#FF6B6B',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            opacity: loading ? 0.6 : 1
          }}
        >
          🚀 Test Full Workflow
        </button>
      </div>

      {loading && (
        <div style={{ 
          padding: '20px', 
          background: '#1a1a2e', 
          borderRadius: '10px',
          color: '#fff',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ⏳ Loading...
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '20px', 
          background: '#ff6b6b', 
          borderRadius: '10px',
          color: '#fff',
          marginBottom: '20px'
        }}>
          ❌ {error}
        </div>
      )}

      {workoutTypeResult && (
        <div style={{ 
          background: '#1a1a2e', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#B144FF', marginBottom: '15px' }}>
            ✅ Workout Type Prediction Result
          </h3>
          <pre style={{ 
            background: '#0f0f1e', 
            padding: '15px', 
            borderRadius: '5px', 
            overflow: 'auto',
            color: '#00ff88'
          }}>
            {JSON.stringify(workoutTypeResult, null, 2)}
          </pre>
        </div>
      )}

      {exerciseResult && (
        <div style={{ 
          background: '#1a1a2e', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '15px' }}>
            ✅ Exercise Suggestions Result ({exerciseResult.length} exercises)
          </h3>
          <pre style={{ 
            background: '#0f0f1e', 
            padding: '15px', 
            borderRadius: '5px', 
            overflow: 'auto',
            color: '#00ff88',
            maxHeight: '400px'
          }}>
            {JSON.stringify(exerciseResult, null, 2)}
          </pre>
        </div>
      )}

      {fullWorkoutResult && (
        <div style={{ 
          background: '#1a1a2e', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#FF6B6B', marginBottom: '15px' }}>
            ✅ Complete Workout Plan
          </h3>
          <div style={{ 
            background: '#0f0f1e', 
            padding: '20px', 
            borderRadius: '5px',
            color: '#fff'
          }}>
            <h4 style={{ color: '#B144FF', marginBottom: '10px' }}>
              {fullWorkoutResult.workoutName}
            </h4>
            <p style={{ color: '#9ca3af', marginBottom: '15px' }}>
              Type: <strong>{fullWorkoutResult.workoutType}</strong> | 
              Duration: <strong>{fullWorkoutResult.duration} min</strong>
              {fullWorkoutResult.confidence && ` | Confidence: ${Math.round(fullWorkoutResult.confidence * 100)}%`}
            </p>
            
            <h5 style={{ color: '#fff', marginBottom: '10px', marginTop: '20px' }}>
              Exercises ({fullWorkoutResult.exercises?.length || 0}):
            </h5>
            
            {fullWorkoutResult.exercises?.map((exercise, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#1a1a2e', 
                  padding: '15px', 
                  borderRadius: '5px',
                  marginBottom: '10px',
                  borderLeft: '3px solid #B144FF'
                }}
              >
                <p style={{ color: '#fff', fontWeight: 600, marginBottom: '5px' }}>
                  {idx + 1}. {exercise.name}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight && ` @ ${exercise.weight}kg`}
                  {exercise.rest && ` | Rest: ${exercise.rest}s`}
                </p>
                {exercise.description && (
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '5px', fontStyle: 'italic' }}>
                    {exercise.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ 
        background: '#1a1a2e', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '30px'
      }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>📡 API Endpoints</h3>
        <ul style={{ color: '#9ca3af', lineHeight: '2', listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#B144FF' }}>Workout Type:</strong>{' '}
            <code style={{ background: '#0f0f1e', padding: '4px 12px', borderRadius: '3px', display: 'inline-block', marginTop: '5px' }}>
              https://workout-type-api.onrender.com/predict
            </code>
          </li>
          <li>
            <strong style={{ color: '#4CAF50' }}>Exercise Suggestions:</strong>{' '}
            <code style={{ background: '#0f0f1e', padding: '4px 12px', borderRadius: '3px', display: 'inline-block', marginTop: '5px' }}>
              https://exercise-api-cvza.onrender.com/suggest
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTester;
