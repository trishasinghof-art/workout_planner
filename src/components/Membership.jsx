import React from 'react';

function Membership() {
  return (
    <section className="membership container">
      <h3>Unlock the Full Potential of Your Fitness with Our Membership Plans</h3>
      <div className="membership-grid">
        <div className="membership-card dark">
          <h4>Basic membership</h4>
          <div className="price">$130</div>
          <p>Access to gym equipment and standard classes.</p>
          <br></br>
          <button className="btn-primary" type="button">Choose</button>
        </div>

        <div className="membership-card premium">
          <h4>Premium membership</h4>
          <div className="price">$230</div>
          <p>All access pass with personalized coaching and advanced classes.</p>
          <button className="btn-primary" type="button">Choose</button>
        </div>
      </div>
    </section>
  );
}

export default Membership;