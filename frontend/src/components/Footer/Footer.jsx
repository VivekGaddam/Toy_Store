import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-wrapper">
        <div className="footer-left">
          <img src={assets.logo} alt="ToyStore Logo" className="footer-logo" />
          <p className="footer-desc">
            Welcome to ToyTopia! From action figures to educational kits, we make playtime magical. Shop, gift, and giggle!
          </p>
          <div className="footer-socials">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-center">
          <h3>Explore</h3>
          <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>New Arrivals</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Let's Connect</h3>
          <ul>
            <li>📞 +91-98765-43210</li>
            <li>📧 support@toytopia.com</li>
            <li>📍 Hyderabad, India</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copy">© 2025 ToyTopia. All rights reserved.</p>
    </div>
  );
};

export default Footer;
