import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section-about">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
          Sequi repudiandae obcaecati deserunt modi dolorem architecto <br/>
          doloribus, rem nemo velit quam, commodi impedit quos quod <br/>
          consequuntur accusantium temporibus? Ex, aut architecto?<br/>
        </p>
      </div>

      <div className="footer-section-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
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
