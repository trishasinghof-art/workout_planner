import React from 'react';
import signinImg from '../../assets/signin.png';
function SignIn() {
  return (
    <section className="signin container">
      <div className="signin-grid">
        <div className="signin-illustration img-placeholder signin-img">
          <img className="signin-illustration-img" src={signinImg} alt="Sign in illustration"/>
        </div>

        <div className="signin-form card-glow">
          <h4>Sign In</h4>
          <form>
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" placeholder="Enter password" />
            </label>

            <button className="btn-primary" type="submit">Sign in</button>
            <a className="link sgn"  href="/signup">Signup</a>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;