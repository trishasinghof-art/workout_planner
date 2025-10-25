import React from 'react';
import highIntensityImg from '../../assets/highIntensityTraining.jpg';

function Programs() {
  return (
    <section id="prog" className="programs container">
      <div className="section-head">
        <h3>Our program</h3>
        <p>Explore a variety of training options designed to help you achieve your fitness goals.</p>
      </div>

      <div className="program-grid">
        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={highIntensityImg} alt="High intensity training"/>
          </div>
          <h4>Weight lifting</h4>
          <p>Targeted strength sessions to build muscle and power.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={highIntensityImg} alt="High intensity training"/>
          </div>
          <h4>Cross fit</h4>
          <p>High-intensity workouts for functional strength and stamina.</p>
        </article>

        <article className="program-card">
          <div className="img-placeholder card-img">
            <img className="card-img" src={highIntensityImg} alt="High intensity training"/>
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
      </div>
    </section>
  );
}

export default Programs;