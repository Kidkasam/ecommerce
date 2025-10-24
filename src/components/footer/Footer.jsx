import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section-about">
        <p>
         © 2025 KFits. All rights reserved.<br/>
Quality apparel and accessories delivered to your doorstep.
        </p>
      </div>

      <div className="footer-section-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-section-socials">
        <h2>Follow Us</h2>
        <div className="footer-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
