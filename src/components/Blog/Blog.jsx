import React from 'react';
import tipsImg from '../../assets/tips_1.jpg';

function Blog() {
  return (
    <section className="blog container">
      <div className="section-head">
        <h3>Read our tips and tricks</h3>
        <p>Short guides and workout tips to help you progress safely and effectively.</p>
      </div>

      <div className="blog-grid">
        <article className="post">
          <div className="img-placeholder post-img">
            <img className="post-img-el" src={tipsImg} alt="Beginner's guide" />
          </div>
          <h4>A Beginner's Guide</h4>
          <p>Starting your fitness journey the right way.</p>
        </article>

        <article className="post">
          <div className="img-placeholder post-img">
            <img className="post-img-el" src={tipsImg} alt="Beginner's guide" />
          </div>
          <h4>Benefits for Your Body and Mind</h4>
          <p>Why consistent training improves overall wellbeing.</p>
        </article>

        <article className="post">
          <div className="img-placeholder post-img">
            <img className="post-img-el" src={tipsImg} alt="Beginner's guide" />
          </div>
          <h4>Why Working Out With Others</h4>
          <p>The social benefits that keep you accountable.</p>
        </article>
      </div>
    </section>
  );
}

export default Blog;