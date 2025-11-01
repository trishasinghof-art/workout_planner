import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <div className="footer-col">
            <h2 className="footer-logo">BodySync</h2>
            <ul>
              <li><a href="#">Programs</a></li>
              <li><a href="#">Trainers</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Signin</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <ul>
              <li><a href="#">Consumer care</a></li>
              <li><a href="#">Members</a></li>
              <li><a href="#">Bodysync® partners</a></li>
              
            </ul>
          </div>

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
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaPinterestP /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
