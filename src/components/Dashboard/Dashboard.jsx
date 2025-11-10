import React, { useEffect, useState } from "react";
import Header2 from "../Common/Header2";
import Footer from "../Common/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { getWorkoutRecommendations } from "../../services/workoutApi";


const Dashboard = () => {
  const { user, profile, profileLoading } = useAuth();
  const [userName, setUserName] = useState("Max");
  const [fitnessLevel, setFitnessLevel] = useState("Advanced");
  const [trainingDays, setTrainingDays] = useState("5 training days");
  
  const [workoutData, setWorkoutData] = useState(null);
  const [loadingWorkout, setLoadingWorkout] = useState(false);
  const [workoutError, setWorkoutError] = useState(null);

  const [selectedDay, setSelectedDay] = useState(1);

  
  const capitalize = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    console.log("Profile data:", profile); 
    console.log("User data:", user); 
    
    if (profile) {
     
      if (profile.name || profile.displayName || profile.firstName) {
        setUserName(profile.name || profile.displayName || profile.firstName);
      } else if (user?.displayName) {
        setUserName(user.displayName);
      } else if (user?.email) {
        setUserName(user.email.split('@')[0]);
      }
      if (profile.level) {
        console.log("Setting level:", profile.level);
        setFitnessLevel(capitalize(profile.level));
      }
      if (profile.workoutsPerWeek) {
        console.log("Setting workouts per week:", profile.workoutsPerWeek);
        setTrainingDays(`${profile.workoutsPerWeek} workouts per week`);
      }
    } else {
      console.log("No profile data available");
    }
  }, [profile, user]);

  
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!profile || !profile.level || !profile.workoutsPerWeek) {
        console.log("Profile not complete, skipping API call. Profile:", profile);
        return;
      }

      setLoadingWorkout(true);
      setWorkoutError(null);

      try {
        const recommendations = await getWorkoutRecommendations({ ...profile, day: selectedDay });
        console.log("Raw API response:", recommendations);

        if (!recommendations) {
          throw new Error("No data received from API");
        }

        let processedData = recommendations;

        if (recommendations.data) {
          processedData = recommendations.data;
        }

        if (!Array.isArray(processedData.exercises)) {
          console.warn("Exercises is not an array. Received:", processedData);
          if (processedData.workout && Array.isArray(processedData.workout)) {
            processedData.exercises = processedData.workout;
          } else if (processedData.exerciseList && Array.isArray(processedData.exerciseList)) {
            processedData.exercises = processedData.exerciseList;
          }
        }

        setWorkoutData(processedData);
        console.log("Processed workout data:", processedData);
      } catch (error) {
        console.error("Failed to fetch workout recommendations:", error);
        setWorkoutError(`Failed to load personalized workouts: ${error.message}`);
      } finally {
        setLoadingWorkout(false);
      }
    };

    fetchWorkouts();
  }, [profile, selectedDay]);

  return (
    <>
      <Header2 />
      <main className="container">
        <div className="dashboard">
      
      <div className="dashboard-header">
        <h2>
          <span className="wave">👋</span> Hello, {userName}
        </h2>
        <p>Let's have a productive workout today!</p>
        <div className="tags">
          {profileLoading ? (
            <span className="tag">Loading...</span>
          ) : (
            <>
              <span className="tag">{fitnessLevel}</span>
              <span className="tag">{trainingDays}</span>
            </>
          )}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[...Array(7)].map((_, idx) => (
            <button
              key={idx}
              className={`tag${selectedDay === idx + 1 ? ' tag-selected' : ''}`}
              style={{ cursor: 'pointer', border: 'none', outline: 'none', background: selectedDay === idx + 1 ? '#B144FF' : '#232b36', color: '#fff', borderRadius: 20, padding: '6px 16px', fontWeight: 500, fontSize: 15, transition: 'background 0.2s' }}
              onClick={() => setSelectedDay(idx + 1)}
            >
              Day - {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-main">
        <div className="left-section">
          <div className="section-header">
            
            <h3>Today's workout</h3>
            
          </div>

          {loadingWorkout ? (
            <div className="card workout-card">
              <p>Loading your personalized workout...</p>
            </div>
          ) : workoutError ? (
            <div className="card workout-card">
              <p style={{ color: '#ff6b6b' }}>{workoutError}</p>
            </div>
          ) : null}

          {workoutData && workoutData.exercises ? (
            <div className="card workout-card">
              <h4>{workoutData.workoutName || "Personalized Workout"}</h4>
              {workoutData.workoutType && (
                <p style={{ 
                  color: '#B144FF', 
                  fontWeight: 600, 
                  fontSize: '14px', 
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {workoutData.workoutType}
                  {workoutData.confidence && ` (${Math.round(workoutData.confidence * 100)}% confidence)`}
                </p>
              )}
              {workoutData.duration && (
                <>
                  <p className="time-label">Time</p>
                  <p className="time">{workoutData.duration} minutes</p>
                </>
              )}

              {workoutData.exercises.map((exercise, index) => (
                <div key={index}>
                  <div className="exercise">
                    <div>
                      <p className="label">Exercise #{index + 1}</p>
                      <p className="exercise-name">{exercise.name?.toUpperCase()}</p>
                      {exercise.description && (
                        <p style={{ 
                          fontSize: '12px', 
                          color: '#9ca3af', 
                          marginTop: '4px',
                          fontStyle: 'italic' 
                        }}>
                          {exercise.description}
                        </p>
                      )}
                    </div>
                    <p className="sets">
                      {exercise.sets} sets of {exercise.reps} reps
                      {exercise.weight && ` @ ${exercise.weight}kg`}
                      {exercise.rest && (
                        <span style={{ 
                          display: 'block', 
                          fontSize: '11px', 
                          color: '#9ca3af',
                          marginTop: '2px' 
                        }}>
                          Rest: {exercise.rest}s
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="buttons">
                    <span>
                      <button className="start-btn">Start Exercise ▸</button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : !loadingWorkout && !workoutError ? (
            <div className="card workout-card">
              <h4>Full Body Strength</h4>
              <p className="time-label">Time</p>
              <p className="time">45 minutes</p>

              <div className="exercise">
                <div>
                  <p className="label">Exercise #1</p>
                  <p className="exercise-name">SQUATS</p>
                </div>
                <p className="sets">3 sets of 12 reps</p>
              </div>
              <div className="buttons">
                
                <span><button className="start-btn">Start Exercise ▸</button></span>
              </div>

              <div className="exercise">
                <div>
                  <p className="label">Exercise #2</p>
                  <p className="exercise-name">PUSH-UPS</p>
                </div>
                <p className="sets">3 sets of 15 reps</p>
              </div>
              <div className="buttons">
                
                <span><button className="start-btn">Start Exercise ▸</button></span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="right-section">
        </div>
      </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
