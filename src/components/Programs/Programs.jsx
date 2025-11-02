import React from 'react';
import highIntensityImg from '../../assets/high intensity.jpeg';
import weightLiftingImg from '../../assets/weight lifting.jpeg';
import cardio from '../../assets/cardio.jpeg';
import crossFit from '../../assets/cross fit.jpeg';
import pilates from '../../assets/Pilates.jpeg';
import rolling from '../../assets/rolling.jpeg';


function Programs() {
  return (
    <section id="prog" className="programs container">
      <div className="section-head">
        <h3>Our Programs</h3>
        <p>Explore a variety of training options designed to help you achieve your fitness goals.</p>
      </div>

      <div className="program-grid">
        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={weightLiftingImg} alt="Weight Lifting"/>
          </div>
          <h4>Weight lifting</h4>
          <p>Targeted strength sessions to build muscle and power.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={crossFit} alt="Crossfit"/>
          </div>
          <h4>Cross fit</h4>
          <p>High-intensity workouts for functional strength and stamina.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={cardio} alt="cardio"/>
          </div>
          <h4>Cardio</h4>
          <p>Improve endurance and burn calories with expert-led classes.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={highIntensityImg} alt="High intensity training"/>
          </div>
          <h4>High-intensity training</h4>
          <p>Short, intense workouts for maximum efficiency and results.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={pilates} alt="pilates"/>
          </div>
          <h4>Flexibility & Mobility Training</h4>
          <p>Improving range of motion and balance.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={rolling} alt="Foam Rolling"/>
          </div>
          <h4>Recovery & Low-Impact Workouts</h4>
          <p>Relaxation, recovery, and gentle movement.</p>
        </article>
      </div>
    </section>
  );
}

export default Programs;