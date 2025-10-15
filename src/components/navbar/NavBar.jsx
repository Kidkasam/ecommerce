import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 
import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<div className="navbar">
  <div className="logo">ecommerce</div>

  <div className="nav">
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/about">About Us</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/contact">Contact</Link>
  </div>

  <div className="burger-icon" onClick={toggleMenu}>
    {menuOpen ? <FaTimes /> : <FaBars />}
  </div>

  <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
    <Link to="/" onClick={toggleMenu}>Home</Link>
    <Link to="/products" onClick={toggleMenu}>Products</Link>
    <Link to="/about" onClick={toggleMenu}>About Us</Link>
    <Link to="/cart" onClick={toggleMenu}>Cart</Link>
    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
  </div>
</div>

  );
};

export default NavBar;