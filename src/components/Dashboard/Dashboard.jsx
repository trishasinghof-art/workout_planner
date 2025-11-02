import React from "react";


const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Greeting */}
      <div className="dashboard-header">
        <h2>
          <span className="wave">👋</span> Hello, Max
        </h2>
        <p>Let's have a productive workout today!</p>
        <div className="tags">
          <span className="tag">Advanced</span>
          <span className="tag">5 training days</span>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="left-section">
          {/* Today's Workout */}
          <div className="section-header">
            <button className="nav-btn">◀</button>
            <h3>Today's workout</h3>
            <button className="nav-btn">▶</button>
          </div>

          {/* Daily Challenge Card */}
          <div className="card challenge-card">
            <div className="card-content">
              <h4>Daily Challenge</h4>
              <button className="start-btn">Start ▸</button>
            </div>
          </div>

          {/* Full Body Strength Card */}
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

            <div className="exercise">
              <div>
                <p className="label">Exercise #2</p>
                <p className="exercise-name">PUSH-UPS</p>
              </div>
              <p className="sets">3 sets of 15 reps</p>
            </div>

            <div className="buttons">
              <button className="see-btn">See workout</button>
              <button className="start-btn">Start workout ▸</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-section">
          {/* Weekly Goal */}
          <div className="card side-card">
            <h4>Weekly Goal</h4>
            <p>Progress</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}></div>
            </div>
            <p className="progress-text">Keep going! 2 more workouts to reach your goal.</p>
          </div>

          {/* Upcoming */}
          <div className="card side-card upcoming">
            <h4>Upcoming</h4>
            <ul>
              <li>• Leg Day - Tomorrow</li>
              <li>• Rest Day - Sunday</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
