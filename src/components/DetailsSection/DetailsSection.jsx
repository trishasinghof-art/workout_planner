import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const ProfileForm = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);
  return (
    <div className="profile-page">
      <h1 className="profile-title">
        Complete Your <span>Profile</span>
      </h1>
      <p className="profile-subtitle">
        Help us personalize your fitness journey with your details
      </p>

      {/* name , age , gender */}
      <section className="profile-card">
        <div className="card-header">
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

      {/* height, weight, target weight */}
      <section className="profile-card">
        <div className="card-header">
          
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
            <select>
                <option>kg</option>
                <option>lbs</option>
            </select>
          </div>
        </div>
      </section>

      {/* Fitness Level Section */}
      <section className="profile-card">
        <div className="card-header">
          
          <h2>Fitness Level</h2>
        </div>

        <div className="training-level">
          <button
            type="button"
            className={"level-btn" + (level === 'beginner' ? ' active' : '')}
            aria-pressed={level === 'beginner'}
            onClick={() => setLevel('beginner')}
          >
            Beginner<br/><br/><span>New to fitness</span>
          </button>

          <button
            type="button"
            className={"level-btn" + (level === 'intermediate' ? ' active' : '')}
            aria-pressed={level === 'intermediate'}
            onClick={() => setLevel('intermediate')}
          >
            Intermediate<br/><br/><span>Regular workouts</span>
          </button>

          <button
            type="button"
            className={"level-btn" + (level === 'advanced' ? ' active' : '')}
            aria-pressed={level === 'advanced'}
            onClick={() => setLevel('advanced')}
          >
            Advanced<br/><br/><span>Experienced</span>
          </button>

        </div>

        <div className="form-group">
          <label>Primary Goal</label>
          <select>
            <option>Select your primary fitness goal</option>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Fitness Maintenance</option>
          </select>
        </div>
        <br/>

        <div className="form-group">
          <label>Workouts per week</label>
          <select >
            <option>How many days can you commit</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
      </section>

      <div className="profile-actions">
        <Link to="/signup" className="btn-ghost">Cancel</Link>
        
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            // TODO: submit profile data to API
            console.log('Profile completed');
            navigate('/dashboard');
          }}
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
