import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmail } from '../../firebase';
import signinImg from '../../assets/signup.jpeg';


const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
};

const isStrongPassword = (pw) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return re.test(pw);
};

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitError, setSubmitError] = useState('');
  const [submittedAttempted, setSubmittedAttempted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    setSubmittedAttempted(true);
    setTouched({ email: true, password: true });
    const eErr = emailError();
    const pErr = passwordError();
    if (eErr || pErr) {
      setSubmitError('Please fix the errors above before signing in.');
      return;
    }

    setSubmitError('');
    signInWithEmail(email, password)
      .then(() => {
        const dest = location.state?.from?.pathname || '/dashboard';
        navigate(dest);
      })
      .catch((err) => {
        console.error('Sign in error', err);
        setSubmitError(err?.message || 'Sign in failed.');
      });
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
                <div className="input-with-toggle">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    aria-invalid={!!passwordError()}
                    aria-describedby="password-error"
                  />
                  <button
                    type="button"
                    className="pw-toggle"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <title>Hide password</title>
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.3 12.2C4.7 7.6 8.8 5 12 5c2.3 0 4.6.9 6.7 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.4 16.1c-1.3.8-2.9.9-4.2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <title>Show password</title>
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
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