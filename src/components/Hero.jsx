import React from 'react';
import mainImg from '../assets/hero.png';
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-left">
          <h1 className="hero-eyebrow">Build</h1>
          <h2 className="hero-main">
            <span className="stroke">Strength</span><br />
            <span className="solid">Boost</span><br />
            <span className="stroke">Confidence</span>
          </h2>
          <p className="hero-desc">
            Our trainers are world-class, with tailored programs to help you gain strength, improve endurance and feel great in your body.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">23+</div>
              <div className="stat-label">Programs</div>
            </div>
            <div className="stat small">
              <div className="stat-num">12k</div>
              <div className="stat-label">Members</div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#" className="btn-primary">Get Started</a>
            <a href="/programs" className="btn-ghost">View Program</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="img-placeholder hero-placeholder" >
            <img className="hero-dots" src={mainImg} alt=""/>
          </div>
          
        </div>
      </div>

      <div className="container category-strip">
        <ul>
          <li>Mind & Body</li>
          <li>Cardio</li>
          <li >Strength</li>
          <li>Mind & Body</li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;