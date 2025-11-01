import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import signinImg from '../../assets/signup.jpeg';

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
};

const isStrongPassword = (pw) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return re.test(pw);
};

const isValidPhone = (phone) => {
  if (!phone) return true; // optional
  // very simple digits-only check (allow spaces, dashes, parentheses)
  const cleaned = phone.replace(/[\s-()+.]/g, '');
  return /^\d{7,15}$/.test(cleaned);
};

function Signup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({ email: false, phone: false, password: false, confirm: false });
  const [submitError, setSubmitError] = useState('');
  const [submittedAttempted, setSubmittedAttempted] = useState(false);
  const navigate = useNavigate();

  const emailError = () => {
    if (!(touched.email || submittedAttempted)) return '';
    if (!email) return 'Email is required.';
    if (!isValidEmail(email)) return 'Please enter a valid email address.';
    return '';
  };

  const phoneError = () => {
    if (!(touched.phone || submittedAttempted)) return '';
    if (phone && !isValidPhone(phone)) return 'Please enter a valid phone number.';
    return '';
  };

  const passwordError = () => {
    if (!(touched.password || submittedAttempted)) return '';
    if (!password) return 'Password is required.';
    if (!isStrongPassword(password)) return 'Password must be 8+ chars and include uppercase, lowercase, number, and special character.';
    return '';
  };

  const confirmError = () => {
    if (!(touched.confirm || submittedAttempted)) return '';
    if (!confirm) return 'Please confirm your password.';
    if (confirm !== password) return 'Passwords do not match.';
    return '';
  };

  const canSubmit = () => isValidEmail(email) && isStrongPassword(password) && confirm === password && isValidPhone(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedAttempted(true);
    setTouched({ email: true, phone: true, password: true, confirm: true });
    const errs = [emailError(), phoneError(), passwordError(), confirmError()].filter(Boolean);
    if (errs.length) {
      setSubmitError('Please fix the errors above before signing up.');
      return;
    }
    setSubmitError('');
    // TODO: replace with real signup API call
    console.log('Signing up', { email, phone, password });
    // Redirect to details form after successful signup
    navigate('/details');
  };

  return (
    <section className="signin container">
      <div className="signin-grid">
        <div className="signin-illustration img-placeholder signin-img">
          <img className="signin-illustration-img" src={signinImg} alt="Sign in illustration"/>
        </div>

        <div className="signin-form card-glow">
          <h4>Sign Up</h4>
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
                aria-describedby="signup-email-error"
              />
            </label>
            {emailError() && <div id="signup-email-error" className="form-error" role="alert">{emailError()}</div>}

            <label>
              <span>Phone No</span>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                aria-invalid={!!phoneError()}
                aria-describedby="signup-phone-error"
              />
            </label>
            {phoneError() && <div id="signup-phone-error" className="form-error" role="alert">{phoneError()}</div>}

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
                    aria-describedby="signup-password-error"
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
            {passwordError() && <div id="signup-password-error" className="form-error" role="alert">{passwordError()}</div>}

            <label>
              <span>Confirm Password</span>
                <div className="input-with-toggle">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                    aria-invalid={!!confirmError()}
                    aria-describedby="signup-confirm-error"
                  />
                  <button
                    type="button"
                    className="pw-toggle"
                    aria-pressed={showConfirm}
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                    onClick={() => setShowConfirm((s) => !s)}
                  >
                    {showConfirm ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <title>Hide confirm password</title>
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.3 12.2C4.7 7.6 8.8 5 12 5c2.3 0 4.6.9 6.7 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.4 16.1c-1.3.8-2.9.9-4.2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <title>Show confirm password</title>
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
            </label>
            {confirmError() && <div id="signup-confirm-error" className="form-error" role="alert">{confirmError()}</div>}

            {submitError && <div className="form-error" role="alert">{submitError}</div>}

            <button className="btn-primary" type="submit" disabled={!canSubmit()}>Sign Up</button>
            <a className="link" href="/signin">Signin</a>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;