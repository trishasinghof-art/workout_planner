import React, { useState } from 'react';
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
  const [confirm, setConfirm] = useState('');
  const [touched, setTouched] = useState({ email: false, phone: false, password: false, confirm: false });
  const [submitError, setSubmitError] = useState('');
  const [submittedAttempted, setSubmittedAttempted] = useState(false);

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
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-invalid={!!passwordError()}
                aria-describedby="signup-password-error"
              />
            </label>
            {passwordError() && <div id="signup-password-error" className="form-error" role="alert">{passwordError()}</div>}

            <label>
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="Enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                aria-invalid={!!confirmError()}
                aria-describedby="signup-confirm-error"
              />
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