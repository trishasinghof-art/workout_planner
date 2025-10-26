import React from 'react';
import signinImg from '../../assets/signup.jpeg';

function Signup() {
  return (
    <section className="signin container">
      <div className="signin-grid">
        <div className="signin-illustration img-placeholder signin-img">
          <img className="signin-illustration-img" src={signinImg} alt="Sign in illustration"/>
        </div>

        <div className="signin-form card-glow">
          <h4>Sign Up</h4>
          <form>
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              <span>Phone No</span>
              <input type="tel" placeholder="Enter phone number" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" placeholder="Enter password" />
            </label>
            <label>
              <span>Confirm Password</span>
              <input type="password" placeholder="Enter password" />
            </label>

            <button className="btn-primary" type="submit">Sign Up</button>
            <a className="link"  href="/signin">Signin</a>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;