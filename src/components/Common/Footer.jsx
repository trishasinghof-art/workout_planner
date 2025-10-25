import React from 'react';
import last3 from '../../assets/last_3.jpg';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="insta-preview">
          <h4>Follow us on instagram</h4>
          <div className="insta-grid">
            <div className="img-placeholder insta-img">
              <img className="insta-photo" src={last3} alt="instagram preview" />
            </div>
            <div className="img-placeholder insta-img">
               <img className="insta-photo" src={last3} alt="instagram preview" />
            </div>
            <div className="img-placeholder insta-img">
               <img className="insta-photo" src={last3} alt="instagram preview" />
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div className="brand footer-brand">
            <span className="brand-green">Body</span><span>Sync</span>
          </div>
          <p className="small">© 2025 BodySync. All rights reserved.</p>
          <div className="social-row" aria-label="social links">
            <a href="#" className="social-link" aria-label="instagram">
              {/* instagram svg */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="facebook">
              {/* facebook svg */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M15.5 3H13.5C11.57 3 10 4.57 10 6.5V8.5H8V11.5H10V21H13V11.5H15.5L16 8.5H13V6.5C13 6.22 13.22 6 13.5 6H16V3Z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="twitter">
              {/* twitter svg */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 5.92c-.65.29-1.36.48-2.09.57.75-.45 1.33-1.17 1.6-2.03-.7.42-1.48.72-2.31.88C18.6 4.1 17.55 3.5 16.35 3.5c-1.94 0-3.51 1.57-3.51 3.5 0 .27.03.54.09.8C9.52 7.66 6.29 5.9 4.09 3.29c-.3.53-.47 1.13-.47 1.78 0 1.23.63 2.31 1.6 2.95-.59-.02-1.15-.18-1.64-.45v.05c0 1.7 1.21 3.12 2.82 3.44-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.06.46 1.44 1.79 2.49 3.36 2.52C7.5 18.1 5.1 18.79 2.44 18.19c2.12 1.36 4.66 2.14 7.39 2.14 8.86 0 13.71-7.34 13.71-13.7l-.01-.62c.94-.68 1.76-1.54 2.41-2.52z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;