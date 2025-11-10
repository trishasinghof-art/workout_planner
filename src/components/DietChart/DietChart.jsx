import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "../Common/Header2";
import Footer from "../Common/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { getDietPlan, getDailyMacros } from "../../services/nutritionApi";
import "./DietChart.css";

const DietChart = () => {
  const location = useLocation();
  const { user, profile } = useAuth();
  const dietType = location.state?.dietType || "Vegetarian";
  
  const [dietPlan, setDietPlan] = useState(null);
  const [macros, setMacros] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      setLoading(true);
      setError(null);

      try {
        const userPreferences = {
          dietType: dietType,
          goal: profile?.goal || 'maintenance',
          age: profile?.age,
          gender: profile?.gender,
          weight: profile?.weight,
          height: profile?.height,
          activityLevel: profile?.activityLevel || 'moderate',
          calorieTarget: profile?.calorieTarget || 2000,
          mealsPerDay: 4,
        };

        console.log('Fetching diet plan with preferences:', userPreferences);

        const [plan, dailyMacros] = await Promise.all([
          getDietPlan(userPreferences),
          getDailyMacros(user?.uid || 'guest')
        ]);

        setDietPlan(plan);
        setMacros(dailyMacros);
        console.log('Diet plan loaded:', plan);
      } catch (err) {
        console.error('Error fetching diet plan:', err);
        setError(`Failed to load diet plan: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlan();
  }, [dietType, profile, user]);

  return (
    <>
      <Header2 />
      <div className="diet-chart-container">

        <div className="nutrition-header">
          <h2>Nutrition Tracker - {dietPlan?.dietType || dietType}</h2>
          <p>Monitor your daily macros and stay on track</p>
        </div>

        {loading && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading your personalized diet plan...</p>
        </div>
        )}

        {error && (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#ff6b6b' }}>
          <p>{error}</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Showing default meal plan</p>
        </div>
        )}

        <div className="quote-box">
        <div className="quote-icon">"</div>
        <h3>{dietPlan?.quote || "Eat well, live well, be well – your body is your temple."}</h3>
        <p className="quote-sub">{dietPlan?.quoteSub || "Stay committed to your health journey"}</p>
        </div>

        <h3 className="section-title">Today's Macros</h3>

        <div className="macros-grid">
        <div className="macro-card">
          <div className="macro-icon calories">🔥</div>
          <p className="macro-title">Calories</p>
          <h2>{macros?.calories || dietPlan?.macros?.calories || 1847}</h2>
          <p className="unit">kcal</p>
        </div>

        <div className="macro-card">
          <div className="macro-icon fat">💧</div>
          <p className="macro-title">Fat</p>
          <h2>{macros?.fat || dietPlan?.macros?.fat || 52}</h2>
          <p className="unit">g</p>
        </div>

        <div className="macro-card">
          <div className="macro-icon carbs">🌾</div>
          <p className="macro-title">Carbs</p>
          <h2>{macros?.carbs || dietPlan?.macros?.carbs || 178}</h2>
          <p className="unit">g</p>
        </div>

        <div className="macro-card">
          <div className="macro-icon protein">🍗</div>
          <p className="macro-title">Protein</p>
          <h2>{macros?.protein || dietPlan?.macros?.protein || 98}</h2>
          <p className="unit">g</p>
        </div>
        </div>

        <h3 className="section-title">Today's Meal Plan</h3>

        <div className="meal-plan-box">
          {dietPlan?.meals && dietPlan.meals.length > 0 ? (
          dietPlan.meals.map((meal, index) => (
            <React.Fragment key={index}>
              <div className="meal-row">
                <div className="meal-details">
                  <h4>{meal.name}</h4>
                  <ul>
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <p className="cal">{meal.calories} kcal</p>
                  {meal.macros && (
                    <p className="macros-detail" style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                      P: {meal.macros.protein}g | C: {meal.macros.carbs}g | F: {meal.macros.fat}g
                    </p>
                  )}
                </div>
                <div className="meal-time">{meal.time}</div>
              </div>
              {index < dietPlan.meals.length - 1 && <hr />}
            </React.Fragment>
          ))
        ) : (
          <>
            <div className="meal-row">
              <div className="meal-details">
                <h4>Breakfast</h4>
                <ul>
                  <li>Oatmeal with berries and almonds</li>
                  <li>Scrambled eggs (2 whole)</li>
                  <li>Green tea</li>
                </ul>
                <p className="cal">420 kcal</p>
              </div>
              <div className="meal-time">8:00 AM</div>
            </div>

            <hr />

            <div className="meal-row">
              <div className="meal-details">
                <h4>Lunch</h4>
                <ul>
                  <li>Grilled chicken breast (150g)</li>
                  <li>Brown rice (1 cup)</li>
                  <li>Mixed vegetable salad</li>
                </ul>
                <p className="cal">580 kcal</p>
              </div>
              <div className="meal-time">1:00 PM</div>
            </div>

            <hr />

            <div className="meal-row">
              <div className="meal-details">
                <h4>Snacks</h4>
                <ul>
                  <li>Greek yogurt (1 cup)</li>
                  <li>Mixed nuts (30g)</li>
                  <li>Apple slices</li>
                </ul>
                <p className="cal">250 kcal</p>
              </div>
              <div className="meal-time">4:00 PM</div>
            </div>

            <hr />

            <div className="meal-row">
              <div className="meal-details">
                <h4>Dinner</h4>
                <ul>
                  <li>Baked salmon (120g)</li>
                  <li>Quinoa (1 cup)</li>
                  <li>Steamed broccoli and carrots</li>
                </ul>
                <p className="cal">597 kcal</p>
              </div>
              <div className="meal-time">7:30 PM</div>
            </div>
          </>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DietChart;
