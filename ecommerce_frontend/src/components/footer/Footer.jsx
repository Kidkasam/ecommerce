import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">
        <div className="footer-col about">
          <h2 className="footer-logo">KFITS<span>.</span></h2>
          <p>
            Experience the pinnacle of our product. Our curated collection brings together precision tailoring and sustainable craftsmanship for the modern world.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/products">New Catalog</Link>
          <Link to="/cart">Your Bag</Link>
          <Link to="/contact">Support</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link to="#">Order Status</Link>
          <Link to="#">Shipping Info</Link>
          <Link to="#">Return Policy</Link>
          <Link to="#">Privacy Policy</Link>
        </div>

        <div className="footer-col contact">
          <h4>Get in Touch</h4>
          <p><FaMapMarkerAlt /> 123 Fashion Ave, NY 10001</p>
          <p><FaEnvelope /> support@kfits.com</p>
          <p><FaPhone /> +1 (555) 000-0000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 KFITS. All rights reserved. Designed for the bold.</p>
      </div>
    </footer>
  );
};

export default Footer;

