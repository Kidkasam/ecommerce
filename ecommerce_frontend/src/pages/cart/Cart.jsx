import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./cart.css";
import Footer from "../../components/footer/Footer";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const shipping = cart.length > 0 ? 15.00 : 0;
  const total = cartTotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div className="header-title">
            <h1>Your Shopping Bag</h1>
            <span>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag</span>
          </div>
          <Link to="/products" className="back-link">
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-cart-state"
          >
            <div className="empty-icon"><FaShoppingBag /></div>
            <h2>Your bag is currently empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="shop-now-btn">Start Shopping</Link>
          </motion.div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="cart-card"
                    key={item.id}
                  >
                    <div className="item-image">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <div className="item-main">
                        <span className="item-cat">{item.category}</span>
                        <h3>{item.title}</h3>
                        <p className="item-price-unit">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="item-controls">
                        <div className="qty-picker">
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                            <FaMinus size={12} />
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="item-total-price">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="cart-summary-section">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row tax">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="checkout-proceed-btn"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout <FaArrowRight />
                </button>
                <p className="summary-note">Prices include VAT where applicable.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

