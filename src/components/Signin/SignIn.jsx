import React, { useState } from 'react';
import signinImg from '../../assets/signup.jpeg';

// validation helpers
const isValidEmail = (email) => {
  // simple but effective RFC-ish regex for common emails
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
};

const isStrongPassword = (pw) => {
  // at least 8 chars, one uppercase, one lowercase, one digit, one special
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return re.test(pw);
};

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitError, setSubmitError] = useState('');
  const [submittedAttempted, setSubmittedAttempted] = useState(false);

  const emailError = () => {
    if (!(touched.email || submittedAttempted)) return '';
    if (!email) return 'Email is required.';
    if (!isValidEmail(email)) return 'Please enter a valid email address.';
    return '';
  };

  const passwordError = () => {
    if (!(touched.password || submittedAttempted)) return '';
    if (!password) return 'Password is required.';
    if (!isStrongPassword(password)) return 'Password must be 8+ chars and include uppercase, lowercase, number, and special character.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mark that a submit was attempted so required warnings appear
    setSubmittedAttempted(true);
    // mark touched so errors show if user tried to submit straight away
    setTouched({ email: true, password: true });
    const eErr = emailError();
    const pErr = passwordError();
    if (eErr || pErr) {
      setSubmitError('Please fix the errors above before signing in.');
      return;
    }

    setSubmitError('');
    // proceed with real submit / auth flow
    // TODO: call signin API or context method
    console.log('Signing in with', { email, password });
  };

  const canSubmit = () => isValidEmail(email) && isStrongPassword(password);

  return (
    <section className="signin container">
      <div className="signin-grid">
        <div className="signin-illustration img-placeholder signin-img">
          <img className="signin-illustration-img" src={signinImg} alt="Sign in illustration"/>
        </div>

        <div className="signin-form card-glow">
          <h4>Sign In</h4>
          <form onSubmit={handleSubmit} noValidate>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                aria-invalid={!!emailError()}
                aria-describedby="email-error"
              />
            </label>
            {emailError() && (
              <div id="email-error" className="form-error" role="alert">{emailError()}</div>
            )}

            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-invalid={!!passwordError()}
                aria-describedby="password-error"
              />
            </label>
            {passwordError() && (
              <div id="password-error" className="form-error" role="alert">{passwordError()}</div>
            )}

            {submitError && <div className="form-error" role="alert">{submitError}</div>}

            <button className="btn-primary" type="submit" disabled={!canSubmit()}>Sign in</button>
            <a className="link sgn" href="/signup">Signup</a>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;