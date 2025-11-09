import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header2 from "../Common/Header2";
import Footer from "../Common/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import profileImg from "../../assets/profile.jpeg";

const Profile = () => {
  const { user, profile, profileLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header2 />
    <div className="profile-container">
      {profileLoading && (
        <div className="spinner" role="status" aria-live="polite">Loading profile...</div>
      )}
      {!profileLoading && !profile && (
        <div className="card side-card" style={{marginBottom:'20px'}}>
          <h3>Profile Incomplete</h3>
          <p>You haven't finished setting up your profile yet.</p>
          <button className="btn-primary" onClick={() => navigate('/details')}>Complete Profile Now</button>
        </div>
      )}
      <div className="profile-header">
        <img
          src={profileImg}
          alt="Profile"
          className="profile-image"
        />
  <h2>{profile?.fullName || user?.email || 'Your Name'}</h2>
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
          <button className="edit-btn" onClick={() => navigate('/details')}>Edit</button>
        </div>

        <div className="info-grid">
          <div>
            <p className="label">Full Name</p>
            <p>{profile?.fullName || '-'}</p>
          </div>
          <div>
            <p className="label">Email</p>
            <p>{user?.email || '-'}</p>
          </div>
          <div>
            <p className="label">Age</p>
            <p>{profile?.age ? `${profile.age} years` : '-'}</p>
          </div>
          <div>
            <p className="label">Gender</p>
            <p>{profile?.gender || '-'}</p>
          </div>
          <div>
            <p className="label">Height</p>
            <p>{profile?.height ? `${profile.height} ${profile?.heightUnit || 'cm'}` : '-'}</p>
          </div>
          <div>
            <p className="label">Weight</p>
            <p>{profile?.weight ? `${profile.weight} ${profile?.weightUnit || 'kg'}` : '-'}</p>
          </div>
        </div>
      </div>

 
      <div className="info-card">
        <h3>Fitness Goals</h3>
        <div className="info-grid">
          <div>
            <p className="label">Primary Goal</p>
            <p>{profile?.goal || '-'}</p>
          </div>
          <div>
            <p className="label">Target Weight</p>
            <p>{profile?.targetWeight ? `${profile.targetWeight} ${profile?.targetUnit || 'kg'}` : '-'}</p>
          </div>
          <div>
            <p className="label">Training Level</p>
            <p>{profile?.level || '-'}</p>
          </div>
          <div>
            <p className="label">Workouts Per Week</p>
            <p>{profile?.workoutsPerWeek ? `${profile.workoutsPerWeek} days` : '-'}</p>
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
