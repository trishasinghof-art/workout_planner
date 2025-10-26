import React from 'react';
import member2 from '../assets/member_2.jpg';
import member3 from '../assets/member_3.jpg';
import member1 from '../assets/testimonial3.jpeg';


function Testimonials() {
  return (
    <section className="testimonials container">
      <h3>Hear From Our Satisfied Members</h3>
      <div className="testimonial-grid">
        <div className="testimonial">
          <div className="img-placeholder test-img">
            <img className="test-photo" src={member2} alt="Michael" />
          </div>
          <h5>Michael</h5>
          <p>Lost weight and gained confidence — love the community.</p>
        </div>

        <div className="testimonial">
          <div className="img-placeholder test-img">
            <img className="test-photo" src={member3} alt="Sam" />
          </div>
          <h5>Sam</h5>
          <p>Great coaches, awesome results.</p>
        </div>

        <div className="testimonial">
          <div className="img-placeholder test-img">
            <img className="test-photo" src={member1} alt="Sam" />
          </div>
          <h5>Ravi</h5>
          <p>Programs are structured and effective.</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;