import React from "react";


const ProfileForm = () => {
  return (
    <div className="profile-page">
      <h1 className="profile-title">
        Complete Your <span>Profile</span>
      </h1>
      <p className="profile-subtitle">
        Help us personalize your fitness journey with your details
      </p>

      {/* Personal Information Section */}
      <section className="profile-card">
        <div className="card-header">
          <span className="icon">👤</span>
          <h2>Personal Information</h2>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" placeholder="Enter your age" />
          </div>
        </div>

        <div className="form-group gender-group">
          <label>Gender</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" /> Male</label>
            <label><input type="radio" name="gender" /> Female</label>
            <label><input type="radio" name="gender" /> Other</label>
          </div>
        </div>
      </section>

      {/* Body Metrics Section */}
      <section className="profile-card">
        <div className="card-header">
          <span className="icon">📏</span>
          <h2>Body Metrics</h2>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Height</label>
            <div className="input-with-unit">
              <input type="number" placeholder="170" />
              <select>
                <option>cm</option>
                <option>ft</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Current Weight</label>
            <div className="input-with-unit">
              <input type="number" placeholder="70" />
              <select>
                <option>kg</option>
                <option>lbs</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group target-weight">
          <label>Target Weight</label>
          <div className="input-with-unit">
            <input type="number" placeholder="65" />
            <span className="unit">kg</span>
          </div>
        </div>
      </section>

      {/* Fitness Level Section */}
      <section className="profile-card">
        <div className="card-header">
          <span className="icon">💪</span>
          <h2>Fitness Level</h2>
        </div>

        <div className="training-level">
          <button className="level-btn">Beginner<br/><span>New to fitness</span></button>
          <button className="level-btn">Intermediate<br/><span>Regular workouts</span></button>
          <button className="level-btn">Advanced<br/><span>Experienced</span></button>
          <button className="level-btn">Expert<br/><span>Professional level</span></button>
        </div>

        <div className="form-group">
          <label>Primary Goal</label>
          <select>
            <option>Select your primary goal</option>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Fitness Maintenance</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default ProfileForm;
