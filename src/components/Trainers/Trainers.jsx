import React from 'react';
import trainer1 from '../../assets/trainers_1.png';


function Trainers() {
  return (
    <section className="trainers container">
      <h3>Get to know our team of experienced trainers</h3>
      <p className="sub">Learn about their certifications and specialties to find the perfect match for your fitness goals.</p>

      <div className="trainers-grid">
        <div className="trainer-card">
          <div className="img-placeholder trainer-img">
            <img className="trainer-photo" src={trainer1} alt="John Carter"/>
          </div>
          <div className="trainer-info">
            <h5>John Carter</h5>
            <p>Strength Coach</p>
          </div>
        </div>

        <div className="trainer-card">
          <div className="img-placeholder trainer-img">
            <img className="trainer-photo" src={trainer1} alt="John Carter"/>
          </div>
          <div className="trainer-info">
            <h5>Derek Steward</h5>
            <p>Fitness Trainer</p>
          </div>
        </div>

        <div className="trainer-card">
          <div className="img-placeholder trainer-img">
            <img className="trainer-photo" src={trainer1} alt="John Carter"/>
          </div>
          <div className="trainer-info">
            <h5>James Dell</h5>
            <p>Personal Trainer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trainers;