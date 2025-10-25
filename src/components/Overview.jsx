import React from 'react';

function Overview() {
  return (
    <section className="overview container">
      <div className="overview-grid">
        <div className="body-overview card-glow">
          <h4>Body Overview</h4>
          <p>You can gain 7kg in a month</p>
          <div className="kcal">950 kcal</div>
          <div className="overview-pies">
            <div className="pie">35%</div>
            <div className="pie">30%</div>
            <div className="pie">35%</div>
          </div>
        </div>

        <div className="daily-targets">
          <h4>My Daily Target</h4>
          <div className="target-list">
            <div className="target">
              <div className="label">Water</div>
              <div className="value">2300ml</div>
            </div>
            <div className="target">
              <div className="label">Weight</div>
              <div className="value">69kg</div>
            </div>
            <div className="target">
              <div className="label">Calories</div>
              <div className="value">2800cal</div>
            </div>
            <div className="target">
              <div className="label">bpm</div>
              <div className="value">90bpm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overview;