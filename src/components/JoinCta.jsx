import React from 'react';
import { Link } from 'react-router-dom';

function JoinCta() {
  return (
    <section className="join-cta">
      <div className="container join-inner">
        <h3>Join Now and Reach Your Fitness Goals</h3>
        <p>Start your transformation with a program built for results.</p>
        <Link to="/signup" className="btn-primary big">Join Now</Link>
      </div>
    </section>
  );
}

export default JoinCta;