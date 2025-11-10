import React from "react";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <div className="footer-col">
            <h2 className="footer-logo">BodySync</h2>
            <ul>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/trainers">Trainers</Link></li>
              <li><Link to="/blog">Blogs</Link></li>
              <li><Link to="/signin">Signin</Link></li>
            </ul>
          </div>

          {/* <div className="footer-col">
            <ul>
              <li><button type="button" className="footer-link">Consumer care</button></li>
              <li><button type="button" className="footer-link">Members</button></li>
              <li><button type="button" className="footer-link">Bodysync® partners</button></li>
              
            </ul>
          </div> */}

          <div className="footer-col subscribe">
            <p className="subscribe-text">Get the freshest BodySync news</p>
            <form>
              <div className="input-group">
                <input type="email" placeholder="Your email here" />
                <button type="submit">Subscribe</button>
              </div>
              <label className="checkbox">
                <input type="checkbox" />
                <span>By checking the box, you will get all updates.</span>
              </label>
            </form>
          </div>
        </div>

        <div className="footer-social">
          <button type="button" className="social-link" aria-label="Facebook"><FaFacebookF /></button>
          <button type="button" className="social-link" aria-label="Instagram"><FaInstagram /></button>
          <button type="button" className="social-link" aria-label="Twitter"><FaTwitter /></button>
          <button type="button" className="social-link" aria-label="Pinterest"><FaPinterestP /></button>
          <button type="button" className="social-link" aria-label="YouTube"><FaYoutube /></button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
