import React from "react";
import "./Profile.css";
import Header2 from "../Common/Header2";
import Footer from "../Common/Footer";

import profileImg from "../../assets/profile.jpeg";

const Profile = () => {
  return (
    <>
      <Header2 />
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profileImg}
          alt="Profile"
          className="profile-image"
        />
        <h2>Max Johnson</h2>
        <p className="profile-quote">
          Striving for progress, not perfection
        </p>

        <div className="profile-stats">
          <div>
            <h3>45</h3>
            <p>Workouts</p>
          </div>
          <div>
            <h3>165 h</h3>
            <p>Activity</p>
          </div>
          <div>
            <h3>+1.4%</h3>
            <p>Progress</p>
          </div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <h3>Personal Information</h3>
          <button className="edit-btn">Edit</button>
        </div>

        <div className="info-grid">
          <div>
            <p className="label">Full Name</p>
            <p>Max Johnson</p>
          </div>
          <div>
            <p className="label">Email</p>
            <p>max.johnson@email.com</p>
          </div>
          <div>
            <p className="label">Age</p>
            <p>28 years</p>
          </div>
          <div>
            <p className="label">Gender</p>
            <p>Male</p>
          </div>
          <div>
            <p className="label">Height</p>
            <p>180 cm</p>
          </div>
          <div>
            <p className="label">Weight</p>
            <p>75 kg</p>
          </div>
        </div>
      </div>

 
      <div className="info-card">
        <h3>Fitness Goals</h3>
        <div className="info-grid">
          <div>
            <p className="label">Primary Goal</p>
            <p>Build Muscle</p>
          </div>
          <div>
            <p className="label">Target Weight</p>
            <p>80 kg</p>
          </div>
          <div>
            <p className="label">Training Level</p>
            <p>Advanced</p>
          </div>
          <div>
            <p className="label">Workouts Per Week</p>
            <p>5 days</p>
          </div>
        </div>
      </div>

  
      <div className="progress-section">
        <div className="progress-card purple-light">
          <div className="icon">🏋️</div>
          <h4>This Week</h4>
          <p>32.5 hours</p>
          <small>5 workouts completed</small>
        </div>

        <div className="progress-card purple-dark">
          <div className="icon">📈</div>
          <h4>Weekly Streak</h4>
          <p>12 weeks</p>
          <small>Keep up the momentum!</small>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
