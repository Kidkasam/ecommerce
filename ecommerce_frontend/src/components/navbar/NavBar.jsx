import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar">
        <Link to="/" className="logo">KFITS<span>.</span></Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Catalog</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Action Icons */}
        <div className="nav-actions">
          <div className="search-box">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                className={`search-input ${searchOpen ? 'active' : ''}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button onClick={() => setSearchOpen(!searchOpen)} className="action-btn">
              <FaSearch />
            </button>
          </div>

          {!user ? (
            <Link to="/login" className="action-btn">
              <FaUser />
            </Link>
          ) : (
            <div className="user-profile">
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="action-btn logout">
                <FaSignOutAlt />
              </button>
            </div>
          )}

          <Link to="/cart" className="action-btn cart-btn">
            <FaShoppingCart />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="cart-badge"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          <div className="burger-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
          >
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/products" onClick={toggleMenu}>Catalog</Link>
            <Link to="/cart" onClick={toggleMenu}>Cart ({cartCount})</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            {!user ? (
              <Link to="/login" onClick={toggleMenu} className="mobile-login">Login</Link>
            ) : (
              <button onClick={() => { logout(); toggleMenu(); }} className="mobile-logout">
                Logout ({user.name})
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
