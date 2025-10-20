import React from "react";
import "./contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      
      <div className="contact-content">
 
        <div className="contact-info">
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <span>+251991119856</span>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <span>support@ecommerce.com</span>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

        
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
